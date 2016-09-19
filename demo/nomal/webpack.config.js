
/**
 * Created by daishun on 2016/9/18.
 */
var path=require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack=require('webpack');
var _=require('lodash');
var faker=require('faker');
module.exports={
    resolve:{
        extensions:['','.js','.jsx']
    },
    entry:{
        App:"./src/components/App.jsx"
    },
    output:{
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        library: ["$open", "[name]"],
        libraryTarget: "umd",
        umdNamedDefine:'true'
    },
    module:{
        loaders:[
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            // {
            //     test: /\.css$/,
            //     loaders: [
            //         'style?sourceMap',
            //         'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            //     ]
            // },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)$/,    loader: "file-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:"src/utils/index.html"
        }),
        new webpack.optimize.UglifyJsPlugin({//压缩代码
            compress: {
                warnings: false
            }
        })
    ],
    devServer:{
        inline:true,
        host:"127.0.0.1",
        port:3000,
        contentBase:"dist",
        proxy: {
            // 'openAdmin/*': {
            //     target:"127.0.0.1:3000",
            //     secure: false,
            //     changeOrigin:true
            // }
        },
        setup: function(app) {
            app.get("/openAdmin/app/appList.do",function (req,res) {
                res.json(
                        _.times(10,function () {
                            return {
                                "clientId": faker.random.number(),
                                "clientName": faker.name.title(),
                                "developerName":faker.name.findName(),
                                "clientUrl": faker.internet.url(),
                                "redirectUrl":faker.internet.url(),
                                "clientStatus":faker.random.number(2)
                            }
                        })
                );
            })

        },
    }
}