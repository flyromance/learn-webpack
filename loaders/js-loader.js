const babel = require("@babel/core");

module.exports = function (source) {
  console.log("js-loader");
  const loaderContext = this;
  const { code } = babel.transform(source, {
    plugins: [
      // ['@babel/plugin-syntax-dynamic-import', {}],
    ],
  });

  return code;
};
