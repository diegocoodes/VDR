# VDR Studio Automotivo

Landing page de proteção e estética automotiva em Mirassol, com identidade original da VDR, fotografia real e conversão direta pelo WhatsApp.

Implementada em Next.js com App Router, TypeScript, Tailwind CSS, Motion e Lucide React. O conteúdo principal é renderizado no servidor e pré-renderizado no build. JavaScript interativo fica no menu, nas revelações discretas, nas abas de PPF e nos controles dos vídeos.

Prévias da interface: [desktop](docs/preview-desktop.webp) e [mobile](docs/preview-mobile.webp).

Seções redesenhadas: [serviços](docs/preview-services.webp), [perfil da VDR](docs/preview-profile.webp), [PPF](docs/preview-ppf.webp), [vitrificação](docs/preview-coating.webp) e [filme BMW](docs/preview-film.webp).

## Executar

Requisito: Node.js 24 e npm. A versão também está definida em `engines.node` para manter o mesmo ambiente na Vercel e no GitHub Actions.

```powershell
npm ci
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para produção:

```powershell
npm run build
npm start
```

## Verificação

```powershell
npm run lint
npm run typecheck
npm run test:e2e
```

Os testes de navegador precisam da aplicação rodando em outra janela do terminal. Por padrão, usam o Google Chrome instalado e `http://localhost:3000`. A URL pode ser alterada pela variável `PLAYWRIGHT_BASE_URL`. Para usar Chromium em uma máquina sem Chrome, remova `channel: 'chrome'` de `playwright.config.ts` e execute `npx playwright install chromium`.

Os onze cenários cobrem:

- Conteúdo, SEO local, âncoras e mensagens de todos os links de WhatsApp.
- Abas de PPF por clique e teclado, com mensagem contextual.
- Reprodução e pausa do hero, carregamento do projeto BMW ao entrar na viewport, moldura animada e ausência de controles nativos.
- Durações, benefícios e mensagens de WhatsApp específicas dos três pacotes de vitrificação.
- Início e repetição do YouTube a partir de 8 segundos, com alternativa para assistir no provedor se a incorporação estiver indisponível.
- Novas fotografias dos serviços, mensagens de orçamento, moldura do perfil e remoção dos textos solicitados.
- Ativação do fundo fluido somente no desktop, com alternativa estática no mobile e com movimento reduzido.
- Menu mobile, bloqueio de rolagem e navegação por âncoras.
- FAQ por teclado e abertura de uma resposta por vez.
- Imagens e layout entre 360 e 1920 px, incluindo o limite real do título.
- Auditoria automática com axe para WCAG A e AA, incluindo mobile, menu e preferência por movimento reduzido.

A auditoria automática complementa a revisão em navegador e não equivale a uma certificação de acessibilidade.

## Onde editar

| Arquivo                                    | Conteúdo                                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `src/data/site.ts`                         | Empresa, contatos, links, serviços, números históricos, pacotes, coberturas de PPF, mídias locais, depoimentos e FAQ |
| `src/data/asset-sources.json`              | Origem exata das fotografias e da marca, com data de consulta                                                        |
| `src/lib/whatsapp.ts`                      | Função compartilhada que codifica as mensagens e gera os links oficiais                                              |
| `src/app/page.tsx`                         | Seções, textos editoriais e dados estruturados de negócio local                                                      |
| `src/app/layout.tsx`                       | Título, descrição, Open Graph, Twitter Card, idioma e fontes locais                                                  |
| `src/app/globals.css`                      | Paleta, tipografia, composição, estados e responsividade                                                             |
| `src/components/`                          | Cabeçalho, rodapé, vídeos, comparação de PPF, animações e elementos de interface                                     |
| `public/images/`                           | Fotografias otimizadas, logomarca e imagem de compartilhamento                                                       |
| `src/app/robots.ts` e `src/app/sitemap.ts` | Arquivos de indexação                                                                                                |
| `tests/landing.spec.ts`                    | Testes funcionais e de acessibilidade                                                                                |

## Materiais e informações

