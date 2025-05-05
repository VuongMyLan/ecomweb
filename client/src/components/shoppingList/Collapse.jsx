import React, { useContext, useEffect, useState } from 'react';
import { Collapse, theme } from 'antd';
import './shoppinglist.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CaretRightOutlined } from '@ant-design/icons';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { db, storage } from '../../firebase';
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from 'context/authContext/AuthContext';
const CollapseComponent = ({ item }) => {
    const defaultCheckedList = [];
    const CheckboxGroup = Checkbox.Group;
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [ingreList, setIngreList] = useState(item.ingredientLines);
    const { currentUser } = useContext(AuthContext);
    const recipeID = item.uri.split('#')[1];
    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(
            !!list.length && list.length < item.ingredientLines.length
        );
        setCheckAll(list.length === item.ingredientLines.length);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? item.ingredientLines : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    useEffect(() => {
        setIngreList(item.ingredientLines);
    }, [item]);

    const UpdateIngredient = async (document, uid, recipeID, newArray) => {
        const docRef = await doc(db, document, uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                [recipeID]: {
                    ingredientLines: newArray,
                    label: item.label,
                    uri: item.uri,
                    recipeID: recipeID,
                },
            });
        } else {
            // docSnap.data() will be undefined in this case
            console.log('No such document!');
        }
    };

    const handleDelete = () => {
        const uniqueArray = item.ingredientLines
            .concat(checkedList)
            .filter((item, index, arr) => {
                console.log(checkedList?.includes(item));
                return (
                    arr.indexOf(item) === index && !checkedList?.includes(item)
                );
            });
        setIngreList(uniqueArray);
        UpdateIngredient(
            'shoppingLists',
            currentUser.uid,
            recipeID,
            uniqueArray
        );

        console.log('checklist', checkedList);
        console.log('uniq', uniqueArray);
    };
    const handleDeleteRecipes = async (e, document, uid, recipeID) => {
        const docRef = await doc(db, document, uid);
        e.stopPropagation();
        await updateDoc(docRef, {
            [recipeID]: deleteField(),
        });
    };

    const handleChildren = (ingredientList) => (
        <>
            <div className='flex justify-between'>
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                    className='flex p-[2px]'
                >
                    <p>Select all </p>
                </Checkbox>
                {checkedList.length > 0 && (
                    <span className='text-main cursor-pointer'>
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => handleDelete()}
                        />
                    </span>
                )}
            </div>
            <CheckboxGroup
                options={ingredientList}
                value={checkedList}
                onChange={onChange}
                className='inline-block'
            />
        </>
    );

    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 10,
        background: 'white',
        color: 'black',
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };
    const getItems = (recipes, panelStyle) => [
        {
            key: '1',
            label: (
                <div className='flex justify-between items-center'>
                    <p>{recipes?.label}</p>{' '}
                    <span
                        onClick={(e) =>
                            handleDeleteRecipes(
                                e,
                                'shoppingLists',
                                currentUser.uid,
                                recipeID
                            )
                        }
                        className='hover:text-main text-xs ml-2'
                    >
                        Delete Recipe
                    </span>
                </div>
            ),
            children: handleChildren(ingreList),
            style: panelStyle,
        },
    ];

    return (
        <div>
            {' '}
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className='bg-slate-200 mt-[10px]'
                items={getItems(item, panelStyle)}
            />
        </div>
    );
};

export default CollapseComponent;
