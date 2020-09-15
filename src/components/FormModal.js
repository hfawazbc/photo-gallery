import React, { useState, useEffect } from 'react';
import UploadBackground from '../icons/upload.png';
import { v4 as uuidv4 } from 'uuid';
import '../styles/formModal.css';

import useAppStorage from '../hooks/useAppStorage';

export default function FormModal() {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [tags, setTags] = useState([]);

    const MAX_TAG_ARRAY_LENGTH = 5;

    const [fileValue, setFileValue] = useState(null);
    const [fileSource, setFileSource] = useState('');
    const [tagValue, setTagValue] = useState('');

    const [selectedForm, setSelectedForm] = useState(false);

    const {url, setUrl, progress, setProgress} = useAppStorage(file, caption, tags);

    const fileInput = document.querySelector('#file-input');

    let docBody = document.querySelector('body');
    if (selectedForm === true) {
        docBody.style.overflow = 'hidden';
    } else {
        docBody.style.overflow = 'visible';
    }

    useEffect(() => {
        if (url) {
            setFile(null);
            setCaption('');
            setTags([]);

            setProgress(0);
            setUrl('');

            setFileValue(null);
            setFileSource(URL.revokeObjectURL(fileSource));

            fileInput.value = '';
        }
    }, [url, setUrl, setFile, setCaption, setTags, setProgress, setFileValue, fileSource, setFileSource, fileInput]);

    const previewImage = (event) => {
        if (event.target.files.length > 0) {
            setFileSource(URL.createObjectURL(event.target.files[0]));
            setFileValue(event.target.files[0]);
        } else {
            setFileSource('');
        }
    }

    const uploadImage = (event) => {
        event.preventDefault();

        let fileInput = document.querySelector('#file-input');

        if (fileInput.value === '') {
            alert('Please select an image.');
        } else if (caption === '') {
            alert('Please type a caption.');
        } else if (tags.length === 0) {
            alert('Please add at least one tag.');
        } else {
            setFile(fileValue);
        }
    }

    const resetModal = (event) => {
        event.preventDefault();
    
        setSelectedForm(false);

        setFileValue(null);
        setFileSource(URL.revokeObjectURL(fileSource));

        setTagValue('');

        setFile(null);
        setCaption('');
        setTags([]);

        fileInput.value = '';
    }

    const removeTag = (event) => {
        let tagToRemove = event.target.parentElement.children[0].textContent;

        let newTags = tags.filter(tag => {
            return tag !== tagToRemove;
        })

        setTags(newTags);
    }

    const addTag = () => {
        if (tags.length < MAX_TAG_ARRAY_LENGTH) {   
            if (tagValue === '') {
                alert('Please type in a tag before adding.');
            } else {
                if (tags.includes(tagValue) === false) {
                    setTags([...tags, tagValue.toLowerCase()]);
                    setTagValue('');
                } else {
                    alert('Tag has already been added.');
                    setTagValue('');
                }
            }
        } else {
            alert('Maximum tags reached.');
            setTagValue('');
        }
    }

    const clickFileInput = (e) => {
        let fileInput = document.querySelector('#file-input');
        fileInput.click();
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className="form-modal-open-btn" onClick={() => setSelectedForm(true)}></button>
            </div>
            <div className={selectedForm === true ? "form-modal-backdrop": "form-modal-invisible"}>
                <form className="form-modal-content" onSubmit={(e) => uploadImage(e)}>
                    <div className="form-modal-top">
                        <h3 className="form-modal-header">Upload Image</h3>
                        <button className="form-modal-close-btn" onClick={(e) => resetModal(e)}></button>
                    </div>
                    <div className="form-modal-middle">
                        <div className="form-modal-left">
                            <div className="form-modal-field-wrapper">
                                <label className="form-modal-field-label">Image</label>
                                <input id="file-input" type="file" accept="image/png, image/jpeg, image/gif" onChange={(e) => previewImage(e)}/>
                                <button type="button" className="form-modal-choose-file-btn" onClick={(e) => clickFileInput(e)}></button>
                            </div>
                            <div className="form-modal-field-wrapper">
                                <label className="form-modal-field-label">Caption</label>
                                <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} onKeyDown={(e) => {if (e.which === 13) e.preventDefault()}} autoComplete="off"/>
                            </div>
                            <div className="form-modal-field-wrapper">
                                <label className="form-modal-field-label">Tag</label> 
                                <div className="form-modal-tag-wrapper">
                                    <input type="text" value={tagValue} onChange={(e) => setTagValue(e.target.value.split(' ').join(''))} onKeyDown={(e) => {if (e.which === 13) e.preventDefault()}} autoComplete="off"/>
                                    <button type="button" className="form-modal-add-tag-btn" onClick={() => addTag()}></button>
                                </div>     
                            </div>
                            <div className="form-modal-tag-preview">
                                {tags.map(tag => (
                                    <div key={uuidv4()} className="form-modal-tag-wrapper">
                                        <span className="form-modal-tag">{tag}</span>
                                        <button className="form-modal-remove-tag-btn" onClick={(e) => removeTag(e)}></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-modal-right" style={{backgroundImage: `url(${fileSource})`}}>
                            <img className="form-modal-image-preview" src={fileSource} alt="" />
                        </div>
                    </div>
                    <div className="form-modal-bottom" style={{backgroundImage: `linear-gradient(to right, #42A5F5 ${progress}%, #66BB6A ${progress}%)`}}>
                        <button style={{backgroundImage: `url(${UploadBackground})`}} className="form-modal-upload-btn" type="submit"></button>
                    </div>
                </form>
            </div>
        </div>
    )
}