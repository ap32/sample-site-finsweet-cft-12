import { A } from '@solidjs/router';
import { For } from 'solid-js';
import type { CategoryPreview } from '~/api-types';
import $join from 'join.macro';
import { blogCategoryPageLink } from '~/utils/link';

export default function CategoryPickerHor(props: {
  categories: CategoryPreview[] | undefined;
  class?: string;
}) {
  return (
    <div
      class={$join(
        props.class ?? '',
        'grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] lt-sm:gap-5 sm:gap-6 cont',
      )}
    >
      <For each={props.categories}>
        {(category) => (
          <A
            href={blogCategoryPageLink(category.slug)}
            class={$join(
              'flex flex-col p-v8',
              'outline outline-1 outline-solid -outline-offset-1 outline-medium-gray',
              'hover:(bg-yellow outline-none)',
            )}
          >
            <div class="h-12 w-12 flex items-center self-start justify-center rounded-2 bg-light-yellow">
              <img src={`/img/icons/categories/${category.slug}.svg`} />
            </div>
            <div class="w-full pt-v4" />
            <h3 class="lt-sm:text-h4 sm:text-h3">{category.name}</h3>
            <div class="w-full pt-1" />
            <p class="text-body-1 text-medium-gray">
              {category.shortDescription}
            </p>
          </A>
        )}
      </For>
    </div>
  );
}
