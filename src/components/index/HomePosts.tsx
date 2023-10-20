import { A } from '@solidjs/router';
import { For } from 'solid-js';
import type { PostPreview } from '~/api-types';
import NameAndDate from './NameAndDate';
import $join from 'join.macro';
import { blogPageLink, postLink } from '~/utils/link';

export default function HomePosts(props: { posts: PostPreview[] | undefined }) {
  return (
    <div class="flex flex-col md:max-w-128 md:grow-1 md:basis-0">
      <div class={$join('flex items-center', 'lt-md:cont', 'md:pl-8')}>
        <h2 class="text-dark-blue lt-sm:text-h3 sm:text-h2">All Posts</h2>
        <A
          href={blogPageLink()}
          class="ml-auto p-2 text-body-1 text-purple -my-2 -mr-2"
        >
          View All
        </A>
      </div>
      <div class="w-full pt-v9" />
      <div class={$join('w-full flex flex-col')}>
        <For each={props.posts}>
          {(post) => (
            <div
              class={$join(
                'flex flex-col gap-y-2',
                'lt-md:(cont py-v8)',
                'md:p-v8',
              )}
            >
              <NameAndDate author={post.author} date={post.date} />
              <A href={postLink(post.id)}>
                <h3 class="lt-sm:text-h4 text-dark-blue sm:text-h3">
                  {post.title}
                </h3>
              </A>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
