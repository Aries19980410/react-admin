// const {createProxyMiddleware} = require("http-proxy-middleware");
 
// module.exports = function(app) {
//   app.use(
//     createProxyMiddleware("/api", {
//       target: "http://localhost:10030",//跨域地址
//       changeOrigin: true,
//       pathRewrite: {
//         "^/api": "",
//       },
//     })
//   );
// };