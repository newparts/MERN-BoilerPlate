"use strict";var _require=require("http-proxy-middleware"),createProxyMiddleware=_require.createProxyMiddleware;module.exports=function(e){e.use("/api",createProxyMiddleware({target:"http://localhost:5013",changeOrigin:!0}))};