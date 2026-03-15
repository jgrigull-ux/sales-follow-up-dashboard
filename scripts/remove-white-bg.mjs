#!/usr/bin/env node
/**
 * Make white (or near-white) pixels transparent in an image.
 * Usage: node scripts/remove-white-bg.mjs <input> [output]
 * Default output overwrites input. Uses threshold 250 for R,G,B.
 */

import sharp from 'sharp';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const input = process.argv[2] || join(ROOT, 'public/favicons/gong.png');
const output = process.argv[3] || input;
const WHITE_THRESHOLD = 250;

if (!existsSync(input)) {
  console.error('File not found:', input);
  process.exit(1);
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(output);

console.log('Done:', output);
