import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';

const curvesDir = resolve(__dirname, '..', 'assets', 'curves');
const messagesDir = resolve(__dirname, '..', 'assets', 'messages');
let curvesCache = null;
let messagesCache = null;

/**
 * Get the curve matrix (each lines is one curve).
 */
export function getCurves(): number[][] {
  if (curvesCache === null) {
    curvesCache = readdirSync(curvesDir).map((file) => {
      const path = resolve(curvesDir, file);
      return readFileSync(path)
        .toString()
        .trim()
        .split(' ')
        .map(str => parseFloat(str));
    });
  }

  return curvesCache;
}

/**
 * Get the message vector.
 */
export function getMessages(): number[] {
  if (messagesCache === null) {
    messagesCache = readdirSync(messagesDir).map((file) => {
      const path = resolve(messagesDir, file);
      return parseInt(readFileSync(path).toString());
    });
  }

  return messagesCache;
}
