'use strict';

const
    HtmlWebpack   = require('html-webpack-plugin'),
    path          = require('path'),
    webpack       = require('webpack'),
    CheckerPlugin = require('awesome-typescript-loader'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ChunkWebpack  = webpack.optimize.CommonsChunkPlugin,
    rootDir       = path.resolve(__dirname, '..');

module.exports = {
    // debug: true,
    devServer: {
        contentBase: path.resolve(rootDir, 'dist'),
        port: 9000
    },
    devtool: 'source-map',
    entry: {
        app: [ path.resolve(rootDir, 'src', 'app', 'main.ts') ],
        vendor: [ path.resolve(rootDir, 'src', 'vendor', 'main.ts') ]
    },
    module: {
        loaders: [
            { test: /\.(css|html)$/, loader: 'raw-loader' },
            { test: /\.ts$/, loaders: [{
                loader: 'awesome-typescript-loader',
                options: { configFileName: path.resolve(rootDir, 'tsconfig.json') }
            } , 'angular2-template-loader'] },
            { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]},
            { test: /\.(jpg|png|woff|woff2|eot|ttf|svg|json|php)$/, loader: 'file-loader?name=img/[name].[ext]'}
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(rootDir, 'dist')
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'backend', to: 'backend' },
            { from: 'vendor', to: 'backend/vendor' }
        ]),
        new ChunkWebpack({
            filename: 'vendor.bundle.js',
            minChunks: Infinity,
            name: 'vendor'
        }),
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(rootDir, 'src', 'app', 'index.html')
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        )
    ],
    resolve: {
        extensions: [ '.js', '.ts' ]
    }
};