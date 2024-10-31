import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
    const proxy = createProxyMiddleware({
        target: 'https://api.langflow.astra.datastax.com',
        pathRewrite: {
            '^api': '/lf/efde00ae-4d32-4471-8e8d-26482560f5a9/api/v1/run/789d10ee-9573-4333-8fe2-52c048315d3d',
        },
        changeOrigin: true,
        secure: false,
        onProxyReq: (proxyReq, req) => {
          proxyReq.setHeader('Authorization', `Bearer ${process.env.NEXT_PUBLIC_APPLICATION_TOKEN}`);
        },
        onProxyRes: (proxyRes, req, res) => {
            // Define cabeçalhos de CORS na resposta do proxy
            res.setHeader('Access-Control-Allow-Origin', '*');  // Permite qualquer origem
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // Métodos permitidos
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization'); // Cabeçalhos permitidos
        },
    });

    return proxy(req, res);
}
