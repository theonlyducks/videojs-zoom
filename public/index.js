import 'video.js/dist/video-js.css';

import videojs from "video.js";

import '../src/zoom';

window.onload = () => {
	const video = videojs('my-video');
	video.zoomPlugin({
		zoom: 2
	});
};
