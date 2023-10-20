import { For, Show } from 'solid-js';
import type { RouteDataArgs } from 'solid-start';
import { createRouteData, useRouteData } from 'solid-start';
import type { Post, CategorySlug } from '~/api-types';
import JoinOurTeam from '~/components/blocks/JoinOurTeam';
import PostAuthor from '~/components/post/PostAuthor';
import PostCategoryLink from '~/components/post/PostCategoryLink';
import PostImage from '~/components/post/PostImage';
import PostReadNext from '~/components/post/PostReadNext';
import { fetchCategoryPage, fetchPost } from '~/utils/api';

export function routeData({ params }: RouteDataArgs) {
  const post = createRouteData(async (id) => fetchPost(id), {
    key: () => parseInt(params.id ?? '1'),
  });

  const readNext = createRouteData(
    async ([postId, categorySlug]:
      | [number, CategorySlug]
      | [undefined, undefined]) => {
      if (postId === undefined) return undefined;

      const page = await fetchCategoryPage(categorySlug);

      const posts = page.data
        .slice(0, 4)
        .filter((post) => post.id !== postId)
        .slice(0, 3);

      return posts.length > 0 ? posts : undefined;
    },
    {
      key: () => {
        const _post = post();
        if (_post === undefined) {
          return [undefined, undefined] as [undefined, undefined];
        }
        return [_post.id, _post.category.slug] as [number, CategorySlug];
      },
    },
  );

  return { post, readNext };
}

export default function Post() {
  const { post, readNext } = useRouteData<typeof routeData>();
  return (
    <main class="w-full flex flex-col items-center">
      <div class="w-full pt-v32" />

      <PostAuthor post={post()} />
      <div class="w-full pt-v6" />

      <Show when={post()}>
        {(post) => (
          <h1 class="cont max-w-200 lt-sm:text-h2 sm:text-h1">
            {post().title}
          </h1>
        )}
      </Show>
      <div class="w-full pt-8" />

      <PostCategoryLink post={post()} />
      <div class="w-full pt-v16" />

      <PostImage post={post()} />
      <div class="w-full pt-v16" />

      <Show when={post()}>
        {(post) => (
          <div class="cont max-w-200 flex flex-col gap-y-v12">
            <For each={post().paragraphs}>
              {(paragraph) => <p class="text-body-1">{paragraph}</p>}
            </For>
          </div>
        )}
      </Show>
      <div class="w-full pt-v32" />

      <article class="flex flex-col items-center self-stretch">
        <Show when={readNext()}>
          {(previews) => (
            <>
              <h2 class="cont lt-sm:text-h3 sm:text-h2">What to read next</h2>
              <div class="w-full pt-v16" />
              <PostReadNext postPreviews={previews()} />
            </>
          )}
        </Show>
      </article>
      <div class="w-full pt-v16" />
      <div class="cont">
        <div class="b-t b-t-medium-gray/30 pt-v32" />
      </div>
      <JoinOurTeam />
      <div class="w-full pt-v32" />
    </main>
  );
}
