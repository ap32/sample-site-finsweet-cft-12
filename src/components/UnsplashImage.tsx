import type { Image } from '~/api-types';
import { AdaptiveImage } from './AdaptiveImage';
import { createMemo } from 'solid-js';
import { generateWidths } from '~/utils/generateWidths';
import { getRatio } from '~/utils/getRatio';

export function UnsplashImage(props: {
  class?: string;
  image: Pick<Image, 'width' | 'height' | 'url'>;
}) {
  const widths = createMemo(() => generateWidths(props.image.width));
  const aspectRatio = createMemo(() =>
    getRatio(props.image.width, props.image.height),
  );
  return (
    <AdaptiveImage
      class={props.class}
      srcFn={(w) => `${props.image.url}&auto=format&q=80&fit=max&w=${w}`}
      widths={widths()}
      defaultWidth={widths().at(-1) ?? 720}
      aspectRatio={aspectRatio()}
    />
  );
}
