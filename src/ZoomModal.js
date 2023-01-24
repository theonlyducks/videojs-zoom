import videojs from 'video.js';

import { ZoomFunction } from './ZoomFunction';
import { ZoomModalContent } from './ZoomModalContent';

const Component = videojs.getComponent('Component');

export class ZoomModal extends Component {

	constructor(player, options) {
		super(player, options);
		this.player = player;
		this.options = options;
		console.log(options);
		this.function = new ZoomFunction(player, options);
		player.on('playing', () => {
			this.listeners();
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

	listeners() {
		let buttons = this.player.el().getElementsByClassName('vjs-zoom-duck__button');
		buttons = Array.from(buttons);
		buttons.map(button => {
			const [, action] = button.id.split('__');
			button.onclick = () => this.function[action]();
		});
	}

	open() {
		const [ modal ] = this.player.el().getElementsByClassName('vjs-zoom-duck__container');
		modal.classList.toggle('open');
	}

}
