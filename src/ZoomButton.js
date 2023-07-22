import videojs from 'video.js';

const Button = videojs.getComponent('Button');

export class ZoomButton extends Button {

	constructor(player, options) {
		super(player, options);
		player.on('useractive', () => {
			console.log('useractive');
		});
		player.on('userinactive', () => {
			console.log('userinactive');
		});
	}

	buildCSSClass() {
		return `vjs-zoom-duck ${super.buildCSSClass()}`;
	}

	handleClick() {
		videojs.log('[~Zoom Plugin] button handleClick');
		const modal = this.player().getChild('ZoomModal');
		modal.open();
	}

}

