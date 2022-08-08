import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center">
        <div className="a">
            <img id="inputimage" className="image" alt="" src={imageUrl}></img>
            <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>    
        </div>
    );
}

export default FaceRecognition;