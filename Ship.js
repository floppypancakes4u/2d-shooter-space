import 'phaser';
import { MovementActor } from './Actor.js';
import * as Weapons from './Weapons.js';

function CalcPointWithRotation(origin, point, rotation) {
  let c = Math.cos(rotation);
  let s = Math.sin(rotation);

  return {
    x: origin.x + c + point.x - s * point.y,
    y: origin.y + s * point.x + c * point.y,
  };
}

export class Ship extends MovementActor {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.hardpoints = new Map();
    //this.setBlendMode(1);
    this.setDepth(2);
    //this.setDrag(300);
    //this.setAngularDrag(400);
    //this.setMaxVelocity(600);

    this.setupThrusterParticles();
  }

  update(time, delta) {
    super.update(time, delta);
    //console.log('ship update');
  }

  FireWeapons(time, delta) {
    for (const [key, value] of this.hardpoints.entries()) {
      if (value.hardpoint) value.hardpoint.Fire(time, delta);
      console.log(
        'almost there! just spawn the bullets, and clean up the bullet class, as well as the bullet pool in the projectile hardpoint'
      );
    }
  }

  ChangeHardpoint(slot, hardpoint) {
    let data = this.hardpoints.get(slot);
    data.hardpoint = hardpoint;

    hardpoint.SetOwningActor(this);
    hardpoint.SetOffset(data.offset);

    this.hardpoints.set(slot, data);
    //console.log('New hardpoint map: ', this.hardpoints);
  }

  setupThrusterParticles() {
    this.thrusterParticles = this.scene.add.particles(0, 0, 'space', {
      frame: 'blue',
      speed: 100,
      lifespan: {
        onEmit: (particle, key, t, value) => {
          return 200;
          //return Phaser.Math.Percent(this.body.speed, 0, 300) * 200;
        },
      },
      alpha: {
        onEmit: (particle, key, t, value) => {
          //return Phaser.Math.Percent(this.body.speed, 0, 300);
          return this.isThrusting ? 1 : 0;
        },
      },
      angle: {
        onEmit: (particle, key, t, value) => {
          return this.angle - 180; // + Phaser.Math.Between(-10, 10);
        },
      },
      scale: { start: 0.6, end: 0 },
      blendMode: 'ADD',
    });

    this.thrusterParticles.startFollow(this);
  }
}

export class DevShip extends Ship {
  constructor(scene, x, y) {
    super(scene, x, y, 'space', 'ship');

    this.hardpoints.set(1, { offset: { x: 0, y: -30 }, hardpoint: null });
    this.hardpoints.set(2, { offset: { x: 0, y: 30 }, hardpoint: null });

    this.ChangeHardpoint(1, new Weapons.TestLaserPulseCannon(scene, this));
  }
}
