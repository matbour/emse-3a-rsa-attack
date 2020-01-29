import { calc as corr } from 'node-correlation';
import { d, expectedKey } from './constants';
import { getX, getY, hamming, step } from './lib';
import { getCurves, getMessages } from './parser';

let key = '';
let time = -1;
let history: number[][] = [];
let T = getMessages();
let corr0;
let corr1;
let deltaCorr = [];

while (time < 36) {
  const X = getX(time + 2);
  const Y0 = getY(T, 0);
  const Y1 = getY(T, 1);

  corr0 = Math.abs(corr(X, Y0));
  corr1 = Math.abs(corr(X, Y1));

  // console.log({ corr0, corr1 });

  deltaCorr.push(Math.round(Math.abs(corr0 - corr1) * 1000) / 1000);

  if (corr0 > corr1) {
    // Hypothesis 0 is better, step time by 1
    key += '0';
    T = step(T, 0);
    time += 1;
  } else {
    // Hypothesis 1 is better, step time by 2
    key += '1';
    T = step(T, 1);
    time += 2;
  }
}

// Remove leading zeros
key = key.replace(/^0+/, '');


let diffKeyArr = Array.from(key);
for (let i = 0; i < expectedKey.length; i++) {
  if (expectedKey[i] === key[i]) {
    diffKeyArr[i] = ' ';
  } else {
    diffKeyArr[i] = 'X';
  }
}

console.log('Expected key:', expectedKey);
console.log('Computed key:', key, `length (${key.length})`);
console.log('Difference:  ', diffKeyArr.join(''));
