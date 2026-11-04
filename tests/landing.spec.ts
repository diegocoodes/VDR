import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mockYouTube, youtubeState } from './helpers/youtube';

test.beforeEach(async ({ page }) => {
  await mockYouTube(page);
});

test('conteúdo, SEO local, âncoras e mensagens comerciais são válidos', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/VDR.*PPF.*Mirassol/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('h1')).toHaveCount(1);
  expect(
    new URL(
      (await page.locator('link[rel="canonical"]').getAttribute('href')) ?? '',
    ).href,
  ).toBe('https://www.vdrstudio.com.br/');
  const business = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      '{}',
  );
  expect(business.telephone).toBe('+5517991321761');
  expect(business.address.addressLocality).toBe('Mirassol');
  const links = await page
    .locator('a[href^="https://wa.me/"]')
    .evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href') ?? ''));
  expect(links.length).toBeGreaterThan(12);
  const messages = links.map((href) => {
    const url = new URL(href);
    expect(url.pathname).toBe('/5517991321761');
    expect(url.searchParams.get('text')).toContain('Olá!');
    expect(href).not.toContain(' ');
    return url.searchParams.get('text');
  });
  for (const service of [
    'PPF automotivo',
    'vitrificação automotiva',
    'polimento técnico',
    'zero km',
  ])
    expect(messages.some((message) => message?.includes(service))).toBe(true);
  const missingAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((anchors) =>
      anchors
        .map((a) => a.getAttribute('href')?.slice(1))
        .filter((id) => !id || !document.getElementById(id)),
    );
  expect(missingAnchors).toEqual([]);
  expect(errors).toEqual([]);
});

test('comparação de PPF funciona por clique e teclado, com orçamento contextual', async ({
  page,
}) => {
  await page.goto('/');
  const frontal = page.getByRole('tab', { name: 'PPF FRONTAL' });
  await expect(frontal).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tablist')).toHaveAttribute(
    'aria-orientation',
    'vertical',
  );
  await frontal.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('tab', { name: 'PPF COMPLETO' })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText(
    'Um cuidado mais abrangente.',
  );
  expect(
    new URL(
      (await page
        .getByRole('link', { name: 'Encontrar a proteção ideal' })
        .getAttribute('href')) ?? '',
    ).searchParams.get('text'),
  ).toContain('PPF COMPLETO');
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'PPF PARCIAL' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.getByRole('tab', { name: 'PPF FRONTAL' }).click();
  await expect(page.getByRole('tabpanel')).toContainText(
    'Capô, para-choque, paralamas e retrovisores.',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('tablist')).toHaveAttribute(
    'aria-orientation',
    'horizontal',
  );
  await frontal.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByRole('tab', { name: 'PPF PARCIAL' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('vídeos reproduzem e o BMW usa moldura animada sem controles nativos', async ({
  page,
}) => {
  const bmwRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/videos/vdr-bmw.mp4'))
      bmwRequests.push(request.url());
  });
  await page.goto('/');
  const hero = page.locator('#inicio iframe');
  await expect(hero).toHaveAttribute(
    'src',
    /youtube-nocookie.com\/embed\/y8pC5TZ4sAw\?/,
  );
  const embedUrl = new URL((await hero.getAttribute('src')) ?? '');
  expect(embedUrl.searchParams.get('start')).toBe('8');
  expect(embedUrl.searchParams.has('list')).toBe(false);
  await expect.poll(async () => (await youtubeState(page))?.playing).toBe(true);
  expect((await youtubeState(page))?.muted).toBe(true);
  expect((await youtubeState(page))?.currentTime).toBe(8);
  await page.evaluate(() =>
    (window as Window & { __youtubeEnd?: () => void }).__youtubeEnd?.(),
  );
  expect((await youtubeState(page))?.seeks).toEqual([8]);
  await page
    .getByRole('button', { name: 'Pausar vídeo de apresentação' })
    .click();
  await expect
    .poll(async () => (await youtubeState(page))?.playing)
    .toBe(false);
  await page
    .getByRole('button', { name: 'Reproduzir vídeo de apresentação' })
    .click();
  await expect.poll(async () => (await youtubeState(page))?.playing).toBe(true);
  const project = page.locator('#projetos video');
  await expect(project).toHaveAttribute('preload', 'none');
  await expect(project).toHaveJSProperty('controls', false);
  await expect(project).toHaveJSProperty('muted', true);
  await expect(project).toHaveJSProperty('loop', true);
  await expect(page.locator('#projetos img')).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: /Ampliar fotografia/ }),
  ).toHaveCount(0);
  expect(bmwRequests).toEqual([]);
  await project.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      project.evaluate(
        (element: HTMLVideoElement) =>
          !element.paused && element.currentTime > 0,
      ),
    )
    .toBe(true);
  await expect(project).toHaveJSProperty('videoWidth', 1080);
  await expect(project).toHaveJSProperty('videoHeight', 1920);
  expect(bmwRequests.length).toBeGreaterThan(0);
  await expect(page.locator('.project-border-runner')).toHaveCSS(
    'animation-play-state',
    'running',
  );
  await page.getByRole('button', { name: 'Pausar projeto BMW' }).click();
  await expect(project).toHaveJSProperty('paused', true);
  await expect(page.locator('.project-border-runner')).toHaveCSS(
    'animation-play-state',
    'paused',
  );
  await page.getByRole('button', { name: 'Reproduzir projeto BMW' }).focus();
  await page.keyboard.press('Enter');
  await expect(project).toHaveJSProperty('paused', false);
  await page.locator('#servicos').scrollIntoViewIfNeeded();
  await expect(project).toHaveJSProperty('paused', true);
  await expect
    .poll(async () => (await youtubeState(page))?.playing)
    .toBe(false);
  await expect(page.locator('#sobre img')).toHaveAttribute(
    'alt',
    /Profissional da VDR/,
  );
  expect(await page.locator('#sobre img').getAttribute('src')).toContain(
    'vdr-perfil.webp',
  );
});

