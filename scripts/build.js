const path = require("path");
const webpack = require("webpack");
const importCwd = require("import-cwd");

// loader必须是字符串
const babelLoader = path.resolve("./loaders/babel-loader");
const lessLoader = path.resolve("./loaders/less-loader");
const cssLoader = path.resolve("./loaders/css-loader");

// 模块
const CompilerPlugin = importCwd("./plugins/compiler-plugin");
const CompilationPlugin = importCwd("./plugins/compilation-plugin");

const config = {
  mode: "none",
  devtool: "none",
  optimization: {
    minimize: false,
    // splitChunks: false,
    namedModules: true,
    namedChunks: true,
  },
  entry: "./src/index.js",

  // entry: "./src/tree-shaking.js",

  // entry: "./src/require_context.js",
  // entry: './src/require_ensure.js',
  // entry: './src/require.js',
  // entry: './src/import.js',

  output: {
    path: path.resolve("dist"),
    filename: "[name].js", // name 默认是 main
    chunkFilename: "[name].chunk.js",
    publicPath: "/",

    // libraryExport 不依赖 libraryTarget 和 library
    // libraryExport: "default", // xxx = ()({})[libraryExport];

    // libraryTarget: 'this', // 表示全局变量 this[library] = ()({});
    // libraryTarget: undefined, // 表示全局变量 var [library] = ()({});
    // libraryTarget: 'window', // 表示全局变量 window[library] = ()();
    // library: "ELEMENT", // 

    // 导出全部暴露到全局，这种情况会报错!!! 
    // libraryTarget: undefined,
    // library: {},

    // 导出暴露到 exports
    libraryTarget: "commonjs", // exports[library] = ()({});
    library: "ELEMENT",

    // 全部导出
    // libraryTarget: "commonjs",
    // library: undefined, => Object.assign(exports, module.exports);


  },
  externals: {
    axios: {
      commonjs: "axios", // 如果此次打包时作为commonjs导出，window.axios 转为 require('axios')
      root: "axios",
    },
    // axios: 'axios'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: babelLoader, // 不能写成 require("./loaders/loader1")
            options: {
              aa: "123",
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: cssLoader,
          },
          {
            loader: lessLoader,
            options: {
              lessOptions: {},
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new CompilerPlugin(),
    // new CompilationPlugin()
  ],
};

webpack(config, (err, result) => {
  console.log("build complete");
});
