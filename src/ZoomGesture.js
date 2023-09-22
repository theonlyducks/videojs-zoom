import videojs from 'video.js';

import { ZoomFunction } from './ZoomFunction';

const Component = videojs.getComponent('Component');

export class ZoomGesture extends Component {

	constructor(player, options) {
		super(player, options);
		this.player = player.el();
		this.state = options.state;
		this.function = new ZoomFunction(player, options);

		this._gesture();
	}

	_gesture() {
		const pointers = {};
		let pinch;
		this.player.addEventListener('pointerdown', e => pointers[e.pointerId] = e);
		this.player.addEventListener('pointerup', e => delete pointers[e.pointerId]);
		this.player.addEventListener('pointermove', e => {
			if (!(pointers[e.pointerId] && this.state.gestureZoomMove)) {
				return;
			}
			const p = pointers[e.pointerId];
			const mx = e.clientX - p.clientX;
			const my = e.clientY - p.clientY;
			pointers[e.pointerId] = e;

			let mz = 0;
			const fingers = Object.values(pointers);
			if (fingers.length < 2) {
				pinch = void 0;
			} else if (!pinch) {
				const [t, i] = fingers;
				pinch = Math.abs(t.clientX - i.clientX);
			} else {
				const [t, i]= fingers;
				const p = Math.abs(t.clientX - i.clientX);
				mz = 1e-2 * (p - pinch);
				pinch = p;
			}

			this.function.zoomIn(mz);
			this.function.moveLeft(mx);
			this.function.moveUp(my);
		});

		this.player.addEventListener('wheel', e => {
			if (!this.state.gestureZoomMove) {
				return;
			}
			this.function.zoomIn(- 1e-2 * e.deltaY);
			this.function.moveLeft(0);
			this.function.moveUp(0);
		});
	}

}
