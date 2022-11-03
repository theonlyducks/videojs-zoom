

export default class ZoomModalContent {

	constructor() {
		this.content = null;
		this.#createContent();
	}

	getContent() {
		return this.content;
	}

	#createContent() {
		this.content = `
			<div class="vjs-zoom-duck__container--row">
				<button id="vjs-zoom-duck__zoomIn" class="vjs-zoom-duck__button">
					<span> + </span>
				</button>
				<button>
					<span> </span>
				</button>
				<button id="vjs-zoom-duck__zoomOut" class="vjs-zoom-duck__button">
					<span> - </span>
				</button>
			</div>
		`;
	}

}
