import videojs from 'video.js';
import packageJson from '../package.json';

const {version: VERSION} = packageJson;

const Plugin = videojs.getPlugin('plugin');

const DEFAULT_OPTIONS = {
  zoom: 1,
  moveX: 0,
  moveY: 0,
  rotate: 0
};

class ZoomPlugin extends Plugin {

  constructor(player, options = {}) {
    super(player, options);
    this.player = player.el();
    this.callback = () => {};
    this.player.style.overflow = 'hidden';
    this.state = videojs.mergeOptions(DEFAULT_OPTIONS, options);
    videojs.log('zoom plugin start ', options);
    player.getChild('ControlBar').addChild('ZoomButton');
    player.addChild('ZoomModal', {plugin: this});
  }

  zoom(value) {
    if (value <= 0) {
      throw new Error('Zoom value invalid');
    }
    this.state.zoom = value;
    this._setTransform();
  }

  rotate(value) {
    this.state.rotate = value;
    this._setTransform();
  }

  move(x, y) {
    this.state.moveX = x;
    this.state.moveY = y;
    this._setTransform();
  }

  onchange(callback) {
    this.callback = callback;
  }

  _setTransform() {
    const [video] = this.player.getElementsByTagName('video');

    video.style.transform = `
			translate(${this.state.moveX}px, ${this.state.moveY}px) 
			scale(${this.state.zoom}) 
			rotate(${this.state.rotate}deg)
		`;
  }

}

ZoomPlugin.VERSION = VERSION;

videojs.registerPlugin('zoomPlugin', ZoomPlugin);
export default ZoomPlugin;
