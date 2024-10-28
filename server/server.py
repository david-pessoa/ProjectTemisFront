from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests

app = FastAPI()

# Permitir requisições do front-end e do domínio de produção
origins = [
    "http://localhost:3000",
    "https://main.d21ve57798n4rc.amplifyapp.com"
]

TARGET_URL = "https://api.langflow.astra.datastax.com/lf/efde00ae-4d32-4471-8e8d-26482560f5a9/api/v1/run/789d10ee-9573-4333-8fe2-52c048315d3d?stream=false"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Proxy que redireciona para o TARGET_URL
@app.api_route("/server", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"])
async def redirect_request(request: Request):
    method = request.method
    headers = dict(request.headers)
    headers["Authorization"] = "Bearer AstraCS:eITJWgcxrHBmiMyuOBnJaQxw:f41642d1db696db910f69a8e3cc1753a69c51e2bcaa285f4e0e3805f2980dcc1"  # Inclua seu token para LangFlow
    headers["Content-Type"] = "application/json"  # Defina o cabeçalho Content-Type para JSON

    body = await request.body()

    # Faz a requisição para o LangFlow
    response = requests.request(method, TARGET_URL, headers=headers, data=body)

    # Retorna a resposta do LangFlow para o front-end
    return JSONResponse(content=response.json(), status_code=response.status_code)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
