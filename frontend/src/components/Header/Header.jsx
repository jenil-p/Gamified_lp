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
        <h3>Welcome, To Map<span>Iq</span></h3>
        <p>
          A smart, gamified platform that maps your learning, piques your mind, and gets stuff DONE.
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
        src="/learning.lottie" 
        loop
        autoplay
        className="header-animation"
      />
    </div>
  );
};

export default Header;
