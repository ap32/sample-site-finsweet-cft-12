import { For, Show } from 'solid-js';
import type { Page } from '~/api-types';
import PostPreviewComponent from '../blocks/PostPreviewComponent';

export default function BlogPosts(props: { page?: Page }) {
  return (
    <div class="w-full flex flex-col items-center lg:gap-y-v16">
      <Show when={props.page}>
        {(posts) => (
          <>
            <For each={posts().data}>
              {(postPreview) => (
                <PostPreviewComponent postPreview={postPreview} />
              )}
            </For>
          </>
        )}
      </Show>
    </div>
  );
}
