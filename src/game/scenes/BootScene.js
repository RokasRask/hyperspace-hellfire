// src/game/scenes/BootScene.js
import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Create loading graphics
    this.createLoadingBar();

    // Load initial assets needed for the loading screen
    this.load.image('space-bg', 'https://via.placeholder.com/800x1600/000020/000000');
    this.load.image('logo', 'https://via.placeholder.com/400x100/FF0000/FFFFFF?text=Hyperspace+Hellfire');
  }

  create() {
    this.scene.start('PreloadScene');
  }

  createLoadingBar() {
    // Create a loading bar container
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    // Loading background
    const progressBarBg = this.add.rectangle(width / 2, height / 2, 400, 30, 0x222222);
    
    // Loading progress bar
    const progressBar = this.add.rectangle(
      width / 2 - 195, 
      height / 2, 
      390, 
      20, 
      0xFF0000
    ).setOrigin(0, 0.5);
    
    // Loading text
    const loadingText = this.add.text(
      width / 2, 
      height / 2 - 50, 
      'Loading...', 
      { font: '20px Arial', fill: '#ffffff' }
    ).setOrigin(0.5);
    
    // Set up progress bar animation
    this.load.on('progress', (value) => {
      progressBar.width = 390 * value;
    });
    
    // Clean up after loading completes
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBarBg.destroy();
      loadingText.destroy();
    });
  }
}

export default BootScene;