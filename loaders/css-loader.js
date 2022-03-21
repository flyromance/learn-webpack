const loaderUtils = require("loader-utils");

module.exports = async function (source) {
  console.log("css-loader");
  
  const loaderContext = this;
  const cb = this.async();
  cb(null, "var a = 1;");
};
