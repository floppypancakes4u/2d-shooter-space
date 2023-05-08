import 'phaser';

export class Bullet extends Phaser.Physics.Arcade.Image {
  constructor(scene) {
    super(scene, 0, 0, 'space', 'blaster');

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setBlendMode(1);
    this.setDepth(1);

    this.speed = 1000;
    this.lifespan = 1000;

    this._temp = new Phaser.Math.Vector2();
  }

  fire({ ship, x, y }) {
    this.lifespan = 1000;

    console.log({ ship, x, y });

    this.setActive(true);
    this.setVisible(true);
    this.setAngle(ship.body.rotation);
    this.setPosition(x, y);
    this.body.reset(x, y);

    const angle = Phaser.Math.DegToRad(ship.body.rotation);

    this.scene.physics.velocityFromRotation(
      angle,
      this.speed,
      this.body.velocity
    );

    this.body.velocity.x *= 2;
    this.body.velocity.y *= 2;
  }

  update(time, delta) {
    this.lifespan -= delta;

    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
      this.body.stop();
    }
  }
}
