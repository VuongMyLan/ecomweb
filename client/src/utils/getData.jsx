import { db, storage } from '../firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';

export const GetAllDocs = async (Doc) => {
    return new Promise((resolve, reject) => {
        const docList = [];
        const q = query(collection(db, Doc));
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    docList.push(doc.data());
                });
                unsubscribe();
                resolve(docList);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const queryDocs = (Doc, category, queryType) => {
    return new Promise((resolve, reject) => {
        const docList = [];
        const q = query(collection(db, Doc), where(category, '==', queryType));
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    docList.push(doc.data());
                });
                unsubscribe();
                resolve(docList);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const GetDoc = (Doc, uid, setDoc) => {
    const unsub = onSnapshot(doc(db, Doc, uid), (doc) => {
        setDoc(doc.data());
    });
};

export const GetSavedRec = (Doc, uid, setDoc) => {
    const unsub = onSnapshot(doc(db, Doc, uid), (doc) => {
        setDoc(doc.data());
    });
};
