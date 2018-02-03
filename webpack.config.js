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
		chunks: ['common', name]
	}
}

var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'test': ['./src/page/test/index.js'],
		'index': ['./src/page/index/index.js'],
		'shrink': ['./src/page/shrink/index.js'],
		'fullpage': ['./src/page/fullpage/index.js'],
		'treemenu': ['./src/page/treemenu/index.js'],
		'fullscreen': ['./src/page/fullscreen/index.js'],
		'marquee': ['./src/page/marquee/index.js'],
		'dialog': ['./src/page/dialog/index.js'],
		'art': ['./src/page/art/index.js'],
		'slider': ['./src/page/slider/index.js'],
		'tab': ['./src/page/tab/index.js'],
		'focus': ['./src/page/focus/index.js'],
		'editor': ['./src/page/editor/index.js'],
		'scrollbar': ['./src/page/scrollbar/index.js'],
		'form-beautify': ['./src/page/form-beautify/index.js'],
		'button-tip': ['./src/page/button-tip/index.js']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/[name].js',
		publicPath: '/assembly/dist/'
	},
	resolve: {
		alias: {
			assets: __dirname + '/src/assets',
			page: __dirname + '/src/page',
			view: __dirname + '/src/view',
			util: __dirname + '/src/util'
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
			},
			{
				test: /\.string$/,
				loader: 'html-loader',
				query: {
					minimize: true,
					removeAttributeQuotes: false
				}
			},
			{
				test: /\.art$/,
				loader: 'art-template-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('test', '测试页')),
		new HtmlWebpackPlugin(getHtmlConfig('shrink', '收缩菜单')),
		new HtmlWebpackPlugin(getHtmlConfig('fullpage', '全屏滚动')),
		new HtmlWebpackPlugin(getHtmlConfig('treemenu', '树形菜单')),
		new HtmlWebpackPlugin(getHtmlConfig('fullscreen', '开启全屏')),
		new HtmlWebpackPlugin(getHtmlConfig('marquee', '走马灯')),
		new HtmlWebpackPlugin(getHtmlConfig('dialog', '弹框组件')),
		new HtmlWebpackPlugin(getHtmlConfig('art', 'art-template实验')),
		new HtmlWebpackPlugin(getHtmlConfig('slider', '滑块')),
		new HtmlWebpackPlugin(getHtmlConfig('tab', '选项卡')),
		new HtmlWebpackPlugin(getHtmlConfig('focus', '轮播图')),
		new HtmlWebpackPlugin(getHtmlConfig('editor', '富文本编辑器')),
		new HtmlWebpackPlugin(getHtmlConfig('scrollbar', '自定义滚动条')),
		new HtmlWebpackPlugin(getHtmlConfig('form-beautify', '表单美化')),
		new HtmlWebpackPlugin(getHtmlConfig('button-tip', '表单美化-2')),
		// new CleanWebpackPlugin(['dist']),
		//把css单独打包到文件里
		new ExtractTextPlugin('css/[name].css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		})
	]
}

if(WEBPACK_ENV === 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;