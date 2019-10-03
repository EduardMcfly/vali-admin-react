let mix = require("laravel-mix");

mix.disableSuccessNotifications();

var LiveReloadPlugin = require("webpack-livereload-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

// Variable definida en el .env

/*
|--------------------------------------------------------------------------
| Mix publicPath
|--------------------------------------------------------------------------
|
| Defina la url de la carpeta del proyecto
| o la ruta absoluta ejemplo:
| var publicPath = http://127.0.0.1/cosva/public;
|
*/
var publicPath = process.env.MIX_SENTRY_DSN_PUBLIC;

const path = require("path");
/* var SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin"); */

/* mix.browserSync(publicPath) */

const workboxPlugin = require("workbox-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

mix.setPublicPath("public/build/");
mix.setResourceRoot(publicPath + "/build/");

mix.config.fileLoaderDirs = {
  images: "images",
  fonts: "fonts"
};

mix.webpackConfig({
  plugins: [
    new LiveReloadPlugin()
    /* new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$|\.svg$/,
            threshold: 10240,
            minRatio: 0.8
        }) */
  ],
  output: {
    publicPath: publicPath + "/build/",
    chunkFilename: "chunk/[name].js"
  }
});
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
if (mix.inProduction()) {
  mix.version();
  mix.webpackConfig({
    plugins: [
      new workboxPlugin.GenerateSW({
        cacheId: "Cosva",
        //  swSrc: './src/sw.js',
        swDest: path.join(`${__dirname}/public`, "service-worker.js"),
        importWorkboxFrom: "local",
        /* clientsClaim: true, */
        /* skipWaiting: true, */
        runtimeCaching: [
          {
            urlPattern: new RegExp(`${process.env.APP_URL}`),
            handler: "networkFirst",
            options: {
              cacheName: `${process.env.APP_NAME}-${process.env.APP_ENV}`
            }
          }
        ]
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: path.join(`${__dirname}/public`, "webpack-report.html"),
        openAnalyzer: false,
        logLevel: "silent"
      })
    ]
  });
} else {
  /* mix.copy("public/build/css/app.css", "public/css/app.css"); */
}

mix.styles(
  [
    /* "resources/assets/css/animate.css" , */ "resources/assets/css/preloader.css"
  ],
  path.resolve(__dirname, "public/build/css/all.css")
);

mix.extract([
  "react",
  "react-dom",
  "aos",
  "aos/dist/aos.css",
  "sweetalert2",
  "axios",
  "moment",
  "lodash"
]);
mix.sass("src/sass/app.scss", "css/app.css");
mix.react("src/index.js", "app.js");
