#!/bin/bash
set -e

# Verifica se o comando já foi executado
if [ ! -f /tmp/comando_executado ]; then
    # Executa o comando
DATABASE_URL=$(cat /run/secrets/DATABASE_URL)
export DATABASE_URL
    npx prisma migrate deploy
    
    # Cria o arquivo de controle para indicar que o comando foi executado
    touch /tmp/comando_executado
fi

# Iniciar o serviço principal (por exemplo, iniciar o aplicativo Node.js)
echo "Starting the main service..."

node ./dist/app.js

exec "$@"