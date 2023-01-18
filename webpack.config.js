import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
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
