export function generateWidths(width: number, threshold = 240) {
  if (width <= threshold) return [width];
  const widths = [];
  let rounded: number;
  while ((rounded = Math.round(width)) > threshold) {
    widths.push(rounded);
    width /= 2;
  }
  return widths;
}
