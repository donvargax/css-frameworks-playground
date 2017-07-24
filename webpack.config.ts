import * as webpack from 'webpack'
import * as path from 'path'

import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'

import * as ExtractTextPlugin from 'extract-text-webpack-plugin'

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development",
    allChunks: true,
});

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
            // reload scss
            // https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30#issuecomment-292165949
            // I should probably start putting these in helper files, maybe upload them to npm as packages?
            test: /\.scss$/,
            use: extractSass.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {
                        sourceMap: false,
                        import: false,
                        url: false,
                    },
                }, {
                    loader: 'sass-loader', // compiles Sass to CSS
                    options: {
                        sourceMap: true,
                        outputStyle: 'expanded',
                        includePaths: ['./src/styles', './node_modules',],
                        // includePaths: [...project.paths.client('styles'), './node_modules',]
                    },
                }],
            }),
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
            template: 'src/index.ejs',
            title: 'Output Management',
        },),
        extractSass,
    ],
}

export default config
