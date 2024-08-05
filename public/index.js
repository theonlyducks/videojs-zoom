import 'video.js/dist/video-js.css';

import videojs from "video.js";

import '../src/plugin.css';
import '../src/plugin';

window.onload = () => {
	const video = videojs('my-video');
	const zoomPlugin = video.zoomPlugin({
		showZoom: true,
		showMove: true,
		showRotate: true,
		gestureHandler: true
	});
	zoomPlugin.listen('click', () => {
		console.log('onclick');
	});
	zoomPlugin.listen('change', data => {
		console.log('onchange', data);
	});
	const enable = document.getElementById('my-enable');
	enable.onclick = () => {
		zoomPlugin.enablePlugin();
	};
	const disable = document.getElementById('my-disable');
	disable.onclick = () => {
		zoomPlugin.disablePlugin();
	};
	const open = document.getElementById('my-open');
	open.onclick = () => {
		zoomPlugin.toggle();
	};
	const rotate = document.getElementById('my-rotate');
	rotate.onclick = () => {
		zoomPlugin.rotate(180);
	};
}
