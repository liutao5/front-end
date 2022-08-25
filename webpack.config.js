const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProductionMode = process.env.NODE_ENV === 'production';

module.exports = function () {
	return {
		output: {
			clean: true,
			filename: 'static/js/[name].[contenthash:8].js',
		},
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env'],
								['@babel/preset-react', { runtime: 'automatic' }],
								['@babel/preset-typescript'],
							],
						},
					}],
				},
				{
					test: /\.css$/i,
					use: [
						isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										[
											'postcss-preset-env',
											{
												autoprefixer: true
											}
										],
									],
								},
							},
						},
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, './public/index.html'),
			}),
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].[contenthash:8].css'
			})
		],
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		},
	}

}
