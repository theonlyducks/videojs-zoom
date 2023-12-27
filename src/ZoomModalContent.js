export class ZoomModalContent {

	constructor(options) {
		this.content = null;
		this.state = options.state;
		this._createContent();
	}

	getContent() {
		return this.content;
	}

	_createContent() {
		const zoom = `
			<div class="vjs-zoom-duck__container--row">
				<button id="vjs-zoom-duck__zoomIn" class="vjs-zoom-duck__button">
					<span class="vjs-zoom-icons">add</span>
				</button>
				<span class="vjs-zoom-duck__space"></span>
				<button id="vjs-zoom-duck__zoomOut" class="vjs-zoom-duck__button">
					<span class="vjs-zoom-icons">remove</span>
				</button>
			</div>
		`;
		const move = `
			<div class="vjs-zoom-duck__container--row">
				<span class="vjs-zoom-duck__space"></span>
				<button id="vjs-zoom-duck__moveUp" class="vjs-zoom-duck__button">
					<span class="vjs-zoom-icons">arrow_drop_up</span>
				</button>
				<span class="vjs-zoom-duck__space"></span>
			</div>
			<div class="vjs-zoom-duck__container--row">
				<button id="vjs-zoom-duck__moveLeft" class="vjs-zoom-duck__button">
					<span class="vjs-zoom-icons">arrow_left</span>
				</button>
				<button id="vjs-zoom-duck__reset" class="vjs-zoom-duck__button">
					<span class="vjs-zoom-icons">fiber_manual_record</span>
				</button>
				<button id="vjs-zoom-duck__moveRight" class="vjs-zoom-duck__button">
					<span class="vjs-zoom-icons">arrow_right</span>
				</button>
			</div>
			<div class="vjs-zoom-duck__container--row">
				<span class="vjs-zoom-duck__space"></span>
				<button id="vjs-zoom-duck__moveDown" class="vjs-zoom-duck__button">
					<span class="vjs-zoom-icons">arrow_drop_down</span>
				</button>
				<span class="vjs-zoom-duck__space"></span>
			</div>
		`;
		const rotate = `
			<div class="vjs-zoom-duck__container--row">
				<button id="vjs-zoom-duck__rotate" class="vjs-zoom-duck__button">
					<span class="vjs-zoom-icons">rotate_left</span>
				</button>
				<span class="vjs-zoom-duck__space"></span>
				<button id="vjs-zoom-duck__flip" class="vjs-zoom-duck__button">
					<span class="vjs-zoom-icons">swap_horiz</span>
				</button>
			</div>
		`;
		this.content = '';
		if (this.state.showZoom) {
			this.content += zoom;
		}
		if (this.state.showMove) {
			this.content += move;
		}
		if (this.state.showRotate) {
			this.content += rotate;
		}
	}

}
