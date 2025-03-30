// src/game/systems/CollisionSystem.js

class CollisionSystem {
    constructor(scene) {
      this.scene = scene;
      this.colliders = [];
    }
  
    setup({ player, enemies, playerBullets, enemyBullets }) {
      // Store initial objects
      this.player = player;
      this.enemies = enemies;
      this.playerBullets = playerBullets;
      this.enemyBullets = enemyBullets;
  
      // Set up initial colliders
      this.setupColliders();
    }
  
    update({ player, enemies, playerBullets, enemyBullets }) {
      // Update objects
      this.player = player;
      this.enemies = enemies;
      this.playerBullets = playerBullets;
      this.enemyBullets = enemyBullets;
  
      // Remove old colliders
      this.removeColliders();
  
      // Setup new colliders
      this.setupColliders();
    }
  
    setupColliders() {
      // Player bullets hitting enemies
      this.colliders.push(
        this.scene.physics.add.collider(
          this.playerBullets,
          this.enemies,
          this.onPlayerBulletHitEnemy,
          null,
          this
        )
      );
  
      // Enemy bullets hitting player
      this.enemyBullets.forEach(bulletGroup => {
        this.colliders.push(
          this.scene.physics.add.collider(
            this.player,
            bulletGroup,
            this.onEnemyBulletHitPlayer,
            null,
            this
          )
        );
      });
  
      // Player colliding with enemies
      this.colliders.push(
        this.scene.physics.add.collider(
          this.player,
          this.enemies,
          this.onPlayerHitEnemy,
          null,
          this
        )
      );
    }
  
    removeColliders() {
      // Destroy all existing colliders
      this.colliders.forEach(collider => {
        collider.destroy();
      });
      this.colliders = [];
    }
  
    onPlayerBulletHitEnemy(bullet, enemy) {
      // Remove the bullet
      bullet.destroy();
  
      // Damage the enemy
      enemy.takeDamage(bullet.damage || 5);
    }
  
    onEnemyBulletHitPlayer(player, bullet) {
      // Remove the bullet
      bullet.destroy();
  
      // Damage the player
      player.takeDamage();
    }
  
    onPlayerHitEnemy(player, enemy) {
      // Damage the player
      player.takeDamage();
  
      // Damage the enemy
      enemy.takeDamage(10);
    }
  }
  
  export default CollisionSystem;