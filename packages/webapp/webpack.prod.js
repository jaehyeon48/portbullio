import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import DotenvWebpackPlugin from 'dotenv-webpack';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import common from './webpack.common.js';

export default merge(common, {
	mode: 'production',
	plugins: [
		new DotenvWebpackPlugin({
			path: path.resolve(dirname(fileURLToPath(import.meta.url)), '.env')
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			reportFilename: '../bundle-report.html',
			openAnalyzer: false,
			defaultSizes: 'gzip'
		})
	]
});
