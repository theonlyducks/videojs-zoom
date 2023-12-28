import 'video.js/dist/video-js.css';

import videojs from "video.js";

import '../src/plugin.css';
import '../src/plugin';

window.onload = () => {
	const video = videojs('my-video');
	const zoomPlugin = video.zoomPlugin({
		showZoom: true,
		showMove: false,
		showRotate: false,
		gestureHandler: true
	});
	zoomPlugin.listen('click', () => {
		console.log('onclick');
	});
	zoomPlugin.listen('change', data => {
		console.log('onchange', data);
	});
	const open = document.getElementById('my-open');
	open.onclick = () => {
		zoomPlugin.toggle();
	};
	const rotate = document.getElementById('my-rotate');
	rotate.onclick = () => {
		zoomPlugin.rotate(180);
	};
}
