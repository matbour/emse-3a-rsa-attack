import * as corr from 'node-correlation';
import { getX, getY, step } from './lib';
import { getMessages } from './parser';

let key = '';
let time = -1;
let T = getMessages();
let corr0;
let corr1;

while (true) {
  const X = getX(time + 2);
  const Y0 = getY(time + 2, T, 0);
  const Y1 = getY(time + 2, T, 1);
  corr0 = Math.abs(corr.calc(X, Y0));
  corr1 = Math.abs(corr.calc(X, Y1));

  if (isNaN(corr0) || isNaN(corr1)) {
    break;
  }

  if (corr0 > corr1) {
    key += '0';
    T = step(T, 0);
    time += 1;
  } else {
    key += '1';
    T = step(T, 1);
    time += 2;
  }

  console.log({ corr0, corr1 }); // 10111101
}

console.log('Key:', key, '(length', key.length, ')');

