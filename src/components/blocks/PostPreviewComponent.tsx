import { A } from 'solid-start';
import type { PostPreview } from '~/api-types';
import { UnsplashImage } from '../UnsplashImage';
import { blogCategoryPageLink, postLink } from '~/utils/link';

export default function PostPreviewComponent(props: {
  postPreview: PostPreview;
}) {
  return (
    <>
      <article class="cont flex gap-8 lt-lg:(flex-col pb-v16 pt-cont)">
        <a
          href={postLink(props.postPreview.id)}
          class="relative grow-1 lt-lg:aspect-16/9 lg:(max-w-120 min-h-60)"
        >
          <UnsplashImage
            image={props.postPreview.image}
            class="items-center justify-center"
          />
        </a>
        <div class="flex grow-1 basis-0 flex-col self-center gap-y-v5 lg:py-v14">
          <A
            class="text-cap-1 text-purple"
            href={blogCategoryPageLink(props.postPreview.category.slug)}
          >
            {props.postPreview.category.name}
          </A>
          <A href={postLink(props.postPreview.id)}>
            <hgroup class="flex flex-col gap-y-v4">
              <h2 class="text-h2">{props.postPreview.title}</h2>
              <p class="text-body-1 text-medium-gray">
                {props.postPreview.subtitle}
              </p>
            </hgroup>
          </A>
        </div>
      </article>
      <div class="self-stretch b-t b-medium-gray/10 -mt-0.25 lg:hidden" />
    </>
  );
}
