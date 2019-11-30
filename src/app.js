import React, { Component } from 'react';
import * as THREE from 'three';

import { init } from './scene.js'
// import "./App.css";

class App extends Component {
  componentDidMount() {
    init(this.mount);
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    );
  }
}

export default App;