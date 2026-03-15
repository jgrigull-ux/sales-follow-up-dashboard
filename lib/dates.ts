import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function getAvailableDates(): string[] {
  try {
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) return [];
    const files = readdirSync(dataDir);
    return files
      .filter((f) => f.endsWith('.json') && DATE_REGEX.test(f.slice(0, -5)))
      .map((f) => f.slice(0, -5))
      .sort()
      .reverse();
  } catch {
    return [];
  }
}
