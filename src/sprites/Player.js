import Phaser from 'phaser';
import config from '../config/config';

export default class Player extends Phaser.Sprite {

  constructor({ game, x, y, asset, frame, health }) {
    super(game, x, y, asset, frame);

    this.game = game;

    this.anchor.setTo(0.5);

    this.health = health;
    this.maxHealth = health;

    this.game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.maxVelocity.setTo(config.maxSpeed, config.maxSpeed * 10);
    this.body.drag.setTo(config.drag, 0);
  }
}
