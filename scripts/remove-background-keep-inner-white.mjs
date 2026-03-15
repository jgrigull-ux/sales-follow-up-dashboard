#!/usr/bin/env node
/**
 * Make only the outer white background transparent (flood-fill from edges).
 * Inner white pixels are left as-is.
 * Usage: node scripts/remove-background-keep-inner-white.mjs <input> [output]
 */

import sharp from 'sharp';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const input = process.argv[2] || join(ROOT, 'public/favicons/cursor.png');
const output = process.argv[3] || input;
const WHITE_THRESHOLD = 250;

if (!existsSync(input)) {
  console.error('File not found:', input);
  process.exit(1);
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

function idx(x, y) {
  return (y * width + x) * 4;
}

function isWhite(i) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  return r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD;
}

const isBackground = new Set();
const stack = [];

function push(x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const i = idx(x, y);
  const key = `${x},${y}`;
  if (isBackground.has(key)) return;
  if (!isWhite(i)) return;
  isBackground.add(key);
  stack.push([x, y]);
}

for (let x = 0; x < width; x++) {
  push(x, 0);
  push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  push(0, y);
  push(width - 1, y);
}

while (stack.length > 0) {
  const [x, y] = stack.pop();
  push(x - 1, y);
  push(x + 1, y);
  push(x, y - 1);
  push(x, y + 1);
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (isBackground.has(`${x},${y}`)) {
      const i = idx(x, y);
      data[i + 3] = 0;
    }
  }
}

await sharp(data, {
  raw: { width, height, channels: 4 },
})
  .png()
  .toFile(output);

console.log('Done:', output);
