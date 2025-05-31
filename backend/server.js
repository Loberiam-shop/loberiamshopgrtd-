// Backend simulado para o e-commerce Loberiam Shop
// Este arquivo configura uma API simulada usando json-server e middlewares personalizados

const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// Configurações
const PORT = 3001;
const JWT_SECRET = 'loberiam-shop-secret-key';
const TOKEN_EXPIRY = '24h';

// Middlewares padrão (logger, static, cors e etc)
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Funções auxiliares
const getUsersDb = () => {
  const dbRaw = fs.readFileSync(path.join(__dirname, 'db.json'));
  const db = JSON.parse(dbRaw);
  return db.users;
};

const saveUsersDb = (users) => {
  const dbRaw = fs.readFileSync(path.join(__dirname, 'db.json'));
  const db = JSON.parse(dbRaw);
  db.users = users;
  fs.writeFileSync(
    path.join(__dirname, 'db.json'),
    JSON.stringify(db, null, 2)
  );
};

const createToken = (user) => {
  // Remover senha e dados sensíveis do payload
  const { password, ...userWithoutPassword } = user;
  return jwt.sign(userWithoutPassword, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

const verifyToken = (token) => {
  try {
    if (!token) return false;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
};

// Middleware de autenticação
const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
  
  // Adicionar usuário ao request para uso posterior
  req.user = user;
  next();
};

// Middleware para verificar se o usuário é o proprietário do recurso
const isOwner = (req, res, next) => {
  if (parseInt(req.user.id) !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  next();
};

// Endpoint de registro
server.post('/api/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  const users = getUsersDb();
  
  // Verificar se o e-mail já está em uso
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ error: 'Este e-mail já está em uso' });
  }
  
  // Criar novo usuário
  const newUser = {
    id: users.length + 1,
    email,
    password: bcrypt.hashSync(password, 10),
    firstName,
    lastName,
    createdAt: new Date().toISOString(),
    addresses: [],
    paymentMethods: [],
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      newsletter: true
    },
    security: {
      twoFactorEnabled: false
    }
  };
  
  // Salvar usuário
  users.push(newUser);
  saveUsersDb(users);
  
  // Gerar token e retornar usuário sem senha
  const { password: _, ...userWithoutPassword } = newUser;
  const token = createToken(newUser);
  
  res.status(201).json({
    user: userWithoutPassword,
    token
  });
});

// Endpoint de login
server.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }
  
  const users = getUsersDb();
  const user = users.find(user => user.email === email);
  
  // Verificar se o usuário existe e a senha está correta
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'E-mail ou senha incorretos' });
  }
  
  // Gerar token e retornar usuário sem senha
  const { password: _, ...userWithoutPassword } = user;
  const token = createToken(user);
  
  res.json({
    user: userWithoutPassword,
    token
  });
});

