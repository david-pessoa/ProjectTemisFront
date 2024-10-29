import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.langflow.astra.datastax.com/',
    pathRewrite: {
      '^/api': '/lf/efde00ae-4d32-4471-8e8d-26482560f5a9/api/v1/run/789d10ee-9573-4333-8fe2-52c048315d3d',
    },
    secure: false,
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
      // Cabeçalhos permitidos explicitamente
      const headersToKeep = {
        "authorization": req.headers["authorization"],
        "content-type": req.headers["content-type"]
      };

      // Remove todos os cabeçalhos do proxy
      Object.keys(proxyReq.getHeaders()).forEach(header => proxyReq.removeHeader(header));

      // Adiciona apenas os cabeçalhos especificados em headersToKeep
      proxyReq.setHeader('Authorization', req.headers['authorization']);
      proxyReq.setHeader('Content-Type', req.headers['content-type']);

      // Log para confirmar quais cabeçalhos estão sendo enviados
      console.log("Headers encaminhados:", proxyReq.getHeaders());
    },
  })
);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
