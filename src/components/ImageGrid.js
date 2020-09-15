import React, { useState } from 'react';
import useAppFirestore from '../hooks/useAppFirestore';
import ImageModal from './ImageModal';
import '../styles/imageGrid.css';

export default function ImageGrid() {
    const {docs} = useAppFirestore('images');

    const [selectedImage, setSelectedImage] = useState(false);
    const [imageId, setImageId] = useState('');

    const openModal = (event) => {
        setSelectedImage(true);
        setImageId(event.target.id);
    }

    return (
        <div className="image-grid-container">
            {docs.map(doc => (                
                <div key={doc.id}>                    
                    <img id={doc.id} className="image-grid-pic" src={doc.url} alt="" onClick={(e) => openModal(e)}/>
                    <ImageModal id={doc.id} selectedImage={selectedImage} setSelectedImage={setSelectedImage} imageId={imageId} url={doc.url} caption={doc.caption} tags={doc.tags}/>
                </div>
            ))}
        </div>
    )
}