import React, { Component } from 'react';

import Scene from './scene/Scene.jsx';
import Menu from './menu/Menu.jsx';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='container'>
        {/* <Scene /> */}
        <Menu />
      </div>
    );

  }
}
export default App;