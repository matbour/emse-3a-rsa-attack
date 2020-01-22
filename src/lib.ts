import { getCurves, getMessages } from './parser';

export type Key = number;

const N = 510471373;
const squareFactor = 1;
const mulFactor = 1.2;

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

export function getY(time: number, T: number[], hypothesis: 0 | 1) {
  if (hypothesis == 0) {
    const Y0: number[] = [];
    for (let i = 0; i < T.length; i++) {
      let K = (T[i] * T[i]) % N;
      K = (K * K) % N;
      Y0.push(squareFactor * squareFactor * hamming(K));
    }
    return Y0;
  } else {
    const Y1: number[] = [];
    for (let i = 0; i < T.length; i++) {
      let K = (T[i] * T[i]) % N;
      K = (K * getMessages()[i]) % N;
      Y1.push(squareFactor * mulFactor * hamming(K));
    }
    return Y1;
  }
}

export function step(T: number[], bit: 0 | 1) {
  return T.map((v) => (v * v) % N)
    .map((v, i) => {
      if (bit === 0) {
        return v;
      }

      return (v * getMessages()[i]) % N;
    });
}
