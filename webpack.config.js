const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name, title){
	return {
		template: './src/view/'+ name +'.html',
		filename: 'view/'+ name +'.html',
		title: title,
		inject: true,
		hash: true,
		// chunks: ['common', name]
		chunks: [name]
	}
}

var config = {
	entry: {
		// 'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'shrink': ['./src/page/shrink/index.js']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js',
		publicPath: '/dist/'
	},
	resolve: {
		alias: {
			assets: path.resolve(__dirname, '/src/assets'),
			page: path.resolve(__dirname, '/src/page'),
			view: path.resolve(__dirname, '/src/view'),
			util: path.resolve(__dirname, '/src/util')
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
			{
				test: /\.(jpg|png|gif|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=100&name=resource/[name].[ext]'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('shrink', '收缩菜单')),
		// new CleanWebpackPlugin(['dist']),
		//把css单独打包到文件里
		new ExtractTextPlugin('css/[name].css'),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'common',
		// 	filename: 'js/base.js'
		// })
	]
}

if(WEBPACK_ENV === 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;