import Phaser from 'phaser';

// Represents a basic bullet fired by the player
class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    // Use a default texture key; this should be loaded in the scene's preload
    super(scene, x, y, 'playerBullet');

    // Basic properties
    this.speed = 600; // Pixels per second
    this.lifespan = 1000; // Milliseconds before self-destructing
    this._timer = null;
  }

  // Called by the Player class when firing
  fire(x, y, rotation) {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setRotation(rotation); // Match player's rotation when fired

    // Calculate velocity based on the player's rotation
    // Note: Phaser's rotation is in radians. 0 is right, -PI/2 is up.
    this.scene.physics.velocityFromRotation(rotation - Math.PI / 2, this.speed, this.body.velocity);

    // Set lifespan timer
    this._timer = this.scene.time.delayedCall(this.lifespan, this.destroySelf, [], this);
  }

  // Optional: Called automatically if this bullet's group has runChildUpdate = true
  update(time, delta) {
    // Could add logic here if needed, e.g., homing behavior later
  }

  // Deactivate and hide the bullet when it expires or hits something
  destroySelf() {
    this.setActive(false);
    this.setVisible(false);
    // Optional: Add particle effects or sound effects on destruction
    if(this._timer) {
        this._timer.remove(false); // Clean up timer if it exists
    }
  }

    // Override preUpdate to check if bullet is out of bounds
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (!this.scene.physics.world.bounds.contains(this.x, this.y)) {
            this.destroySelf();
        }
    }
}

export default Bullet;