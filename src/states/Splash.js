import Phaser from 'phaser';

export default class extends Phaser.State {
  init() {}

  preload() {
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.spritesheet('player', 'assets/images/player.png', 62, 100, 60, 0, 6);
  }

  create() {
    this.state.start('Game');
  }

}
