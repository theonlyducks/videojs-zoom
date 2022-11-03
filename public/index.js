import 'video.js/dist/video-js.css';

import videojs from "video.js";

import '../src';

window.onload = () => {
	const video = videojs('my-video');
	const zoomPlugin = video.zoomPlugin({});
	zoomPlugin.zoom(1);
	zoomPlugin.rotate(0);
	zoomPlugin.move(0, 0);
};
