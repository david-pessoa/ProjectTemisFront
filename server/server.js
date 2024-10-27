import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();

const allowedOrigins = ['http://localhost:3000']; // Ou 'http://localhost:3000' para dev

app.use(cors({
    origin: function(origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Proxy para a API externa
app.use('/api', createProxyMiddleware({
    target: 'https://api.langflow.astra.datastax.com/lf/8906cd75-1f84-48ee-a0cb-c87fefadf2d3/api/v1/run/495c887a-ad45-4831-b9c9-28f314b17197?stream=false', // URL da API Langflow
    changeOrigin: true,
    pathRewrite: { '^/api': '' } // Remove o prefixo '/api' das requisições
}));

const PORT = 3000; // Ou outra porta
app.listen(PORT, () => {
    console.log(`Servidor proxy rodando na porta ${PORT}`);
});
