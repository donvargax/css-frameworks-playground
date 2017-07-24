import * as webpack from 'webpack'
import * as path from 'path'

import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'

/*
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development",
});
*/

interface Config extends webpack.Configuration {
    entry: webpack.Entry,
    module: {
        rules: webpack.NewUseRule[]
    }
}

const config: Config = {
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    devServer: {
        contentBase: './dist',
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'style-loader', // creates style nodes from JS strings
                'css-loader', // translates CSS into CommonJS
                'sass-loader', // compiles Sass to CSS
            ]
        }, {
            test: /\.tsx?$/,
            use: [{
                loader: 'awesome-typescript-loader',
            },]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        },),
    ]
    /*plugins: [
        extractSass,
    ],*/
}

export default config
