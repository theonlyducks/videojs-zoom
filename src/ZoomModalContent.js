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
				<button id="vjs-zoom-duck__zoomIn">
					<span> + </span>
				</button>
				<button>
					<span> </span>
				</button>
				<button id="vjs-zoom-duck__zoomOut">
					<span> - </span>
				</button>
			</div>
		`;
	}

}
