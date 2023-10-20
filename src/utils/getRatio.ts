import { calcGCD } from './calcGCD';

export function getRatio(width: number, height: number) {
  const gcd = calcGCD(width, height);
  return `${width / gcd}/${height / gcd}`;
}
