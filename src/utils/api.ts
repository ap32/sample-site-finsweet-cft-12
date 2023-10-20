import { isServer } from 'solid-js/web';
import type {
  Testimonial,
  AuthorPreview,
  CategoryPreview,
  Page,
  PostPreview,
  CategorySlug,
  Category,
  Post,
  Author,
} from '~/api-types';

function url(path: string) {
  return isServer
    ? `./public${path}`
    : `${window.location.protocol}//${window.location.host}${path}`;
}

function api(path: string) {
  return url(`/api/${path}`);
}

async function fetchJSON<T>(url: string) {
  if (isServer) {
    const { readFile } = await import('fs/promises');
    return JSON.parse(await readFile(url, 'utf-8')) as T;
  } else {
    const response = await fetch(url);
    return (await response.json()) as T;
  }
}

function f<T>(path: string) {
  const url = api(path);
  return () => fetchJSON<T>(url);
}

export const fetchHomeHero = f<PostPreview>('/home-hero.json');
export const fetchCategoryPreviews = f<CategoryPreview[]>('/categories.json');
export const fetchHomeFeatured = f<PostPreview>('/home-featured.json');
export const fetchBlogFeatured = f<PostPreview>('/blog-featured.json');
export const fetchAuthorPreviews = f<AuthorPreview[]>('/authors.json');
export const fetchTestimonials = f<Testimonial[]>('/testimonials.json');

export function fetchBlogPage(page = 1) {
  return fetchJSON<Page>(api(`/posts/page/${page}.json`));
}

export function fetchCategoryPage(categorySlug: CategorySlug, page = 1) {
  return fetchJSON<Page>(api(`/categories/${categorySlug}/page/${page}.json`));
}

export function fetchAuthorPage(authorId: number, page = 1) {
  return fetchJSON<Page>(api(`/authors/${authorId}/page/${page}.json`));
}

export function fetchCategory(categorySlug: CategorySlug) {
  return fetchJSON<Category>(api(`/categories/${categorySlug}.json`));
}

export function fetchAuthor(authorId: number) {
  return fetchJSON<Author>(api(`/authors/${authorId}.json`));
}

export function fetchPost(id: number) {
  return fetchJSON<Post>(api(`/posts/${id}.json`));
}
