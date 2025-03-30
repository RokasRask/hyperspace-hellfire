// src/game/entities/Player.js
import Phaser from 'phaser';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player-ship');
    
    // Add player to the scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    
    // Set up physics body
    this.body.setCollideWorldBounds(true);
    this.setScale(0.8);
    
    // Player stats
    this.speed = 300;
    this.weaponLevel = 1;
    this.lives = 3;
    this.isInvulnerable = false;
    this.invulnerabilityTime = 2000; // in ms
    
    // Shooting properties
    this.bullets = scene.physics.add.group();
    this.lastShot = 0;
    this.fireRate = 200; // ms between shots
    
    // Special attack
    this.specialAttackCharge = 0;
    this.specialAttackMaxCharge = 100;
    this.isUsingSpecialAttack = false;
    
    // Set up controls
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.fireKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.specialKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    
    // Events
    this.on('destroyed', this.onDestroyed, this);
  }

  update(time, delta) {
    // Handle player movement
    this.handleMovement();
    
    // Handle shooting
    this.handleShooting(time);
    
    // Handle special attack
    this.handleSpecialAttack();
    
    // If player is invulnerable, make it flash
    if (this.isInvulnerable) {
      this.alpha = Math.floor(time / 100) % 2 === 0 ? 0.5 : 1;
    } else {
      this.alpha = 1;
    }
  }

  handleMovement() {
    // Reset velocity
    this.setVelocity(0);
    
    // Handle movement based on key presses
    if (this.cursors.left.isDown) {
      this.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(this.speed);
    }
    
    if (this.cursors.up.isDown) {
      this.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      this.setVelocityY(this.speed);
    }
    
    // Normalize diagonal movement speed
    if (this.body.velocity.x !== 0 && this.body.velocity.y !== 0) {
      this.body.velocity.normalize().scale(this.speed);
    }
  }

  handleShooting(time) {
    if (this.fireKey.isDown && time > this.lastShot + this.fireRate) {
      this.shoot();
      this.lastShot = time;
    }
    
    // Update bullets position and destroy if out of bounds
    this.bullets.getChildren().forEach(bullet => {
      if (bullet.y < -50) {
        bullet.destroy();
      }
    });
  }

  shoot() {
    // Create bullet based on weapon level
    switch (this.weaponLevel) {
      case 1: // Basic single shot
        this.createBullet(this.x, this.y - 20);
        break;
      case 2: // Dual shot
        this.createBullet(this.x - 10, this.y - 15);
        this.createBullet(this.x + 10, this.y - 15);
        break;
      case 3: // Triple shot
        this.createBullet(this.x, this.y - 20);
        this.createBullet(this.x - 15, this.y - 10, -0.1);
        this.createBullet(this.x + 15, this.y - 10, 0.1);
        break;
      default:
        this.createBullet(this.x, this.y - 20);
    }
    
    // Play shooting sound effect
    this.scene.sound.play('shoot', { volume: 0.5 });
  }

  createBullet(x, y, velocityX = 0) {
    const bullet = this.bullets.create(x, y, 'player-bullet');
    bullet.setVelocity(velocityX * this.speed, -this.speed * 1.5);
    bullet.setOrigin(0.5);
    bullet.damage = 5 * this.weaponLevel;
    return bullet;
  }

  handleSpecialAttack() {
    if (this.specialKey.isDown && this.specialAttackCharge >= this.specialAttackMaxCharge) {
      this.activateSpecialAttack();
    }
  }

  activateSpecialAttack() {
    if (this.isUsingSpecialAttack) return;
    
    this.isUsingSpecialAttack = true;
    this.specialAttackCharge = 0;
    
    // Create special attack beam effect
    // (This would be more advanced in the full game)
    const beam = this.scene.add.rectangle(
      this.x, 
      this.y - 300, 
      40, 
      600, 
      0x00FFFF, 
      0.7
    );
    beam.setOrigin(0.5, 1);
    
    // Add glow effect
    this.scene.tweens.add({
      targets: beam,
      alpha: { from: 0.7, to: 0.9 },
      width: { from: 40, to: 50 },
      yoyo: true,
      duration: 100,
      repeat: 14
    });
    
    // Play special attack sound
    this.scene.sound.play('special-attack', { volume: 0.7 });
    
    // Remove beam after 3 seconds
    this.scene.time.delayedCall(3000, () => {
      beam.destroy();
      this.isUsingSpecialAttack = false;
    });
  }

  takeDamage() {
    if (this.isInvulnerable) return;
    
    this.lives--;
    
    if (this.lives <= 0) {
      this.destroy();
      return;
    }
    
    // Make player invulnerable for a short time
    this.setInvulnerable();
    
    // Decrease weapon level
    if (this.weaponLevel > 1) {
      this.weaponLevel--;
    }
  }

  setInvulnerable() {
    this.isInvulnerable = true;
    
    this.scene.time.delayedCall(this.invulnerabilityTime, () => {
      this.isInvulnerable = false;
    });
  }

  upgradeWeapon() {
    if (this.weaponLevel < 10) {
      this.weaponLevel++;
    }
  }

  addSpecialCharge(amount) {
    this.specialAttackCharge = Math.min(
      this.specialAttackCharge + amount, 
      this.specialAttackMaxCharge
    );
  }

  onDestroyed() {
    // Handle player death (trigger game over, etc.)
    console.log('Player destroyed!');
    
    // Create explosion effect
    const explosion = this.scene.add.circle(
      this.x, 
      this.y, 
      40, 
      0xFFFFFF, 
      1
    );
    
    this.scene.tweens.add({
      targets: explosion,
      radius: 80,
      alpha: 0,
      duration: 800,
      onComplete: () => explosion.destroy()
    });
    
    // Notify the scene
    this.scene.events.emit('playerDeath');
  }

  getBullets() {
    return this.bullets;
  }
}

export default Player;