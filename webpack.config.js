const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const live = process.argv.indexOf('serve') > 0;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);

const babelOptions = (preset) => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    };

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
};

const entryOptions = (useSW) => {
    const data = {
        main: './public/index'
    };

    if (useSW) {
        data.sw = { import: './public/sw', filename: 'sw.js' };
    }

    return data;
};

module.exports = {
    entry: entryOptions(isProd),
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@consts': path.resolve(__dirname, 'src/consts'),
            '@controllers': path.resolve(__dirname, 'src/controllers'),
            '@models': path.resolve(__dirname, 'src/models'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@view': path.resolve(__dirname, 'src/view'),
            '@css': path.resolve(__dirname, 'public/css'),
            '@icon': path.resolve(__dirname, 'public/icon'),
            '@img': path.resolve(__dirname, 'public/img'),
            '@public': path.resolve(__dirname, 'public'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        port: 3000,
        hot: isDev,
        historyApiFallback: true
    },
    devtool: isDev ? 'source-map' : undefined,
    target: 'web',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
                options: babelOptions()
            },
            {
                test: /\.ts$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-typescript')
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg/,
                loader: 'raw-loader',
                options: {
                    esModule: false
                }
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            hash: true,
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};
