import { expectedKey } from './constants';
import { getX, getY, step } from './lib';
import { calc as corr } from 'node-correlation';
import { getMessages } from './parser';

let key = '';
let time = -1;
let T = getMessages();
let corr0;
let corr1;
let deltaCorr = [];

while (true) {
  const X = getX(time + 2);
  const Y0 = getY(time + 2, T, 0);
  const Y1 = getY(time + 2, T, 1);
  corr0 = Math.abs(corr(X, Y0));
  corr1 = Math.abs(corr(X, Y1));

  if (isNaN(corr0) || isNaN(corr1)) {
    break;
  }

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


let diffKeyArr = Array.from(key);
for (let i = 0; i < expectedKey.length; i++) {
  if (expectedKey[i] === key[i]) {
    diffKeyArr[i] = ' ';
  } else {
    diffKeyArr[i] = 'X';
  }
}

console.log('Expected key:', expectedKey);
console.log('Computed key:', key);
console.log('Difference:  ', diffKeyArr.join(''));
