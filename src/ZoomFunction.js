import { Observer } from "./helpers/Observer";

export const ZOOM_SALT = 0.2;

export class ZoomFunction {

	constructor(player, options) {
		this.player = player.el();
		this.plugin = options.plugin;
		this.observer = Observer.getInstance();
		player.on('playing', () => {
			this._updateSalt();
		});
		this.observer.subscribe('change', state => {
			this.state = { ...state, saltMoveX: 70, saltMoveY: 70 };
			this._updateSalt();
		});
	}

	_updateSalt() {
		this.state.saltMoveX = (this.player.offsetWidth * ZOOM_SALT) / 2;
		this.state.saltMoveY = (this.player.offsetHeight * ZOOM_SALT) / 2;
	}

	_zoom() {
		this.plugin.zoom(this.state.zoom);
		this.plugin.listeners.change(this.state);
	}

	zoomIn(salt) {
		this.state.zoom = Math.max(1, Math.min(9.8, this.state.zoom + (salt ?? ZOOM_SALT)));
		this.plugin.zoom(this.state.zoom);
		this.plugin.listeners.change(this.state);
	}

	zoomOut() {
		this.state.zoom = Math.max(1, this.state.zoom - ZOOM_SALT);
		this.plugin.zoom(this.state.zoom);
		this.plugin.move(0, 0);
		this.plugin.listeners.change(this.state);
	}

	_move() {
		this.plugin.move(this.state.moveX, this.state.moveY);
		this.plugin.listeners.change(this.state);
	}

	moveUp(salt) {
		const available = this.player.offsetHeight * this.available;
		this.state.moveY = Math.max(- available, Math.min(available, this.state.moveY + (salt ?? this.state.saltMoveY)));
		this._move();
	}

	moveDown() {
		const available = this.player.offsetHeight * this.available;
		this.state.moveY = Math.max(- available, this.state.moveY - this.state.saltMoveY);
		this._move();
	}

	reset() {
		this.state.zoom = 1;
		this.state.moveX = 0;
		this.state.moveY = 0;
		this.state.rotate = 0;
		this.plugin.zoom(1);
		this.plugin.flip("+");
		this.plugin.rotate(0);
		this.plugin.move(0, 0);
		this.plugin.listeners.change(this.state);
	}

	moveLeft(salt) {
		const available = this.player.offsetWidth * this.available;
		this.state.moveX = Math.max(- available, Math.min(available, this.state.moveX + (salt ?? this.state.saltMoveX)));
		this._move();
	}

	moveRight() {
		const available = this.player.offsetWidth * this.available;
		this.state.moveX = Math.max(- available, this.state.moveX - this.state.saltMoveX);
		this._move();
	}

	_rotate() {
		this.plugin.rotate(this.state.rotate);
		this.plugin.listeners.change(this.state);
	}

	rotate() {
		this.state.rotate -= 180;
		if (this.state.rotate === -360) {
			this.state.rotate = 0
		}
		this._rotate();
	}

	_flip() {
		this.plugin.flip(this.state.flip);
		this.plugin.listeners.change(this.state);
	}

	flip() {
		this.state.flip = this.state.flip === "+" ? "-" : "+";
		this._flip();
	}

	get available() {
		const z = this.state.zoom;
		return z / 2 * ( 1 - 1 / z );
	}
}
