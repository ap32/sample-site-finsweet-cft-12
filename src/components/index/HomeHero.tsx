import { Show } from 'solid-js';
import type { PostPreview } from '~/api-types';
import { UnsplashImage } from '../UnsplashImage';
import $join from 'join.macro';
import { Link } from '@solidjs/router';
import minutesToISO from '~/utils/minutesToISO';
import minutesToDateStr from '~/utils/formatDate';
import { authorLink, blogCategoryPageLink, postLink } from '~/utils/link';
import ButtonLink from '../button/ButtonLink';

export default function HomeHero(props: { hero: PostPreview | undefined }) {
  return (
    <div class="relative w-full">
      <Show when={props.hero}>
        {(postPreview) => (
          <div class="relative w-full">
            <UnsplashImage
              class="items-center justify-center"
              image={postPreview().image}
            />
            <div
              class={$join(
                '[background:radial-gradient(circle_560px_at_max(50%+360px,1080px)_0,transparent_0%,rgba(0,0,0,0.75)_100%)]',
                'absolute inset-0 pointer-events-none',
              )}
            />
            <div class="relative w-full flex justify-center">
              <div class="cont">
                <div
                  class={$join('relative flex flex-col items-start', 'py-v32')}
                >
                  <div class="flex flex-col gap-v6">
                    {/* Posted on */}
                    <span class="text-cap-1 font-medium text-white">
                      <span class="lt-sm:hidden">Posted on </span>
                      <Link
                        href={blogCategoryPageLink(postPreview().category.slug)}
                        class="font-black"
                      >
                        {postPreview().category.name}
                      </Link>
                    </span>

                    {/* Title */}
                    <Link
                      href={postLink(postPreview().id)}
                      class={$join(
                        'text-white lt-sm:text-h3 sm:text-h2 lg:text-display max-w-4xl',
                      )}
                    >
                      <h1>{postPreview().title}</h1>
                    </Link>

                    {/* Author, date */}
                    <span class="text-body-1 text-white">
                      {'By '}
                      <a
                        href={authorLink(postPreview().author.id)}
                        class="text-yellow"
                      >
                        {postPreview().author.name}
                      </a>
                      <span class="mx-1">{' | '}</span>
                      <time datetime={minutesToISO(postPreview().date)}>
                        {minutesToDateStr(postPreview().date)}
                      </time>
                    </span>
                  </div>
                  <div class="w-full pt-v4" />
                  {/* Subtitle */}
                  <p class="max-w-3xl text-body-1 text-white">
                    {postPreview().subtitle}
                  </p>

                  <div class="w-full pt-v12" />
                  {/* Read more */}
                  <ButtonLink href={postLink(postPreview().id)}>
                    {'Read more >'}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
}
