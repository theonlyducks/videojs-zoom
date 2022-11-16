export default class ZoomModalContent {

  constructor() {
    this.content = null;
    this._createContent();
  }

  getContent() {
    return this.content;
  }

  _createContent() {
    this.content = `
			<div class="vjs-zoom-duck__container--row">
				<button id="vjs-zoom-duck__zoomIn" class="vjs-zoom-duck__button">
					<span class="icons">add</span>
				</button>
				<span class="vjs-zoom-duck__space"></span>
				<button id="vjs-zoom-duck__zoomOut" class="vjs-zoom-duck__button">
					<span class="icons">remove</span>
				</button>
			</div>
			<div class="vjs-zoom-duck__container--row">
				<span class="vjs-zoom-duck__space"></span>
				<button id="vjs-zoom-duck__moveUp" class="vjs-zoom-duck__button">
					<span class="icons">arrow_drop_up</span>
				</button>
				<span class="vjs-zoom-duck__space"></span>
			</div>
			<div class="vjs-zoom-duck__container--row">
				<button id="vjs-zoom-duck__moveLeft" class="vjs-zoom-duck__button">
					<span class="icons">arrow_left</span>
				</button>
				<button id="vjs-zoom-duck__reset" class="vjs-zoom-duck__button">
					<span class="icons">fiber_manual_record</span>
				</button>
				<button id="vjs-zoom-duck__moveRight" class="vjs-zoom-duck__button">
					<span class="icons">arrow_right</span>
				</button>
			</div>
			<div class="vjs-zoom-duck__container--row">
				<span class="vjs-zoom-duck__space"></span>
				<button id="vjs-zoom-duck__moveDown" class="vjs-zoom-duck__button">
					<span class="icons">arrow_drop_down</span>
				</button>
				<span class="vjs-zoom-duck__space"></span>
			</div>
			<div class="vjs-zoom-duck__container--row">
				<button id="vjs-zoom-duck__rotateLeft" class="vjs-zoom-duck__button">
					<span class="icons">rotate_left</span>
				</button>
				<span class="vjs-zoom-duck__space"></span>
				<button id="vjs-zoom-duck__rotateRight" class="vjs-zoom-duck__button">
					<span class="icons">rotate_right</span>
				</button>
			</div>
		`;
  }

}
