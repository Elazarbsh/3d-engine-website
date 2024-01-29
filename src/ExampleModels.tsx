import React from 'react';
import './ExampleModels.css'; // Import your CSS file for styling

const ExampleModels: React.FC = () => {
  const images = [
    'https://placekitten.com/200/300',
    'https://placekitten.com/201/300',
    'https://placekitten.com/202/300',
    'https://placekitten.com/200/300',
    'https://placekitten.com/201/300',
    'https://placekitten.com/202/300',
    'https://placekitten.com/200/300',
    'https://placekitten.com/201/300',
    'https://placekitten.com/202/300',
    'https://placekitten.com/200/300',
    'https://placekitten.com/201/300',
    'https://placekitten.com/202/300',
    'https://placekitten.com/200/300',
    'https://placekitten.com/201/300',
    'https://placekitten.com/202/300',
    'https://placekitten.com/200/300',
    'https://placekitten.com/201/300',
    'https://placekitten.com/202/300',
    'https://placekitten.com/200/300',
    'https://placekitten.com/201/300',
    'https://placekitten.com/202/300',
    'https://placekitten.com/200/300',
    'https://placekitten.com/201/300',
    'https://placekitten.com/202/300',
    // Add more image URLs as needed
  ];

  const handleClick = (index: number) => {
    console.log(`Clicked on image ${index + 1}`);
  };

  return (
    <div className="image-gallery">
      <div className="scrollable-window">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            onClick={() => handleClick(index)}
            className="gallery-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ExampleModels;