import React from 'react';
import '../styles/imageModal.css';

export default function ImageModal({id, selectedImage, setSelectedImage, imageId, url, caption, tags}) {
    return (
        <div className={selectedImage === true && id === imageId ? "image-modal-backdrop" : "image-modal-invisible"}>
            <div className="image-modal-content">
                <div className="image-modal-info-wrapper">
                    <div>
                        <button className="image-modal-close-btn" onClick={(e) => setSelectedImage(false)}>x</button>
                    </div>
                    <div className="image-modal-caption-wrapper">
                        <span className="image-modal-caption">{caption}</span>
                    </div>
                    <div className="image-modal-tag-wrapper">
                        {tags.map(tag => (
                            <span className="image-modal-tag" key={Math.floor(Math.random() * 1000)}>{tag}</span>
                        ))}
                    </div>
                    <a className="image-modal-download-link" href={url} target="_blank" rel="noopener noreferrer">
                        <button className="image-modal-download-btn">Download</button>
                    </a>
                </div>
                <div className="image-modal-pic-wrapper" style={{backgroundImage: `url(${url})`}}>
                    <img className="image-modal-pic" src={url} alt=""/>
                </div>
            </div>
        </div>
    )
}