import React from 'react';
import '../styles/imageModal.css';
import { v4 as uuidv4 } from 'uuid';

export default function ImageModal({id, selectedImage, setSelectedImage, imageId, url, caption, tags}) {
    let docBody = document.querySelector('body');
    if (selectedImage === true) {
        docBody.style.overflow = 'hidden';
    } else {
        docBody.style.overflow = 'visible';
    }

    return (
        <div className={selectedImage === true && id === imageId ? "image-modal-backdrop" : "image-modal-invisible"}>
            <div className="image-modal-content">
                <div className="image-modal-left" style={{backgroundImage: `url(${url})`}}>
                    <img className="image-modal-pic" src={url} alt=""/>
                </div>
                <div className="image-modal-right">
                    <div className="image-modal-close-btn-wrapper">
                        <button className="image-modal-close-btn" onClick={(e) => setSelectedImage(false)}></button>
                    </div>
                    <h3 className="image-modal-header">{caption}</h3>
                    <div className="image-modal-tag-wrapper">
                        {tags.map(tag => (
                            <span className="image-modal-tag" key={uuidv4()}>{tag}</span>
                        ))}
                    </div>
                    <a className="image-modal-download-link" href={url} target="_blank" rel="noopener noreferrer">
                        <button className="image-modal-download-btn"></button>
                    </a>
                </div>
            </div>
        </div>
    )
}
