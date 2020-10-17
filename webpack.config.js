const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: (url, sourcePath) => {
                                if (url.includes('images/')) {
                                    return false;
                                }

                                return true;
                            }
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: 'fonts'
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './src/assets' }
            ]
        }),
        new BrowserSyncPlugin({
            files: ['src/scss/*/*.scss', 'src/assets/*.html'],
            startPath: '/public',
            host: 'localhost',
            port: 3001,
            proxy: 'http://localhost:8080/',
        }, {
            reload: false,
        })
    ],
    devServer: {
        publicPath: '/public/',
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT,
        open: false,
    }
};
