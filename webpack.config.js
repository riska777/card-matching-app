const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './src/ts/index.ts',
	// devtool: 'inline-source-map',
	devServer: {
		clientLogLevel: 'silent',
		// port: 9000,
		// compress: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			path: path.resolve(__dirname, 'dist'),
			publicPath: "/dist"
		})
	],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
			},
			{
				test: /\.s?[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{loader: 'css-loader', options: {url: false, sourceMap: true}},
					{loader: 'sass-loader', options: {sourceMap: true}}
				],
			}
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
	}
};
