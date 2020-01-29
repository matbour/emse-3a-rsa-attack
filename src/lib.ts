import { N } from './constants';
import { getCurves, getMessages } from './parser';

/**
 * Ge the Hamming weight of a given number (i.e. the number of ones in its binary representation).
 */
export function hamming(t: number): number {
  if (t === 0) {
    return 0;
  } else {
    return t.toString(2).match(/1/g).length;
  }
}

export function getX(time: number) {
  return getCurves().map(curve => curve[time]);
}

export function getY(T: number[], hypothesis: 0 | 1) {
  // K = T * T
  let K = T.map(t => (t * t) % N);

  if (hypothesis == 0) {
    // Y0 = K * T
    K = K.map(t => (t * t) % N);
  } else {
    // Y1 = K * M
    K = K.map((t, i) => (t * getMessages()[i]) % N);
  }

  return K.map(k => hamming(k));
}

export function step(T: number[], bit: 0 | 1) {
  return T.map((t) => (t * t) % N)
    .map((t, i) => {
      if (bit === 0) {
        // Bit 0: only square
        return t;
      } else {
        // Bit 1: square + mul
        return (t *  getMessages()[i]) % N;
      }
    });
}
