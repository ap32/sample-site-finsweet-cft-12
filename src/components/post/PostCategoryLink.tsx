import { Show } from 'solid-js';
import { A } from 'solid-start';
import type { Post } from '~/api-types';
import { blogCategoryPageLink } from '~/utils/link';

export default function PostCategoryLink(props: { post: Post | undefined }) {
  return (
    <Show when={props.post}>
      {(post) => (
        <div class="cont max-w-200">
          <A
            href={blogCategoryPageLink(post().category.slug)}
            class="flex items-center gap-2"
          >
            <img
              class="h-6 w-6"
              src={`/img/icons/categories/${post().category.slug}.svg`}
            />
            <div class="text-h4">{post().category.name}</div>
          </A>
        </div>
      )}
    </Show>
  );
}
