/* globals __DEV__ */
import Phaser from 'phaser';
import Mushroom from '../sprites/Mushroom';
import config from '../config';

export default class extends Phaser.State {
  init() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }
  preload() {}

  create() {
    this.ground = this.add.sprite(250, 350, 'ground');
    this.game.physics.arcade.enable(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.player = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'player',
      frame: 0
    });
    this.player.animations.add('walking', [0, 4, 5, 0], 6, true);
    this.game.add.existing(this.player);
    this.player.customParams = {};
    this.game.physics.arcade.enable(this.player);
  }

  render() {}

  update() {
    this.game.physics.arcade.collide(this.player, this.ground);

    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -config.runningSpeed;
      this.player.play('walking');
    } else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = config.runningSpeed;
      this.player.play('walking');
    }

    if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
      this.player.body.velocity.y = -config.jumpingSpeed;
      this.player.customParams.mustJump = false;
    }
  }
}
