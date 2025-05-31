// Serviço para interação com a API de produtos
import axios from 'axios';

// URL base da API (simulada)
const API_URL = '/api';

// Obter todos os produtos
export const getProducts = async () => {
  try {
    // Simulação de dados para desenvolvimento frontend
    return mockProducts;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

// Obter produtos por categoria
export const getProductsByCategory = async (categoryId) => {
  try {
    // Simulação de dados para desenvolvimento frontend
    return mockProducts.filter(product => 
      product.category.toLowerCase().replace(/\s+/g, '-') === categoryId
    );
  } catch (error) {
    console.error(`Erro ao buscar produtos da categoria ${categoryId}:`, error);
    throw error;
  }
};

// Obter produto por ID
export const getProductById = async (productId) => {
  try {
    // Simulação de dados para desenvolvimento frontend
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    return product;
  } catch (error) {
    console.error(`Erro ao buscar produto ${productId}:`, error);
    throw error;
  }
};

// Buscar produtos
export const searchProducts = async (query) => {
  try {
    // Simulação de dados para desenvolvimento frontend
    const normalizedQuery = query.toLowerCase();
    return mockProducts.filter(product => 
      product.name.toLowerCase().includes(normalizedQuery) || 
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)
    );
  } catch (error) {
    console.error(`Erro ao buscar produtos com a query "${query}":`, error);
    throw error;
  }
};

// Dados simulados para desenvolvimento frontend
const mockProducts = [
  {
    id: '1',
    name: 'Smartphone Galaxy S23',
    slug: 'smartphone-galaxy-s23',
    description: 'O mais recente smartphone da Samsung com câmera de 108MP e tela AMOLED de 6.8 polegadas.',
    price: 4999.99,
    discountPrice: 4499.99,
    category: 'Eletrônicos',
    subcategory: 'Smartphones',
    brand: 'Samsung',
    stock: 15,
    rating: 4.8,
    reviewCount: 124,
    images: [
      '/assets/images/products/galaxy-s23-1.jpg',
      '/assets/images/products/galaxy-s23-2.jpg',
      '/assets/images/products/galaxy-s23-3.jpg',
    ],
    featured: true,
    bestseller: true,
    new: true,
    colors: ['Preto', 'Branco', 'Verde'],
    sizes: [],
    specifications: {
      'Processador': 'Snapdragon 8 Gen 2',
      'Memória RAM': '8GB',
      'Armazenamento': '256GB',
      'Tela': 'AMOLED 6.8"',
      'Bateria': '5000mAh',
      'Sistema Operacional': 'Android 13'
    },
    createdAt: '2023-05-15T10:00:00Z',
    salesCount: 342
  },
  {
    id: '2',
    name: 'Notebook Dell XPS 13',
    slug: 'notebook-dell-xps-13',
    description: 'Notebook premium ultrafino com processador Intel Core i7 de 12ª geração e 16GB de RAM.',
    price: 8999.99,
    discountPrice: null,
    category: 'Eletrônicos',
    subcategory: 'Notebooks',
    brand: 'Dell',
    stock: 8,
    rating: 4.9,
    reviewCount: 87,
    images: [
      '/assets/images/products/dell-xps-13-1.jpg',
      '/assets/images/products/dell-xps-13-2.jpg',
    ],
    featured: true,
    bestseller: true,
    new: false,
    colors: ['Prata'],
    sizes: [],
    specifications: {
      'Processador': 'Intel Core i7 12ª Geração',
      'Memória RAM': '16GB',
      'Armazenamento': 'SSD 512GB',
      'Tela': 'Full HD 13.3"',
      'Bateria': 'Até 12 horas',
      'Sistema Operacional': 'Windows 11'
    },
    createdAt: '2023-03-10T14:30:00Z',
    salesCount: 215
  },
  {
    id: '3',
    name: 'Smart TV LG OLED 55"',
    slug: 'smart-tv-lg-oled-55',
    description: 'Smart TV OLED com resolução 4K, HDR e sistema webOS para streaming.',
    price: 5499.99,
    discountPrice: 4999.99,
    category: 'Eletrônicos',
    subcategory: 'TVs',
    brand: 'LG',
    stock: 12,
    rating: 4.7,
    reviewCount: 56,
    images: [
      '/assets/images/products/lg-oled-tv-1.jpg',
      '/assets/images/products/lg-oled-tv-2.jpg',
    ],
    featured: true,
    bestseller: false,
    new: false,
    colors: ['Preto'],
    sizes: [],
    specifications: {
      'Tipo de Tela': 'OLED',
      'Resolução': '4K (3840 x 2160)',
      'Taxa de Atualização': '120Hz',
      'Sistema Operacional': 'webOS',
      'Conexões': 'HDMI x4, USB x3, Wi-Fi, Bluetooth'
    },
    createdAt: '2023-02-05T09:15:00Z',
    salesCount: 178
  },
  {
    id: '4',
    name: 'Tênis Nike Air Max',
    slug: 'tenis-nike-air-max',
    description: 'Tênis esportivo com tecnologia Air Max para maior conforto e amortecimento.',
    price: 699.99,
    discountPrice: 599.99,
    category: 'Moda',
    subcategory: 'Calçados',
    brand: 'Nike',
    stock: 25,
    rating: 4.6,
    reviewCount: 203,
    images: [
      '/assets/images/products/nike-air-max-1.jpg',
      '/assets/images/products/nike-air-max-2.jpg',
      '/assets/images/products/nike-air-max-3.jpg',
    ],
    featured: false,
    bestseller: true,
    new: false,
    colors: ['Preto', 'Branco', 'Vermelho'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    specifications: {
      'Material': 'Mesh e couro sintético',
      'Solado': 'Borracha com tecnologia Air',
      'Fechamento': 'Cadarço'
    },
    createdAt: '2023-01-20T11:45:00Z',
    salesCount: 412
  },
  {
    id: '5',
    name: 'Sofá Retrátil 3 Lugares',
    slug: 'sofa-retratil-3-lugares',
    description: 'Sofá retrátil e reclinável de 3 lugares em tecido suede com assentos de espuma D-28.',
    price: 2199.99,
    discountPrice: null,
    category: 'Casa e Decoração',
    subcategory: 'Móveis',
    brand: 'MobiliHome',
    stock: 5,
    rating: 4.5,
    reviewCount: 42,
    images: [
      '/assets/images/products/sofa-retratil-1.jpg',
      '/assets/images/products/sofa-retratil-2.jpg',
    ],
    featured: true,
    bestseller: false,
    new: false,
    colors: ['Cinza', 'Bege', 'Marrom'],
    sizes: [],
    specifications: {
      'Material': 'Tecido suede',
      'Estrutura': 'Madeira de reflorestamento',
      'Enchimento': 'Espuma D-28',
      'Dimensões': '220cm x 95cm x 98cm (L x A x P)'
    },
    createdAt: '2023-04-12T16:20:00Z',
    salesCount: 87
  },
  {
    id: '6',
    name: 'Liquidificador Philips Walita',
    slug: 'liquidificador-philips-walita',
    description: 'Liquidificador com potência de 1000W, jarra de vidro de 2L e 5 velocidades.',
    price: 299.99,
    discountPrice: 249.99,
    category: 'Casa e Decoração',
    subcategory: 'Eletrodomésticos',
    brand: 'Philips Walita',
    stock: 30,
    rating: 4.4,
    reviewCount: 118,
    images: [
      '/assets/images/products/liquidificador-philips-1.jpg',
      '/assets/images/products/liquidificador-philips-2.jpg',
    ],
    featured: false,
    bestseller: true,
    new: false,
    colors: ['Preto', 'Inox'],
    sizes: [],
    specifications: {
      'Potência': '1000W',
      'Capacidade': '2L',
      'Velocidades': '5 + Pulsar',
      'Material da Jarra': 'Vidro',
      'Voltagem': '110V/220V (Bivolt)'
    },
    createdAt: '2023-03-25T08:30:00Z',
    salesCount: 256
  },
  {
    id: '7',
    name: 'Bicicleta Mountain Bike Caloi',
    slug: 'bicicleta-mountain-bike-caloi',
    description: 'Bicicleta mountain bike com 21 marchas, suspensão dianteira e freios a disco.',
    price: 1499.99,
    discountPrice: 1299.99,
    category: 'Esportes',
    subcategory: 'Ciclismo',
    brand: 'Caloi',
    stock: 10,
    rating: 4.6,
    reviewCount: 75,
    images: [
      '/assets/images/products/bicicleta-caloi-1.jpg',
      '/assets/images/products/bicicleta-caloi-2.jpg',
    ],
    featured: false,
    bestseller: false,
    new: true,
    colors: ['Preto', 'Vermelho', 'Azul'],
    sizes: ['17"', '19"', '21"'],
    specifications: {
      'Quadro': 'Alumínio',
      'Suspensão': 'Dianteira com curso de 80mm',
      'Marchas': '21 velocidades',
      'Freios': 'A disco mecânico',
      'Aro': '29"'
    },
    createdAt: '2023-05-01T13:10:00Z',
    salesCount: 132
  },
  {
    id: '8',
    name: 'Kit Skincare Facial',
    slug: 'kit-skincare-facial',
    description: 'Kit completo de skincare com limpador facial, tônico, sérum de vitamina C e hidratante.',
    price: 199.99,
    discountPrice: 169.99,
    category: 'Beleza e Saúde',
    subcategory: 'Cuidados com a Pele',
    brand: 'Dermage',
    stock: 20,
    rating: 4.8,
    reviewCount: 92,
    images: [
      '/assets/images/products/kit-skincare-1.jpg',
      '/assets/images/products/kit-skincare-2.jpg',
    ],
    featured: true,
    bestseller: false,
    new: true,
    colors: [],
    sizes: [],
    specifications: {
      'Tipo de Pele': 'Todos os tipos',
      'Conteúdo': 'Limpador 120ml, Tônico 200ml, Sérum 30ml, Hidratante 50g',
      'Livre de': 'Parabenos, sulfatos e fragrâncias artificiais'
    },
    createdAt: '2023-04-28T10:45:00Z',
    salesCount: 187
  },
  {
    id: '9',
    name: 'Conjunto Infantil Verão',
    slug: 'conjunto-infantil-verao',
    description: 'Conjunto infantil para verão com camiseta e bermuda em algodão.',
    price: 89.99,
    discountPrice: 69.99,
    category: 'Infantil',
    subcategory: 'Roupas',
    brand: 'PequenoPolo',
    stock: 35,
    rating: 4.7,
    reviewCount: 64,
    images: [
      '/assets/images/products/conjunto-infantil-1.jpg',
      '/assets/images/products/conjunto-infantil-2.jpg',
    ],
    featured: false,
    bestseller: false,
    new: true,
    colors: ['Azul', 'Vermelho', 'Verde'],
    sizes: ['2 anos', '4 anos', '6 anos', '8 anos'],
    specifications: {
      'Material': '100% Algodão',
      'Estampa': 'Dinossauros',
      'Peças': 'Camiseta manga curta e bermuda'
    },
    createdAt: '2023-05-10T09:30:00Z',
    salesCount: 98
  },
  {
    id: '10',
    name: 'Fone de Ouvido Bluetooth JBL',
    slug: 'fone-de-ouvido-bluetooth-jbl',
    description: 'Fone de ouvido sem fio com cancelamento de ruído, bateria de longa duração e microfone integrado.',
    price: 399.99,
    discountPrice: 349.99,
    category: 'Eletrônicos',
    subcategory: 'Áudio',
    brand: 'JBL',
    stock: 18,
    rating: 4.5,
    reviewCount: 156,
    images: [
      '/assets/images/products/fone-jbl-1.jpg',
      '/assets/images/products/fone-jbl-2.jpg',
    ],
    featured: true,
    bestseller: true,
    new: false,
    colors: ['Preto', 'Branco', 'Azul'],
    sizes: [],
    specifications: {
      'Tipo': 'Over-ear',
      'Conectividade': 'Bluetooth 5.0',
      'Bateria': 'Até 30 horas',
      'Cancelamento de Ruído': 'Ativo',
      'Microfone': 'Integrado com redução de ruído'
    },
    createdAt: '2023-02-15T14:20:00Z',
    salesCount: 324
  },
  {
    id: '11',
    name: 'Cafeteira Expresso Automática',
    slug: 'cafeteira-expresso-automatica',
    description: 'Cafeteira expresso automática com moedor de grãos integrado e sistema de espuma de leite.',
    price: 2499.99,
    discountPrice: 2199.99,
    category: 'Casa e Decoração',
    subcategory: 'Eletrodomésticos',
    brand: 'Oster',
    stock: 7,
    rating: 4.9,
    reviewCount: 48,
    images: [
      '/assets/images/products/cafeteira-expresso-1.jpg',
      '/assets/images/products/cafeteira-expresso-2.jpg',
    ],
    featured: true,
    bestseller: false,
    new: false,
    colors: ['Inox'],
    sizes: [],
    specifications: {
      'Potência': '1350W',
      'Pressão': '19 bar',
      'Capacidade do Reservatório': '1.8L',
      'Moedor': 'Integrado com 5 níveis de moagem',
      'Funções': 'Espresso, cappuccino, latte, água quente'
    },
    createdAt: '2023-03-05T11:15:00Z',
    salesCount: 76
  },
  {
    id: '12',
    name: 'Vestido Midi Floral',
    slug: 'vestido-midi-floral',
    description: 'Vestido midi com estampa floral, mangas 3/4 e cintura marcada.',
    price: 159.99,
    discountPrice: 129.99,
    category: 'Moda',
    subcategory: 'Feminino',
    brand: 'Renner',
    stock: 22,
    rating: 4.6,
    reviewCount: 87,
    images: [
      '/assets/images/products/vestido-floral-1.jpg',
      '/assets/images/products/vestido-floral-2.jpg',
      '/assets/images/products/vestido-floral-3.jpg',
    ],
    featured: false,
    bestseller: true,
    new: false,
    colors: ['Azul', 'Verde'],
    sizes: ['P', 'M', 'G', 'GG'],
    specifications: {
      'Material': '100% Viscose',
      'Comprimento': 'Midi',
      'Decote': 'V',
      'Manga': '3/4'
    },
    createdAt: '2023-02-20T15:40:00Z',
    salesCount: 215
  },
  {
    id: '13',
    name: 'Conjunto de Panelas Antiaderentes',
    slug: 'conjunto-panelas-antiaderentes',
    description: 'Conjunto com 5 panelas antiaderentes com tampas de vidro e cabos de silicone.',
    price: 499.99,
    discountPrice: 399.99,
    category: 'Casa e Decoração',
    subcategory: 'Utensílios de Cozinha',
    brand: 'Tramontina',
    stock: 15,
    rating: 4.7,
    reviewCount: 103,
    images: [
      '/assets/images/products/conjunto-panelas-1.jpg',
      '/assets/images/products/conjunto-panelas-2.jpg',
    ],
    featured: false,
    bestseller: true,
    new: false,
    colors: ['Preto', 'Vermelho'],
    sizes: [],
    specifications: {
      'Material': 'Alumínio com revestimento antiaderente',
      'Tampas': 'Vidro temperado',
      'Cabos': 'Silicone antitérmico',
      'Peças': '2 frigideiras, 3 panelas com tampa',
      'Compatibilidade': 'Todos os tipos de fogão, incluindo indução'
    },
    createdAt: '2023-01-15T12:30:00Z',
    salesCount: 189
  },
  {
    id: '14',
    name: 'Perfume Masculino Invictus',
    slug: 'perfume-masculino-invictus',
    description: 'Perfume masculino com fragrância amadeirada e cítrica, ideal para uso diário.',
    price: 349.99,
    discountPrice: null,
    category: 'Beleza e Saúde',
    subcategory: 'Perfumaria',
    brand: 'Paco Rabanne',
    stock: 25,
    rating: 4.8,
    reviewCount: 176,
    images: [
      '/assets/images/products/perfume-invictus-1.jpg',
      '/assets/images/products/perfume-invictus-2.jpg',
    ],
    featured: false,
    bestseller: true,
    new: false,
    colors: [],
    sizes: ['50ml', '100ml', '150ml'],
    specifications: {
      'Família Olfativa': 'Amadeirado Aquático',
      'Concentração': 'Eau de Toilette',
      'Notas de Saída': 'Toranja, Mandarina',
      'Notas de Corpo': 'Louro, Jasmim',
      'Notas de Fundo': 'Madeira de Guaiac, Patchouli, Musgo de Carvalho'
    },
    createdAt: '2023-02-10T09:45:00Z',
    salesCount: 287
  },
  {
    id: '15',
    name: 'Cadeira Gamer Ergonômica',
    slug: 'cadeira-gamer-ergonomica',
    description: 'Cadeira gamer com design ergonômico, reclinável até 180° e apoio lombar ajustável.',
    price: 1299.99,
    discountPrice: 999.99,
    category: 'Casa e Decoração',
    subcategory: 'Móveis',
    brand: 'ThunderX3',
    stock: 10,
    rating: 4.6,
    reviewCount: 89,
    images: [
      '/assets/images/products/cadeira-gamer-1.jpg',
      '/assets/images/products/cadeira-gamer-2.jpg',
      '/assets/images/products/cadeira-gamer-3.jpg',
    ],
    featured: true,
    bestseller: false,
    new: true,
    colors: ['Preto/Vermelho', 'Preto/Azul', 'Preto/Verde'],
    sizes: [],
    specifications: {
      'Material': 'Couro sintético PU',
      'Estrutura': 'Metal com base giratória',
      'Reclinação': 'Até 180°',
      'Ajustes': 'Altura, braços 4D, encosto, apoio lombar',
      'Capacidade': 'Até 150kg'
    },
    createdAt: '2023-04-20T16:15:00Z',
    salesCount: 124
  },
  {
    id: '16',
    name: 'Mala de Viagem Grande',
    slug: 'mala-viagem-grande',
    description: 'Mala de viagem grande com rodas duplas giratórias, cadeado TSA e material resistente a impactos.',
    price: 599.99,
    discountPrice: 499.99,
    category: 'Moda',
    subcategory: 'Acessórios',
    brand: 'Samsonite',
    stock: 12,
    rating: 4.7,
    reviewCount: 65,
    images: [
      '/assets/images/products/mala-viagem-1.jpg',
      '/assets/images/products/mala-viagem-2.jpg',
    ],
    featured: false,
    bestseller: false,
    new: true,
    colors: ['Preto', 'Azul', 'Vermelho'],
    sizes: [],
    specifications: {
      'Material': 'Policarbonato',
      'Capacidade': '90L',
      'Dimensões': '75cm x 50cm x 30cm',
      'Rodas': '4 rodas duplas giratórias 360°',
      'Segurança': 'Cadeado TSA integrado',
      'Peso': '3.8kg'
    },
    createdAt: '2023-05-05T10:20:00Z',
    salesCount: 78
  },
  {
    id: '17',
    name: 'Relógio Smartwatch Fitness',
    slug: 'relogio-smartwatch-fitness',
    description: 'Smartwatch com monitoramento cardíaco, GPS integrado, resistente à água e bateria de longa duração.',
    price: 899.99,
    discountPrice: 799.99,
    category: 'Eletrônicos',
    subcategory: 'Wearables',
    brand: 'Garmin',
    stock: 20,
    rating: 4.8,
    reviewCount: 112,
    images: [
      '/assets/images/products/smartwatch-fitness-1.jpg',
      '/assets/images/products/smartwatch-fitness-2.jpg',
    ],
    featured: true,
    bestseller: false,
    new: true,
    colors: ['Preto', 'Azul', 'Branco'],
    sizes: [],
    specifications: {
      'Tela': 'AMOLED 1.3"',
      'Bateria': 'Até 7 dias',
      'Resistência à água': '5 ATM',
      'Sensores': 'GPS, frequência cardíaca, oxímetro, acelerômetro',
      'Conectividade': 'Bluetooth, ANT+',
      'Compatibilidade': 'Android e iOS'
    },
    createdAt: '2023-04-15T13:25:00Z',
    salesCount: 156
  },
  {
    id: '18',
    name: 'Jogo de Toalhas 5 Peças',
    slug: 'jogo-toalhas-5-pecas',
    description: 'Jogo de toalhas felpudas 100% algodão com 2 toalhas de banho, 2 de rosto e 1 para pés.',
    price: 149.99,
    discountPrice: 129.99,
    category: 'Casa e Decoração',
    subcategory: 'Cama, Mesa e Banho',
    brand: 'Buddemeyer',
    stock: 30,
    rating: 4.6,
    reviewCount: 78,
    images: [
      '/assets/images/products/jogo-toalhas-1.jpg',
      '/assets/images/products/jogo-toalhas-2.jpg',
    ],
    featured: false,
    bestseller: false,
    new: false,
    colors: ['Branco', 'Bege', 'Cinza', 'Azul'],
    sizes: [],
    specifications: {
      'Material': '100% Algodão',
      'Gramatura': '500g/m²',
      'Peças': '2 toalhas de banho (70x140cm), 2 toalhas de rosto (50x80cm), 1 toalha para pés (45x70cm)'
    },
    createdAt: '2023-03-18T14:50:00Z',
    salesCount: 142
  },
  {
    id: '19',
    name: 'Patins Inline Ajustáveis',
    slug: 'patins-inline-ajustaveis',
    description: 'Patins inline com tamanho ajustável, rodas de PU iluminadas e rolamentos ABEC-7.',
    price: 349.99,
    discountPrice: 299.99,
    category: 'Esportes',
    subcategory: 'Patinação',
    brand: 'Oxelo',
    stock: 15,
    rating: 4.5,
    reviewCount: 54,
    images: [
      '/assets/images/products/patins-inline-1.jpg',
      '/assets/images/products/patins-inline-2.jpg',
    ],
    featured: false,
    bestseller: false,
    new: true,
    colors: ['Preto/Rosa', 'Preto/Azul', 'Preto/Verde'],
    sizes: ['31-34', '35-38', '39-42'],
    specifications: {
      'Chassi': 'Alumínio',
      'Rodas': 'PU 80mm com LED',
      'Rolamentos': 'ABEC-7',
      'Fechamento': 'Cadarço, velcro e fivela',
      'Ajuste': '3 tamanhos em 1'
    },
    createdAt: '2023-04-25T11:35:00Z',
    salesCount: 87
  },
  {
    id: '20',
    name: 'Mixer Portátil Recarregável',
    slug: 'mixer-portatil-recarregavel',
    description: 'Mixer portátil recarregável via USB, perfeito para preparar sucos e vitaminas em qualquer lugar.',
    price: 149.99,
    discountPrice: 119.99,
    category: 'Casa e Decoração',
    subcategory: 'Eletrodomésticos',
    brand: 'Mondial',
    stock: 25,
    rating: 4.4,
    reviewCount: 96,
    images: [
      '/assets/images/products/mixer-portatil-1.jpg',
      '/assets/images/products/mixer-portatil-2.jpg',
    ],
    featured: false,
    bestseller: false,
    new: true,
    colors: ['Branco', 'Preto', 'Verde'],
    sizes: [],
    specifications: {
      'Potência': '150W',
      'Capacidade': '400ml',
      'Bateria': 'Lítio recarregável',
      'Autonomia': 'Até 20 usos por carga',
      'Lâminas': 'Aço inoxidável 6 pontas'
    },
    createdAt: '2023-05-08T09:55:00Z',
    salesCount: 118
  }
];

export default {
  getProducts,
  getProductsByCategory,
  getProductById,
  searchProducts
};
