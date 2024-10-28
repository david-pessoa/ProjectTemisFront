import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
    app.use(
      '/api/rota',
      createProxyMiddleware({
        target: 'https://private-backend-url.awsapprunner.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/test'
        },
      })
    );
  };