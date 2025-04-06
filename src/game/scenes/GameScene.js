import Phaser from 'phaser';
import Player from '../entities/Player'; // Import the Player class

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene'); // Scene key
    this.player = null; // Reference to the player instance
  }

  preload() {
    console.log('GameScene: preload');
    // Load assets needed for the player and bullets
    // IMPORTANT: Replace 'path/to/...' with actual paths from your assets folder [cite: 4, 5]
    // Make sure these assets exist!
    this.load.image('playerShip', 'assets/images/ships/player/player_default.png'); // Example path
    this.load.image('playerBullet', 'assets/images/bullets/player_bullet.png'); // Example path for Level 1 bullet [cite: 28]
  }

  create() {
    console.log('GameScene: create');

    

    // Get game dimensions
    const { width, height } = this.sys.game.config;

    // Create the player instance [cite: 10]
    // Place the player near the bottom-center of the screen
    this.player = new Player(this, width / 2, height - 50, 'playerShip');

    // ** Collision setup (Example - expand later) **
    // If you add enemies later, you'll set up collision detection here:
    // this.physics.add.collider(this.player.bullets, enemyGroup, this.handleBulletEnemyCollision, null, this);
  }

  update(time, delta) {
    // Update the player (handles input and movement)
    if (this.player) {
      this.player.update(time, delta);
    }

    // Other game loop logic (enemy updates, checking win/loss conditions, etc.)
  }

  // Example collision handler (implement later when enemies exist)
  // handleBulletEnemyCollision(bullet, enemy) {
  //   bullet.destroySelf(); // Deactivate bullet on hit
  //   enemy.takeDamage(); // Enemy handles its own damage logic
  // }
}

export default GameScene;