test('pacotes mantêm durações, benefícios e mensagens específicas no novo layout', async ({
  page,
}) => {
  await page.goto('/');
  const cards = page.locator('.coating-card');
  await expect(cards).toHaveCount(3);
  for (const [index, name] of [
    'Essencial',
    'Premium',
    'Premium Plus',
  ].entries()) {
    const card = cards.nth(index);
    await expect(
      card.getByRole('heading', { name, exact: true }),
    ).toBeVisible();
    await expect(card.locator('.coating-term')).toContainText(
      index === 0 ? 'Até 12 meses' : 'Até 3 anos',
    );
    const link = card.getByRole('link', { name: `Consultar pacote ${name}` });
    expect(
      new URL((await link.getAttribute('href')) ?? '').searchParams.get('text'),
    ).toContain(`pacote ${name} de vitrificação`);
    await expect(card.locator('li')).toHaveCount(2);
  }
  await expect(cards.last()).toContainText('Tratamento dos bancos de couro');
});

test('serviços usam as fotos novas, preservam orçamento e retiram os textos indicados', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#servicos h3')).toHaveCount(4);
  await expect(page.locator('#servicos .service-budget')).toHaveCount(4);
  const photos = await page
    .locator('#servicos img')
    .evaluateAll((images) => images.map((image) => image.getAttribute('src')));
  for (const file of [
    'servico-vitrificacao-cliente.webp',
    'servico-polimento-cliente.webp',
    'servico-preparacao-cliente.webp',
  ])
    expect(photos.some((src) => src?.includes(file))).toBe(true);
  for (const selector of [
    '.hero-location',
    '.hero-image-label',
    '.hero-bottom',
    '.project-heading-note',
    '.about-photo-caption',
  ])
    await expect(page.locator(selector)).toHaveCount(0);
  await expect(
    page.getByText('Projeto real da VDR Studio Automotivo.', { exact: true }),
  ).toHaveCount(0);
  await page.locator('#sobre').scrollIntoViewIfNeeded();
  const profile = page.locator('#sobre img');
  await profile.evaluate((image: HTMLImageElement) => image.decode());
  await expect(profile).toBeVisible();
  await expect(page.locator('.profile-border-runner')).toHaveCSS(
    'animation-name',
    'none',
  );
  expect(
    await profile.evaluate((image) => getComputedStyle(image).clipPath),
  ).toContain('polygon');
});

