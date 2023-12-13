import videojs from 'video.js';
import packageJson from '../package.json';

import { ZoomModal } from './ZoomModal';
import { ZoomGesture } from './ZoomGesture';
import { ZoomButton } from "./ZoomButton";
import { Observer } from "./helpers/Observer";

const { version: VERSION } = packageJson;
const Plugin = videojs.getPlugin('plugin');

const DEFAULT_OPTIONS = {
	zoom: 1,
	moveX: 0,
	moveY: 0,
	flip: "+",
	rotate: 0,
	showZoom: true,
	showMove: true,
	showRotateFlip: true,
	gestureZoomMove: false,
};

class ZoomPlugin extends Plugin {

	constructor(player, options = {}) {
		super(player, options);
		videojs.log('[~Zoom Plugin] start ', options);
		this.player = player.el();
		this.listeners = {
			click: () => { },
			change: () => { },
		};
		this.player.style.overflow = 'hidden';
		this.state = videojs.mergeOptions(DEFAULT_OPTIONS, options);
		this.state.flip = "+";
		if (this.state.showZoom || this.state.showMove || this.state.showRotateFlip) {
			player.getChild('ControlBar').addChild('ZoomButton');
		}
		player.addChild('ZoomModal', { plugin: this, state: this.state });
		player.addChild('ZoomGesture', { plugin: this, state: this.state });
		this._observer = Observer.getInstance();
		this._setTransform();
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

	flip(signal) {
		this.state.flip = signal;
		this._setTransform();
	}

	toggle() {
		const [ modal ] = this.player.getElementsByClassName('vjs-zoom-duck__container');
		modal.classList.toggle('open');
	}

	listen(listener, callback) {
		this.listeners[listener] = callback;
	}

	_notify() {
		this._observer.notify('change', this.state);
	}

	_setTransform() {
		const [ video ] = this.player.getElementsByTagName('video');
		video.style.transform = `
			translate(${this.state.moveX}px, ${this.state.moveY}px) 
			scale(${this.state.flip}${this.state.zoom}, ${this.state.zoom}) 
			rotate(${this.state.rotate}deg)
		`;
		this._notify();
	}

}

ZoomPlugin.defaultState = {};

ZoomPlugin.VERSION = VERSION;

videojs.registerComponent('ZoomModal', ZoomModal);
videojs.registerComponent('ZoomGesture', ZoomGesture);
videojs.registerComponent('ZoomButton', ZoomButton);
videojs.registerPlugin('zoomPlugin', ZoomPlugin);

export default ZoomPlugin;
