const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, "src", "index.js")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: "src/index.html", to: "index.html" }],
        }),
    ],
};
