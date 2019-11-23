const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);

controls = new THREE.OrbitControls( camera, renderer.domElement );

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

const sunGeometry = new THREE.SphereGeometry(10, 20, 20);
const sunTexture = textureLoader.load("textures/sun.jpg");
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const sunlight = new THREE.PointLight(0xffffff, 2, 100);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

const planetGeometry = new THREE.SphereGeometry(10, 20, 20);
const earthTexture = textureLoader.load("textures/earth.jpg");
const planetMaterial = new THREE.MeshLambertMaterial({ map: earthTexture });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.set(30, 0, 0)
scene.add(planet);

const update = () => {
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
