#!/bin/bash
set -e

# Comandos de inicialização do contêiner, como configurações pré-início
echo "Performing pre-start actions..."

# Exemplo: Leitura de um segredo Docker e passagem para uma variável de ambiente
DATABASE_URL=$(cat /run/secrets/DATABASE_URL)
export DATABASE_URL

# Exibir informações sobre o segredo
echo "Docker secret value: $DATABASE_URL"

# Iniciar o serviço principal (por exemplo, iniciar o aplicativo Node.js)
echo "Starting the main service..."
exec "$@"