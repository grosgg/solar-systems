import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

import * as THREE from 'three';
export default class Controls extends PointerLockControls {
  constructor(camera, domElement) {
    super(camera, domElement);

    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();

    this.previousTime = performance.now();

    this.goingForward = false;
    this.goingBackward = false;
    this.goingLeft = false;
    this.goingRight = false;

    this.lock();
    console.log(this);
  }

  onKeyDown(event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.goingForward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.goingLeft = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.goingBackward = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.goingRight = true;
        break;
    }
  }

  onKeyUp (event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.goingForward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.goingLeft = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.goingBackward = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.goingRight = false;
        break;
    }
  }

  move() {
    const time = performance.now();
    const delta = ( time - this.previousTime ) / 1000;

    this.velocity.x -= this.velocity.x * 0.5 * delta;
    this.velocity.z -= this.velocity.z * 0.5 * delta;


    this.direction.z = Number( this.goingForward ) - Number( this.goingBackward );
    this.direction.x = Number( this.goingRight ) - Number( this.goingLeft );
    this.direction.normalize();

    // console.log(this.direction);

    if ( this.goingForward || this.goingBackward ) this.velocity.z -= this.direction.z * 400.0 * delta;
    if ( this.goingLeft || this.goingRight ) this.velocity.x -= this.direction.x * 400.0 * delta;

    this.moveRight(-this.velocity.x * delta);
    this.moveForward(-this.velocity.z * delta);

    this.previousTime = time;
  }

}
