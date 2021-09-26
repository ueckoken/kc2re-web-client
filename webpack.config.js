const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    devServer: {
        static: "./dist",
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        clean: true,
    },
}
