import * as THREE from 'three';
export default class Planet {
  constructor(planets) {
    this.color = new THREE.Color(Math.random(), Math.random(), Math.random());
    this.radius = Math.floor(Math.random() * 100);

    this.generateDistance();
    while (this.isColliding(planets)) {
      this.generateDistance();
    }

    this.angle = Math.random() * 6;
    this.revolutionSpeed = Math.random() / 100;

    const planetGeometry = new THREE.SphereGeometry(this.radius, 20, 20);
    const planetMaterial = new THREE.MeshLambertMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(planetGeometry, planetMaterial);
    this.mesh.position.set(this.distance, 0, 0)
  }

  generateDistance() {
    this.distance = 300 + Math.floor(Math.random() * 3000);
  }

  isColliding(planets) {
    // console.log('This planet', this.distance - this.radius, this.distance + this.radius);
    let result = false;
    planets.forEach(otherPlanet => {
      // console.log('Other planet', otherPlanet.distance - otherPlanet.radius, otherPlanet.distance + otherPlanet.radius);
      if ((otherPlanet.distance + otherPlanet.radius) > (this.distance - this.radius) &&
        (otherPlanet.distance - otherPlanet.radius) < (this.distance + this.radius)) {
        // Overlaping edges with other planet
        result = true;
      } else if ((otherPlanet.distance + otherPlanet.radius) > (this.distance + this.radius) &&
        (otherPlanet.distance - otherPlanet.radius) < (this.distance - this.radius)) {
        // Contained in other planet path
        result = true;
      } else if ((otherPlanet.distance - otherPlanet.radius) > (this.distance - this.radius) &&
        (otherPlanet.distance + otherPlanet.radius) < (this.distance + this.radius)) {
        // Contains other planet
        result = true;
      }
    });
    return result;
  }

  revolve() {
    this.angle += this.revolutionSpeed;
    this.mesh.position.set(
      this.distance * Math.cos(this.angle),
      0,
      this.distance * Math.sin(this.angle),
    );
  }

  update() {
    this.revolve();
  }
}
