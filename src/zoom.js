import videojs from 'video.js';
import packageJson from '../package.json';

const Button = videojs.getComponent('Button');

const zoomPlugin = function (options = {}) {
	this.ready(() => {
		console.log('zoom plugin ', options);
	});
	this.on('playing', function() {
		videojs.log('playback began!');
	});
}

zoomPlugin.VEERSION = packageJson.version;

class ZoomPlugin extends Button {

	constructor(player, options) {
		super(player, options);
		console.log('zoom plugin ', options);
	}

}

videojs.registerComponent('ZoomPlugin', ZoomPlugin);
videojs.registerPlugin('zoomPlugin', zoomPlugin);

export default zoomPlugin;
