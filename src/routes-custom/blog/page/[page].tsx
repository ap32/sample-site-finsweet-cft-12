import { Show } from 'solid-js';
import { useRouteData } from 'solid-start';
import CategoryPickerHor from '~/components/blocks/CategoryPickerHor';
import JoinOurTeam from '~/components/blocks/JoinOurTeam';
import BlogFeatured from '~/components/blog/BlogFeatured';
import BlogPosts from '~/components/blog/BlogPosts';
import Pagination from '~/components/pagination/Pagination';
import $join from 'join.macro';
import type { routeData } from '~/routes-custom/blog/page/[page].data';

export default function Blog() {
  const { featured, page, categories } = useRouteData<typeof routeData>();
  return (
    <main class="w-full flex flex-col items-center">
      <BlogFeatured featured={featured()} />

      <article class="w-full flex flex-col items-center">
        <div class="w-full pt-v16" />
        <h1 class="cont lt-sm:text-h2 sm:text-h1">All posts</h1>
        <div class="w-full pt-v8" />
        <div class="lg:cont lt-lg:w-full">
          <div class="b-t -mt-0.25 lg:b-medium-gray/32 lt-lg:b-medium-gray/10 lg:pt-v16" />
        </div>
        <BlogPosts page={page()} />
        <div class="w-full pt-v16" />
        <div class={$join('flex gap-x-4')}>
          <Show when={page()}>
            {(page) => (
              <Pagination
                makeUrl={(page) => `/blog/${page}`}
                pagination={page().pagination}
              />
            )}
          </Show>
        </div>
      </article>
      <div class="w-full pt-v16" />
      <h2 class="cont lt-sm:text-h3 sm:text-h2">All Categories</h2>
      <div class="w-full pt-v12" />
      <CategoryPickerHor categories={categories()} />
      <div class="w-full pt-v32" />
      <JoinOurTeam />
      <div class="w-full pt-v32" />
    </main>
  );
}
