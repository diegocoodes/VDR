export const company = {
  name: 'VDR Studio Automotivo',
  url: 'https://www.vdrstudio.com.br',
  phone: '5517991321761',
  phoneDisplay: '(17) 99132-1761',
  email: 'vdr.esteticaautomotiva@gmail.com',
  address: 'R. Artur Yacubian, 3256',
  city: 'Mirassol',
  state: 'SP',
  maps: 'https://maps.app.goo.gl/xVhJiCC6JcaiaJD8A',
  instagram: 'https://www.instagram.com/vdr.studio.automotivo/',
  privacy: 'https://www.vdrstudio.com.br/politica-de-privacidade',
  // Não foi encontrado um documento independente de termos de uso.
  terms: null as string | null,
  generalMessage:
    'Olá! Conheci a VDR pelo site e gostaria de solicitar um orçamento para meu veículo.',
};

export const media = {
  hero: {
    videoId: 'y8pC5TZ4sAw',
    startSeconds: 8,
    poster: '/images/hero-youtube-poster.webp',
    original: 'https://www.youtube.com/watch?v=y8pC5TZ4sAw&t=8s',
  },
  project: {
    src: '/videos/vdr-bmw.mp4',
    poster: '/images/bmw-video-poster.webp',
    original: '/videios/VDR - BMW Completo.mp4',
  },
  ppf: {
    src: '/videos/vdr-ppf-tijolo.mp4',
    poster: '/images/ppf-tijolo-poster.webp',
    original: '/videios/VDR - Video Tijolo.mp4',
    label: 'PPF em ação — VDR, Vídeo Tijolo',
  },
  about: {
    image: '/images/vdr-perfil.webp',
    original: '/images/VDR-PERFIL.jpg',
    alt: 'Profissional da VDR Studio Automotivo com a camiseta da empresa no estúdio em Mirassol',
  },
};

// Dados históricos publicados pela empresa, não um contador em tempo real.
// Atualize valores, fonte e data juntos após nova validação com a VDR.
export const socialProof = {
  source: `${company.url}/`,
  checkedAt: '2026-11-03',
  items: [
    {
      value: '500',
      suffix: '+',
      label: 'clientes atendidos',
      detail: 'Cuidado que faz a diferença.',
    },
    {
      value: '100',
      suffix: '+',
      label: 'avaliações 5 estrelas',
      detail: 'Publicadas no Google.',
    },
    {
      value: '4',
      suffix: ' anos',
      label: 'de história',
      detail: 'Conforme histórico da VDR.',
    },
  ],
  note: 'Dados divulgados pela VDR em seu site. Consulta em novembro de 2026.',
};

export const navigation = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'PPF', href: '#ppf' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export const services = [
  {
    title: 'PPF AUTOMOTIVO',
    category: 'PRESERVAÇÃO DA PINTURA',
    description:
      'Uma película de proteção que ajuda a preservar a pintura original contra pedriscos, pequenos impactos e marcas do uso diário.',
    image: '/images/servico-ppf.webp',
    alt: 'Aplicação de película PPF na pintura de um veículo na VDR',
    message:
      'Olá! Conheci a VDR pelo site e gostaria de um orçamento de PPF automotivo para meu veículo.',
  },
  {
    title: 'VITRIFICAÇÃO AUTOMOTIVA',
    category: 'PROTEÇÃO E BRILHO',
    description:
      'Proteção cerâmica para preservar o acabamento, intensificar o brilho e deixar a limpeza do dia a dia mais simples.',
    image: '/images/servico-vitrificacao-cliente.webp',
    alt: 'Aplicação de vitrificação sobre a pintura preta com aplicador e luva na VDR',
    message:
      'Olá! Conheci a VDR pelo site e gostaria de um orçamento de vitrificação automotiva para meu veículo.',
  },
  {
    title: 'POLIMENTO TÉCNICO',
    category: 'REFLEXO E ACABAMENTO',
    description:
      'Correção de marcas e imperfeições superficiais para recuperar a profundidade, o reflexo e o acabamento da pintura.',
    image: '/images/servico-polimento-cliente.webp',
    alt: 'Profissional da VDR realizando polimento técnico com politriz na pintura de um veículo',
    message:
      'Olá! Conheci a VDR pelo site e gostaria de um orçamento de polimento técnico para meu veículo.',
  },
  {
    title: 'PROTEÇÃO ZERO KM',
    category: 'CUIDADO DESDE O PRIMEIRO DIA',
    description:
      'Preparação e proteção de veículos novos com soluções pensadas para o seu carro e para a sua rotina.',
    image: '/images/servico-preparacao-cliente.webp',
    alt: 'Lavagem e preparação de um BMW com espuma no estúdio VDR',
    message:
      'Olá! Conheci a VDR pelo site e gostaria de conhecer a proteção para meu carro zero km.',
  },
];

