/**
 * Created by daishun on 2016/8/11.
 */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var faker=require("faker");
var _=require("lodash");
module.exports = {
    externals: {
        'react': 'React',
        'react-dom':'ReactDOM',
        'antd':'antd',
        'react-router':'ReactRouter',
        'react-redux':'ReactRedux',
        'redux':'Redux',
        'redux-thunk':'ReduxThunk',
        'jquery':'$open.jQuery',
        'pubsub':'PubSub',
        '$open':'$open'
    },
    resolve:{
        extensions:['','.js','.jsx']
    },
    entry: {
        index:'./src/entries/Index.jsx'
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        library: ["$open",appId, "[name]"],
        libraryTarget: "umd",
        umdNamedDefine:'true'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
            { test: /\.(eot|woff|svg|ttf|woff2)$/, loader: "file-loader" },
            { test: /\.woff$/, loader: "file-loader" },
            {
                test: /\.css$/,
                loaders: [
                   'style?sourceMap',
                   'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                ]
            },
            {
                test: /\.json$/,
                loader: 'json'
            }

        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/common/index.html'
        })
    ],
    devServer:{
       // proxy: {
       //     '/admin/*': {
       //         // target: 'http://openqa.zhaopin.com/app',
       //         target:"http://127.0.0.1:8081",
       //         secure: false,
       //         changeOrigin:true
       //     }
       // },
        setup: function(app) {
            // Here you can access the Express app object and add your own custom middleware to it.
            // For example, to define custom handlers for some paths:
            // app.get('/some/path', function(req, res) {
            //   res.json({ custom: 'response' });
            // });
                app.get("/admin/product/list.do",function (req,res) {
                    res.json({
                        data:{
                            total:100,
                            data:_.times(10,function () {
                                return {
                                    "productId": faker.random.number(),
                                    "showName": faker.name.title(),
                                    "urlPath":faker.internet.url(),
                                    "productDesc": faker.random.number()
                                }
                            })
                        }
                    });
                })

        },
    }
}
