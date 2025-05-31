#!/bin/bash

# Script de inicialização do Loberiam Shop E-commerce
# Este script configura e inicia tanto o backend simulado quanto o frontend

echo "=== Iniciando Loberiam Shop E-commerce ==="
echo "Verificando dependências..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Erro: Node.js não está instalado. Por favor, instale o Node.js para continuar."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
NODE_MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)

if [ $NODE_MAJOR_VERSION -lt 14 ]; then
    echo "Aviso: Versão do Node.js ($NODE_VERSION) pode ser muito antiga. Recomendamos Node.js 14.x ou superior."
fi

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "Erro: npm não está instalado. Por favor, instale o npm para continuar."
    exit 1
fi

echo "Instalando dependências do backend..."
cd backend
npm install json-server jsonwebtoken bcryptjs --no-fund --no-audit || {
    echo "Erro ao instalar dependências do backend."
    exit 1
}

echo "Instalando dependências do frontend..."
cd ..
npm install --no-fund --no-audit || {
    echo "Erro ao instalar dependências do frontend."
    exit 1
}

# Iniciar backend em segundo plano
echo "Iniciando backend simulado na porta 3001..."
cd backend
node server.js > backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Verificar se o backend iniciou corretamente
sleep 3
if ! ps -p $BACKEND_PID > /dev/null; then
    echo "Erro: O backend não iniciou corretamente. Verifique o arquivo backend/backend.log para mais detalhes."
    exit 1
fi

# Iniciar frontend
echo "Iniciando frontend na porta 3000..."
npm start || {
    echo "Erro ao iniciar o frontend."
    # Matar o processo do backend se o frontend falhar
    kill $BACKEND_PID
    exit 1
}

# Este ponto só será alcançado se o usuário encerrar o frontend (Ctrl+C)
echo "Frontend encerrado. Encerrando backend..."
kill $BACKEND_PID

echo "=== Loberiam Shop E-commerce encerrado ==="
