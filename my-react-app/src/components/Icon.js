import React from 'react';

const Icon = ({ src, alt }) => {
    return (
        <img src={src} alt={alt} style={{ width: '50px', height: '50px' }} />
    );
};

export default Icon;