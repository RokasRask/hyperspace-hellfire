// src/game/scenes/PreloadScene.js
import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Load player assets
    this.load.image('player-ship', 'https://via.placeholder.com/64x64/00FFFF/000000?text=PLAYER');
    this.load.image('player-bullet', 'https://via.placeholder.com/8x16/00FFFF/000000');
    
    // Load enemy assets
    this.load.image('drone-enemy', 'https://via.placeholder.com/32x32/FF0000/000000?text=DRONE');
    this.load.image('enemy-bullet', 'https://via.placeholder.com/8x8/FF0000/000000');
    
    // Load power-up assets
    this.load.image('powerup-weapon', 'https://via.placeholder.com/24x24/FFFF00/000000?text=W');
    
    // Load UI assets
    this.load.image('button', 'https://via.placeholder.com/200x50/444444/FFFFFF');
    
    // Load audio assets
    // Sound effects
    this.load.audio('shoot', ['assets/audio/sfx/weapons/player_shoot.mp3']);
    this.load.audio('enemy-shoot', ['assets/audio/sfx/weapons/enemy_shoot.mp3']);
    this.load.audio('explosion', ['assets/audio/sfx/explosions/explosion.mp3']);
    this.load.audio('powerup', ['assets/audio/sfx/powerups/powerup.mp3']);
    this.load.audio('special-attack', ['assets/audio/sfx/weapons/special_attack.mp3']);
    
    // Music
    this.load.audio('title-music', ['assets/audio/music/title.mp3']);
    this.load.audio('level1-music', ['assets/audio/music/level1-3.mp3']);
    
    // Display the logo during loading
    const { width, height } = this.cameras.main;
    this.add.image(width / 2, height / 3, 'logo');
    
    // Add loading text
    const loadingText = this.add.text(
      width / 2, 
      height / 2 + 50, 
      'Loading Game Assets...', 
      { font: '16px Arial', fill: '#ffffff' }
    ).setOrigin(0.5);
  }

  create() {
    // Once loading is complete, show title screen
    this.scene.start('MainMenuScene');
  }
}

export default PreloadScene;