import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      {/* Left: Text content */}
      <div className="header-text">
        <h3>Welcome, To Vayu<span>notics...</span></h3>
        <p>
          Exploring innovation and technology with advanced drone solutions.
        </p>
        <button 
          onClick={() => navigate('/explore')} 
          className="explore-btn"
        >
          Explore More
        </button>
      </div>

      {/* Right: Animation */}
      <DotLottieReact
        src="/Drone.lottie" 
        loop
        autoplay
        className="header-animation"
      />
    </div>
  );
};

export default Header;
