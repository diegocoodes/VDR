import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const images = JSON.parse(await readFile('.work/assets.json', 'utf8'));
const tiles = await Promise.all(
  images.map(async ({ file, index }) => {
    const photo = await sharp(file)
      .rotate()
      .resize(192, 150, { fit: 'contain', background: '#202321' })
      .toBuffer();
    const label = Buffer.from(
      `<svg width="192" height="25"><rect width="192" height="25" fill="#090b0a"/><text x="8" y="18" font-size="16" fill="#b7ff00">${index}</text></svg>`,
    );
    return [
      {
        input: photo,
        left: (index % 8) * 192,
        top: Math.floor(index / 8) * 175,
      },
      {
        input: label,
        left: (index % 8) * 192,
        top: Math.floor(index / 8) * 175 + 150,
      },
    ];
  }),
);
await sharp({
  create: {
    width: 1536,
    height: Math.ceil(images.length / 8) * 175,
    channels: 3,
    background: '#202321',
  },
})
  .composite(tiles.flat())
  .jpeg({ quality: 85 })
  .toFile('.work/contact-sheet.jpg');
