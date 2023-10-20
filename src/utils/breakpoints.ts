import { createBreakpoints } from '@solid-primitives/media';
import { createSingletonRoot } from '@solid-primitives/rootless';

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const useBreakpoints = createSingletonRoot(() => {
  return createBreakpoints(breakpoints);
});
