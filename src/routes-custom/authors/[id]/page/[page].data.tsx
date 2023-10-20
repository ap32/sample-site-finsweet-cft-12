import type { RouteDataArgs } from 'solid-start';
import { createRouteData } from 'solid-start';
import { fetchAuthor, fetchAuthorPage } from '~/utils/api';

export function routeData({ params }: RouteDataArgs) {
  const author = createRouteData((category) => fetchAuthor(category), {
    key: () => parseInt(params.id),
  });
  const page = createRouteData(
    ([authorId, page]) => fetchAuthorPage(authorId, page),
    {
      key: () => [parseInt(params.id), parseInt(params.page ?? '1')],
    },
  );

  return { author, page };
}
