var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var config = {
    entry: [
        'webpack/hot/dev-server',
        path.resolve(__dirname, 'app/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: ['babel-loader'],
                include: path.join(__dirname, 'app'),
                query:{
                    presets:['stage-1','es2015','react']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass!postcss')
            }     
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
        new webpack.NoErrorsPlugin()
    ],
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};

module.exports = config;