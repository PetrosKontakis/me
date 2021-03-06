// webpack v4
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: {main: "./src/index.js", augmentedReality: "./src/augmented-reality-marine-traffic/index.js"},

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    devServer: {
        contentBase: "./dist",
        port: 7700
    },
    module: {
        rules: [
            { test: /\.(htm)$/,
                include: path.join(__dirname, 'src/components'),
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    'sass-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{from: 'src/assets', to: 'assets'}]),
        new CleanWebpackPlugin("dist", {}),
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./src/index.htm",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/augmented-reality-marine-traffic/index.htm",
            filename: "augmented-reality-marine-traffic/index.html"
        }),
        new WebpackMd5Hash(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
