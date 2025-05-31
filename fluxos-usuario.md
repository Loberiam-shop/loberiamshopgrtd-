# Fluxos de Usuário para o E-commerce Loberiam Shop

Este documento detalha os principais fluxos de usuário do e-commerce Loberiam Shop, mapeando todas as interações e etapas que o usuário percorrerá ao utilizar a plataforma.

## 1. Fluxo de Cadastro e Login

### 1.1 Cadastro de Novo Usuário
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Formulário │     │  Validação  │     │  Criação    │     │  Redireção  │
│  acessa     │────►│  de         │────►│  dos        │────►│  da         │────►│  para       │
│  "Cadastro" │     │  cadastro   │     │  campos     │     │  conta      │     │  Dashboard  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário clica em "Criar conta" no header ou durante o checkout
2. Sistema exibe formulário de cadastro com campos:
   - Nome completo
   - E-mail
   - Senha (com requisitos de segurança)
   - Confirmação de senha
   - CPF/CNPJ
   - Data de nascimento
   - Telefone
   - Aceite dos termos e políticas
3. Usuário preenche os campos e submete o formulário
4. Sistema valida os dados em tempo real:
   - Verifica se e-mail já está cadastrado
   - Valida formato de e-mail, CPF/CNPJ
   - Verifica força da senha
5. Se houver erros, sistema exibe mensagens específicas para cada campo
6. Se dados forem válidos, sistema cria a conta e exibe mensagem de sucesso
7. Sistema envia e-mail de confirmação
8. Usuário é redirecionado para o dashboard ou página anterior

### 1.2 Login de Usuário
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Formulário │     │  Validação  │     │  Redireção  │
│  acessa     │────►│  de         │────►│  de         │────►│  para       │
│  "Login"    │     │  login      │     │  credenciais│     │  Dashboard  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário clica em "Entrar" no header
2. Sistema exibe formulário de login com campos:
   - E-mail
   - Senha
   - Opção "Lembrar-me"
   - Link para "Esqueci minha senha"
3. Usuário preenche credenciais e submete
4. Sistema valida as credenciais
5. Se inválidas, exibe mensagem de erro
6. Se válidas, autentica o usuário e:
   - Armazena token de autenticação
   - Carrega dados do usuário
   - Sincroniza carrinho (se houver itens no carrinho anônimo)
7. Redireciona para página anterior ou dashboard

### 1.3 Recuperação de Senha
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  "Esqueci   │     │  Formulário │     │  Envio de   │     │  Formulário │     │  Senha      │
│  minha      │────►│  de e-mail  │────►│  link de    │────►│  nova       │────►│  alterada   │
│  senha"     │     │             │     │  recuperação│     │  senha      │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário clica em "Esqueci minha senha"
2. Sistema exibe formulário para informar e-mail
3. Usuário informa e-mail e submete
4. Sistema verifica se e-mail existe na base
5. Sistema envia e-mail com link de recuperação (simulado)
6. Usuário clica no link recebido
7. Sistema exibe formulário para nova senha
8. Usuário define nova senha e confirma
9. Sistema atualiza a senha e exibe confirmação
10. Usuário é redirecionado para tela de login

## 2. Fluxo de Navegação e Busca de Produtos

### 2.1 Navegação por Categorias
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Menu de    │     │  Listagem   │     │  Filtros e  │
│  acessa     │────►│  categorias │────►│  de         │────►│  ordenação  │
│  Home       │     │             │     │  produtos   │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário acessa a página inicial
2. Sistema exibe menu de categorias principais
3. Usuário seleciona uma categoria
4. Sistema exibe subcategorias (se houver)
5. Usuário seleciona subcategoria ou continua com categoria principal
6. Sistema exibe listagem de produtos da categoria selecionada
7. Usuário pode:
   - Aplicar filtros (preço, marca, avaliação, etc.)
   - Alterar ordenação (mais vendidos, menor preço, etc.)
   - Alternar entre visualização em lista ou grade
   - Navegar entre páginas de resultados

### 2.2 Busca de Produtos
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Sistema    │     │  Exibição   │     │  Refinamento│
│  utiliza    │────►│  processa   │────►│  de         │────►│  de         │
│  busca      │     │  busca      │     │  resultados │     │  resultados │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário digita termo na barra de busca
2. Sistema exibe sugestões em tempo real
3. Usuário seleciona sugestão ou submete busca
4. Sistema exibe resultados relevantes
5. Usuário pode:
   - Aplicar filtros específicos
   - Ordenar resultados
   - Refinar a busca com termos adicionais
   - Navegar entre páginas de resultados

