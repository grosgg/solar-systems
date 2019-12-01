import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ seed, setSeed, goToScene }) => {
  const handleChange = (event) => {
    setSeed(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    goToScene();
  }

  return (
    <div className="menu">
      <div className="title">
        <h1>Solar Systems</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          Seed: <input type="text" value={seed} onChange={handleChange} />&nbsp;
          <input type="submit" value="Go" />
        </form>
      </div>
    </div>
  );
};

export default Menu;