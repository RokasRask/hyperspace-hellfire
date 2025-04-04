import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
// Potentially import BootScene and PreloadScene later [cite: 8]

// Basic Phaser Game Configuration
const config = {
  type: Phaser.AUTO, // Automatically choose WebGL or Canvas
  width: 800,        // Set your desired game width
  height: 600,       // Set your desired game height
  parent: 'game-container', // ID of the div where the canvas will be injected
  physics: {
    default: 'arcade', // Using Arcade Physics engine
    arcade: {
      // gravity: { y: 0 }, // Top-down shooter typically doesn't need gravity
      debug: false // Set to true for debugging physics bodies
    }
  },
  scene: [
    // Add BootScene, PreloadScene here first when you create them
    GameScene // Start with the main game scene for now [cite: 8]
  ]
};

// Function to launch the game
const launch = (containerId) => {
  // Ensure the containerId matches the 'parent' in the config
  config.parent = containerId;
  const game = new Phaser.Game(config);
  return game;
};

export default launch;
export { launch }; // Export the launch function