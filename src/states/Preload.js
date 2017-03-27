import Phaser from 'phaser';

export default class extends Phaser.State {

  preload() {
    this.load.image('ground', 'assets/images/ground.png');
    this.load.spritesheet('player', 'assets/images/player.png', 76, 100, 60, 1, 0);
    this.load.image('gameTiles', 'assets/images/sheet.png');
    this.load.tilemap('level1', 'assets/levels/demo-level.json', null, Phaser.Tilemap.TILED_JSON);
  }

  create() {
    this.state.start('Play');
  }

}
