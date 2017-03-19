/* globals __DEV__ */
import Phaser from 'phaser';
import config from '../config';

export default class extends Phaser.State {
  init() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  create() {
    this.map = this.add.tilemap('level1');

    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');

    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');

    this.game.world.sendToBack(this.backgroundLayer);

    this.map.setCollisionBetween(0, 47, true, 'collisionLayer');

    this.collisionLayer.resizeWorld();

    this.player = this.add.sprite(this.world.centerX, this.world.centerY, 'player', 0);
    this.player.animations.add('walking', [0, 1, 2, 0], 12, false);
    this.player.customParams = {};
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.game.camera.follow(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.maxVelocity.setTo(config.maxSpeed, config.maxSpeed * 10);
    this.player.body.drag.setTo(config.drag, 0);

    this.game.physics.arcade.gravity.y = config.gravity;
    this.game.physics.arcade.TILE_BIAS = 40;
  }

  update() {
    this.game.physics.arcade.collide(this.player, this.collisionLayer);

    const onTheGround = this.player.body.blocked.down;

    if (onTheGround) {
      this.jumps = 2;
      this.jumping = false;
    }

    if (this.jumps > 0 && this.upInputIsActive(5)) {
      this.playJumpAnimation();
      this.player.body.velocity.y = config.jumpSpeed;
      this.jumping = true;
    }

    if (this.jumping && this.upInputReleased()) {
      this.jumps = this.jumps - 1;
      this.jumping = false;
    }

    if (this.cursors.left.isDown) {
      this.player.scale.setTo(-1, 1);
      this.player.play('walking');
      this.player.body.acceleration.x = -config.acceleration;
    } else if (this.cursors.right.isDown) {
      this.player.scale.setTo(1, 1);
      this.player.play('walking');
      this.player.body.acceleration.x = config.acceleration;
    } else {
      this.player.body.acceleration.x = 0;
    }
  }

  playJumpAnimation() {
    this.player.animations.stop();
    this.player.frame = 4;
  }

  upInputReleased() {
    let released = false;

    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP) ||
               this.game.input.activePointer.justReleased();

    return released;
  }

  upInputIsActive(duration) {
    let isActive = false;

    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration) ||
              (this.game.input.activePointer.justPressed(duration + (1000 / 60)) &&
              this.game.input.activePointer.x > this.game.width / 4 &&
              this.game.input.activePointer.x < (this.game.width / 2) + (this.game.width / 4));

    return isActive;
  }
}
