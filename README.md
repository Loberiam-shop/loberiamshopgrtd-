# Documentação do E-commerce Loberiam Shop

## Visão Geral

O Loberiam Shop é um e-commerce completo e funcional, desenvolvido para oferecer uma experiência de compra online moderna e intuitiva. O sistema inclui todas as funcionalidades essenciais de uma loja virtual, como navegação por categorias, busca de produtos, carrinho de compras, cadastro e login de usuários, painel do cliente e fluxo de checkout.

## Arquitetura

O projeto foi desenvolvido utilizando uma arquitetura moderna de aplicação web:

- **Frontend**: React.js com Material-UI para interface de usuário
- **Gerenciamento de Estado**: Redux com Redux Toolkit
- **Backend Simulado**: API REST com JSON Server
- **Persistência de Dados**: LocalStorage e JSON

## Funcionalidades Principais

### Navegação e Catálogo
- Página inicial com banners promocionais rotativos
- Navegação por categorias e subcategorias
- Listagem de produtos com filtros e ordenação
- Página de detalhes do produto com imagens, descrição e especificações
- Sistema de busca por palavras-chave

### Usuário e Conta
- Cadastro de novos usuários
- Login e autenticação
- Painel do cliente com:
  - Dados pessoais
  - Endereços
  - Pedidos
  - Lista de favoritos
  - Métodos de pagamento

### Carrinho e Checkout
- Adição de produtos ao carrinho
- Atualização de quantidades
- Remoção de itens
- Aplicação de cupons de desconto
- Seleção de endereço de entrega
- Escolha de método de envio
- Seleção de forma de pagamento
- Confirmação e finalização de pedido

### Recursos Adicionais
- Lista de favoritos
- Histórico de pedidos
- Responsividade para todos os dispositivos
- Animações e transições suaves
- Feedback visual para ações do usuário

## Guia de Instalação e Execução

### Requisitos
- Node.js 14.x ou superior
- NPM 6.x ou superior

### Instalação

1. Extraia o arquivo ZIP do projeto em uma pasta de sua preferência
2. Abra um terminal na pasta do projeto
3. Instale as dependências do frontend:
```
cd loberiam-ecommerce
npm install
```
4. Instale as dependências do backend simulado:
```
cd backend
npm install json-server jsonwebtoken bcryptjs
```

### Execução

1. Inicie o backend simulado:
```
cd backend
node server.js
```
2. Em outro terminal, inicie o frontend:
```
cd loberiam-ecommerce
npm start
```
3. Acesse o site em seu navegador através do endereço:
```
http://localhost:3000
```

### Credenciais de Teste
Para testar o sistema com um usuário já cadastrado, utilize:
- Email: cliente@exemplo.com
- Senha: senha123

## Estrutura de Arquivos

```
loberiam-ecommerce/
├── public/                  # Arquivos públicos
│   ├── assets/              # Imagens e recursos estáticos
│   └── index.html           # Página HTML principal
├── src/                     # Código-fonte do frontend
│   ├── components/          # Componentes React reutilizáveis
│   ├── pages/               # Páginas da aplicação
│   ├── redux/               # Gerenciamento de estado com Redux
│   ├── services/            # Serviços de API e integração
│   ├── hooks/               # Hooks personalizados
│   ├── utils/               # Funções utilitárias
│   ├── constants/           # Constantes e configurações
│   ├── styles/              # Estilos globais
│   ├── routes/              # Configuração de rotas
│   └── tests/               # Testes automatizados
├── backend/                 # Backend simulado
│   ├── server.js            # Servidor API
│   └── db.json              # Banco de dados JSON
└── package.json             # Configurações do projeto
```

## Personalização

### Produtos e Categorias
Para adicionar ou modificar produtos e categorias, edite o arquivo `backend/db.json`.

### Aparência
Para personalizar cores, fontes e estilos:
1. Edite o arquivo `src/styles/theme.js` para alterar o tema global
2. Modifique os arquivos CSS em `src/styles/` para ajustes específicos

### Banners e Imagens
Substitua as imagens em `public/assets/images/` mantendo os mesmos nomes de arquivo ou atualize os caminhos no código.

## Implantação em Produção

Para implantar o site em um ambiente de produção:

1. Construa a versão otimizada do frontend:
```
npm run build
```

2. O resultado estará na pasta `build/`

3. Implante o conteúdo da pasta `build/` em seu servidor web

4. Para o backend, você pode:
   - Continuar usando o backend simulado (apenas para demonstração)
   - Implementar um backend real com Node.js, Express e MongoDB
   - Utilizar serviços de backend como Firebase ou Supabase

## Suporte e Contato

Para suporte técnico ou dúvidas sobre o projeto, entre em contato através do email: suporte@loberiam.com

---

© 2025 Loberiam Shop - Todos os direitos reservados
