import { createMemo } from 'solid-js';

export default function AvatarPlaceholder(props: {
  id: number;
  class?: string;
  baseWidth: number;
  sizes: string;
}) {
  function imgUrl(w: number) {
    return `https://i.pravatar.cc/${w}?img=${props.id}`;
  }

  function imgSrc(w: number) {
    return `${imgUrl(w)} ${w}w`;
  }

  const srcSet = createMemo(() => {
    let w: number = Math.min(props.baseWidth, 1000);

    let srcSet = imgSrc(w);
    if (w === 1000) return srcSet;

    for (;;) {
      w *= 2;
      if (w > 800) break;
      srcSet += `, ${imgSrc(w)}`;
    }

    srcSet += `, ${imgSrc(1000)}`;
    return srcSet;
  });

  return (
    <img
      src={imgUrl(props.baseWidth)}
      srcSet={srcSet()}
      sizes={props.sizes}
      class={props.class}
    />
  );
}
