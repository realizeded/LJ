const path = require('path');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServer = require('webpack-dev-server');
const cleanDistWebpackPlugin = require('cleandistwebpackplugin');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
let dev = {
    resolve:{
        extensions:['.js']
    },
    plugins:[
        new cleanDistWebpackPlugin(),
        new htmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'../','test/index.html')
        })
    ],
    module:{
        rules:[]
    }
};
module.exports = merge(base,dev);