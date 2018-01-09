const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var getHtmlConfig = function(name, title){
	return {
		template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html',
		title: title,
		inject: true,
		hash: true,
		chunks: [name]
	}
}

module.exports = {
	entry: {
		'index': ['./src/index.js'],
		'text': ['./src/page/text/index.js']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js'
	},
	resolve: {
		alias: {
			image: path.resolve(__dirname, '/src/image'),
			page: path.resolve(__dirname, '/src/page'),
			view: path.resolve(__dirname, '/src/view')
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
		            fallback: "style-loader",
		            use: "css-loader"
		        })
			},
			{
				test: /\.js$/,
				include: path.resolve(__dirname, './src'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			// {
			// 	test: /\.(jpg|png|gif|woff|svg|eot|ttf)\??.*$/,
			// 	loader: 'url-loader?limit=100&name=resource/[name].[ext]'
			// }
		]
	},
	plugins: [
		new HtmlWebpackPlugin(getHtmlConfig('text', '测试页')),
		new CleanWebpackPlugin(['dist']),
		//把css单独打包到文件里
		new ExtractTextPlugin('css/[name].css')
	]
}