import videojs from "video.js";

const Button = videojs.getComponent('Button');

class ZoomButton extends Button {

	constructor(player, options) {
		super(player, options);
	}

	handleClick() {
		videojs.log('handleClick')
	}

}

videojs.registerComponent('ZoomButton', ZoomButton);
