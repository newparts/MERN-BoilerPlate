"use strict";

var _require = require('http-proxy-middleware'),
    createProxyMiddleware = _require.createProxyMiddleware;

module.exports = function (app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5013',
    changeOrigin: true
  }));
};