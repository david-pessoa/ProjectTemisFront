import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
    const proxy = createProxyMiddleware({
        target: 'https://api.langflow.astra.datastax.com',
        pathRewrite: {
            '': '/lf/efde00ae-4d32-4471-8e8d-26482560f5a9/api/v1/run/789d10ee-9573-4333-8fe2-52c048315d3d',
        },
        changeOrigin: true,
        secure: false,
        onProxyReq: (proxyReq, req) => {
            // Filtra cabeçalhos desnecessários
            const headersToKeep = ["Authorization", "Content-Type"];
            headersToKeep.forEach(header => {
                if (req.headers[header.toLowerCase()]) {
                    proxyReq.setHeader(header, req.headers[header.toLowerCase()]);
                }
            });
        },
    });

    return proxy(req, res);
}
