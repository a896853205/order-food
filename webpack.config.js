/**
 * Created by HP on 2017/3/26.
 */
const path = require('path');
const hwp = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
	output: {
        path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, './src/'),
				options: {
					presets: ['latest']
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'postcss-loader'
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				use: [
					{
						loader:'url-loader',
						options: {
							limit: 20000,
							name: 'assets/[name].[ext]'
						}
					},
					'image-webpack-loader'
				]
			}
		]
	},
	plugins: [
		new hwp({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body'
		})
	]
};