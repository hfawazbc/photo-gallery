import React from 'react';

export default function Header() {
    return (
        <div className="header-container">
            <h1 style={{ 
                marginTop: '50px', 
                textAlign: 'center', 
                fontSize: '3em', 
                borderBottom: 'solid black 1px', 
                padding: "10px" 
            }}>Photo Gallery</h1>
        </div>
    )
}