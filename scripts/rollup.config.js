import generate from 'videojs-generate-rollup-config';

const options = {};

const config = generate(options);

export default Object.values(config.builds);
