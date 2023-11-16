#!/bin/sh
# vim:sw=4:ts=4:et
set -e

DATABASE_URL=$(cat /run/secrets/DATABASE_URL)
export DATABASE_URL


echo "Docker-Entrypoint iniciado"
# Verifica se o comando já foi executado
if [ ! -f /tmp/comando_executado ]; then
    # Executa o comando
    npx prisma migrate deploy
    
    # Cria o arquivo de controle para indicar que o comando foi executado
    touch /tmp/comando_executado
fi

node ./dist/app.js
echo "Docker-Entrypoint finalizado"

exec "$@"