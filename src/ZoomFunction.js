const ZOOM_SALT = 0.2;

export class ZoomFunction {

	constructor(player, options) {
		this.state = {
			...options.state,
			saltMoveX: 70,
			saltMoveY: 70,
			moveCount: Math.ceil((options.state.zoom - 1) / ZOOM_SALT)
		};
		this.player = player.el();
		this.options = options;
		player.on('playing', () => {
			this._updateSalt();
		});
	}

	_updateSalt() {
		this.state.saltMoveX = (this.player.offsetWidth * ZOOM_SALT) / 2;
		this.state.saltMoveY = (this.player.offsetHeight * ZOOM_SALT) / 2;
	}

	zoomIn() {
		if (this.state.zoom >= 9.8) {
			return;
		}
		this.state.moveCount++;
		this.state.zoom += ZOOM_SALT;
		this.options.plugin.zoom(this.state.zoom);
		this.options.plugin.callback(this.state);
	}

	zoomOut() {
		if (this.state.zoom <= 1) {
			return;
		}
		this.state.moveCount--;
		this.state.zoom -= ZOOM_SALT;
		this.options.plugin.zoom(this.state.zoom);
		this.options.plugin.move(0, 0);
		this.options.plugin.callback(this.state);
	}

	moveUp() {
		const next = this.state.moveY + this.state.saltMoveY;
		const available = this.state.moveCount * this.state.saltMoveY;
		if (available < next) {
			return;
		}
		this._updateSalt();
		this.state.moveY += this.state.saltMoveY;
		this.options.plugin.move(this.state.moveX, this.state.moveY);
		this.options.plugin.callback(this.state);
	}

	moveDown() {
		const next = this.state.moveY - this.state.saltMoveY;
		const available = this.state.moveCount * this.state.saltMoveY;
		if (-available > next) {
			return;
		}
		this._updateSalt();
		this.state.moveY -= this.state.saltMoveY;
		this.options.plugin.move(this.state.moveX, this.state.moveY);
		this.options.plugin.callback(this.state);
	}

	reset() {
		this.state.zoom = 1;
		this.state.moveX = 0;
		this.state.moveY = 0;
		this.state.rotate = 0;
		this.state.moveCount = 0;
		this.options.plugin.zoom(1);
		this.options.plugin.rotate(0);
		this.options.plugin.move(0, 0);
		this.options.plugin.callback(this.state);
	}

	moveLeft() {
		const next = this.state.moveX + this.state.saltMoveX;
		const available = this.state.moveCount * this.state.saltMoveX;
		if (available < next) {
			return;
		}
		this._updateSalt();
		this.state.moveX += this.state.saltMoveX;
		this.options.plugin.move(this.state.moveX, this.state.moveY);
		this.options.plugin.callback(this.state);
	}

	moveRight() {
		const next = this.state.moveX - this.state.saltMoveX;
		const available = this.state.moveCount * this.state.saltMoveX;
		if (-available > next) {
			return;
		}
		this._updateSalt();
		this.state.moveX -= this.state.saltMoveX;
		this.options.plugin.move(this.state.moveX, this.state.moveY);
		this.options.plugin.callback(this.state);
	}

	rotateLeft() {
		this.state.rotate -= 180;
		this.options.plugin.rotate(this.state.rotate);
		this.options.plugin.callback(this.state);
	}

	rotateRight() {
		this.state.rotate += 180;
		this.options.plugin.rotate(this.state.rotate);
		this.options.plugin.callback(this.state);
	}
}
