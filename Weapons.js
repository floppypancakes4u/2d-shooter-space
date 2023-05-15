import 'phaser';
import * as Actors from './Actor.js';

export class TestLaserPulseCannon extends Actors.ProjectileWeapon {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
  }
}
