import Phaser from 'phaser';
import Bullet from '../bullets/Bullet'; // Import the Bullet class

// Represents the player ship
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey) {
    super(scene, x, y, textureKey);

    // Add this sprite to the scene's physics engine
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Player properties based on Game Design Doc [cite: 20]
    this.setCollideWorldBounds(true); // Keep player within game bounds
    this.setDrag(300); // Some friction/drag for smoother stopping
    this.setAngularDrag(400);
    this.setMaxVelocity(400); // Max speed

    // Weapon properties
    this.fireRate = 1000; // Milliseconds between shots for Level 1 [cite: 28]
    this.nextFire = 0; // Time tracking for fire rate

    // Assign controls
    this.cursors = scene.input.keyboard.createCursorKeys(); // Arrow keys
    this.fireKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Space bar [cite: 20]

    // Create a group to manage player bullets
    // Bullets need to be created in the scene, so we pass the scene context
    this.bullets = scene.physics.add.group({
        classType: Bullet,
        runChildUpdate: true // Ensures bullets' update() method is called
    });
  }

  update(time, delta) {
    // Movement logic [cite: 20]
    if (this.cursors.left.isDown) {
      this.setAngularVelocity(-150); // Rotate left
    } else if (this.cursors.right.isDown) {
      this.setAngularVelocity(150); // Rotate right
    } else {
      this.setAngularVelocity(0); // Stop rotating
    }

    if (this.cursors.up.isDown) {
      // Move forward in the direction the ship is pointing
      this.scene.physics.velocityFromRotation(this.rotation - Math.PI / 2, 200, this.body.acceleration);
    } else if (this.cursors.down.isDown) {
        // Move backward - optional, can be removed if not desired
        this.scene.physics.velocityFromRotation(this.rotation - Math.PI / 2, -100, this.body.acceleration);
    }
     else {
      this.setAcceleration(0); // Stop accelerating
    }

    // Firing logic [cite: 20, 28]
    if (this.fireKey.isDown && time > this.nextFire) {
      this.fireBullet(time);
    }
  }

  fireBullet(time) {
    const bullet = this.bullets.get(this.x, this.y); // Get inactive bullet or create new

    if (bullet) {
      // Configure and fire the bullet
      bullet.fire(this.x, this.y, this.rotation); // Pass rotation

      // Update next allowed fire time based on fire rate
      this.nextFire = time + this.fireRate;
    }
  }

  // Add methods for taking damage, handling powerups, etc. later
}

export default Player;