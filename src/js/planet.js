import * as THREE from 'three';
export default class Planet {
  constructor() {
    this.color = new THREE.Color(Math.random(), Math.random(), Math.random());
    this.radius = Math.random() * 100;
    this.distance = 150 + Math.random() * 2000;
    this.angle = Math.random() * 6;
    this.revolutionSpeed = Math.random() / 100;

    const planetGeometry = new THREE.SphereGeometry(this.radius, 20, 20);
    const planetMaterial = new THREE.MeshLambertMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(planetGeometry, planetMaterial);
    this.mesh.position.set(this.distance, 0, 0)
  }

  revolve() {
    this.angle += this.revolutionSpeed;
    this.reposition();
  }

  reposition() {
    this.mesh.position.set(
      this.distance * Math.cos(this.angle),
      this.distance * Math.sin(this.angle),
      0
    );
  }
}
