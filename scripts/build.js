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

const testExterals = require("./node-externals");

const config = {
  mode: "none", // 默认是production

  // context: process.cwd(), // 默认是cwd，绝对

  devtool: false, // 默认是 false 或 'none'，不生成source-map

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

    // libraryTarget 的值决定 library 的用途

    // libraryTarget: undefined, // 默认就是var
    // library: 'element',

    // libraryTarget: 'var', // var [library] = ()({});
    // library: 'element',

    // libraryTarget: "window", // window[library] = ()({});
    // library: "element",

    // libraryTarget: 'this', // this[library] = ()({});
    // library: {
    //   root: 'element'
    // }

    // libraryTarget: 'global', // global[library] = ()({});
    // library: 'element',

    // 具名导出
    // libraryTarget: "commonjs",
    // library: "ELEMENT", // exports[library] = ()({});

    // 具名导出，同上
    // libraryTarget: "commonjs",
    // library: {
    //   commonjs: "Element",
    // },

    // 具名导出全部
    // libraryTarget: "commonjs",
    // library: undefined, // Object.assign(exports, module.exports);

    // 完全导出
    // libraryTarget: 'commonjs2', // module.exports = ()({});
    // library: 'xx', // 这个字段对于 commonjs2 来说没有用，会被忽略

    libraryTarget: "umd",
    library: 'element', // 所有的模式都用这个string
    // umdNamedDefine: true, // 默认是false， define(["axios"], factory) => define('element', [...], factory)
    // globalObject: 'typeof self !== \'undefined\' ? self : this', // 默认是 'window'
    // library: { // 针对每种类型单独定义
    //   root: "Element",
    //   commonjs: "element",
    //   amd: "element",
    // },
  },

  // 优先级比 resolve.alias 高
  externals: [
    {
      axios: {
        var: "axios.a", // 如果library为 var，替换为 module.exports = axios.a
        window: "axios.b", // 如果library为 window， module.exports = window['axios.b']
        this: "axios", // 如果library为 this， module.exports = this['axios.b']
        global: "axios", // 如果library为 this， module.exports = window['axios.b']
        commonjs: "axios.c", // 如果library为 commonjs，module.exports = require('axios.c');
        commonjs2: "axios.d", // 如果library为 commonjs，module.exports = require('axios.d');
        amd: "axios.e", // 如果library为 amd
        root: "Axios", // 如果library为 umd
      },
    },
    testExterals(),
  ],
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
