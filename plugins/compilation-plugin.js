const { ConcatSource } = require('webpack-sources');

/**
 * 
optimizeModulesBasic optimizeModules optimizeModulesAdvanced afterOptimizeModules
optimizeChunkModulesBasic optimizeChunkModules optimizeChunkModulesAdvanced afterOptimizeChunkModules
optimizeChunksBasic optimizeChunks optimizeChunksAdvanced afterOptimizeChunks

basic Advanced 结尾的hook在5版本都会被去掉

class DependenciesBlock {

}

class Module extend DependenciesBlock {

}

class NormalModule extends Module {

}

module = new NormalModule();


 */
module.exports = class MyPlugin {
  apply(compiler) {
    const self = this;

    compiler.hooks.compilation.tap("init", function (compilation) {
      console.log("compilation", compilation);

      compilation.hooks.buildModule.tap("c2", function (module) {
        console.log("buildModule"); // 每个模块都会调用一次
      });
      compilation.hooks.rebuildModule.tap("c2", function (module) {
        console.log("rebuildModule");
      });
      compilation.hooks.succeedModule.tap("c2", function (module) {
        console.log("succeedModule"); // 每个模块都会调用一次
      });
      compilation.hooks.failedModule.tap("c2", function (module) {
        console.log("failedModule");
      });
      compilation.hooks.finishModules.tap("c2", function (module) {
        console.log("finishModules"); // 所有模块构建好了，调用一次
      });

      // 优化依赖
      compilation.hooks.optimizeDependencies.tap(
        "dependenies",
        function (modules) {
          console.log("optimizeDependencies");
        }
      );
      compilation.hooks.afterOptimizeDependencies.tap(
        "dependenies",
        function (modules) {
          console.log("afterOptimizeDependencies");
        }
      );

      // 开始优化前调用
      compilation.hooks.optimize.tap("c2", function () {
        console.log("optimize");
      });
      // SyncBailHook
      compilation.hooks.optimizeModules.tap("chunkhash", function (modules) {
        console.log("optimizeModules");
      });
      compilation.hooks.afterOptimizeModules.tap(
        "chunkhash",
        function (modules) {
          console.log("afterOptimizeModules");
        }
      );
      // SyncBailHook
      compilation.hooks.optimizeChunks.tap("chunkhash", function (modules) {
        console.log("optimizeChunks");
      });
      compilation.hooks.afterOptimizeChunks.tap(
        "chunkhash",
        function (modules) {
          console.log("afterOptimizeChunks");
        }
      );
      compilation.hooks.optimizeTree.tap("c2", function (module) {
        console.log("optimizeTree");
      });
      compilation.hooks.afterOptimizeTree.tap("c2", function (module) {
        console.log("afterOptimizeTree");
      });
      // SyncBailHook
      compilation.hooks.optimizeChunkModules.tap(
        "chunkhash",
        function (modules) {
          console.log("optimizeChunkModules");
        }
      );
      compilation.hooks.afterOptimizeChunkModules.tap(
        "chunkhash",
        function (modules) {
          console.log("afterOptimizeChunkModules");
        }
      );

      compilation.hooks.beforeModuleIds.tap("moduleids", function (modules) {
        console.log("beforeModuleIds");
      });
      compilation.hooks.moduleIds.tap("moduleids", function (modules) {
        console.log("moduleIds");
      });
      compilation.hooks.optimizeModuleIds.tap("moduleids", function (modules) {
        console.log("optimizeModuleIds");
      });
      compilation.hooks.afterOptimizeModuleIds.tap(
        "moduleids",
        function (modules) {
          console.log("afterOptimizeModuleIds");
        }
      );

      compilation.hooks.beforeChunkIds.tap("moduleids", function (chunks) {
        console.log("beforeChunkIds");
      });
      // chunkIds、beforeOptimizeChunkIds 在5版本才有
      compilation.hooks.optimizeChunkIds.tap("chunkids", function (chunks) {
        console.log("optimizeChunkIds");
      });
      compilation.hooks.afterOptimizeChunkIds.tap(
        "chunkids",
        function (chunks) {
          console.log("afterOptimizeChunkIds");
        }
      );

      compilation.hooks.beforeHash.tap("chunkhash", function () {
        console.log("beforeHash");
      });
      compilation.hooks.chunkHash.tap("chunkhash", function () {
        // 执行多次，每个chunk都执行一次
        console.log("chunkHash");
      });
      compilation.hooks.afterHash.tap("chunkhash", function () {
        console.log("afterHash");
      });

      // SyncWaterfallHook
      compilation.hooks.assetPath.tap("chunkhash", function (filename, data) {
        console.log("assetPath", filename, data); // 没有器作用
      });

      compilation.hooks.beforeModuleAssets.tap("chunkhash", function () {
        console.log("beforeModuleAssets");
      });
      compilation.hooks.additionalChunkAssets.tap("chunkhash", function () {
        console.log("additionalChunkAssets");
      });
      // SyncBailHook
      compilation.hooks.shouldGenerateChunkAssets.tap("chunkhash", function () {
        console.log("shouldGenerateChunkAssets");
      });
      compilation.hooks.beforeChunkAssets.tap("chunkhash", function () {
        console.log("beforeChunkAssets"); // Executed before creating the chunks assets.
      });
      compilation.hooks.additionalChunkAssets.tap(
        "chunkhash",
        function (assets) {
          // Create additional assets for the chunks. 给已存在的chunk添加内容
          console.log("additionalChunkAssets");
        }
      );
      // AsyncSeriesHook 给此次编译添加asset，很多插件都监听这个事件
      compilation.hooks.additionalAssets.tapAsync("chunkhash", function (cb) {
        console.log("additionalAssets");
        // compilation.assets["fanlong.js"] = "var a =1"; // 不能这么加，要用webpack-sources
        cb();
      });
      // AsyncSeriesHook 优化所有的chunk中的asset
      compilation.hooks.optimizeChunkAssets.tapAsync(
        "chunkhash",
        function (chunks, cb) {
          console.log("optimizeChunkAssets", chunks); // 是个[]
          // 给每个chunk加上banner
          chunks.forEach((chunk) => {
            chunk.files.forEach((file) => {
              // compilation.assets[file] = new ConcatSource(
              //   "/**Sweet Banner**/",
              //   "\n",
              //   compilation.assets[file]
              // );
            });
          });
          cb();
        }
      );
      compilation.hooks.afterOptimizeChunkAssets.tap(
        "chunkhash",
        function (chunks) {
          console.log("afterOptimizeChunkAssets", chunks);
          chunks.forEach((chunk) => {
            console.log({
              id: chunk.id,
              name: chunk.name,
              includes: chunk.getModules().map((module) => {
                const {
                  context, // 不是 wepack的上下文路径！！！
                  rawRequest, // 写在原始文件中的引用路径，没啥用
                  request, // 有loader信息的完整路径
                  useRequest, // 没有loader信息的完整路径，在文件系统中的绝对路径
                  id, // './' + path.relative(context, useRequest);
                } = module;
                // const source = module.source(); //  为什么报错
                return request;
              }),
            });
            //
          });
        }
      );
      // AsyncSeriesHook
      compilation.hooks.optimizeAssets.tapAsync(
        "chunkhash",
        function (assets, cb) {
          console.log("optimizeAssets", assets);
          cb();
        }
      );
      compilation.hooks.afterOptimizeAssets.tap("chunkhash", function (assets) {
        const keys = Object.keys(assets);
        for (let key of keys) {
          const asset = assets[key];
          const children = asset._source.children;
          // const content  = children[9].source();
          // console.log(content); 
        }
        console.log("afterOptimizeAssets", assets);
      });
    });
  }
};
