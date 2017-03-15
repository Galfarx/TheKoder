/* globals __DEV__ */
import Phaser from 'phaser';
import Mushroom from '../sprites/Mushroom';
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
    this.player.animations.add('jump', [0, 4, 0], 1, false);
    this.player.customParams = {};
    this.game.physics.arcade.enable(this.player);
    this.game.camera.follow(this.player);
  }

  render() {}

  update() {
    this.game.physics.arcade.collide(this.player, this.collisionLayer);

    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking');
    } else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1);
      this.player.play('walking');
    } else {
      this.player.animations.stop();
      this.player.frame = 3;
    }

    if ((this.cursors.up.isDown || this.player.customParams.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
    }
  }

  playJumpAnimation() {
    this.player.animations.stop();
    this.player.frame = 4;
  }
}
