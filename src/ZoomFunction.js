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

	zoomIn() {
		if (this.state.zoom >= 9.8) return;
		this.state.moveCount++;
		this.state.zoom += ZOOM_SALT;
		this.plugin.zoom(this.state.zoom);
		this.plugin.listeners.change(this.state);
	}

	zoomOut() {
		if (this.state.zoom <= 1) return;
		this.state.moveCount--;
		this.state.zoom -= ZOOM_SALT;
		this.plugin.zoom(this.state.zoom);
		this.plugin.move(0, 0);
		this.plugin.listeners.change(this.state);
	}

	_move() {
		this.plugin.move(this.state.moveX, this.state.moveY);
		this.plugin.listeners.change(this.state);
	}

	moveUp() {
		const next = this.state.moveY + this.state.saltMoveY;
		const available = this.state.moveCount * this.state.saltMoveY;
		if (available < next) return;
		this._updateSalt();
		this.state.moveY += this.state.saltMoveY;
		this._move();
	}

	moveDown() {
		const next = this.state.moveY - this.state.saltMoveY;
		const available = this.state.moveCount * this.state.saltMoveY;
		if (-available > next) return;
		this._updateSalt();
		this.state.moveY -= this.state.saltMoveY;
		this._move();
	}

	reset() {
		this.state.zoom = 1;
		this.state.moveX = 0;
		this.state.moveY = 0;
		this.state.rotate = 0;
		this.state.moveCount = 0;
		this.plugin.zoom(1);
		this.plugin.flip("+");
		this.plugin.rotate(0);
		this.plugin.move(0, 0);
		this.plugin.listeners.change(this.state);
	}

	moveLeft() {
		const next = this.state.moveX + this.state.saltMoveX;
		const available = this.state.moveCount * this.state.saltMoveX;
		if (available < next) return;
		this._updateSalt();
		this.state.moveX += this.state.saltMoveX;
		this._move();
	}

	moveRight() {
		const next = this.state.moveX - this.state.saltMoveX;
		const available = this.state.moveCount * this.state.saltMoveX;
		if (-available > next) return;
		this._updateSalt();
		this.state.moveX -= this.state.saltMoveX;
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

}
