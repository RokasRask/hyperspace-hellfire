// src/game/entities/enemies/Enemy.js
import Phaser from 'phaser';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config = {}) {
    super(scene, x, y, texture);
    
    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Default properties
    this.health = config.health || 10;
    this.speed = config.speed || 100;
    this.scoreValue = config.scoreValue || 10;
    this.bulletSpeed = config.bulletSpeed || 200;
    this.fireRate = config.fireRate || 2000; // ms between shots
    this.powerUpDropChance = config.powerUpDropChance || 0.05; // 5% chance
    
    // Set up bullets
    this.bullets = scene.physics.add.group();
    this.lastShot = 0;
    
    // Movement pattern properties
    this.movementPattern = config.movementPattern || 'straight';
    this.patternParams = config.patternParams || {};
    this.startX = x;
    this.startY = y;
    this.movementTime = 0;
    
    // Set properties based on movement pattern
    if (this.movementPattern === 'sine') {
      this.patternParams = {
        amplitude: this.patternParams.amplitude || 100,
        frequency: this.patternParams.frequency || 0.002,
        ...this.patternParams
      };
    } else if (this.movementPattern === 'circle') {
      this.patternParams = {
        radius: this.patternParams.radius || 50,
        speed: this.patternParams.speed || 0.001,
        ...this.patternParams
      };
    }
  }

  update(time, delta) {
    // Update movement
    this.updateMovement(time, delta);
    
    // Handle shooting
    this.updateShooting(time);
    
    // Check if enemy is off-screen and should be destroyed
    this.checkBounds();
  }

  updateMovement(time, delta) {
    this.movementTime += delta;
    
    switch (this.movementPattern) {
      case 'straight':
        this.y += this.speed * (delta / 1000);
        break;
        
      case 'sine':
        this.y += this.speed * (delta / 1000);
        this.x = this.startX + Math.sin(this.movementTime * this.patternParams.frequency) * this.patternParams.amplitude;
        break;
        
      case 'circle':
        const angle = this.movementTime * this.patternParams.speed;
        this.x = this.startX + Math.cos(angle) * this.patternParams.radius;
        this.y = this.startY + Math.sin(angle) * this.patternParams.radius + (this.speed * (delta / 1000));
        break;
        
      case 'zigzag':
        this.y += this.speed * (delta / 1000);
        
        if (Math.floor(this.y / 50) % 2 === 0) {
          this.x += (this.patternParams.xSpeed || 1) * (delta / 1000);
        } else {
          this.x -= (this.patternParams.xSpeed || 1) * (delta / 1000);
        }
        break;
        
      default:
        this.y += this.speed * (delta / 1000);
    }
  }

  updateShooting(time) {
    if (time > this.lastShot + this.fireRate) {
      this.shoot();
      this.lastShot = time;
    }
    
    // Update bullets
    this.bullets.getChildren().forEach(bullet => {
      // Remove bullets that are off screen
      if (bullet.y > this.scene.game.config.height + 50) {
        bullet.destroy();
      }
    });
  }

  shoot() {
    // Create a bullet
    const bullet = this.bullets.create(this.x, this.y + 20, 'enemy-bullet');
    bullet.setVelocity(0, this.bulletSpeed);
    bullet.setOrigin(0.5);
  }

  checkBounds() {
    // Destroy if off screen
    const margin = 50;
    if (
      this.y > this.scene.game.config.height + margin ||
      this.y < -margin ||
      this.x > this.scene.game.config.width + margin ||
      this.x < -margin
    ) {
      this.destroy();
    }
  }

  takeDamage(amount) {
    this.health -= amount;
    
    // Flash the enemy when hit
    this.scene.tweens.add({
      targets: this,
      alpha: 0.5,
      duration: 50,
      yoyo: true
    });
    
    if (this.health <= 0) {
      this.destroy();
    }
  }

  onDestroy() {
    // This will be called when the enemy is destroyed
    
    // Create explosion
    const explosion = this.scene.add.circle(
      this.x, 
      this.y, 
      20, 
      0xFF0000, 
      1
    );
    
    this.scene.tweens.add({
      targets: explosion,
      radius: 40,
      alpha: 0,
      duration: 400,
      onComplete: () => explosion.destroy()
    });
    
    // Emit an event that the enemy was destroyed
    this.scene.events.emit('enemyDestroyed', {
      x: this.x,
      y: this.y,
      type: this.constructor.name,
      scoreValue: this.scoreValue,
      powerUpDropChance: this.powerUpDropChance
    });
  }

  destroy() {
    // Call onDestroy before actually destroying the object
    this.onDestroy();
    
    // Destroy all bullets from this enemy
    this.bullets.destroy(true);
    
    // Call parent's destroy
    super.destroy();
  }

  getBullets() {
    return this.bullets;
  }
}

export default Enemy;