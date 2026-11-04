import sharp from 'sharp';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';

const sources = JSON.parse(await readFile('.work/assets.json', 'utf8'));
const selections = [
  ['hero', 1, 2048],
  ['servico-ppf', 34, 1000],
  ['servico-vitrificacao', 70, 1000],
  ['servico-polimento', 29, 1000],
  ['servico-zero-km', 5, 1000],
  ['ppf-parcial', 43, 1100],
  ['ppf-frontal', 44, 1100],
  ['ppf-completo', 45, 1100],
  ['projeto-bmw', 24, 1500],
  ['projeto-audi', 23, 1200],
  ['projeto-detalhe', 17, 1000],
  ['projeto-aplicacao', 32, 1000],
  ['projeto-acabamento', 21, 1200],
  ['projeto-vitrificacao', 57, 1000],
  ['sobre', 8, 1100],
  ['zero-km', 50, 1600],
  ['contato', 52, 1600],
];
await mkdir('public/images', { recursive: true });
await Promise.all(
  selections.map(async ([name, index, width]) => {
    const original = sources[index];
    const height =
      name === 'contato' ? 1000 : name === 'sobre' ? 1375 : undefined;
    await sharp(original.file)
      .rotate()
      .resize({ width, height, fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 84, effort: 5 })
      .toFile(`public/images/${name}.webp`);
  }),
);
await sharp(sources[0].file)
  .resize({ width: 540 })
  .webp({ lossless: true })
  .toFile('public/images/vdr-logo.webp');
await copyFile(sources[0].file, 'public/images/vdr-logo-original.png');
await sharp(sources[15].file)
  .resize(48, 48)
  .webp({ quality: 90 })
  .toFile('public/images/google.webp');
// Ícone extraído da própria marca, preservando suas formas e cores.
await sharp(sources[0].file)
  .extract({ left: 0, top: 0, width: 1080, height: 283 })
  .resize(160, 90, { fit: 'contain', background: '#090b0a' })
  .png()
  .toFile('public/icon.png');
await sharp(sources[1].file)
  .resize(1200, 630, { fit: 'cover' })
  .composite([
    {
      input: Buffer.from(
        '<svg width="1200" height="630"><rect width="1200" height="630" fill="#090b0a" opacity="0.5"/></svg>',
      ),
    },
    {
      input: await sharp(sources[0].file).resize(420).png().toBuffer(),
      left: 55,
      top: 55,
    },
  ])
  .jpeg({ quality: 88 })
  .toFile('public/images/og-vdr.jpg');
const currentSources = JSON.parse(
  await readFile('src/data/asset-sources.json', 'utf8').catch(() => '{}'),
);
await writeFile(
  'src/data/asset-sources.json',
  JSON.stringify(
    {
      ...currentSources,
      checkedAt: '2026-11-03',
      note: 'Acervo original publicado no site oficial da VDR. Apenas recorte, redimensionamento e compressão. Sem geração de resultados artificiais.',
      logo: sources[0].source,
      photos: selections.map(([name, index]) => ({
        file: `/images/${name}.webp`,
        source: sources[index].source,
        page: sources[index].page,
      })),
    },
    null,
    2,
  ) + '\n',
);
console.log('Marca, fotografias, imagem social e proveniência preparadas.');
