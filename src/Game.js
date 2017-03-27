import Phaser from 'phaser';

import * as states from './states';
import config from './config';

export default class Game extends Phaser.Game {

  constructor() {
    const docElement = document.documentElement;
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

    super(width, height, Phaser.AUTO, 'content', null);

    Object.keys(states).forEach(state => this.state.add(state, states[state]));

    this.state.start('Boot');
  }
}
