import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='TiltParentDiv TiltParentDivMin'>
      <Tilt 
      	className="Tilt" 
      	options={{ max : 55 }}>
        <div className="Tilt-inner">
          <img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;