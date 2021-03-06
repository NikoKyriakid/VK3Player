const HtmlWebpackPlugin = require('html-webpack-plugin');
var ISPROD = process.env.NODE_ENV == "production";
var ISDEV = !ISPROD;

//var path = require('path');

const electronConfig = {
    entry: {
        app: "./src/app.ts",
        renderer: "./src/renderer.ts"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/ },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'VK3Player',
            template: 'src/assets/index.html',
            excludeChunks: [ 'app' ]
        })
    ],

    target: 'electron-main',    // This is needed config to tell webpack that the electron objects are available on runtime.
    mode: 'development',

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};

module.exports = [ electronConfig ];