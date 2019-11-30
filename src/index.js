import * as THREE from 'three';
import { OrbitControls } from './js/lib/OrbitControls.js';
import seedrandom from 'seedrandom';

import Planet from './js/planet.js';

import SunTexture from './textures/sun.jpg';
import GalaxyTextureNX from './textures/stars-1/nx.png';
import GalaxyTexturePX from './textures/stars-1/px.png';
import GalaxyTextureNY from './textures/stars-1/ny.png';
import GalaxyTexturePY from './textures/stars-1/py.png';
import GalaxyTextureNZ from './textures/stars-1/nz.png';
import GalaxyTexturePZ from './textures/stars-1/pz.png';

const PLANETS_COUNT = 10

const rng = seedrandom('jeremy');
console.log(rng());

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
camera.position.set(0, 0, 2000);

let controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 500;
controls.maxDistance = 8000;

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

const sunGeometry = new THREE.SphereGeometry(150, 30, 30);
const sunTexture = textureLoader.load(SunTexture);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.rotation.x = 90;
scene.add(sun);

const sunlight = new THREE.PointLight(0xffffff, 2, 10000);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

const skyboxTexture = new THREE.CubeTextureLoader().load([
  GalaxyTexturePX,
  GalaxyTextureNX,
  GalaxyTexturePY,
  GalaxyTextureNY,
  GalaxyTexturePZ,
  GalaxyTextureNZ,
]);
scene.background = skyboxTexture;

let planets = [];
for (let i = 0; i < PLANETS_COUNT; i++) {
  const planet = new Planet(planets, rng);
  scene.add(planet.mesh);
  planets.push(planet);
}

const update = () => {
  planets.forEach(planet => {
    planet.revolve();
  })
};

const render = () => {
  renderer.render(scene, camera);
};

const gameloop = () => {
  requestAnimationFrame( gameloop );
  update();
  render();
}

gameloop();
