// src/game/scenes/scenes/Level1.js
import Phaser from 'phaser';
import Player from '../../entities/Player';
import Enemy from '../../entities/enemies/Enemy';
import CollisionSystem from '../../systems/CollisionSystem';

class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1');
    
    // Level properties
    this.scrollSpeed = 0.5;
    this.enemySpawnTime = 0;
    this.enemySpawnRate = 2000; // ms between enemy spawns
    this.enemiesSpawned = 0;
    this.totalEnemies = 20; // Start with a small number for testing
    
    // Score and status
    this.score = 0;
    this.isGameOver = false;
  }

  create() {
    // Set up background
    const { width, height } = this.cameras.main;
    this.background = this.add.tileSprite(0, 0, width, height * 2, 'space-bg')
      .setOrigin(0, 0)
      .setScrollFactor(0);
    
    // Create player
    this.player = new Player(this, width / 2, height - 100);
    
    // Setup collision detection
    this.collisionSystem = new CollisionSystem(this);
    this.collisionSystem.setup({
      player: this.player,
      enemies: this.enemies,
      playerBullets: this.player.getBullets(),
      enemyBullets: []
    });
    
    // Create enemy group
    this.enemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true,
    });
    
    // Set up UI elements
    this.setupUI();
    
    // Set up event listeners
    this.events.on('enemyDestroyed', this.onEnemyDestroyed, this);
    this.events.on('playerDeath', this.onPlayerDeath, this);
    
    // Set up keyboard controls
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    
    // Start the level music
    this.levelMusic = this.sound.add('level1-music', { loop: true, volume: 0.4 });
    this.levelMusic.play();
  }

  update(time, delta) {
    if (this.isGameOver) return;
    
    // Scroll background
    this.background.tilePositionY -= this.scrollSpeed;
    
    // Update player
    this.player.update(time, delta);
    
    // Spawn enemies
    this.updateEnemySpawning(time);
    
    // Update collision system
    this.updateCollisions();
    
    // Check for pause
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      // This would normally open a pause menu
      console.log('Game paused');
    }
    
    // Check if level is complete
    if (this.enemiesSpawned >= this.totalEnemies && this.enemies.getChildren().length === 0) {
      this.levelComplete();
    }
  }

  setupUI() {
    const { width, height } = this.cameras.main;
    
    // Add score text
    this.scoreText = this.add.text(20, 20, 'Score: 0', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    });
    
    // Add lives display
    this.livesText = this.add.text(width - 120, 20, 'Lives: 3', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff'
    });
    
    // Add special attack meter
    this.specialMeterBg = this.add.rectangle(width / 2, 30, 200, 20, 0x222222);
    this.specialMeter = this.add.rectangle(width / 2 - 98, 30, 0, 16, 0x00FFFF).setOrigin(0, 0.5);
    
    this.add.text(width / 2, 10, 'SPECIAL', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#ffffff'
    }).setOrigin(0.5);
  }

  updateEnemySpawning(time) {
    if (time > this.enemySpawnTime && this.enemiesSpawned < this.totalEnemies) {
      this.spawnEnemy();
      this.enemySpawnTime = time + this.enemySpawnRate;
    }
  }

  spawnEnemy() {
    const { width } = this.cameras.main;
    const x = Phaser.Math.Between(50, width - 50);
    
    // Create enemy with different movement patterns based on spawn count
    let config = {
      speed: Phaser.Math.Between(50, 150),
      health: 10,
      scoreValue: 10
    };
    
    if (this.enemiesSpawned % 5 === 0) {
      // Every 5th enemy moves in a sine wave
      config.movementPattern = 'sine';
      config.patternParams = {
        amplitude: Phaser.Math.Between(50, 100),
        frequency: 0.002
      };
    } else if (this.enemiesSpawned % 7 === 0) {
      // Every 7th enemy moves in a circle
      config.movementPattern = 'circle';
      config.patternParams = {
        radius: Phaser.Math.Between(30, 70),
        speed: 0.001
      };
    } else if (this.enemiesSpawned % 3 === 0) {
      // Every 3rd enemy zigzags
      config.movementPattern = 'zigzag';
      config.patternParams = {
        xSpeed: Phaser.Math.Between(30, 60)
      };
    }
    
    // Create the enemy
    const enemy = new Enemy(this, x, -50, 'drone-enemy', config);
    this.enemies.add(enemy);
    
    this.enemiesSpawned++;
  }

  updateCollisions() {
    // Update the collection of enemy bullets
    const enemyBullets = [];
    this.enemies.getChildren().forEach(enemy => {
      enemyBullets.push(enemy.getBullets());
    });
    
    // Update the collision system
    this.collisionSystem.update({
      player: this.player,
      enemies: this.enemies,
      playerBullets: this.player.getBullets(),
      enemyBullets
    });
  }

  onEnemyDestroyed(data) {
    // Update score
    this.score += data.scoreValue;
    this.scoreText.setText(`Score: ${this.score}`);
    
    // Increase special attack meter
    const specialChargeAmount = 5; // Each enemy gives 5% charge
    this.player.addSpecialCharge(specialChargeAmount);
    
    // Update the meter visual
    const meterWidth = (this.player.specialAttackCharge / this.player.specialAttackMaxCharge) * 196;
    this.specialMeter.width = meterWidth;
    
    // Check for powerup drop
    if (Math.random() < data.powerUpDropChance) {
      this.spawnPowerUp(data.x, data.y);
    }
  }

  spawnPowerUp(x, y) {
    // In a full implementation, this would create a power-up entity
    // For now, we'll just upgrade the player's weapon directly
    this.player.upgradeWeapon();
    
    // Visual feedback
    const powerupEffect = this.add.circle(x, y, 15, 0xFFFF00, 1);
    this.tweens.add({
      targets: powerupEffect,
      radius: 30,
      alpha: 0,
      duration: 500,
      onComplete: () => powerupEffect.destroy()
    });
    
    // Play power-up sound
    this.sound.play('powerup', { volume: 0.6 });
  }

  onPlayerDeath() {
    this.isGameOver = true;
    
    // Stop level music
    if (this.levelMusic) {
      this.levelMusic.stop();
    }
    
    // Play a big explosion sound
    this.sound.play('explosion', { volume: 0.8 });
    
    // Show game over text
    const { width, height } = this.cameras.main;
    this.add.text(width / 2, height / 2, 'GAME OVER', {
      fontFamily: 'Arial',
      fontSize: '64px',
      color: '#FF0000',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    // Add restart button
    const restartButton = this.add.rectangle(width / 2, height / 2 + 80, 200, 50, 0x222222)
      .setInteractive()
      .on('pointerdown', () => this.scene.restart());
    
    this.add.text(width / 2, height / 2 + 80, 'RESTART', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    
    // Add return to main menu button
    const menuButton = this.add.rectangle(width / 2, height / 2 + 140, 200, 50, 0x222222)
      .setInteractive()
      .on('pointerdown', () => {
        this.sound.stopAll();
        this.scene.start('MainMenuScene');
      });
    
    this.add.text(width / 2, height / 2 + 140, 'MAIN MENU', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
  }

  levelComplete() {
    const { width, height } = this.cameras.main;
    this.isGameOver = true;
    
    // Show level complete text
    this.add.text(width / 2, height / 2, 'LEVEL COMPLETE!', {
      fontFamily: 'Arial',
      fontSize: '48px',
      color: '#00FF00',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);
    
    // In a full game, this would progress to the next level
    // For now, we'll just have a "continue" button that restarts
    const continueButton = this.add.rectangle(width / 2, height / 2 + 80, 200, 50, 0x222222)
      .setInteractive()
      .on('pointerdown', () => this.scene.restart());
    
    this.add.text(width / 2, height / 2 + 80, 'CONTINUE', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#FFFFFF'
    }).setOrigin(0.5);
  }
}

export default Level1;