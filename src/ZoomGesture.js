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
		this.isDragging = false;
		this.function = new ZoomFunction(player, options);
		player.on("loadstart", () => {
			this.gesture();
		});
		this._observer.subscribe('plugin', state => {
			this._enabled = state.enabled;
		});
		this.handleWheel = this.handleWheel.bind(this);
		this.handlePointerMove = this.handlePointerMove.bind(this);
	}

	handlePointerMove(event) {
		if (!this._enabled || !this.isDragging) return;
		if (!Object.keys(this.pointers).length) return;
		const pointer = this.pointers[event.pointerId];
		const moveX = event.clientX - pointer.clientX;
		const moveY = event.clientY - pointer.clientY;
		this.pointers[event.pointerId] = event;
		this.function.moveY(moveX);
		this.function.moveX(moveY);
	}

	handleWheel(event) {
		event.stopPropagation();
		if (!this._enabled) return;
		this.function.zoomHandler(-1e-2 * event.deltaY);
		this.function.moveY(0);
		this.function.moveX(0);
	}

	gesture() {
		this.player.addEventListener("pointerdown", event => {
			this.pointers[event.pointerId] = event;
			this.isDragging = true;
		});
		this.player.addEventListener("pointerup", event => {
			delete this.pointers[event.pointerId];
			this.isDragging = false;
		});
		this.player.addEventListener("pointermove", this.handlePointerMove);
		this.player.addEventListener("wheel", this.handleWheel, { passive: true });
		this.player.addEventListener("pointerleave", () => {
			this.isDragging = false;
			this.player.removeEventListener("pointermove", this.handlePointerMove);
		});
		this.player.addEventListener("pointerenter", () => {
			this.player.addEventListener("pointermove", this.handlePointerMove);
		});
	}
}
