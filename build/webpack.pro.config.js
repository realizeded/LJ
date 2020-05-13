const path = require('path');
const fs = require('fs');
const cleanDistWebpackPlugin = require('cleandistwebpackplugin');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
let dev = {
    plugins:[
        new cleanDistWebpackPlugin(),
    ],
    module:{
        rules:[]
    }
};
module.exports = merge(base,dev);