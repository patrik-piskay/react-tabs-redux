var webpack = require('webpack'),
    path = require('path');

var build = process.env.NODE_ENV == 'build' || false;

var config = {
    resolve: {
        extensions: ['', '.js'],
        alias: {
            src: __dirname + '/lib'
        }
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    }
};

if (build) {
    config = Object.assign(config, {
        entry: __dirname + '/lib/index.js',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            libraryTarget: 'umd',
            library: 'LibName'
        },
        externals: {
            // Use external version of React
            react: 'React'
        }
    });
} else {
    config = Object.assign(config, {
        devtool: 'eval-source-map',
        entry: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            __dirname + '/lib/index.js'
        ],
        output: {
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            hot: true
        }
    });
}

module.exports = config;