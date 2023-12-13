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
			<button id="vjs-zoom-duck__zoomIn" class="vjs-zoom-duck__button" style="grid-area: plus">
				<span class="vjs-zoom-icons">add</span>
			</button>
			<button id="vjs-zoom-duck__zoomOut" class="vjs-zoom-duck__button" style="grid-area: minus">
				<span class="vjs-zoom-icons">remove</span>
			</button>
		`;
		const move = `
			<button id="vjs-zoom-duck__moveUp" class="vjs-zoom-duck__button" style="grid-area: up">
				<span class="vjs-zoom-icons">arrow_drop_up</span>
			</button>
			<button id="vjs-zoom-duck__moveLeft" class="vjs-zoom-duck__button" style="grid-area: left">
				<span class="vjs-zoom-icons">arrow_left</span>
			</button>
			<button id="vjs-zoom-duck__reset" class="vjs-zoom-duck__button" style="grid-area: reset">
				<span class="vjs-zoom-icons">fiber_manual_record</span>
			</button>
			<button id="vjs-zoom-duck__moveRight" class="vjs-zoom-duck__button" style="grid-area: right">
				<span class="vjs-zoom-icons">arrow_right</span>
			</button>
			<button id="vjs-zoom-duck__moveDown" class="vjs-zoom-duck__button" style="grid-area: down">
				<span class="vjs-zoom-icons">arrow_drop_down</span>
			</button>
		`;
		const rotateFlip = `
			<button id="vjs-zoom-duck__rotate" class="vjs-zoom-duck__button" style="grid-area: rotate">
				<span class="vjs-zoom-icons">rotate_left</span>
			</button>
			<button id="vjs-zoom-duck__flip" class="vjs-zoom-duck__button" style="grid-area: flip">
				<span class="vjs-zoom-icons">swap_horiz</span>
			</button>
		`;

		this.content = `
			${this.state.showZoom ? zoom : ''}
			${this.state.showMove ? move : ''}
			${this.state.showRotateFlip ? rotateFlip : ''} 
		`;
	}

}
