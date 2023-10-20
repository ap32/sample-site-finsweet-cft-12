import type { RouteDataArgs } from 'solid-start';
import { createRouteData } from 'solid-start';
import type { CategorySlug } from '~/api-types';
import { fetchCategory, fetchCategoryPage } from '~/utils/api';
import { categoryPreviewsResource } from '~/utils/resource';

export function routeData({ params }: RouteDataArgs) {
  const [categories] = categoryPreviewsResource();

  const category = createRouteData((category) => fetchCategory(category), {
    key: () => params.category as CategorySlug,
  });

  const page = createRouteData(
    async ([category, page]) => {
      return fetchCategoryPage(category, page);
    },
    {
      key: () =>
        [params.category, parseInt(params.page ?? '1')] as [
          CategorySlug,
          number,
        ],
    },
  );

  return { page, category, categories };
}
