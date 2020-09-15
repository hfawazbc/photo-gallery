import { useState, useEffect } from 'react';
import { appStorage, appFirestore, timestamp } from '../firebase/config';

export default function useAppStorage(file, caption, tags) {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (file != null) {
            const storageRef = appStorage.ref(file.name);
            const collectionRef = appFirestore.collection('images');
    
            storageRef.put(file).on('state_changed', (snapshot) => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percentage);
            }, (err) => {
                setError(err);
            }, async () => {
                const url = await storageRef.getDownloadURL();
                const dateAdded = timestamp();
                collectionRef.add({ 
                    url,
                    dateAdded,
                    caption,
                    tags,
                })
                setUrl(url);
            })
        }

    }, [file, caption, tags]);

    return { progress, url, error, setProgress, setUrl }
}