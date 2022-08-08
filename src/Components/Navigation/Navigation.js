import React from "react";
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedin }) => {
    //Even listeners for register and sign in at the home page
        if(isSignedin === true) {
            return (
            <nav>
            <a onClick={() => onRouteChange('signout')}>Sign Out</a>
        </nav>
        )
        } else if (isSignedin === false) {
            return (
                <nav>
                    <a onClick={() => onRouteChange('register')}>Register</a>
                </nav>
        )
        } else if (isSignedin === null) {
            return (
                <nav>
                    <a onClick={() => onRouteChange('signout')}>Sign In</a>
                </nav>
        )
        }
}

export default Navigation;