test('fundo fluido é limitado ao desktop e é estático no mobile e com movimento reduzido', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#servicos').scrollIntoViewIfNeeded();
  const layer = page.locator('#servicos .section-atmosphere');
  await expect(layer).toHaveAttribute('data-fluid-background', 'active');
  await expect(layer.locator('canvas')).toHaveCount(1);
  await expect
    .poll(() =>
      layer
        .locator('canvas')
        .evaluate((canvas: HTMLCanvasElement) => canvas.width),
    )
    .toBeGreaterThan(300);
  expect(
    await layer.evaluate((element) =>
      getComputedStyle(element).getPropertyValue('--ns-accent').trim(),
    ),
  ).toBe('#b7ff00');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(layer).toHaveAttribute('data-fluid-background', 'static');
  await expect(layer.locator('canvas')).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(layer).toHaveAttribute('data-fluid-background', 'static');
  await expect(page.locator('.section-atmosphere canvas')).toHaveCount(0);
});

test('hero oferece o vídeo com início em 8 segundos se o YouTube estiver indisponível', async ({
  page,
}) => {
  await page.route('https://www.youtube.com/iframe_api', (route) =>
    route.abort(),
  );
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: 'Assistir no YouTube' }),
  ).toHaveAttribute('href', 'https://www.youtube.com/watch?v=y8pC5TZ4sAw&t=8s');
  await expect(page.locator('#inicio img')).toBeVisible();
});

test('menu mobile mantém foco e permite navegar sem bloquear a página', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Abrir menu' });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const menu = page.getByRole('dialog', { name: 'Menu de navegação' });
  await expect(menu).toBeVisible();
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await menu.getByRole('link', { name: 'Serviços', exact: true }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#servicos$/);
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await expect(page.locator('.mobile-conversion')).toBeVisible();
});

test('perguntas frequentes abrem com teclado e deixam apenas uma resposta aberta', async ({
  page,
}) => {
  await page.goto('/');
  const question = page.locator('summary').first();
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details[open]')).toHaveCount(1);
  await page.locator('summary').nth(1).click();
  await expect(page.locator('details[open]')).toHaveCount(1);
  await expect(page.locator('details[open]')).toContainText('barreira física');
});

test('desktop e mobile não apresentam overflow, fotos quebradas ou recortes no título', async ({
  page,
}) => {
  await page.goto('/');
  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `overflow em ${width}px`,
    ).toBeLessThanOrEqual(width);
    const titleRight = await page.locator('h1 > span').evaluateAll((elements) =>
      elements.map((element) => {
        const range = document.createRange();
        range.selectNodeContents(element);
        return range.getBoundingClientRect().right;
      }),
    );
    expect(
      Math.max(...titleRight),
      `título cortado em ${width}px`,
    ).toBeLessThanOrEqual(width - 8);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const image of await page.locator('main img').all()) {
    if (!(await image.isVisible())) continue;
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(async () =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
});

test('acessibilidade WCAG AA em desktop, menu, vídeos e movimento reduzido', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect
    .poll(async () => (await youtubeState(page))?.playing)
    .toBe(false);
  await expect(
    page.getByRole('button', { name: 'Reproduzir vídeo de apresentação' }),
  ).toBeVisible();
  const check = async () => {
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      result.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    ).toEqual([]);
  };
  await check();
  await page.getByRole('button', { name: 'Reproduzir projeto BMW' }).click();
  await check();
  await page.setViewportSize({ width: 390, height: 844 });
  await check();
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await check();
  await page.keyboard.press('Escape');
  expect(
    await page
      .locator('.hero-title')
      .evaluate((element) => getComputedStyle(element).animationDuration),
  ).toBe('1e-05s');
});
