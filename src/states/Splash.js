import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    //
    // load your assets
    //
  }

  create () {
    this.state.start('Game')
  }

}
