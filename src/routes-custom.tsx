import { Route } from 'solid-start';

import { routeData as BlogPageRouteData } from './routes-custom/blog/page/[page].data';
import { routeData as BlogCategoryPageRouteData } from './routes-custom/blog/[category]/page/[page].data';
import { lazy } from 'solid-js';
import type { CategorySlug } from './api-types';
import { routeData as AuthorPageRouteData } from './routes-custom/authors/[id]/page/[page].data';

const BlogPage = lazy(() => import('~/routes-custom/blog/page/[page]'));
const BlogCategoryPage = lazy(
  () => import('~/routes-custom/blog/[category]/page/[page]'),
);
const AuthorPage = lazy(
  () => import('~/routes-custom/authors/[id]/page/[page]'),
);

function isSafePositiveInteger(n: number) {
  return Number.isInteger(n) && n > 0 && n < Number.MAX_SAFE_INTEGER;
}

function numberStr(pageStr: string) {
  try {
    const page = parseInt(pageStr);
    return isSafePositiveInteger(page);
  } catch {
    return false;
  }
}

const categorySlugSet = new Set<string>([
  'business',
  'economy',
  'startup',
  'technology',
] satisfies CategorySlug[]);

function category(categorySlug: string) {
  return categorySlugSet.has(categorySlug);
}

export default function RoutesCustom() {
  return (
    <>
      <Route
        path={['/blog', '/blog/page/:page']}
        matchFilters={{ page: numberStr }}
        component={BlogPage}
        data={BlogPageRouteData}
      />
      <Route path="/blog/:category" matchFilters={{ category }}>
        <Route
          path={['/', '/page/:page']}
          matchFilters={{ page: numberStr }}
          component={BlogCategoryPage}
          data={BlogCategoryPageRouteData}
        />
      </Route>
      <Route path={'/authors/:id'} matchFilters={{ id: numberStr }}>
        <Route
          path={['/', '/page/:page']}
          matchFilters={{ page: numberStr }}
          component={AuthorPage}
          data={AuthorPageRouteData}
        />
      </Route>
    </>
  );
}
