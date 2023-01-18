const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: {
		app: path.resolve(__dirname, "public")
	},
	output: {
		clean: true,
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js",
	},
	devServer: {
		port: 3000,
		hot: true,
		open: true,
		allowedHosts: 'all'
	},
	resolve: {
		extensions: [".js", ".json"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: path.join(__dirname, "public", "index.html")
		})
	],
	module: {
		rules: [
			{
				test: /.js$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /.css$/i,
				use: [
					{loader: "style-loader"},
					{loader: "css-loader"},
				]
			},
			{
				test: /.(png|svg|jpg|jpeg)$/i,
				type: 'asset/resource'
			}
		]
	}
}
