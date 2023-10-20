import { Show } from 'solid-js';
import type { Post } from '~/api-types';
import { UnsplashImage } from '../UnsplashImage';

export default function PostImage(props: { post: Post | undefined }) {
  return (
    <Show when={props.post}>
      {(post) => (
        <>
          <div class="cont flex flex-col">
            <div class="relative lt-md:aspect-3/2 md:aspect-2/1">
              <UnsplashImage
                image={post().image}
                class="items-center justify-center"
              />
            </div>
          </div>
          <div class="w-full pt-v3" />
          <div class="cont text-center text-body-1">
            <a
              href={`https://unsplash.com/photos/${post().image.id}`}
              class="decoration-underline"
            >
              Photo
            </a>
            {' by '}
            <a href={post().image.userLink} class="decoration-underline">
              {post().image.userName}
            </a>
            {' on '}
            <a href="https://unsplash.com" class="decoration-underline">
              Unsplash
            </a>
          </div>
        </>
      )}
    </Show>
  );
}
