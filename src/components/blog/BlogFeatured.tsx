import { Show } from 'solid-js';
import type { PostPreview } from '~/api-types';
import NameAndDate from '../index/NameAndDate';
import ButtonLink from '../button/ButtonLink';
import { UnsplashImage } from '../UnsplashImage';
import { postLink } from '~/utils/link';

export default function BlogFeatured(props: {
  featured: undefined | PostPreview;
}) {
  return (
    <Show when={props.featured}>
      {(featured) => (
        <section class="w-full flex justify-center bg-lavender py-v20">
          <div class="cont flex items-center lt-lg:(flex-col-reverse gap-v8) lg:gap-cont">
            <div class="flex grow-1 basis-0 flex-col">
              <div class="text-cap-1 font-medium">Featured Post</div>
              <div class="w-full pt-v5" />
              <div class="flex flex-col flex-gap-v4">
                <h2 class="text-h2">{featured().title}</h2>
                <NameAndDate
                  author={featured().author}
                  date={featured().date}
                />
                <p class="text-body-1 text-medium-gray">
                  {featured().subtitle}
                </p>
              </div>
              <div class="w-full pt-v8" />
              <ButtonLink href={postLink(featured().id)} class="self-start">
                {'Read More >'}
              </ButtonLink>
            </div>
            <div class="relative grow-1 self-stretch lt-lg:aspect-3/2 lg:max-w-128 lg:min-h-90">
              <UnsplashImage
                class="items-center justify-center"
                image={featured().image}
              />
            </div>
          </div>
        </section>
      )}
    </Show>
  );
}
