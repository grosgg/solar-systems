import React, { useState } from 'react';

import Scene from './scene/Scene.jsx';
import Menu from './menu/Menu.jsx';

import './App.css';

const App = () => {
  const [mode, setMode] = useState('menu');

  const goToScene = () => {
    setMode('scene');
  }

  return (
    <div className='container'>
      { mode === 'menu' && <Menu goToScene={goToScene} />}
      { mode === 'scene' && <Scene />}
    </div>
  );
}
export default App;