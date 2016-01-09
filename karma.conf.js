module.exports = function (config) {
    config.set({
        browsers: [ 'Chrome' ],
        frameworks: [ 'mocha' ],
        reporters: [ 'mocha' ],

        files: [
            'test/*.js'
        ],

        preprocessors: {
            'test/*.js': [ 'webpack', 'sourcemap' ]
        },

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
                ]
            }
        },

        webpackServer: {
            noInfo: true
        }
    });
};