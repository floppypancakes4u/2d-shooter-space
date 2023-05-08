// Import stylesheets
import './style.css';
import 'phaser';
import { MainScene } from './MainScene.js';

// Write Javascript code!
//const appDiv = document.getElementById('app');
//appDiv.innerHTML = `<h1>JS Starter</h1>`;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'phaser-example',
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  scene: MainScene,
};

const game = new Phaser.Game(config);
