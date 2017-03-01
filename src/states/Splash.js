import Phaser from 'phaser';

export default class extends Phaser.State {
  init() {}

  preload() {
    //
    // load your assets
    //
  }

  create() {
    this.state.start('Game');
  }

}
