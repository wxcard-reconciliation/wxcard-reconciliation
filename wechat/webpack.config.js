var path = require('path');

module.exports = {
    entry: {
      register: path.resolve(__dirname, './src/js/page/register.js'),
      pois: path.resolve(__dirname, './src/js/page/pois.js'),
      getcard: path.resolve(__dirname, './src/js/page/getcard.js')
    },
    output: {
        path: path.resolve(__dirname, './dist/js/page'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
        ]
    },
    resolve:{
        extensions:['','.js','.json', 'css']
    },
};