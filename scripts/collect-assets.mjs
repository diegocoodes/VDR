import { mkdir, readFile, writeFile } from 'node:fs/promises';

await mkdir('.work/originals', { recursive: true });
const sources = [
  ['home', 'https://www.vdrstudio.com.br/'],
  ['ppf', 'https://www.vdrstudio.com.br/ppf'],
  ['zero-km', 'https://www.vdrstudio.com.br/zero-km'],
];
const images = [];
for (const [page, url] of sources) {
  const html =
    page === 'home'
      ? await readFile('.work/reference.html', 'utf8')
      : await (await fetch(url)).text();
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = match[0];
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (!src?.includes('static.wixstatic.com/media/665b27_')) continue;
    const original = src.split('/v1/')[0];
    if (images.some((image) => image.source === original)) continue;
    const index = images.length;
    const extension = original.split('.').at(-1);
    const file = `.work/originals/${String(index).padStart(2, '0')}.${extension}`;
    images.push({
      index,
      page,
      source: original,
      file,
      alt: tag.match(/\balt="([^"]*)"/)?.[1] ?? '',
    });
  }
}
await Promise.all(
  images.map(async ({ source, file }) => {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`${source}: ${response.status}`);
    await writeFile(file, Buffer.from(await response.arrayBuffer()));
  }),
);
await writeFile('.work/assets.json', JSON.stringify(images, null, 2));
console.log(JSON.stringify(images, null, 2));