export const ppfOptions = [
  {
    id: 'parcial',
    name: 'PPF PARCIAL',
    shortCoverage: 'Áreas selecionadas',
    tagline: 'Proteção onde mais importa.',
    description:
      'Aplicação estratégica nas áreas mais expostas. Um primeiro passo para preservar a pintura no uso diário.',
    coverage: 'Áreas selecionadas conforme a avaliação do veículo.',
    image: '/images/ppf-parcial.webp',
    alt: 'Imagem de cobertura do PPF parcial publicada pela VDR',
  },
  {
    id: 'frontal',
    name: 'PPF FRONTAL',
    shortCoverage: 'Frente do veículo',
    tagline: 'Mais tranquilidade a cada caminho.',
    description:
      'Proteção da região frontal, que recebe boa parte da exposição à estrada e aos pequenos impactos.',
    coverage: 'Capô, para-choque, paralamas e retrovisores.',
    image: '/images/ppf-frontal.webp',
    alt: 'Imagem de cobertura do PPF frontal publicada pela VDR',
  },
  {
    id: 'completo',
    name: 'PPF COMPLETO',
    shortCoverage: 'Cobertura ampla',
    tagline: 'Um cuidado mais abrangente.',
    description:
      'Cobertura ampla da carroceria para quem procura preservar a pintura original em mais superfícies.',
    coverage: 'Cobertura da carroceria definida na avaliação técnica.',
    image: '/images/ppf-completo.webp',
    alt: 'Imagem de cobertura do PPF completo publicada pela VDR',
  },
];

export const packages = [
  {
    name: 'Essencial',
    duration: 'Até 12 meses',
    features: [
      'Vitrificação da pintura',
      'Proteção de plásticos externos e vidros',
    ],
  },
  {
    name: 'Premium',
    duration: 'Até 3 anos',
    features: [
      'Vitrificação da pintura',
      'Proteção de plásticos externos e vidros',
    ],
  },
  {
    name: 'Premium Plus',
    duration: 'Até 3 anos',
    features: ['Tudo do pacote Premium', 'Tratamento dos bancos de couro'],
  },
];

export const testimonials = [
  {
    name: 'Mariana Liberatole',
    initials: 'ML',
    quote: 'estou extremamente satisfeita com o resultado',
    context: 'Sobre vitrificação e aplicação de PPF.',
  },
  {
    name: 'Lucas Bombini',
    initials: 'LB',
    quote: 'Vinicius é cuidadoso, profissional e atencioso.',
    context: 'Sobre o atendimento e o cuidado com o veículo.',
  },
  {
    name: 'Agnel Freitas',
    initials: 'AF',
    quote: 'Excelente profissional! Serviço de qualidade',
    context: 'Sobre a qualidade do serviço.',
  },
];

export const faqs = [
  {
    question: 'O PPF altera a aparência original da pintura?',
    answer:
      'A película transparente tem como objetivo preservar o visual da pintura. O resultado depende do material escolhido, do estado da superfície e da aplicação. A equipe apresenta as opções e o acabamento esperado antes do serviço.',
  },
  {
    question: 'Qual é a diferença entre PPF e vitrificação?',
    answer:
      'O PPF é uma película que cria uma barreira física e ajuda a reduzir marcas de pedriscos e pequenos impactos. A vitrificação é um tratamento cerâmico que contribui para preservar o acabamento, realçar o brilho e facilitar a limpeza. As soluções podem ser complementares.',
  },
  {
    question: 'Posso aplicar PPF em um carro usado?',
    answer:
      'Sim. Primeiro, avaliamos o estado da pintura e a existência de repinturas ou imperfeições. Essa análise indica a preparação necessária e se a aplicação é adequada para o veículo.',
  },
  {
    question: 'Carro zero km precisa de vitrificação?',
    answer:
      'Veículos novos também ficam expostos ao sol, chuva e contaminantes. A vitrificação é uma opção para facilitar a manutenção e ajudar a preservar o acabamento desde o início. A indicação depende do uso e dos cuidados desejados.',
  },
  {
    question: 'Quanto tempo dura a proteção?',
    answer:
      'A durabilidade varia conforme o serviço, o material, as condições de uso e a manutenção. Nos pacotes de vitrificação divulgados pela VDR, a proteção anunciada é de até 12 meses ou até 3 anos. Confirme as condições do pacote com a equipe.',
  },
  {
    question: 'Como é realizado o orçamento?',
    answer:
      'Pelo WhatsApp, informe o modelo, o ano do veículo e o serviço de interesse. A equipe orienta os próximos passos e, quando necessário, agenda uma avaliação presencial para definir a preparação, a cobertura e o orçamento.',
  },
];
