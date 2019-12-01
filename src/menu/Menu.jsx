import React from 'react';
import './Menu.css';

export default function Menu() {
  const handleClick = () => {
    console.log('Click');
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