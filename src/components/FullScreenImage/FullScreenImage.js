import React from "react";
import "./FullScreenImage.css"; // Create a CSS file for styling the full-screen image

function FullScreenImage({ imageUrl, onClose }) {
    return (
        <div className="full-screen-image-overlay" onClick={onClose}>
            <img src={imageUrl} alt="Full Screen Image" className="full-screen-image" />
        </div>
    );
}

export default FullScreenImage;