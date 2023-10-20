import Chance from 'chance';
import { readFile, rm } from 'fs/promises';
import type {
  Image,
  Author,
  Post,
  AuthorPreview,
  PostPreview,
  Category,
  CategorySlug,
  CategoryName,
  CategoryPreview,
  Testimonial,
} from '~/api-types';
import {
  aboutUsLink,
  authorLink,
  blogCategoryPageLink,
  blogPageLink,
  contactUsLink,
  homeLink,
  postLink,
  privacyPolicyLink,
} from '~/utils/link';
import { saveApiResponse, savePages, saveTo } from './utils';

const chance = new Chance('FFwAPlQ9AnRipyzHfY8X5');

const categories: Category[] = (
  ['business', 'startup', 'economy', 'technology'] as CategorySlug[]
).map((slug) => {
  return {
    slug,
    name: (slug.charAt(0).toUpperCase() + slug.substring(1)) as CategoryName,
    description: chance.sentence({
      punctuation: '.',
      words: chance.integer({ min: 7, max: 12 }),
    }),
  };
});

const categoryPreviews: CategoryPreview[] = categories.map(
  ({ slug, name }) => ({
    slug,
    name,
    shortDescription: chance.sentence({
      words: chance.integer({ min: 6, max: 8 }),
      punctuation: '.',
    }),
  }),
);

const images = JSON.parse(
  await readFile('./generate-static-api/images.json', 'utf8'),
) as Image[];

const authors: Author[] = (
  [
    ['female', 32],
    ['male', 68],
    ['male', 11],
    ['female', 27],
  ] as const
).map(([gender, avatarId], i) => ({
  id: i + 1,
  name: chance.name({ nationality: 'en', gender }),
  description: chance.sentence({
    punctuation: '.',
    words: chance.integer({ min: 7, max: 12 }),
  }),
  avatarId,
}));

const authorPreviews: AuthorPreview[] = authors.map(
  ({ id, name, avatarId }) => ({
    id,
    name,
    avatarId,
  }),
);

function equalishDistribution<T extends unknown[]>(
  arr: T,
  mult = 0.5 ** (1 / 8),
) {
  const weights: number[] = Array(arr.length).fill(1);
  const indexes: number[] = Array.from(arr, (_, i) => i);

  return function (): T[number] {
    const i = chance.weighted(indexes, weights);
    weights[i] *= mult;
    return arr[i];
  };
}

const getAuthor = equalishDistribution(authors);
const getCategory = equalishDistribution(categories);

const minDate = new Date('2021-01-01T00:00:00.000Z').valueOf();
const maxDate = new Date('2023-08-20T00:00:00.000Z').valueOf();

const timestamps = Array.from({ length: images.length }, () =>
  chance.integer({ min: minDate, max: maxDate }),
).sort((a, b) => a - b);

const posts: Post[] = images.map((image, i) => {
  return {
    id: i + 1,
    title: chance
      .sentence({
        words: chance.integer({ min: 6, max: 8 }),
      })
      .replace(/\.$/, ''),
    subtitle: chance.paragraph({
      sentences: chance.integer({ min: 2, max: 3 }),
    }),
    author: getAuthor(),
    date: timestamps[i] / 60_000,
    paragraphs: Array.from({ length: chance.integer({ min: 3, max: 5 }) }, () =>
      chance.paragraph(),
    ),
    category: getCategory(),
    image,
  };
});

function authorPreview({ id, avatarId, name }: Author): AuthorPreview {
  return { id, avatarId, name };
}

function postPreview({
  id,
  category,
  title,
  date,
  image,
  subtitle,
  author,
}: Post): PostPreview {
  return {
    id,
    category,
    title,
    date,
    image,
    subtitle,
    author: authorPreview(author),
  };
}

const postPreviews = posts.map(postPreview);

const prerender = new Set([
  homeLink,
  aboutUsLink,
  contactUsLink,
  privacyPolicyLink,
]);

const testimonials: Testimonial[] = chance
  .shuffle([
    ['male', 64],
    ['male', 60],
    ['female', 24],
    ['female', 35],
    ['female', 45],
    ['male', 8],
  ] as ['male' | 'female', number][])
  .map(([gender, avatarId], i) => ({
    id: i + 1,
    name: chance.name({ gender, nationality: 'en' }),
    avatarId,
    text: chance.sentence({
      words: chance.integer({ min: 15, max: 20 }),
      punctuation: '.',
    }),
    place: `${chance.city()}, ${chance.country({ full: true })}`,
  }));

await rm('./public/api', { force: true, recursive: true });
await savePages('/posts/page/', postPreviews.reverse(), (page) => {
  prerender.add(blogPageLink(page));
});

for (const post of posts) {
  await saveApiResponse(`/posts/${post.id}`, post);
  prerender.add(postLink(post.id));
}

for (const author of authors) {
  await saveApiResponse(`/authors/${author.id}`, author);
  prerender.add(authorLink(author.id));
}

for (const author of authors) {
  await savePages(
    `/authors/${author.id}/page/`,
    postPreviews.filter((v) => v.author.id === author.id),
    (page) => {
      prerender.add(authorLink(author.id, page));
    },
  );
}

for (const category of categories) {
  await saveApiResponse(`/categories/${category.slug}`, category);
  prerender.add(blogCategoryPageLink(category.slug));
}

for (const category of categories) {
  await savePages(
    `/categories/${category.slug}/page/`,
    postPreviews.filter((v) => v.category === category),
    (page) => {
      prerender.add(blogCategoryPageLink(category.slug, page));
    },
  );
}

await saveApiResponse(
  `/home-hero`,
  postPreviews.find(({ image: { id } }) => id === '_kf2Z44k7Ng') ?? {},
);

await saveApiResponse(
  `/blog-featured`,
  postPreviews.find(({ image: { id } }) => id === 'VCFxt2yT1eQ') ?? {},
);

await saveApiResponse(
  `/home-featured`,
  postPreviews.find(({ image: { id } }) => id === 'jxUuXxUFfp4') ?? {},
);

await saveApiResponse(`/authors`, authorPreviews);
await saveApiResponse(`/categories`, categoryPreviews);
await saveApiResponse(`/testimonials`, testimonials);

await saveTo('./prerender.json', [...prerender.values()]);
