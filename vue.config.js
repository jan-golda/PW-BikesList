module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.performance
      .maxEntrypointSize(4000000)
      .maxAssetSize(4000000)
  }
};
