import * as THREE from 'three';
export default class Planet {
  constructor(planets, rng) {
    this.color = new THREE.Color(rng(), rng(), rng());
    this.radius = Math.floor(rng() * 100);

    this.generateDistance(rng);
    while (this.isColliding(planets)) {
      this.generateDistance(rng);
    }

    this.revolutionAngle = rng() * 6;
    this.revolutionSpeed = rng() / 100;
    this.revolutionTilt = rng() * 200 * (Math.round(rng()) * 2 - 1);

    const planetGeometry = new THREE.SphereGeometry(this.radius, 20, 20);
    const planetMaterial = new THREE.MeshLambertMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(planetGeometry, planetMaterial);
    this.mesh.position.set(this.distance, this.revolutionTilt, 0)
  }

  generateDistance(rng) {
    this.distance = 300 + Math.floor(rng() * 3000);
  }

  isColliding(otherPlanets) {
    // console.log('This planet', this.distance - this.radius, this.distance + this.radius);
    let result = false;
    otherPlanets.forEach(otherPlanet => {
      // console.log('Other planet', otherPlanet.distance - otherPlanet.radius, otherPlanet.distance + otherPlanet.radius);
      if ((otherPlanet.distance + otherPlanet.radius) > (this.distance - this.radius) &&
        (otherPlanet.distance - otherPlanet.radius) < (this.distance - this.radius)) {
        // Overlaping edges with other planet
        result = true;
      } else if ((otherPlanet.distance - otherPlanet.radius) < (this.distance + this.radius) &&
        (otherPlanet.distance + otherPlanet.radius) > (this.distance + this.radius)) {
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
    this.revolutionAngle += this.revolutionSpeed;
    this.mesh.position.set(
      this.distance * Math.cos(this.revolutionAngle),
      this.revolutionTilt * Math.cos(this.revolutionAngle),
      this.distance * Math.sin(this.revolutionAngle),
    );
  }

  update() {
    this.revolve();
  }
}
