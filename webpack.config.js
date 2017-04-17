var config = {
    output: {
        libraryTarget: 'umd',
        library: 'ReactTabs'
    },

    resolve: {
        extensions: ['', '.js'],
        alias: {
            src: __dirname + '/src'
        }
    },

    externals: {
        // Use external version of React
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React' // indicates global variable
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

module.exports = config;
