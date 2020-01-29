import { readFileSync } from 'fs';
import { resolve } from 'path';
import { samples } from './constants';

const curvesDir = resolve(__dirname, '..', 'assets', 'curves');
const messagesDir = resolve(__dirname, '..', 'assets', 'messages');
let curvesCache = null;
let messagesCache = null;

/**
 * Get the curve matrix (each lines is one curve).
 */
export function getCurves(): number[][] {
  if (curvesCache === null) {
    curvesCache = [];

    for (let i = 0; i < samples; i++) {
      const path = resolve(curvesDir, `curve_${i}.txt`);
      curvesCache.push(
        readFileSync(path)
          .toString()
          .trim()
          .split(' ')
          .map(str => parseFloat(str)),
      );
    }
  }

  return curvesCache;
}

/**
 * Get the message vector.
 */
export function getMessages(): number[] {
  if (messagesCache === null) {
    messagesCache = [];

    for (let i = 0; i < samples; i++) {
      const path = resolve(messagesDir, `msg_${i}.txt`);
      messagesCache.push(parseInt(readFileSync(path).toString()));
    }
  }

  return messagesCache;
}
