import { resolve } from 'path';
import { readdirSync, readFileSync } from 'fs';

const curvesDir = resolve(__dirname, '..', 'assets');

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
