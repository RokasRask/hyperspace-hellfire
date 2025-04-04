import Phaser from 'phaser';

// We'll need the Bullet class later for firing
// import Bullet from '../bullets/Bullet';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey = 'playerShip') {
    super(scene, x, y, textureKey);

    // Add this sprite to the scene's physics engine
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Player Properties based on Game Design
    this.speed = 300; // Adjust as needed
    this.lives = 3; //
    this.weaponLevel = 1; // Starts at level 1
    this.fireRate = 1000; // Milliseconds between shots for Level 1 weapon
    this.lastFired = 0; // Timer for fire rate control
    // Set collision properties
    this.setCollideWorldBounds(true); // Keep player within game bounds
    this.body.onWorldBounds = true; // Enable world bounds collision event

    // Maybe set a smaller hitbox if desired, otherwise uses full sprite
    // this.body.setSize(width, height).setOffset(x, y);

    console.log('Player created');
  }

  // --- Movement Methods ---
  moveLeft() {
    this.setVelocityX(-this.speed);
  }

  moveRight() {
    this.setVelocityX(this.speed);
  }

  moveUp() {
    this.setVelocityY(-this.speed);
  }

  moveDown() {
    this.setVelocityY(this.speed);
  }

  stopMoving() {
    this.setVelocityX(0);
    this.setVelocityY(0);
    // Optional: Add slight drag/friction if needed
    // this.setDrag(0.9);
  }

  // --- Firing Method ---
  fire(time) {
     // Check fire rate
     if (time > this.lastFired) {
        console.log("Player fires!"); // Placeholder for actual firing
        // --- Add Bullet Creation Logic Here ---
        // Example:
        // const bullet = new Bullet(this.scene, this.x, this.y - (this.height / 2));
        // bullet.fire(this.x, this.y - this.height); // Pass target or direction if needed

        this.lastFired = time + this.fireRate;
     }
  }

  // --- Damage/Death ---
  takeHit() {
      this.lives--;
      console.log(`Player hit! Lives remaining: ${this.lives}`);
      // Reset weapon level
      if (this.weaponLevel > 1) {
          this.weaponLevel--;
          console.log(`Weapon level decreased to: ${this.weaponLevel}`);
          // Update fireRate based on new weaponLevel (to be implemented)
      }

      if (this.lives <= 0) {
          this.die();
      } else {
          // Add brief invulnerability/flashing effect after hit?
          // Respawn logic might happen in the scene
      }
  }

  die() {
      console.log("Player has died. Game Over logic needed.");
      // Trigger game over sequence in the scene
      this.setActive(false);
      this.setVisible(false);
      // Optional: Add explosion animation/sound
  }

  // --- Pre-update hook (called automatically by Phaser) ---
  preUpdate(time, delta) {
      super.preUpdate(time, delta);
      // Any frame-by-frame updates specific to the player
  }
}

export default Player;