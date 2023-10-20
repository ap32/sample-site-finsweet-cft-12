import { useRouteData } from '@solidjs/router';
import { createResource } from 'solid-js';
import CategoryPickerHor from '~/components/blocks/CategoryPickerHor';
import ListOfAuthors from '~/components/blocks/ListOfAuthors';
import JoinOurTeam from '~/components/blocks/JoinOurTeam';
import HomeAboutUs from '~/components/index/HomeAboutUs';
import HomeFeatured from '~/components/index/HomeFeatured';
import HomeFeaturedIn from '~/components/index/HomeFeaturedIn';
import HomeHero from '~/components/index/HomeHero';
import HomePosts from '~/components/index/HomePosts';
import HomeTestomonials from '~/components/index/HomeTestimonials';
import HomeWhyWeStarted from '~/components/index/HomeWhyWeStarted';
import $join from 'join.macro';
import {
  authorPreviewsResource,
  categoryPreviewsResource,
  homeFeaturedResource,
  homeHeroResource,
  testimonialsResource,
} from '~/utils/resource';
import { fetchBlogPage } from '~/utils/api';

export function routeData() {
  const [hero] = homeHeroResource();
  const [featured] = homeFeaturedResource();
  const [categories] = categoryPreviewsResource();
  const [authors] = authorPreviewsResource();
  const [testimonials] = testimonialsResource();

  const [posts] = createResource(async () => {
    const page = await fetchBlogPage();
    return page.data.slice(0, 4);
  });

  return { hero, featured, posts, categories, authors, testimonials };
}

export default function Home() {
  const { hero, featured, posts, categories, authors, testimonials } =
    useRouteData<typeof routeData>();

  return (
    <main class="w-full flex flex-col items-center">
      <HomeHero hero={hero()} />
      <div class="w-full pt-v32" />
      <div class="md:cont w-full flex lt-md:flex-col md:items-start">
        <HomeFeatured featured={featured()} />
        <div class="lt-md:(w-full pt-v32)" />
        <HomePosts posts={posts()} />
      </div>
      <div class="w-full pt-v32" />
      <div
        class={$join(
          'grid grid-cols-4',
          'lt-sm:(h-3)',
          'at-sm:(h-4)',
          'lt-md:w-full',
          'at-md:(h-5)',
          'md:cont',
          'lg:(h-6)',
        )}
      >
        <div class="col-span-2 col-start-2 bg-yellow" />
        <div class="col-start-4 bg-purple" />
      </div>
      <HomeAboutUs />
      <div class="w-full pt-v32" />

      <h2 class={$join('cont text-center', 'lt-sm:text-h3', 'sm:text-h2')}>
        Choose a category
      </h2>
      <div class="w-full pt-v12" />
      <CategoryPickerHor categories={categories()} />
      <div class="w-full pt-v32" />

      <HomeWhyWeStarted />
      <div class="w-full pt-v32" />

      <h2 class={$join('cont text-center', 'lt-sm:text-h3', 'sm:text-h2')}>
        List of Authors
      </h2>
      <div />
      <div class="w-full pt-v12" />
      <ListOfAuthors authors={authors()} />
      <div class="w-full pt-v24" />

      <HomeFeaturedIn />
      <div class="w-full pt-v24" />

      <HomeTestomonials testimonials={testimonials()} />
      <div class="w-full pt-v32" />
      <JoinOurTeam />
      <div class="w-full pt-v32" />
    </main>
  );
}
