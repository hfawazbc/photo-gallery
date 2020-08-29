import React from 'react';
import '../styles/header.css';
import HeaderBackground from '../images/camera_dariusz-sankowski.jpg'

export default function Header() {
    return (
        <div className="header-container">
            <img className="header-background" src={HeaderBackground} alt="camera"/>
            <p className="header-title">Photo Gallery</p>
        </div>
    )
}