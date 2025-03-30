// src/game/scenes/GameScene.js
import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
    
    // Common game properties
    this.scrollSpeed = 0.5;
    this.score = 0;
    this.isGameOver = false;
  }

  create() {
    // Set up common elements like UI
    this.setupCommonUI();
    
    // Set up keyboard controls
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
    // Event listeners
    this.events.once('shutdown', this.shutdown, this);
  }

  // Play the appropriate music for this level
  playLevelMusic(musicKey) {
    // Stop any currently playing music
    if (this.levelMusic) {
      this.levelMusic.stop();
    }
    
    // Start the new music
    this.levelMusic = this.sound.add(musicKey, { loop: true, volume: 0.4 });
    this.levelMusic.play();
  }

  update(time, delta) {
    // Scroll background (if exists)
    if (this.background) {
      this.background.tilePositionY -= this.scrollSpeed;
    }
    
    // Check for pause
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.pauseGame();
    }
  }

  setupCommonUI() {
    const { width } = this.cameras.main;
    
    // Score text
    this.scoreText = this.add.text(20, 20, 'Score: 0', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    });
    
    // Set up fade transition
    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  pauseGame() {
    this.scene.pause();
    // In a full implementation, this would launch a pause menu scene
    console.log('Game paused');
  }

  gameOver() {
    this.isGameOver = true;
    
    // Show game over UI
    const { width, height } = this.cameras.main;
    
    this.add.text(width / 2, height / 2, 'GAME OVER', {
      fontFamily: 'Arial',
      fontSize: '64px',
      color: '#FF0000',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    this.add.text(width / 2, height / 2 + 80, 'Press ESC to continue', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    
    // Listen for ESC key to restart or return to menu
    this.input.keyboard.once('keydown-ESC', () => {
      this.scene.start('MainMenuScene');
    });
  }

  updateScore(points) {
    this.score += points;
    if (this.scoreText) {
      this.scoreText.setText(`Score: ${this.score}`);
    }
  }

  shutdown() {
    // Stop any playing music
    if (this.levelMusic) {
      this.levelMusic.stop();
    }
    
    // Clean up any resources when scene shuts down
    this.input.keyboard.shutdown();
  }
}

export default GameScene;