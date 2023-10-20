import $join from 'join.macro';
import { UnsplashImage } from '../UnsplashImage';
import { aboutUsLink } from '~/utils/link';
import ButtonLink from '../button/ButtonLink';

export default function HomeWhyWeStarted() {
  return (
    <div
      class={$join(
        'mt-large',
        'lt-lg:(flex flex-col)',
        'at-lg:(grid-cols-[1fr_18rem_18rem])',
        'lg:(cont grid)',
        'xl:(grid-cols-[1fr_22.5rem_22.5rem])',
      )}
    >
      <div class="col-span-2 col-start-1 row-start-1 w-full flex justify-stretch overflow-hidden">
        <div
          class={$join(
            'relative w-full pointer-events-none',
            'lt-sm:(-mt-24 h-88)',
            'at-sm:(-mt-24 h-100)',
            'at-md:(-mt-24 h-110)',
            'lg:w-full',
          )}
        >
          <UnsplashImage
            class="items-center justify-center"
            image={{
              url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3',
              width: 5884,
              height: 3310,
            }}
          />
        </div>
      </div>
      <div class="relative col-span-2 col-start-2 row-start-1 at-md:(cont) w-full lg:mt-32">
        <div class="relative cont flex flex-col bg-white py-v20 lt-lg:bg-lavender at-md:-mt-16">
          <h2 class="text-cap-1">Why we started</h2>
          <div class="w-full pt-v6" />
          <h3 class="at-sm:text-h2 lt-sm:text-h3 md:text-h1">
            It started out as a simple idea and evolved into our passion
          </h3>
          <div class="w-full pt-v4" />
          <p class="text-body-1 text-medium-gray">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>
          <div class="w-full pt-v8" />
          <ButtonLink href={aboutUsLink} class="self-start">
            {'Discover our story >'}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
