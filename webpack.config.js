const path = require("path")
// const webpack = require("webpack")
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {


    // entry: {
    //     app: "./assets/js/script.js",
    //     events: "./assets/js/events.js",
    //     schedule: "./assets/js/schedule.js",
    //     tickets: "./assets/js/tickets.js"
    // },
    // output: {
    //     // filename: "[name].bundle.js",
    //     path: __dirname + "public/dist",
    //     publicPath: 'production' ? '/food-festival/dist' : _dirname + "/dist"
    // },
    plugins: [
        new WebpackPwaManifest({
            name: "Budget Tracker",
            short_name: "Tracker",
            description: "Track your monthly expenses simplified!",
            start_url: "./public/index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            fingerprints: false,
            inject: false,
            icons: [{
              src: path.resolve("public/icons/icon-512x512.png"),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join("public")
            }]
          })
    ],
    mode: 'development',
    // module: {
    //     rules: [
    //       {
    //         test: /\.jpg$/i,
    //         use: [
    //             {
    //                 loader: 'file-loader',
    //                 options: {
    //                     esModule: false,
    //                     name (file) {
    //                     return "[path][name].[ext]"
    //                     },
    //                     publicPath: function(url) {
    //                     return url.replace("../", "/assets/")
    //                     }
    //                 }
    //             },
    //             {
    //                 loader: 'image-webpack-loader'
    //             }
    //           ]
    //       }
    //     ]
    // }
    // ,
    // devServer: {
    //     static: {
    //         directory: path.join(__dirname, './public')
    //     },
    //     compress: true,
    //     port: 9000
    // }
}