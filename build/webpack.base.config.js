const path = require('path');
const fs = require('fs');
let env = process.env.NODE_ENV;
let base = {
    mode:env,
    devtool:env === 'production'?'eval-cheap-source-map':'eval-cheap-module-source-map',
    entry:path.join(__dirname,'../','src/index.js'),
    output:{
        filename:"lj.js",
        path:path.join(__dirname,'../','dist')
    },
    module:{
        rules:[
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
            ]
    }
}
module.exports = base;
