const path = require("path");
const webpack = require("./lib");

webpack(
  {
    entry: "./demo/index.js",
    output: {
      path: path.resolve("dist"),
      filename: "bundle_mini.js",
      publicPath: '/',
    },
  },
  (err, result) => {
    console.log("build complete");
  }
);
