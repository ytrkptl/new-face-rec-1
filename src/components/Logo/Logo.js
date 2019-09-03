import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = ({ showLightning }) => {
  return (
    <div className='TiltParentDiv TiltParentDivMin'>
      <Tilt 
      	className="Tilt" 
      	options={{ max : 55 }}>
        <div className="Tilt-inner" onClick={()=>showLightning()}>
          <span className="logoEmoji" role="img" aria-label="thunderstorm">⛈️</span>
          <span className="logoText">Click me to toggle rain.</span>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;