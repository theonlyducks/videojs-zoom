import videojs from "video.js";

const Button = videojs.getComponent('Button');

class ZoomButton extends Button {

	constructor(player, options) {
		super(player, options);
	}

	buildCSSClass() {
		return `vjs-zoom-duck ${super.buildCSSClass()}`;
	}

	handleClick() {
		videojs.log('Zoom button handleClick');
		this.player().getChild('ZoomModal').open();
	};

}

videojs.registerComponent('ZoomButton', ZoomButton);
