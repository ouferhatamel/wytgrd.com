const { watch } = require('fs');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'pages'),
        filename: 'bundle.js'
    },
    watch: true
}