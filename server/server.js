import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();

const allowedOrigins = ['https://main.d21ve57798n4rc.amplifyapp.com/']; // Ou 'http://localhost:3000' para dev

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
    target: 'https://api.langflow.astra.datastax.com', // URL da API Langflow
    changeOrigin: true,
    pathRewrite: { '^/api': '' } // Remove o prefixo '/api' das requisições
}));

const PORT = 3000; // Ou outra porta
app.listen(PORT, () => {
    console.log(`Servidor proxy rodando na porta ${PORT}`);
});