// Endpoint para obter dados do usuário atual
server.get('/api/me', isAuthenticated, (req, res) => {
  const users = getUsersDb();
  const user = users.find(user => user.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  // Retornar usuário sem senha
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Endpoint para atualizar dados do usuário
server.put('/api/users/:id', isAuthenticated, isOwner, (req, res) => {
  const userId = parseInt(req.params.id);
  const { firstName, lastName, email, phone, birthDate } = req.body;
  
  const users = getUsersDb();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  // Verificar se o e-mail já está em uso por outro usuário
  if (email !== users[userIndex].email && 
      users.some(user => user.email === email && user.id !== userId)) {
    return res.status(400).json({ error: 'Este e-mail já está em uso' });
  }
  
  // Atualizar dados do usuário
  users[userIndex] = {
    ...users[userIndex],
    firstName: firstName || users[userIndex].firstName,
    lastName: lastName || users[userIndex].lastName,
    email: email || users[userIndex].email,
    phone: phone || users[userIndex].phone,
    birthDate: birthDate || users[userIndex].birthDate,
    updatedAt: new Date().toISOString()
  };
  
  saveUsersDb(users);
  
  // Retornar usuário atualizado sem senha
  const { password, ...userWithoutPassword } = users[userIndex];
  res.json(userWithoutPassword);
});

// Endpoint para adicionar endereço
server.post('/api/users/:id/addresses', isAuthenticated, isOwner, (req, res) => {
  const userId = parseInt(req.params.id);
  const { street, number, complement, neighborhood, city, state, zipCode, isDefault } = req.body;
  
  if (!street || !number || !city || !state || !zipCode) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }
  
  const users = getUsersDb();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  // Criar novo endereço
  const newAddress = {
    id: Date.now(),
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    isDefault: isDefault || false,
    createdAt: new Date().toISOString()
  };
  
  // Se for endereço padrão, remover padrão dos outros
  if (newAddress.isDefault) {
    users[userIndex].addresses = users[userIndex].addresses.map(addr => ({
      ...addr,
      isDefault: false
    }));
  }
  
  // Adicionar endereço
  users[userIndex].addresses.push(newAddress);
  saveUsersDb(users);
  
  res.status(201).json(newAddress);
});

// Endpoint para adicionar método de pagamento
server.post('/api/users/:id/payment-methods', isAuthenticated, isOwner, (req, res) => {
  const userId = parseInt(req.params.id);
  const { cardNumber, cardHolder, expiryMonth, expiryYear, cardType, isDefault } = req.body;
  
  if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear || !cardType) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }
  
  const users = getUsersDb();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  // Mascarar número do cartão
  const lastFourDigits = cardNumber.slice(-4);
  const maskedCardNumber = `**** **** **** ${lastFourDigits}`;
  
  // Criar novo método de pagamento
  const newPaymentMethod = {
    id: Date.now(),
    cardNumber: maskedCardNumber,
    cardHolder,
    expiryMonth,
    expiryYear,
    cardType,
    isDefault: isDefault || false,
    createdAt: new Date().toISOString()
  };
  
  // Se for método padrão, remover padrão dos outros
  if (newPaymentMethod.isDefault) {
    users[userIndex].paymentMethods = users[userIndex].paymentMethods.map(method => ({
      ...method,
      isDefault: false
    }));
  }
  
  // Adicionar método de pagamento
  users[userIndex].paymentMethods.push(newPaymentMethod);
  saveUsersDb(users);
  
  res.status(201).json(newPaymentMethod);
});

// Endpoint para criar pedido
server.post('/api/orders', isAuthenticated, (req, res) => {
  const { items, shippingAddress, paymentMethod, shippingMethod } = req.body;
  
  if (!items || !items.length || !shippingAddress || !paymentMethod || !shippingMethod) {
    return res.status(400).json({ error: 'Dados incompletos para criar pedido' });
  }
  
  // Ler banco de dados
  const dbRaw = fs.readFileSync(path.join(__dirname, 'db.json'));
  const db = JSON.parse(dbRaw);
  
  // Calcular valores
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod.price;
  const discount = req.body.discount || 0;
  const total = subtotal + shipping - discount;
  
  // Criar novo pedido
  const newOrder = {
    id: db.orders.length + 1,
    userId: req.user.id,
    items,
    shippingAddress,
    paymentMethod,
    shippingMethod,
    status: 'pending',
    subtotal,
    shipping,
    discount,
    total,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    orderNumber: `LS-${Date.now().toString().slice(-6)}`
  };
  
  // Adicionar pedido
  db.orders.push(newOrder);
  fs.writeFileSync(
    path.join(__dirname, 'db.json'),
    JSON.stringify(db, null, 2)
  );
  
  res.status(201).json(newOrder);
});

// Endpoint para obter pedidos do usuário
server.get('/api/users/:id/orders', isAuthenticated, isOwner, (req, res) => {
  const userId = parseInt(req.params.id);
  
  const dbRaw = fs.readFileSync(path.join(__dirname, 'db.json'));
  const db = JSON.parse(dbRaw);
  
  const userOrders = db.orders.filter(order => order.userId === userId);
  res.json(userOrders);
});

