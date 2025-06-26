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
    <div className="container" style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Image Storage (Mockup)</h2>
      <p>หน้านี้สำหรับอัปโหลดและดูภาพ (ยังไม่เชื่อมต่อ cloud จริง)</p>
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