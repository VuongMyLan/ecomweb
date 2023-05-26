import React from 'react';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { SidebarData } from './SidebarData';
import SubSidebar from './SubSidebar';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
        getItem('Option 3', '3'),
        getItem('Option 4', '4'),
    ]),
    getItem('Navigation Two', 'sub2', <MailOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [
            getItem('Option 7', '7'),
            getItem('Option 8', '8'),
        ]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];
const Sidebar = ({ className }) => {
    // const [openKeys, setOpenKeys] = useState(['sub1']);
    // const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    // const onOpenChange = (keys) => {
    //     console.log('openKeys', openKeys);
    //     console.log('keys', keys);
    //     const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    //     console.log('latestOpenKey', latestOpenKey);
    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //         setOpenKeys(keys);
    //         console.log('openKeys', openKeys);
    //     } else {
    //         setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    //     }
    // };

    // const handleClick = (e, ) => {
    //     console.log(e);
    // };
    return (
        <div className={className}>
            {/* <Menu
                mode='inline'
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: '100%',
                }}
                items={items}
                onClick={handleClick}
            /> */}
			{SidebarData.map((item, index) => (
				<SubSidebar key={index} item={item}/>
			))}
        </div>
    );
};

export default Sidebar;
