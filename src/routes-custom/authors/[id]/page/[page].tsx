import { Show, For } from 'solid-js';
import { useRouteData } from 'solid-start';
import type { routeData } from './[page].data';
import AuthorHeader from '~/components/author/AuthorHeader';
import PostPreviewComponent from '~/components/blocks/PostPreviewComponent';
import Pagination from '~/components/pagination/Pagination';
import { authorLink } from '~/utils/link';

export default function Author() {
  const { author, page } = useRouteData<typeof routeData>();

  return (
    <div class="flex flex-col">
      <AuthorHeader author={author()} />
      <main class="flex flex-col items-center">
        <div class="w-full pt-v32" />
        <h2 class="cont lt-sm:text-h3 sm:text-h2">Author posts</h2>
        <div class="w-full pt-v8" />
        <div class="lg:cont lt-lg:w-full">
          <div class="b-t -mt-0.25 lg:b-medium-gray/32 lt-lg:b-medium-gray/10 lg:pt-v16" />
        </div>
        <div class="w-full flex flex-col items-center lg:gap-y-v16">
          <Show when={page()}>
            {(page) => (
              <>
                <For each={page().data}>
                  {(postPreview) => (
                    <PostPreviewComponent postPreview={postPreview} />
                  )}
                </For>
              </>
            )}
          </Show>
        </div>
        <div class="w-full pt-v16" />
        <Show when={author()}>
          {(author) => (
            <Show when={page()}>
              {(page) => (
                <Pagination
                  makeUrl={(page) => authorLink(author().id, parseInt(page))}
                  pagination={page().pagination}
                />
              )}
            </Show>
          )}
        </Show>
        <div class="w-full pt-v32" />
      </main>
    </div>
  );
}
