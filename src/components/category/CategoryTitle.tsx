import { Show } from 'solid-js';
import { A } from 'solid-start';
import type { Category } from '~/api-types';
import { blogCategoryPageLink, blogPageLink } from '~/utils/link';

export default function CategoryTitle(props: {
  category: Category | undefined;
}) {
  return (
    <Show when={props.category}>
      {(category) => (
        <div class="cont flex justify-center bg-lavender py-v20">
          <div class="max-w-135 flex flex-col self-stretch text-center">
            <h1 class="text-display">{category().name}</h1>
            <div class="w-full pt-v4" />
            <p class="text-body-1 text-medium-gray">{category().description}</p>
            <div class="w-full pt-v8" />
            <div class="text-cap-2">
              <A href={blogPageLink()} class="p-2 -m-2">
                Blog
              </A>
              {' > '}
              <A class="p-2 -m-2" href={blogCategoryPageLink(category().slug)}>
                {category().name}
              </A>
            </div>
          </div>
        </div>
      )}
    </Show>
  );
}
