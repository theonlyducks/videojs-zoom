import videojs from "video.js";

const Component = videojs.getComponent('Component');

import ZoomModalContent from "./ZoomModalContent";

class ZoomModal extends Component {

	constructor(player, options) {
		super(player, options);
		this.state = {
			zoom: 1
		}
		this.player = player;
		this.options = options;
		console.log(this.options);
		videojs.log("Zoom overlay");
		player.on('playing', () => {
			videojs.log('playback began!');
			this.#listeners();
		});
	}

	createEl() {
		const modal = videojs.dom.createEl('div', {
			className: 'vjs-zoom-duck__container'
		});
		const content = new ZoomModalContent();
		modal.innerHTML = content.getContent();
		return modal;
	}

	#listeners() {
		const zoomIn = document.getElementById('vjs-zoom-duck__zoomIn');
		const zoomOut = document.getElementById('vjs-zoom-duck__zoomOut');
		zoomIn.onclick = () => {
			if (this.state.zoom > 8) return;
			this.state.zoom++;
			this.options.plugin.zoom(this.state.zoom);
		}
		zoomOut.onclick = () => {
			if (this.state.zoom < 1) return;
			this.state.zoom--;
			this.options.plugin.zoom(this.state.zoom);
		}
	}

	open() {
		const [ modal ] = document.getElementsByClassName('vjs-zoom-duck__container');
		modal.classList.toggle('open');
	}

}

videojs.registerComponent('ZoomModal', ZoomModal);
