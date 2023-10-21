import { defineConfig, presetUno } from 'unocss';
import { variantParentMatcher } from '@unocss/preset-mini/dist/utils';
import type { Theme } from '@unocss/preset-uno';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import transformerDirectives from '@unocss/transformer-directives';

type CustomTheme = Theme & {
  icons?: Record<string, string>;
  iconWght?: Record<string, number>;
  iconOpsz?: Record<string, number>;
};

function* range(from: number, eqTo: number, step = 1) {
  while (from <= eqTo) {
    yield from;
    from += step;
  }
}

function numsToObj(nums: Iterable<number>): Record<string, number> {
  const acc: Record<string, number> = {};
  for (const num of nums) {
    acc[`${num}`] = num;
  }
  return acc;
}

function media(from?: number, to?: number) {
  const features: string[] = [];
  if (from !== undefined && from > 0) {
    features.push(`(min-width: ${from}px)`);
  }

  if (to !== undefined) {
    features.push(`(max-width: ${(to - 0.1).toFixed(1)}px)`);
  }

  if (features.length === 0) {
    features.push('all');
  }

  return features.join(' and ');
}

const breakpoints = [
  {
    name: 'xs',
    media: media(undefined, 640),
    width: 360,
  },
  {
    name: 'sm',
    media: media(640, 768),
    width: 640,
  },
  {
    name: 'md',
    media: media(768, 1024),
    width: 768,
  },
  {
    name: 'lg',
    media: media(1024, 1280),
    width: 1024,
  },
  {
    name: 'xl',
    media: media(1280),
    width: 1280,
  },
] as const;

type BreakpointInfo = (typeof breakpoints)[number];
type BreakpointName = BreakpointInfo['name'];

function lerp(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  x: number,
) {
  return p0.y + (p1.y - p0.y) * ((x - p0.x) / (p1.x - p0.x));
}

function fillValues(valsMap: { [key in BreakpointName]?: number }, round = 4) {
  const vals = breakpoints.map(({ name }) => valsMap[name]);

  function getPrevI(i: number) {
    i--;
    for (; i >= 0; i--) {
      if (vals[i] !== undefined) return i;
    }

    return undefined;
  }

  function getNextI(i: number) {
    i++;
    for (; i < vals.length; i++) {
      if (vals[i] !== undefined) return i;
    }

    return undefined;
  }

  for (let i = 1; i < vals.length - 1; i++) {
    if (vals[i] !== undefined) continue;

    const prevI = getPrevI(i);
    if (prevI === undefined) {
      i++;
      continue;
    }

    const nextI = getNextI(i);
    if (nextI === undefined) {
      return valsMap;
    }

    valsMap[breakpoints[i].name] =
      Math.round(
        lerp(
          {
            x: breakpoints[prevI].width,
            y: vals[prevI] as number,
          },
          {
            x: breakpoints[nextI].width,
            y: vals[nextI] as number,
          },
          breakpoints[i].width,
        ) / round,
      ) * round;
  }

  return valsMap;
}

function lerpXs(xl: number) {
  return {
    xs: Math.min(
      Math.round(lerp({ x: 24, y: 24 }, { x: 128, y: 64 }, xl) / 4) * 4,
      xl,
    ),
    xl,
  };
}

const spacings = [3, 4, 5, 6, 8, 9, 12, 14, 16, 20, 24, 32].map((s) => ({
  name: `spacing-v${s}`,
  values: fillValues(lerpXs(s * 4)),
}));

export default defineConfig<CustomTheme>({
  content: { filesystem: ['src/**/*.{ts,tsx}'] },
  layers: {
    preflights: 0,
    components: 1,
    default: 2,
  },
  theme: {
    spacing: {
      cont: 'calc(var(--spacing-cont))',
      ...spacings.reduce(
        (acc, spacing) => {
          acc[spacing.name.substring(8)] = `calc(var(--${spacing.name}))`;
          return acc;
        },
        {} as Record<string, string>,
      ),
    },
    icons: {
      'expand-more': '\ue5cf',
      'shopping-cart': '\ue8cc',
      'shopping-basket': '\ue8cb',
      menu: '\ue5d2',
    },
    iconWght: numsToObj(range(400, 700, 100)),
    iconOpsz: numsToObj(range(20, 48, 4)),
    supports: {
      nvu: '(width: 1dvh)',
      'not-nvu': 'not (width: 1dvh)',
    },
  },
  shortcuts: {
    'text-display': 'font-sen font-bold text-14/16 -tracking-2px',
    'text-h1': 'font-sen font-bold text-12/16 -tracking-2px',
    'text-h2': 'font-sen font-bold text-9/12 -tracking-2px',
    'text-h3': 'font-sen font-bold text-7/9 -tracking-1px ',
    'text-h4': 'font-sen font-bold text-6/8',
    'text-h5': 'font-sen font-bold text-5/8',
    'text-h6': 'font-sen font-bold text-4/6',
    'text-body-1': 'font-inter font-normal text-4/7',
    'text-body-2': 'font-inter font-normal text-3.5/5',
    'text-label': 'font-inter font-normal text-3.5/5',
    'text-cap-1': 'font-inter font-semibold text-4/5 tracking-3px uppercase',
    'text-cap-2': 'font-inter font-medium text-4/5 tracking-3px uppercase',
    'text-cap-3': 'font-inter font-black text-4/5 tracking-3px uppercase',
    cont: 'max-w-1440px w-full px-cont',
  },
  preflights: [
    {
      getCSS: () => {
        const vars = [
          {
            name: 'spacing-cont',
            values: fillValues({
              xs: 20,
              xl: 80,
            }),
          },
          ...spacings,
        ];

        const result = breakpoints
          .map(
            ({ name: brName, media }) =>
              `@media ${media} {\n  :root {\n    ${vars

                .map(({ name: varName, values }) => {
                  const v = values[brName];
                  return v === undefined
                    ? undefined
                    : `--${varName}: ${v / 16}rem;`;
                })
                .filter((v) => Boolean(v))
                .join('\n    ')}\n  }\n}`,
          )
          .join('\n\n');

        return result;
      },
    },
  ],
  shortcutsLayer: 'components',
  rules: [],
  variants: [
    variantParentMatcher(
      '@desktop',
      `@media (hover: hover) and (pointer: fine)`,
    ),
  ],
  presets: [presetUno()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  extendTheme: (theme) => {
    theme.colors = {
      transparent: 'transparent',
      white: '#fff',
      black: '#000',
      'dark-blue': '#232536',
      yellow: '#FFD050',
      purple: '#592EA9',
      'dark-gray': '#4C4C4C',
      'medium-gray': '#6D6E76',
      'light-gray': '#F4F4F4',
      lavender: '#F4F0F8',
      'light-yellow': '#FBF6EA',
      'dark-yellow': '#EDC14A',
    };

    theme.letterSpacing = {
      '0': '0',
      '0.5': '0.005em',
      '1': '0.01em',
      '1.5': '0.015em',
      '2': '0.02em',
      '2.5': '0.025em',
      '3': '0.03em',
    };

    theme.fontFamily = {
      sen: '"Sen", sans-serif',
      inter: '"Inter", sans-serif',
    };

    return theme;
  },
});
