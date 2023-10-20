import type { RouteDataArgs } from 'solid-start';
import { createRouteData } from 'solid-start';
import { fetchBlogPage } from '~/utils/api';
import {
  blogFeaturedResource,
  categoryPreviewsResource,
} from '~/utils/resource';

export function routeData({ params }: RouteDataArgs) {
  const [featured] = blogFeaturedResource();

  const page = createRouteData(async (page) => fetchBlogPage(page), {
    key: () => parseInt(params.page ?? '1'),
  });

  const [categories] = categoryPreviewsResource();

  return { featured, page, categories };
}
