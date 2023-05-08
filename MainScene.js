import 'phaser';
import { Bullet } from './Bullet.js';
import { DevShip } from './Ship.js';

export class MainScene extends Phaser.Scene {
  lastFired = 0;

  preload() {
    this.load.setBaseURL('https://labs.phaser.io');

    this.load.image('background', 'assets/tests/space/nebula.jpg');
    this.load.image('stars', 'assets/tests/space/stars.png');
    this.load.atlas(
      'space',
      'assets/tests/space/space.png',
      'assets/tests/space/space.json'
    );

    this.load.image('red', 'assets/particles/red.png');
  }
  create() {
    //  Prepare some spritesheets and animations
    this.textures.addSpriteSheetFromAtlas('mine-sheet', {
      atlas: 'space',
      frame: 'mine',
      frameWidth: 64,
    });
    this.textures.addSpriteSheetFromAtlas('asteroid1-sheet', {
      atlas: 'space',
      frame: 'asteroid1',
      frameWidth: 96,
    });
    this.textures.addSpriteSheetFromAtlas('asteroid2-sheet', {
      atlas: 'space',
      frame: 'asteroid2',
      frameWidth: 96,
    });
    this.textures.addSpriteSheetFromAtlas('asteroid3-sheet', {
      atlas: 'space',
      frame: 'asteroid3',
      frameWidth: 96,
    });
    this.textures.addSpriteSheetFromAtlas('asteroid4-sheet', {
      atlas: 'space',
      frame: 'asteroid4',
      frameWidth: 64,
    });

    this.anims.create({
      key: 'mine-anim',
      frames: this.anims.generateFrameNumbers('mine-sheet', {
        start: 0,
        end: 15,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'asteroid1-anim',
      frames: this.anims.generateFrameNumbers('asteroid1-sheet', {
        start: 0,
        end: 24,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'asteroid2-anim',
      frames: this.anims.generateFrameNumbers('asteroid2-sheet', {
        start: 0,
        end: 24,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'asteroid3-anim',
      frames: this.anims.generateFrameNumbers('asteroid3-sheet', {
        start: 0,
        end: 24,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: 'asteroid4-anim',
      frames: this.anims.generateFrameNumbers('asteroid4-sheet', {
        start: 0,
        end: 23,
      }),
      frameRate: 20,
      repeat: -1,
    });

    //  World size is 8000 x 6000
    this.bg = this.add
      .tileSprite(400, 300, 800, 600, 'background')
      .setScrollFactor(0);

    //  Add our planets, etc
    this.add
      .image(512, 680, 'space', 'blue-planet')
      .setOrigin(0)
      .setScrollFactor(0.6);
    this.add
      .image(2833, 1246, 'space', 'brown-planet')
      .setOrigin(0)
      .setScrollFactor(0.6);
    this.add.image(3875, 531, 'space', 'sun').setOrigin(0).setScrollFactor(0.6);
    const galaxy = this.add
      .image(5345 + 1024, 327 + 1024, 'space', 'galaxy')
      .setBlendMode(1)
      .setScrollFactor(0.6);
    this.add
      .image(908, 3922, 'space', 'gas-giant')
      .setOrigin(0)
      .setScrollFactor(0.6);
    this.add
      .image(3140, 2974, 'space', 'brown-planet')
      .setOrigin(0)
      .setScrollFactor(0.6)
      .setScale(0.8)
      .setTint(0x882d2d);
    this.add
      .image(6052, 4280, 'space', 'purple-planet')
      .setOrigin(0)
      .setScrollFactor(0.6);

    for (let i = 0; i < 8; i++) {
      this.add
        .image(
          Phaser.Math.Between(0, 8000),
          Phaser.Math.Between(0, 6000),
          'space',
          'eyes'
        )
        .setBlendMode(1)
        .setScrollFactor(0.8);
    }

    this.stars = this.add
      .tileSprite(400, 300, 800, 600, 'stars')
      .setScrollFactor(0);

    this.ship = new DevShip(this, 4000, 3000);
    this.cameras.main.startFollow(this.ship);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D');
    this.fire = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.add.sprite(4300, 3000).play('asteroid1-anim');

    this.tweens.add({
      targets: galaxy,
      angle: 360,
      duration: 100000,
      ease: 'Linear',
      loop: -1,
    });
  }

  update(time, delta) {
    const { left, right, up } = this.cursors;

    this.ship.update(time, delta);

    if (left.isDown || this.keys.A.isDown) {
      console.log('left down');
      //this.ship.setAngularVelocity(-150);
      this.ship.turnLeft();
    } else if (right.isDown || this.keys.D.isDown) {
      this.ship.turnRight();
      //this.ship.setAngularVelocity(150);
    } else {
      //this.ship.setAngularVelocity(0);
    }

    if (up.isDown || this.keys.W.isDown) {
      this.ship.forwardThrust();
    } else {
      //this.ship.stopThrusting();
    }

    if (this.fire.isDown && time > this.lastFired) {
      this.ship.FireWeapons(time, delta);
    }

    // this.bg.tilePositionX += this.ship.body.deltaX() * 0.5;
    // this.bg.tilePositionY += this.ship.body.deltaY() * 0.5;

    // this.stars.tilePositionX += this.ship.body.deltaX() * 2;
    // this.stars.tilePositionY += this.ship.body.deltaY() * 2;
  }
}
