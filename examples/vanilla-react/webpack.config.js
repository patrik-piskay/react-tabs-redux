var config = {
    devtool: 'eval-source-map',
    entry: __dirname + '/src/index.js',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css/,
            loaders: ['style-loader', 'css-loader']
        }]
    }
};

module.exports = config;