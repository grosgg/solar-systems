import React from 'react';
import './Menu.css';

const Menu = ({ goToScene }) => {
  const handleClick = () => {
    console.log('Click');
    goToScene();
  }

  return (
    <div className="menu">
      <div className="title">
        <h1>Solar Systems</h1>
      </div>
      <div>
        <button onClick={handleClick} >Go</button>
      </div>
    </div>
  );
};

export default Menu;