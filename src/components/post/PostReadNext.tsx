import { For } from 'solid-js';
import type { PostPreview } from '~/api-types';
import { UnsplashImage } from '../UnsplashImage';
import NameAndDate from '../index/NameAndDate';
import { postLink } from '~/utils/link';

export default function PostReadNext(props: {
  postPreviews: PostPreview[] | undefined;
}) {
  return (
    <div class="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] cont gap-x-v8 gap-y-v16">
      <For each={props.postPreviews}>
        {(preview) => (
          <article class="flex flex-col gap-v8">
            <div class="relative aspect-3/2">
              <UnsplashImage
                image={preview.image}
                class="items-center justify-center"
              />
            </div>
            <div class="flex flex-col gap-y-v4">
              <NameAndDate author={preview.author} date={preview.date} />
              <hgroup class="flex flex-col">
                <a href={postLink(preview.id)} class="flex flex-col gap-y-4">
                  <h3 class="lt-sm:text-h4 sm:text-h3">{preview.title}</h3>
                  <p class="text-body-1">{preview.subtitle}</p>
                </a>
              </hgroup>
            </div>
          </article>
        )}
      </For>
    </div>
  );
}
