import React, { useState } from 'react';
import CenteredIcon from '../components/CenteredIcon';

const ImageStoragePage = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Image Storage</h1>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <div style={{ marginTop: '20px' }}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded ${index}`} style={{ width: '100px', margin: '10px' }} />
          ))
        ) : (
          <CenteredIcon />
        )}
      </div>
    </div>
  );
};

export default ImageStoragePage;