// Endpoint para adicionar produto aos favoritos
server.post('/api/users/:id/favorites', isAuthenticated, isOwner, (req, res) => {
  const userId = parseInt(req.params.id);
  const { productId } = req.body;
  
  if (!productId) {
    return res.status(400).json({ error: 'ID do produto é obrigatório' });
  }
  
  // Ler banco de dados
  const dbRaw = fs.readFileSync(path.join(__dirname, 'db.json'));
  const db = JSON.parse(dbRaw);
  
  // Verificar se o produto existe
  const product = db.products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  // Verificar se o usuário existe
  const userIndex = db.users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  // Inicializar array de favoritos se não existir
  if (!db.users[userIndex].favorites) {
    db.users[userIndex].favorites = [];
  }
  
  // Verificar se o produto já está nos favoritos
  if (db.users[userIndex].favorites.includes(productId)) {
    return res.status(400).json({ error: 'Produto já está nos favoritos' });
  }
  
  // Adicionar produto aos favoritos
  db.users[userIndex].favorites.push(productId);
  fs.writeFileSync(
    path.join(__dirname, 'db.json'),
    JSON.stringify(db, null, 2)
  );
  
  res.status(201).json({ message: 'Produto adicionado aos favoritos' });
});

// Endpoint para remover produto dos favoritos
server.delete('/api/users/:id/favorites/:productId', isAuthenticated, isOwner, (req, res) => {
  const userId = parseInt(req.params.id);
  const productId = parseInt(req.params.productId);
  
  // Ler banco de dados
  const dbRaw = fs.readFileSync(path.join(__dirname, 'db.json'));
  const db = JSON.parse(dbRaw);
  
  // Verificar se o usuário existe
  const userIndex = db.users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  // Verificar se o usuário tem favoritos
  if (!db.users[userIndex].favorites) {
    return res.status(404).json({ error: 'Nenhum favorito encontrado' });
  }
  
  // Verificar se o produto está nos favoritos
  const favoriteIndex = db.users[userIndex].favorites.indexOf(productId);
  if (favoriteIndex === -1) {
    return res.status(404).json({ error: 'Produto não está nos favoritos' });
  }
  
  // Remover produto dos favoritos
  db.users[userIndex].favorites.splice(favoriteIndex, 1);
  fs.writeFileSync(
    path.join(__dirname, 'db.json'),
    JSON.stringify(db, null, 2)
  );
  
  res.json({ message: 'Produto removido dos favoritos' });
});

// Endpoint para buscar produtos
server.get('/api/products/search', (req, res) => {
  const { q, category, minPrice, maxPrice, brand, rating, sort } = req.query;
  
  // Ler banco de dados
  const dbRaw = fs.readFileSync(path.join(__dirname, 'db.json'));
  const db = JSON.parse(dbRaw);
  
  let filteredProducts = [...db.products];
  
  // Filtrar por termo de busca
  if (q) {
    const searchTerm = q.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filtrar por categoria
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }
  
  // Filtrar por preço
  if (minPrice) {
    filteredProducts = filteredProducts.filter(product => 
      (product.discountPrice || product.price) >= parseFloat(minPrice)
    );
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product => 
      (product.discountPrice || product.price) <= parseFloat(maxPrice)
    );
  }
  
  // Filtrar por marca
  if (brand) {
    const brands = brand.split(',');
    filteredProducts = filteredProducts.filter(product => 
      brands.includes(product.brand)
    );
  }
  
  // Filtrar por avaliação
  if (rating) {
    filteredProducts = filteredProducts.filter(product => 
      product.rating >= parseInt(rating)
    );
  }
  
  // Ordenar produtos
  if (sort) {
    switch (sort) {
      case 'price_asc':
        filteredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => b.salesCount - a.salesCount);
        break;
      default:
        // Relevância (padrão)
        break;
    }
  }
  
  res.json(filteredProducts);
});

// Aplicar autenticação a rotas protegidas
server.use('/api/users/:id', isAuthenticated, isOwner);

// Usar o router do json-server para as rotas restantes
server.use('/api', router);

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Backend simulado rodando em http://localhost:${PORT}`);
});
