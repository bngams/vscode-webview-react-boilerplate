//@ts-check

'use strict';

const path = require('path');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node', // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: './src/ext/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist', 'ext'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vscodeignore file
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
};

/** @type WebpackConfig */
const webviewConfig = {
	target: 'web',
	entry: './src/webview/src/index.tsx',
	output: {
	  filename: '[name].wv.js',
	  path: path.resolve(__dirname, 'dist', 'webview'),
	},
	resolve: {
	  extensions: ['.js', '.ts', '.tsx'],
	},
	module: {
	  rules: [
		{ test: /\.(js|ts|jsx|tsx)?$/, use: ['babel-loader', 'ts-loader'] },
		{
		  test: /\.css$/,
		  use: ['style-loader', 'css-loader'],
		},
		{
			test: /\.(jpg|jpeg|png|webp)?$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 8192, // 8KB size limit for inlining
						fallback: 'file-loader', // fallback to file-loader if above limit
						name: '[name].[hash].[ext]', // name pattern for output files
						outputPath: 'assets/images/', // output path for the images
					},
				},
			],
		},
		{
			test: /\.svg$/,
			use: [
				'@svgr/webpack',
				{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: '[name].[hash].[ext]',
						outputPath: 'assets/images/',
					},
				},
			],
		}
	  ],
	},
};
module.exports = [ extensionConfig, webviewConfig ];
