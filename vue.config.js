module.exports = {
  lintOnSave: false,

  devServer: {
    open: process.platfrom === "darwin",
    host: "0.0.0.0",
    port: 6656,
    https: true,
    hotOnly: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    }
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `
                    @import "@/styles/home.scss";
                    @import "@/styles/modal.scss";
                    @import "@/styles/common.scss";
                    @import "@/styles/normalize.scss";
                `
      }
    }
  }
};
