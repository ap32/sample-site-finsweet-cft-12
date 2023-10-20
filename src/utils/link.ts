import type { CategorySlug } from '~/api-types';

export const homeLink = '/';
export const aboutUsLink = `/about-us`;
export const contactUsLink = `/contact-us`;
export const privacyPolicyLink = `/privacy-policy`;

export function blogPageLink(page = 1) {
  return `/blog${page === 1 ? '' : `/page/${page}`}`;
}

export function blogCategoryPageLink(category: CategorySlug, page = 1) {
  return `/blog/${category}${page === 1 ? '' : `/page/${page}`}`;
}

export function authorLink(authorId: number, page = 1) {
  return `/authors/${authorId}${page === 1 ? '' : `/page/${page}`}`;
}

export function postLink(postId: number) {
  return `/posts/${postId}`;
}
