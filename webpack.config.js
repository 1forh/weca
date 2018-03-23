const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function () {
	return {
		entry: {
			'script.min.js': path.resolve(__dirname, './assets/script.js')
		},
		module: {
			loaders: [
				{
					test: /\.(js)$/,
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			]
		},
		plugins: [
			new UglifyJSPlugin()
		],
		output: {
			filename: '[name]',
			path: path.resolve(__dirname, './assets/')
		}
	};
};