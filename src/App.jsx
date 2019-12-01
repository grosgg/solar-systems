import React, { useState } from 'react';

import Scene from './scene/Scene.jsx';
import Menu from './menu/Menu.jsx';

import './App.css';

const App = () => {
  const [mode, setMode] = useState('menu');
  const [seed, setSeed] = useState('');

  const goToScene = () => {
    setMode('scene');
  }

  return (
    <div className='container'>
      { mode === 'menu' && <Menu seed={seed} setSeed={setSeed} goToScene={goToScene} />}
      { mode === 'scene' && <Scene seed={seed} />}
    </div>
  );
}
export default App;