import { Show } from 'solid-js';
import type { PostPreview } from '~/api-types';
import { UnsplashImage } from '../UnsplashImage';
import NameAndDate from './NameAndDate';
import { A } from '@solidjs/router';
import $join from 'join.macro';
import { postLink } from '~/utils/link';
import ButtonLink from '../button/ButtonLink';

export default function HomeFeatured(props: {
  featured: PostPreview | undefined;
}) {
  return (
    <div class="w-full flex flex-col items-start md:grow-1 md:basis-0">
      <h2
        class={$join(
          'text-dark-blue',
          'lt-sm:text-h3',
          'sm:text-h2',
          'lt-md:cont',
        )}
      >
        {'Featured Post'}
      </h2>
      <div class="w-full pt-v9" />
      <Show when={props.featured} fallback={<div class="w-full" />}>
        {(postPreview) => (
          <div
            class={$join(
              'w-full flex flex-col border-medium-gray/10 gap-v8',
              'lt-md:pb-cont lt-md:border-b',
              'md:p-v8',
              'md-outline md-outline-medium-gray/10 md:outline-1 md:-outline-offset-1',
            )}
          >
            {/* Image */}
            <div class="relative aspect-ratio-1.9 w-full">
              <UnsplashImage
                class="items-center justify-center"
                image={postPreview().image}
              />
            </div>

            <div class="lt-md:cont flex flex-col gap-v4">
              {/* Name and date */}
              <NameAndDate
                author={postPreview().author}
                date={postPreview().date}
              />
              {/* Title and subtitle */}
              <A
                href={postLink(postPreview().id)}
                class="flex flex-col gap-v4 text-dark-blue"
              >
                <h3 class="lt-sm:text-h4 sm:text-h3">{postPreview().title}</h3>
                <p>{postPreview().subtitle}</p>
              </A>
            </div>

            <div class="lt-md:cont flex">
              <ButtonLink href={postLink(postPreview().id)}>
                {'Read More >'}
              </ButtonLink>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
}
