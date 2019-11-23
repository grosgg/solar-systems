import Planet from './planet.js'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, -2000, 500);
new THREE.OrbitControls( camera, renderer.domElement );

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();

const sunGeometry = new THREE.SphereGeometry(100, 20, 20);
const sunTexture = textureLoader.load("textures/sun.jpg");
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.rotation.x = 90;
scene.add(sun);

const sunlight = new THREE.PointLight(0xffffff, 2, 10000);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

let planets = [];
for (let i = 0; i < 10; i++) {
  const planet = new Planet();
  console.log(planet);
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
