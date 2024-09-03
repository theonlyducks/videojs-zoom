import videojs from "video.js";

import { ZoomFunction } from "./ZoomFunction";
import { Observer } from "./helpers/Observer";

const Component = videojs.getComponent("Component");

export class ZoomGesture extends Component {

	constructor(player, options) {
		super(player, options);
		this._enabled = false;
		this._observer = Observer.getInstance();
		this.pointers = {};
		this.player = player.el();
		this.state = options.state;
		this.function = new ZoomFunction(player, options);
		player.on("loadstart", () => {
			this.gesture();
		});
		this._observer.subscribe('plugin', state => {
			this._enabled = state.enabled;
		});
	}

	gesture() {
		this.player.addEventListener("pointerdown", event => {
			this.pointers[event.pointerId] = event;
		});
		this.player.addEventListener("pointerup", event => {
			delete this.pointers[event.pointerId];
			this.player.firstChild.style.pointerEvents = "";
		});
		// let pinch;
		this.player.addEventListener("pointermove", event => {
			if (!this._enabled) return;
			if (!Object.keys(this.pointers).length) return;
			this.player.firstChild.style.pointerEvents = "none";
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
			if (!this._enabled) return;
			this.function.zoomHandler(-1e-2 * event.deltaY);
			this.function.moveY(0);
			this.function.moveX(0);
		}, {
			passive: true
		});
	}

}
