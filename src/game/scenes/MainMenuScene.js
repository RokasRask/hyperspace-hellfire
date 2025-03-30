// src/game/scenes/MainMenuScene.js
import Phaser from 'phaser';

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create() {
    // Set up background
    const { width, height } = this.cameras.main;
    this.add.tileSprite(0, 0, width, height * 2, 'space-bg')
      .setOrigin(0, 0)
      .setScrollFactor(0);
    
    // Add game title
    this.add.image(width / 2, height / 4, 'logo');
    
    // Add start button
    const startButton = this.add.image(width / 2, height / 2, 'button')
      .setInteractive()
      .on('pointerover', () => startButton.setTint(0xdddddd))
      .on('pointerout', () => startButton.clearTint())
      .on('pointerdown', () => this.startGame());
    
    this.add.text(startButton.x, startButton.y, 'START GAME', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // Add scrolling background effect
    this.backgroundScroll = { y: 0 };
    
    // Audio will be added later
    this.menuMusic = null;
  }

  update() {
    // Scroll the background for a parallax effect
    const background = this.children.list.find(child => child.type === 'TileSprite');
    
    if (background) {
      this.backgroundScroll.y += 0.5;
      background.tilePositionY = this.backgroundScroll.y;
    }
  }

  startGame() {
    // Start the game
    this.scene.start('Level1');
  }
}

export default MainMenuScene;