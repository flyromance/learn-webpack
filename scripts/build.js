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
    // library: undefined => Object.assign(exports, module.exports);
    // library: xxx => exports[xxxx] = module.exports
    // library: 'default',
    // libraryExport: 'default',
    // libraryTarget: 'commonjs',

    libraryTarget: 'commonjs',
    libraryExport: 'default',
    library: 'ELEMENT',
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
