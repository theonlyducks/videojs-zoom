import videojs from 'video.js';

const Plugin = videojs.getPlugin('plugin');

class ZoomPlugin extends Plugin {

	static defaultOptions = {
		zoom: 1,
		moveX: 0,
		moveY: 0,
		rotate: 0
	};

	constructor(player, options) {
		super(player, options);
		videojs.log('zoom plugin start ', options);
		this.player = player.el();
		this.player.style.overflow = 'hidden';
		this.state = videojs.mergeOptions(ZoomPlugin.defaultOptions, options);
		player.getChild('ControlBar').addChild('ZoomButton');
		player.on('playing', () => {
			videojs.log('playback began!');
		});
	}

	zoom(value) {
		if (value <= 0) {
			throw new Error('');
		}
		this.state.zoom = value;
		this.#setTransform();
	}

	rotate(value) {
		this.state.rotate = value;
		this.#setTransform();
	}

	move(x, y) {
		this.state.moveX = x;
		this.state.moveY = y;
		this.#setTransform();
	}

	reset() {
		this.state = ZoomPlugin.defaultOptions;
		this.#setTransform();
	}

	#setTransform() {
		const [ video ] = this.player.getElementsByTagName('video');
		video.style.transform = `
			scale(${this.state.zoom}) 
			rotate(${this.state.rotate}deg)
			translate(${this.state.moveX}px, ${this.state.moveY}px) 
		`;
	}

}

videojs.registerPlugin('zoomPlugin', ZoomPlugin);