### 2.3 Visualização de Produto
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Página de  │     │  Interação  │     │  Adição ao  │
│  seleciona  │────►│  detalhes   │────►│  com        │────►│  carrinho/  │
│  produto    │     │  do produto │     │  produto    │     │  favoritos  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário clica em um produto na listagem
2. Sistema exibe página de detalhes com:
   - Galeria de imagens com zoom
   - Preço, descontos e condições de pagamento
   - Descrição e especificações técnicas
   - Avaliações e comentários
   - Produtos relacionados
3. Usuário pode:
   - Navegar pelas imagens do produto
   - Selecionar variações (cor, tamanho, etc.)
   - Calcular frete (informando CEP)
   - Ler avaliações e perguntas
   - Ajustar quantidade
4. Usuário decide:
   - Adicionar ao carrinho
   - Comprar agora (ir direto para checkout)
   - Adicionar aos favoritos
   - Voltar à navegação

## 3. Fluxo de Carrinho de Compras

### 3.1 Adição de Produtos ao Carrinho
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Produto    │     │  Confirmação│     │  Mini-      │
│  clica em   │────►│  adicionado │────►│  visual     │────►│  carrinho   │
│  "Adicionar"│     │  ao carrinho│     │             │     │  atualizado │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário clica em "Adicionar ao carrinho" na página do produto ou listagem
2. Sistema adiciona produto ao carrinho (localStorage/Redux)
3. Sistema exibe confirmação visual (animação, notificação)
4. Mini-carrinho no header é atualizado com quantidade e valor
5. Usuário pode:
   - Continuar comprando
   - Ver carrinho completo
   - Finalizar compra

### 3.2 Gerenciamento do Carrinho
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Exibição   │     │  Atualização│     │  Cálculos   │
│  acessa     │────►│  de itens   │────►│  de itens/  │────►│  automáticos│
│  carrinho   │     │  do carrinho│     │  quantidades│     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário clica em "Carrinho" no header
2. Sistema exibe página do carrinho com:
   - Lista de produtos adicionados
   - Quantidade de cada item
   - Preço unitário e subtotal
   - Total da compra
3. Usuário pode:
   - Alterar quantidade de itens
   - Remover itens
   - Aplicar cupom de desconto
   - Calcular frete
4. Sistema atualiza automaticamente:
   - Subtotais por item
   - Valor do frete
   - Descontos aplicados
   - Total da compra
5. Usuário decide:
   - Continuar comprando
   - Finalizar compra

### 3.3 Finalização de Compra (Checkout)
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Login ou   │     │  Endereço   │     │  Pagamento  │     │  Confirmação│
│  inicia     │────►│  cadastro   │────►│  de         │────►│  e          │────►│  do         │
│  checkout   │     │  (se anônimo)     │  entrega    │     │  revisão    │     │  pedido     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário clica em "Finalizar compra"
2. Se não estiver logado, sistema solicita login ou cadastro
3. Sistema exibe etapa de endereço:
   - Seleção de endereço cadastrado ou
   - Cadastro de novo endereço
4. Sistema exibe opções de frete com prazos e valores
5. Usuário seleciona opção de frete
6. Sistema exibe etapa de pagamento:
   - Cartão de crédito (com parcelamento)
   - Boleto bancário
   - Pix
7. Usuário informa dados de pagamento
8. Sistema exibe resumo do pedido para revisão
9. Usuário confirma pedido
10. Sistema processa pedido e exibe confirmação com:
    - Número do pedido
    - Resumo da compra
    - Instruções de pagamento (se aplicável)
    - Prazo de entrega estimado
11. Sistema envia e-mail de confirmação

## 4. Fluxo do Painel do Usuário

### 4.1 Dashboard e Visão Geral
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Dashboard  │     │  Navegação  │
│  acessa     │────►│  com visão  │────►│  entre      │
│  "Minha Conta"    │  geral      │     │  seções     │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário logado acessa "Minha Conta"
2. Sistema exibe dashboard com:
   - Resumo de pedidos recentes
   - Dados pessoais resumidos
   - Endereços cadastrados
   - Favoritos recentes
3. Menu lateral com acesso a todas as seções
4. Usuário navega entre as seções do painel

### 4.2 Gerenciamento de Pedidos
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Listagem   │     │  Detalhes   │     │  Ações      │
│  acessa     │────►│  de         │────►│  do         │────►│  específicas │
│  "Pedidos"  │     │  pedidos    │     │  pedido     │     │  do pedido  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário acessa "Meus Pedidos" no painel
2. Sistema exibe lista de pedidos com:
   - Número do pedido
   - Data
   - Valor total
   - Status atual
3. Usuário seleciona um pedido
4. Sistema exibe detalhes completos:
   - Itens comprados
   - Valores e quantidades
   - Endereço de entrega
   - Forma de pagamento
   - Histórico de status
   - Código de rastreamento (se disponível)
5. Usuário pode:
   - Acompanhar entrega
   - Solicitar cancelamento (se aplicável)
   - Solicitar troca/devolução (se aplicável)
   - Avaliar produtos recebidos

