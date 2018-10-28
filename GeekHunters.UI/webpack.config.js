var path = require("path");

var config = {
    entry: ["./src/app.tsx"],

    output: {
        path: path.resolve(__dirname + "/wwwroot/", "build"),
        filename: "bundle.js"
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.js\.map/,
                use: "source-map-loader",
                enforce: "pre"
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};

module.exports = config;