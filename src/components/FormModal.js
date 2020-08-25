import React, {useState, useEffect} from 'react';
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

    const {url, progress, setProgress} = useAppStorage(file, caption, tags);

    useEffect(() => {
        if (url) {
            setFile(null);
            setCaption('');
            setTags([]);
            setProgress(0);
        }
    }, [url, setFile, setCaption, setTags, setProgress]);

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
        } else {
            setFile(fileValue);

            setFileValue(null);
            setFileSource(URL.revokeObjectURL(fileSource));

            fileInput.value = '';
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

        let fileInput = document.querySelector('#file-input');
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

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <button className="form-modal-open-btn" onClick={() => setSelectedForm(true)}>+</button>
            </div>
            <div className={selectedForm === true ? "form-modal-backdrop": "form-modal-invisible"}>
                <form className="form-modal-content" onSubmit={(e) => uploadImage(e)}>
                    <div className="form-modal-top">
                        <h2 className="form-modal-header">Upload Image</h2>
                        <button className="form-modal-close-btn" onClick={(e) => resetModal(e)}>x</button>
                    </div>
                    <div className="form-modal-middle">
                        <div className="form-modal-left">
                            <div className="form-modal-field-wrapper">
                                <label className="form-modal-field-label">Image</label>
                                <label htmlFor="file-input" className="form-modal-select-file-btn">Choose File</label>
                                <input id="file-input" type="file" accept="image/png, image/jpeg, image/gif" onChange={(e) => previewImage(e)}/>
                            </div>
                            <div className="form-modal-field-wrapper">
                                <label className="form-modal-field-label">Caption</label>
                                <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} onKeyDown={(e) => {if (e.which === 13) e.preventDefault()}} autoComplete="off"/>
                            </div>
                            <div className="form-modal-field-wrapper">
                                <label className="form-modal-field-label">Tag</label> 
                                <div className="form-modal-tag-field-wrapper">
                                    <input type="text" value={tagValue} onChange={(e) => setTagValue(e.target.value.split(' ').join(''))} onKeyDown={(e) => {if (e.which === 13) e.preventDefault()}} autoComplete="off"/>
                                    <button className="form-modal-add-tag-btn" type="button" onClick={() => addTag()}>Add</button>
                                </div>     
                            </div>
                            <div className="form-modal-tag-preview">
                                {tags.map(tag => (
                                    <div key={Math.floor(Math.random() * 1000)} className="form-modal-tag-container">
                                        <span className="form-modal-tag">{tag}</span>
                                        <button className="form-modal-remove-tag-btn" onClick={(e) => removeTag(e)}>x</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-modal-right">
                            <img className="form-modal-image-preview" src={fileSource} alt="" />
                        </div>
                    </div>
                    <div className="form-modal-bottom">
                        <button style={{background: `linear-gradient(to right, blue ${progress}%, #66BB6A ${progress}%)`}} className="form-modal-submit-btn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}