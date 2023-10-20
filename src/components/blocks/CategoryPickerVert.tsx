import { A } from '@solidjs/router';
import { For } from 'solid-js';
import type { CategoryPreview } from '~/api-types';
import $join from 'join.macro';
import { blogCategoryPageLink } from '~/utils/link';

export default function CategoryPickerVert(props: {
  categories: CategoryPreview[] | undefined;
  class?: string;
}) {
  return (
    <div class={$join(props.class ?? '', 'flex flex-col gap-v6')}>
      <For each={props.categories}>
        {(category) => (
          <A
            href={blogCategoryPageLink(category.slug)}
            class={$join(
              'flex p-v6 items-center',
              'outline outline-1 outline-solid -outline-offset-1 outline-medium-gray',
              'hover:(bg-yellow outline-none)',
            )}
          >
            <div class="h-12 w-12 flex items-center self-start justify-center rounded-2 bg-light-yellow">
              <img src={`/img/icons/categories/${category.slug}.svg`} />
            </div>
            <div class="self-stretch pl-v4" />
            <h3 class="lt-sm:text-h4 sm:text-h3">{category.name}</h3>
          </A>
        )}
      </For>
    </div>
  );
}
