import React, { Component } from 'react';

import Scene from './scene/Scene.jsx';
import Menu from './menu/Menu.jsx';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Scene />
        <Menu />
      </React.Fragment>
    );

  }
}
export default App;