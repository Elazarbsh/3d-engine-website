import React from 'react';
import './TopSection.css'; // Import your CSS file for styling
import githubIcon from './assets/icons/github.svg'; // Import the GitHub icon
import cubeIcon from './assets/icons/cube.svg';

const Header: React.FC = () => {
  const handleGithubClick = () => {
    // Handle navigation to GitHub repository
    window.open('https://github.com/Elazarbsh/3D-Engine', '_blank');
  };

  return (
    <div className="header">
      <div className="website-logo">
        <div className="icon">
          <img src={cubeIcon} alt="GitHub" />
        </div>
        <span className="website-logo-title">Online OBJ Viewer</span>
      </div>
      <div className="github-logo">
        <div className="icon" onClick={handleGithubClick}>
          <img src={githubIcon} alt="GitHub" />
        </div>
      </div>
    </div>
  );
};

export default Header;