import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p>
                This Magic Brain will detect faces in your images. Give it a try!
            </p>
            <div className="center">
                <div className="input center">
                    <input className="placeholder" type='text' onChange={onInputChange} placeholder="Input Image URL"></input>
                    <button onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;