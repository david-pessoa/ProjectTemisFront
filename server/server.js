const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors({ origin: 'http://localhost:3000' })); // Especifique a origem permitida

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.langflow.astra.datastax.com/',
    pathRewrite: {
      '^/api': '/lf/efde00ae-4d32-4471-8e8d-26482560f5a9/api/v1/run/789d10ee-9573-4333-8fe2-52c048315d3d',
    },
    secure: false,
    changeOrigin: true,
    onProxyRes: (proxyRes) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'; // Adiciona o cabeçalho CORS
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
