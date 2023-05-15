import 'phaser';

export class Actor extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene.matter.world, x, y, texture, frame);

    // Add the instance of this actor to the scene's physics world and display list
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);

    // set some additional properties
    this.setFrictionAir(0.0);
    this.setBounce(0.0);

    // Game values
    this.offset = null;
    this.owningActor = null;
    this.mass = 1;
  }

  SetOffset(offset) {
    this.offset = offset;
    console.log(this.offset);
  }

  SetOwningActor(actor) {
    this.owningActor = actor;
  }

  GetOwningActor() {
    return this.owningActor;
  }

  // You can add new methods or override the existing ones
  update() {
    // Add your custom code here
  }
}

export class MovementActor extends Actor {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.forwardThrustPower = 0.1;
    this.brakingThrustPower = 0.1;
    this.turnPower = 0.1;
  }

  // Methods
  forwardThrust() {
    this.thrust(this.forwardThrustPower * this.mass);
  }

  brakingThrust() {
    this.thrust(-this.brakingThrustPower * this.mass);
  }

  turnRight() {
    this.rotation += this.turnPower / this.mass;
  }

  turnLeft() {
    this.rotation -= this.turnPower / this.mass;
  }
}

export class Hardpoint extends Actor {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.owningActor = null;
  }
}

export class ProjectileWeapon extends Actor {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
  }
}