### 4.3 Gerenciamento de Dados Pessoais
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Formulário │     │  Edição     │     │  Confirmação│
│  acessa     │────►│  com dados  │────►│  de         │────►│  de         │
│  "Meus Dados"     │  atuais     │     │  dados      │     │  alterações │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário acessa "Meus Dados" no painel
2. Sistema exibe formulário com dados atuais:
   - Nome completo
   - E-mail
   - CPF/CNPJ
   - Data de nascimento
   - Telefone
3. Usuário edita campos desejados
4. Sistema valida dados em tempo real
5. Usuário salva alterações
6. Sistema confirma atualização

### 4.4 Gerenciamento de Endereços
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Lista de   │     │  Adição/    │
│  acessa     │────►│  endereços  │────►│  edição de  │
│  "Endereços"│     │  cadastrados│     │  endereço   │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário acessa "Meus Endereços" no painel
2. Sistema exibe lista de endereços cadastrados
3. Usuário pode:
   - Adicionar novo endereço
   - Editar endereço existente
   - Excluir endereço
   - Definir endereço padrão
4. Ao adicionar/editar, sistema exibe formulário com:
   - CEP (com busca automática)
   - Logradouro
   - Número
   - Complemento
   - Bairro
   - Cidade
   - Estado
   - Identificação do endereço (ex: "Casa", "Trabalho")
5. Sistema valida dados e salva alterações

### 4.5 Gerenciamento de Favoritos
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Lista de   │     │  Ações nos  │     │  Adição ao  │
│  acessa     │────►│  produtos   │────►│  produtos   │────►│  carrinho   │
│  "Favoritos"│     │  favoritos  │     │  favoritos  │     │  (opcional) │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário acessa "Meus Favoritos" no painel
2. Sistema exibe grade de produtos marcados como favoritos
3. Usuário pode:
   - Remover item dos favoritos
   - Ver detalhes do produto
   - Adicionar ao carrinho
   - Organizar por categorias (opcional)

## 5. Fluxos Adicionais

### 5.1 Avaliação de Produtos
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Formulário │     │  Envio da   │     │  Exibição   │
│  inicia     │────►│  de         │────►│  avaliação  │────►│  na página  │
│  avaliação  │     │  avaliação  │     │             │     │  do produto │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário acessa opção de avaliar produto (na página do produto ou em "Meus Pedidos")
2. Sistema verifica se usuário comprou o produto
3. Sistema exibe formulário de avaliação:
   - Classificação por estrelas
   - Campo para comentário
   - Opção para enviar fotos
4. Usuário preenche avaliação e envia
5. Sistema processa e exibe na página do produto

### 5.2 Perguntas e Respostas
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Usuário    │     │  Formulário │     │  Envio da   │     │  Exibição   │
│  inicia     │────►│  de         │────►│  pergunta   │────►│  na página  │
│  pergunta   │     │  pergunta   │     │             │     │  do produto │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Usuário acessa seção de perguntas na página do produto
2. Usuário clica em "Fazer uma pergunta"
3. Sistema exibe campo para pergunta
4. Usuário envia pergunta
5. Sistema processa e exibe na página do produto
6. (Simulação) Resposta é adicionada após alguns instantes

### 5.3 Notificações e Alertas
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Evento     │     │  Geração de │     │  Exibição   │
│  relevante  │────►│  notificação│────►│  para o     │
│  ocorre     │     │             │     │  usuário    │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Etapas detalhadas:**
1. Eventos que geram notificações:
   - Alteração de status de pedido
   - Resposta a pergunta/avaliação
   - Produto de volta ao estoque
   - Promoções de produtos favoritos
2. Sistema gera notificação
3. Notificação é exibida:
   - No painel do usuário
   - Como toast/popup no site
   - Por e-mail (simulado)

## Considerações Importantes

### Persistência de Dados
- Carrinho de compras persistido mesmo sem login (localStorage)
- Sincronização do carrinho quando usuário faz login
- Favoritos salvos apenas para usuários logados

### Estados de Transição
- Feedback visual para todas as ações (loading, sucesso, erro)
- Mensagens claras de erro e instruções para correção
- Confirmações para ações irreversíveis (ex: remover item, cancelar pedido)

### Responsividade
- Todos os fluxos adaptados para dispositivos móveis
- Simplificação de etapas em telas menores
- Manutenção da usabilidade em qualquer dispositivo

### Acessibilidade
- Navegação por teclado em todos os fluxos
- Mensagens de erro acessíveis por leitores de tela
- Contraste adequado e textos legíveis

Este documento serve como guia para implementação de todos os fluxos de usuário do e-commerce Loberiam Shop, garantindo uma experiência completa e funcional, similar aos grandes marketplaces do mercado.
