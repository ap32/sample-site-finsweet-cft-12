import { For, Show } from 'solid-js';
import type { Category, CategoryPreview, Page } from '~/api-types';
import PostPreviewComponent from '../blocks/PostPreviewComponent';
import CategoryPickerVert from '../blocks/CategoryPickerVert';
import CategoryPickerHor from '../blocks/CategoryPickerHor';
import Pagination from '../pagination/Pagination';

export default function CategoryPosts(props: {
  page: Page | undefined;
  category: Category | undefined;
  categories: CategoryPreview[] | undefined;
}) {
  return (
    <>
      <div class="xl:(cont pl-0) flex">
        <div class="flex flex-col gap-v8">
          <For each={props.page?.data}>
            {(postPreview) => (
              <PostPreviewComponent postPreview={postPreview} />
            )}
          </For>
        </div>
        <div class="flex flex-col gap-10">
          <h2 class="lt-xl-hidden lt-sm:text-h3 sm:text-h2">Categories</h2>

          <CategoryPickerVert
            categories={props.categories}
            class="lt-xl:hidden"
          />
        </div>
      </div>

      <Show when={props.page}>
        {(page) => (
          <Show when={props.category}>
            {(category) => (
              <>
                <div class="w-full pt-v16" />
                <Pagination
                  makeUrl={(page) => `/blog/${category().slug}/page/${page}`}
                  pagination={page().pagination}
                />
              </>
            )}
          </Show>
        )}
      </Show>

      <div class="w-full pt-v32 xl:hidden" />

      <h2 class="cont xl-hidden lt-sm:text-h3 sm:text-h2">All Categories</h2>
      <div class="w-full pt-v12" />
      <CategoryPickerHor categories={props.categories} class="xl:hidden" />
      <div class="w-full pt-v32" />
    </>
  );
}
