import { resolve } from 'path';
import { readdirSync, readFileSync } from 'fs';

const curvesDir = resolve(__dirname, '..', 'assets', 'curves');
const messagesDir = resolve(__dirname, '..', 'assets', 'messages');

/**
 * Get the curve matrix (lines are one curve)
 */
export function getCurves(): number[][] {
  return readdirSync(curvesDir).map((file) => {
    const path = resolve(curvesDir, file);
    return readFileSync(path)
      .toString()
      .trim()
      .split(' ')
      .map(str => parseFloat(str));
  });
}

export function getMessages(): number[][] {
  return readdirSync(curvesDir).map((file) => {
    const path = resolve(curvesDir, file);
    return readFileSync(path)
      .toString()
      .trim()
      .split(' ')
      .map(str => parseFloat(str));
  });
}
