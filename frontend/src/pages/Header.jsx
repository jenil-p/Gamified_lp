import React from 'react';
import './Header.css';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-text">
        <TypeAnimation
          sequence={[
            'Hello,', 1000,
            'Welcome To Mapiq,', 1500,
          ]}
          wrapper="div"
          cursor={true}
          repeat={Infinity}
          className="type-text"
        />
        <h5>“A smart, gamified platform that maps your learning, piques your mind, and gets stuff DONE.”</h5>
        <button 
          onClick={() => navigate('/contact-us')} 
          className="explore-btn"
        >
          Explore More
        </button>
      </div>

      <div className="header-animation-container">
        <DotLottieReact
          src="/Educatin.lottie"
          loop
          autoplay
          className="header-animation"
        />
      </div>
    </div>
  );
};

export default Header;