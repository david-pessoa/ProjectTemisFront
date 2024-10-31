import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
    const proxy = createProxyMiddleware({
        target: 'https://api.langflow.astra.datastax.com',
        pathRewrite: {
            '^https://project-temis-front.vercel.app/api': 'https://api.langflow.astra.datastax.com/lf/efde00ae-4d32-4471-8e8d-26482560f5a9/api/v1/run/789d10ee-9573-4333-8fe2-52c048315d3d',
        },
        changeOrigin: true,
        secure: false,
        onProxyReq: (proxyReq, req) => {
          proxyReq.setHeader('Authorization', "Bearer AstraCS:eITJWgcxrHBmiMyuOBnJaQxw:f41642d1db696db910f69a8e3cc1753a69c51e2bcaa285f4e0e3805f2980dcc1");
          proxyReq.setHeader('Content-Type', "application/json");
        },
        onProxyRes: (proxyRes, req, res) => {
            // Define cabeçalhos de CORS na resposta do proxy
            res.setHeader('Access-Control-Allow-Origin', '*');  // Permite qualquer origem
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // Métodos permitidos
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization'); // Cabeçalhos permitidos
        },
    });
}

