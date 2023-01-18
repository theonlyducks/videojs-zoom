const { terser } = require('rollup-plugin-terser');
const { babel } = require('@rollup/plugin-babel');
const copy = require('rollup-plugin-copy');
const json = require('@rollup/plugin-json');
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require('@rollup/plugin-node-resolve');

const packageJson = require("./package.json");

module.exports = {
	input: 'src/plugin.js',
	external: [ 'video.js' ],
	globals: {
		'video.js': 'videojs'
	},
	output: [
		{
			name: packageJson.name,
			file: packageJson.browser,
			format: 'umd'
		},
		{
			name: packageJson.name,
			file: packageJson.main,
			format: 'cjs',
			exports: 'auto'
		},
		{
			name: packageJson.name,
			file: packageJson.module,
			format: 'esm'
		}
	],
	plugins: [
		json(),
		resolve({
			browser: true,
			main: true,
			jsnext: true
		}),
		babel({
			babelHelpers: 'bundled',
		}),
		commonjs(),
		terser({
			compress: {
				drop_console: true,
			},
			output: {
				comments: false
			}
		}),
		copy({
			targets: [
				{
					src: 'src/plugin.css',
					dest: 'dist'
				},
				{
					src: 'src/assets/material-icons.woff',
					dest: 'dist/assets'
				},
				{
					src: 'src/assets/material-icons.woff2',
					dest: 'dist/assets'
				}
			]
		}),
	]
}
