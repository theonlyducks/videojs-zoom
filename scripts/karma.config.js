import generate from 'videojs-generate-karma-config';

export default function(config) {
  const options = {};
  config = generate(config, options);
};
