import React from 'react';
import * as THREE from 'three';
import seedrandom from 'seedrandom';

import setupFullscreen from './fullscreen.js';
import Controls from './controls.js';

import Planet from './planet.js';

import SunTexture from './textures/sun.jpg';
import GalaxyTextureNX from './textures/stars-1/nx.png';
import GalaxyTexturePX from './textures/stars-1/px.png';
import GalaxyTextureNY from './textures/stars-1/ny.png';
import GalaxyTexturePY from './textures/stars-1/py.png';
import GalaxyTextureNZ from './textures/stars-1/nz.png';
import GalaxyTexturePZ from './textures/stars-1/pz.png';

const PLANETS_COUNT = 10

class Scene extends React.Component {
  componentDidMount() {
    setupFullscreen(13);
    const rng = seedrandom(this.props.seed);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.set(0, 0, 2000);

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth,window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
    });

    let controls = new Controls(camera, renderer.domElement);

    const scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();
    
    // Add sun
    const sunGeometry = new THREE.SphereGeometry(150, 20, 20);
    const sunTexture = textureLoader.load(SunTexture);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.rotation.x = 90;
    scene.add(sun);
    
    // Add sunlight
    const sunlight = new THREE.PointLight(0xffffff, 2, 10000);
    sunlight.position.set(0, 0, 0);
    scene.add(sunlight);
    
    // Add skybox
    const skyboxTexture = new THREE.CubeTextureLoader().load([
      GalaxyTexturePX,
      GalaxyTextureNX,
      GalaxyTexturePY,
      GalaxyTextureNY,
      GalaxyTexturePZ,
      GalaxyTextureNZ,
    ]);
    scene.background = skyboxTexture;
    
    // Seed planets
    let planets = [];
    for (let i = 0; i < PLANETS_COUNT; i++) {
      const planet = new Planet(planets, rng);
      scene.add(planet.mesh);
      planets.push(planet);
    }

    // Raycasting planets
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let orbitingObject = planets[Math.floor(rng() * 10)];
    let intersects = [];

    scene.add(controls.getObject());

    // Set moves
    document.addEventListener( 'keydown', (e) => controls.onKeyDown(e) );
    document.addEventListener( 'keyup', (e) => controls.onKeyUp(e) );
    document.addEventListener( 'click', () => controls.lock() );
  
    const onMouseDown = (event) => {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera( mouse, camera );
      intersects = raycaster.intersectObjects( scene.children );

      console.log(intersects);
      if (intersects.length > 0) {
        orbitingObject = planets.find(planet => planet.mesh.id == intersects[0].object.id);
      }
    }

    const update = () => {
      planets.forEach(planet => {
        planet.revolve();
      })
      controls.move();
    };
    
    const render = () => {
      renderer.render(scene, camera);
    };
    
    const animationLoop = () => {
      requestAnimationFrame( animationLoop );
      update();
      render();
    }
    
    window.addEventListener('mousedown', onMouseDown, false);
    animationLoop();
  }

  render() {
    return (
      <div id='scene' ref={ref => (this.mount = ref)} />
    );
  }
}

export default Scene;
