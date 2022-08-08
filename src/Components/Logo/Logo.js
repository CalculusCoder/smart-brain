import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="container">
            <Tilt>
            <div className="image-container">
                <img alt="logo" src={brain}></img>
            </div>
            </Tilt>
        </div>
    );
}

export default Logo;