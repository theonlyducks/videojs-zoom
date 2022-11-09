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
		let buttons = document.getElementsByClassName('vjs-zoom-duck__button');
		buttons = Array.from(buttons);
		buttons.map(button => {
			const [ _, action ] = button.id.split('__');
			button.onclick = () => this.#functions(action);
		})
	}

	#functions(action) {
		console.log(action);
	}

	open() {
		const [ modal ] = document.getElementsByClassName('vjs-zoom-duck__container');
		modal.classList.toggle('open');
	}

}

videojs.registerComponent('ZoomModal', ZoomModal);