A marca e as fotografias foram obtidas do [site oficial da VDR](https://www.vdrstudio.com.br/), consultado em 3 de novembro de 2026. A marca original também está preservada em `public/images/vdr-logo-original.png`. Nenhuma fotografia de resultado foi gerada artificialmente.

As imagens das coberturas de PPF são as ilustrações fotográficas publicadas pela própria VDR na [página de PPF](https://www.vdrstudio.com.br/ppf). As condições dos pacotes foram conferidas na [página Zero Km](https://www.vdrstudio.com.br/zero-km). A seção de projetos utiliza o vídeo da BMW fornecido pelo cliente, substituindo a antiga galeria.

Os números de mais de 500 clientes, mais de 100 avaliações de cinco estrelas e aproximadamente quatro anos representam o histórico divulgado pela empresa. A fonte, a data e os valores estão juntos em `socialProof`, em `src/data/site.ts`. Confirme com a VDR antes de atualizar esses dados. Não há contador automático, nota individual atribuída aos depoimentos ou marcação de avaliações agregadas no JSON-LD.

Os três depoimentos são trechos conferidos no site oficial, com indicação do contexto e acesso à fonte. Os avatares utilizam iniciais, sem fotografias de clientes.

A durabilidade dos pacotes é apresentada como anunciada, condicionada ao serviço, uso e manutenção. Não foram acrescentados preços, garantias ou marcas de películas.

O Instagram foi identificado no próprio site oficial. O Google Maps usa o link publicado pela empresa. A Política de Privacidade aponta para o documento existente. Um documento independente de Termos de Uso não foi encontrado: `company.terms` permanece `null` e nenhum link inválido é exibido.

Não há material essencial pendente. Para atualizar o conteúdo futuramente, forneça à equipe de manutenção os números atuais confirmados, eventuais mudanças de cobertura ou pacotes e, caso exista, a URL oficial de Termos de Uso. Uma comparação de antes e depois só deve ser incluída quando houver um par real de fotografias do mesmo trabalho; por isso, não foi adicionada nesta versão.

## Vídeos e fotografia de perfil

A seção de serviços usa as fotografias fornecidas pelo cliente em `vitrificação.jpg`, `polimento.jpg` e `lavagem.jpg`, com versões WebP para exibição. O destaque de PPF mantém uma fotografia real de aplicação da película. A imagem `DSCF1508.jpg` mostra outro tipo de trabalho e não foi apresentada como aplicação de PPF.

A tipografia esportiva usa a variante itálica de Barlow Condensed já disponível no projeto. `TextReveal` mantém o texto completo para tecnologias assistivas e anima apenas a apresentação visual das letras. `Reveal` também controla a entrada dos pequenos elementos verdes. Com movimento reduzido, esses efeitos ficam estáticos.

O fundo fluido do prompt fornecido foi integrado em `src/components/ui/dye-whorl.tsx`, sem bibliotecas adicionais, e aparece somente nas seções Serviços e Sobre. `SectionAtmosphere` carrega o componente perto da viewport, apenas em desktop com ponteiro preciso e sem preferência por movimento reduzido. A simulação usa a paleta VDR, limite de 30 fps, resolução adaptativa e DPR máximo de 1,25. Fora da viewport, em aba oculta ou ao desmontar, o trabalho de animação é interrompido. Mobile e movimento reduzido usam um fundo estático com a mesma paleta.

A moldura da imagem de perfil usa SVG, recortes diagonais e uma passagem verde de 4,8 segundos ao aparecer. A animação pausa fora da viewport e é desativada com movimento reduzido.

A comparação de PPF usa opções verticais no desktop e horizontais no mobile, com suporte a clique, setas, Home e End. A imagem preserva a cobertura original ilustrada pela empresa e a troca de opção anima o conteúdo. `shortCoverage`, em `src/data/site.ts`, centraliza os rótulos resumidos; o orçamento acompanha a opção selecionada.

Os três pacotes de vitrificação são apresentados por `PackageCards`, com nomes, durações e benefícios mantidos na configuração da empresa. O destaque visual do Premium Plus indica a hierarquia dos pacotes, sem atribuir popularidade ou recomendação comercial não verificadas. A redação sobre durabilidade condicionada a uso e manutenção permanece junto aos cards.

As seções sem simulação fluida utilizam `AutomotiveDetails`: vincos de carroceria, grafismos inspirados em pneus e faixas esportivas discretas em SVG. Esses elementos são decorativos, não interceptam cliques e acompanham a entrada suave das seções. Os títulos, os nomes dos pacotes e os textos de destaque usam a animação de letras já existente, sem bibliotecas adicionais.

Os arquivos fornecidos pelo cliente estão preservados na pasta local em `public/videios/` e `public/images/VDR-PERFIL.jpg`. Os vídeos originais de trabalho em `public/videios/` e o vídeo antigo do hero não são versionados nem enviados ao deploy. O vídeo otimizado usado pela página, `public/videos/vdr-bmw.mp4`, está incluído no repositório. A configuração `media`, em `src/data/site.ts`, centraliza os caminhos.

- Hero: vídeo [Liberty Walk GTR, de Remnant Media](https://www.youtube.com/watch?v=y8pC5TZ4sAw&t=8s), indicado pelo cliente, incorporado com a API oficial do YouTube e início em **8 segundos**. Cada repetição retorna a esse ponto, sem avançar para a playlist do link original. Reprodução sem som, pausa acessível e interrupção ao sair da viewport ou mudar de aba. Com movimento reduzido, mostra o poster até o visitante iniciar a reprodução. O vídeo é uma referência visual e não é apresentado como trabalho executado pela VDR.
- Projetos: `VDR - BMW Completo.mp4`, em enquadramento vertical integral, sem controles nativos. A reprodução é silenciosa e em loop ao entrar na viewport, com interrupção fora da tela ou em aba oculta. Com movimento reduzido, o vídeo só começa após uma ação do visitante. É possível pausar e retomar tocando no vídeo ou usando Enter/Espaço com foco na área do filme. A indicação de ação aparece apenas no foco de teclado. A moldura verde acompanha a reprodução e fica estática com movimento reduzido. O arquivo mantém o áudio e a duração originais.
- Sobre: `VDR-PERFIL.jpg`, com cópia otimizada em `public/images/vdr-perfil.webp`.

O projeto BMW em `public/videos/` usa H.264 e faststart, com redução de aproximadamente 148 MB para 30 MB. O vídeo local anterior do hero foi preservado nos arquivos, mas deixou de ser usado na página. O poster atual do hero é a miniatura oficial do vídeo do YouTube, armazenada localmente. O vídeo adicional de PPF permanece disponível nos arquivos originais, sem inclusão em outra seção.

O player do hero usa `youtube-nocookie.com`, com `origin` e política de referenciador definidos. Se o provedor impedir a reprodução, a composição mantém o poster e oferece um link para assistir no YouTube a partir de 8 segundos. Configuração em `media.hero`, em `src/data/site.ts`; integração sem dependências adicionais em `src/lib/youtube.ts`. Os testes automatizados simulam a API externa para conferir início, repetição, pausa e movimento reduzido sem depender da conexão com o YouTube.

## Trocar imagens

Substitua o arquivo correspondente em `public/images/` ou altere seu caminho em `src/data/site.ts`. Atualize o texto alternativo e o registro em `src/data/asset-sources.json`. Prefira WebP ou AVIF, com resolução compatível com a área de exibição. O poster do hero usa prioridade de rede alta; imagens abaixo da dobra usam o lazy loading do Next Image.

Os scripts em `scripts/` registram a preparação do acervo. Para refazer a importação, salve o HTML da página inicial em `.work/reference.html`, execute `node --use-system-ca scripts/collect-assets.mjs` e depois `node scripts/prepare-assets.mjs`. `scripts/asset-contact-sheet.mjs` gera uma prancha de conferência dos originais. A pasta `.work/` é temporária e ignorada pelo Git. Esses scripts não são necessários para executar ou publicar a página.

## Publicação

O build de produção usa `next build --webpack`. Isso permite que o Next.js utilize o compilador SWC em WebAssembly quando o binário nativo não é compatível com a GLIBC do servidor. O [Turbopack exige os bindings nativos](https://nextjs.org/docs/app/api-reference/turbopack#supported-platforms). A configuração fica em `next.config.mjs`, carregada diretamente pelo Node.js, sem compilar uma configuração TypeScript com SWC.

### Hospedagem Node.js (Hostinger)

Mantenha estas opções no painel de implantação:

| Configuração | Valor |
| --- | --- |
| Tipo de aplicação | Next.js |
| Node.js | `24.x` |
| Branch | `main` |
| Install Command | `npm ci --include=dev` (ou `npm install`, se definido pelo painel) |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Start Command, quando solicitado | `npm start` |
| Variáveis de ambiente obrigatórias | Nenhuma |

Após atualizar a branch, execute uma nova implantação. O Next.js pode baixar automaticamente `@next/swc-wasm-nodejs` durante o build quando o compilador nativo estiver indisponível.

### Vercel

O repositório [diegocoodes/VDR](https://github.com/diegocoodes/VDR) está preparado para importação direta na Vercel. O arquivo `vercel.json` define o framework e os comandos de instalação e build; `package-lock.json` fixa as dependências e `engines.node` define Node.js 24.

1. Na Vercel, selecione **Add New → Project** e importe **diegocoodes/VDR**.
2. Use a branch **main** e mantenha **Root Directory** na raiz do repositório.
3. Confirme **Framework Preset: Next.js** e publique com **Deploy**.

| Configuração | Valor |
| --- | --- |
| Node.js | `24.x` |
| Install Command | `npm ci --include=dev` |
| Build Command | `npm run build` |
| Output Directory | Padrão do Next.js, sem alteração manual |
| Variáveis de ambiente obrigatórias | Nenhuma |

Não configure exportação estática nem altere a saída para `out`: o projeto utiliza a otimização de imagens do Next.js. O fluxo de GitHub Actions valida lint e build em Linux a cada push na `main` e em pull requests. Os testes completos de navegador continuam disponíveis localmente com `npm run test:e2e`.

O repositório inclui os vídeos e imagens otimizados necessários ao site. Caches, dependências locais, relatórios de teste, arquivos `.env` e vídeos brutos ficam fora do Git. A mesma exclusão de materiais locais é aplicada a envios pela CLI da Vercel com `.vercelignore`.

O domínio canônico em `company.url` está configurado como `https://www.vdrstudio.com.br`. Se o domínio definitivo mudar, ajuste essa única configuração; os metadados, o sitemap e os dados estruturados usam esse valor. O copyright é calculado na renderização e atualizado a cada novo build, já que a página é pré-renderizada.

Não há formulário, coleta própria de leads, rastreamento próprio, autenticação ou banco de dados. O atendimento acontece pelo WhatsApp. O hero incorpora um player de terceiros do YouTube, sujeito às políticas do provedor.
