import React from 'react';
import Spinner from './resources/Spinner.gif';
const FullPageLoader = () => {
    return (
        <div className="fp-container">
            <img src={Spinner} className="fp-loader"/>
        </div>
    )
}

export default FullPageLoader;
