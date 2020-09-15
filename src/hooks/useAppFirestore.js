import { useState, useEffect } from 'react';
import { appFirestore } from '../firebase/config';

export default function useAppFirestore(collection) {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsubscribe = appFirestore.collection(collection)
        .orderBy('dateAdded', 'desc')
        .onSnapshot((snapshot) => {
            let documents = [];
            snapshot.forEach(doc => {
                documents.push({...doc.data(), id: doc.id})
            })
            setDocs(documents);
        })

        return () => unsubscribe();
    }, [collection])

    return { docs }
}