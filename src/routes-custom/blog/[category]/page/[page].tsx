import { useRouteData } from 'solid-start';
import type { Category } from '~/api-types';
import CategoryPosts from '~/components/category/CategoryPosts';
import CategoryTitle from '~/components/category/CategoryTitle';
import type { routeData } from './[page].data';

export default function Category() {
  const { page, category, categories } = useRouteData<typeof routeData>();
  return (
    <main class="flex flex-col items-center">
      <CategoryTitle category={category()} />
      <div class="w-full pt-v32" />
      <CategoryPosts
        categories={categories()}
        page={page()}
        category={category()}
      />
    </main>
  );
}
