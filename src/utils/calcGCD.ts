export function calcGCD(a: number, b: number) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error('Only integers are accepted');
  }

  if (a === 0) {
    if (b === 0) return 1;
    return b;
  }

  if (b === 0) return a;

  let r: number;
  while ((r = a % b) > 0) {
    a = b;
    b = r;
  }

  return b;
}
