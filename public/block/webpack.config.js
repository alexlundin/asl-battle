const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'asl-battle-block': './src/asl-battle-block.js'
    },
    output: {
        path: path.join(__dirname, '/build/js'),
        filename: '[name].js'
    }
}
