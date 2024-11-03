# start.sh
#!/bin/sh
git pull # Atualiza repositório
npm start  # Inicia a aplicação principal
node proxy/server.js  # Inicia o servidor proxy
