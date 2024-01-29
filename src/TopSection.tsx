import React from 'react';
import './TopSection.css'; // Import your CSS file for styling

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="icon">Icon 1</div>
      <div className="icon">Icon 2</div>
      <div className="icon">Icon 3</div>
      {/* Add more icons as needed */}
    </div>
  );
};

export default Header;