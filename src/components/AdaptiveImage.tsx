import $join from 'join.macro';

export function AdaptiveImage(props: {
  class?: string;
  aspectRatio: string;
  srcFn: (width: number) => string;
  defaultWidth: number;
  widths: number[];
}) {
  return (
    <div
      class={$join(
        'absolute top-0 right-0 bottom-0 left-0 flex overflow-hidden [container:image_/_size]',
        props.class ?? '',
      )}
    >
      <img
        class={$join(
          'pointer-events-none relative h-[max(100cqh,calc(100cqw/var(--img-ratio)))]',
          'max-w-initial w-[max(100cqw,calc(100cqh*var(--img-ratio)))] block! shrink-0! grow-0!',
        )}
        style={{ '--img-ratio': `calc(${props.aspectRatio})` }}
        src={props.srcFn(props.defaultWidth)}
        srcSet={props.widths.map((w) => `${props.srcFn(w)} ${w}w`).join(', ')}
        sizes="100%"
      />
    </div>
  );
}
