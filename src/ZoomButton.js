import videojs from "video.js";

const Button = videojs.getComponent("Button");

export class ZoomButton extends Button {

	constructor(player, options) {
		super(player, options);
		this.isOpen = false;
		player.on("useractive", () => {
			if (!this.isOpen) return;
			const modal = this.player().getChild("ZoomModal");
			modal.open();
		});
		player.on("userinactive", () => {
			if (!this.isOpen) return;
			const modal = this.player().getChild("ZoomModal");
			modal.close();
		});
	}

	buildCSSClass() {
		const [ major ] = videojs.VERSION.split('.');
		return `vjs-zoom-duck vjs-zoom-duck-${major} ${super.buildCSSClass()}`;
	}

	handleClick() {
		const modal = this.player().getChild("ZoomModal");
		videojs.log("[~Zoom Plugin] button handleClick");
		this.isOpen = !this.isOpen;
		modal.toggle();
	}

}

