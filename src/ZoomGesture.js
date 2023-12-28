import videojs from "video.js";

import { ZoomFunction } from "./ZoomFunction";

const Component = videojs.getComponent("Component");

export class ZoomGesture extends Component {

	constructor(player, options) {
		super(player, options);
		this.pointers = {};
		this.player = player.el();
		this.state = options.state;
		this.function = new ZoomFunction(player, options);
		player.on("playing", () => {
			this.gesture();
		});
	}

	gesture() {
		this.player.addEventListener("pointerdown", event => {
			this.pointers[event.pointerId] = event;
		});
		this.player.addEventListener("pointerup", event => {
			delete this.pointers[event.pointerId];
		});
		// let pinch;
		this.player.addEventListener("pointermove", event => {
			if (!Object.keys(this.pointers).length) return;
			const pointer = this.pointers[event.pointerId];
			const moveX = event.clientX - pointer.clientX;
			const moveY = event.clientY - pointer.clientY;
			this.pointers[event.pointerId] = event;
			// let moveZ = 0;
			// const fingers = Object.values(this.pointers);
			// if (fingers.length < 2) {
			// 	console.log('a')
			// 	pinch = void 0;
			// } else if (!pinch) {
			// 	console.log('b')
			// 	const [ t, i ] = fingers;
			// 	pinch = Math.abs(t.clientX - i.clientX);
			// } else {
			// 	console.log('c')
			// 	const [ t, i ] = fingers;
			// 	const p = Math.abs(t.clientX - i.clientX);
			// 	moveZ = 1e-2 * (p - pinch);
			// 	pinch = p;
			// }
			// this.function.zoomHandler(moveZ);
			this.function.moveY(moveX);
			this.function.moveX(moveY);
		});
		this.player.addEventListener("wheel", event => {
			this.function.zoomHandler(-1e-2 * event.deltaY);
			this.function.moveY(0);
			this.function.moveX(0);
		});
	}

}
