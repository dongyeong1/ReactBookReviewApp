const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/v1', {
      target: 'https://openapi.naver.com/',
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware('/oauth2.0',{
      target: 'https://nid.naver.com',
      changeOrigin: true,
    }),
  );
//   app.use(
//     createProxyMiddleware('/user',{
//       target: 'http://localhost:3065',
//       changeOrigin: true,
//     }),
//   );
};