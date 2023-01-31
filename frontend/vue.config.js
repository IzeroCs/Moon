const { defineConfig } = require('@vue/cli-service')
const path = require("path")

module.exports = defineConfig({
  pages: {
    index: {
      entry: "./src/Main.js"
    }
  },
  chainWebpack: config => {
    config.module.rule("fonts")
      .test(/\.^(ttf|woff|otf|eot|woff2)$/)
      .use("file-loader")
      .loader("file-loader")
      .tap(options => {
        if (typeof options !== "undefined")
          options.fallback.options.name = "[name].[ext]"
        return options;
      })
  },
  devServer: {
    proxy: "http://127.0.0.1:3030"
  },
  transpileDependencies: true,
})
