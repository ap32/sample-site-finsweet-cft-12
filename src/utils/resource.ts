import { createResource } from 'solid-js';
import {
  fetchAuthorPreviews,
  fetchBlogFeatured,
  fetchCategoryPreviews,
  fetchHomeFeatured,
  fetchHomeHero,
  fetchTestimonials,
} from './api';

function r<T>(fetcher: () => Promise<T>) {
  return () => createResource<T>(async () => await fetcher());
}

export const homeHeroResource = r(fetchHomeHero);
export const homeFeaturedResource = r(fetchHomeFeatured);
export const blogFeaturedResource = r(fetchBlogFeatured);
export const categoryPreviewsResource = r(fetchCategoryPreviews);
export const authorPreviewsResource = r(fetchAuthorPreviews);
export const testimonialsResource = r(fetchTestimonials);
