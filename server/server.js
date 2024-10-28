const { createProxyMiddleware } = require("http-proxy-middleware");
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5500;

// Habilita o CORS
app.use(cors());


module.exports = function (app) {
  app.use(
    '/api', // Caminho de entrada local
    createProxyMiddleware({
      target: 'https://api.langflow.astra.datastax.com/', // Apenas o domínio principal
      pathRewrite: {
        '^/api': '/lf/efde00ae-4d32-4471-8e8d-26482560f5a9/api/v1/run/789d10ee-9573-4333-8fe2-52c048315d3d', // Reescreve o caminho
      },
      secure: false, // Ignora certificados SSL auto-assinados
      changeOrigin: true, // Necessário para evitar problemas de CORS
      onProxyReq: (proxyReq, req) => {
        // Copia todos os cabeçalhos que você deseja enviar
        Object.keys(req.headers).forEach((header) => {
          proxyReq.setHeader(header, req.headers[header]);
        });
      },
    })
  );

};
