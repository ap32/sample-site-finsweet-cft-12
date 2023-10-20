import $join from 'join.macro';
import { UnsplashImage } from '../UnsplashImage';

export default function AboutUsBlock() {
  return (
    <div class="lg:cont flex flex-col">
      <div
        class={$join(
          '[--spacing:_var(--spacing-cont)] relative grid ',
          'lt-lg:(flex flex-col)',
          'at-lg:(grid-cols-[var(--spacing)_repeat(4,_auto)_var(--spacing)] grid-rows-[auto_auto_auto_auto])',
          'xl:(grid-cols-[var(--spacing)_repeat(4,_auto)] grid-rows-[auto_1fr_min-content])',
        )}
      >
        <hgroup
          class={$join(
            'relative col-start-2 row-start-1 col-end-4 flex flex-col self-start gap-y-v4 bg-white',
            'lt-lg:cont',
            'lg:(mb-[calc(0px_-_var(--spacing-v16))] p-v16)',
          )}
        >
          <h1 class="text-cap-1">About Us</h1>
          <p class="xl:(min-w-full w-min) lt-sm:text-h2 sm:text-h1">
            We are a team of content writers who share their learnings
          </p>
        </hgroup>
        <div class="w-full pt-v16 lg-hidden" />
        <div
          class={$join(
            'col-start-4 row-start-1 col-end-6 text-body-1',
            'lt-lg:cont',
            'lg:(px-v8 pb-v4 pt-v16)',
          )}
        >
          <div class="pt-v5 lt-lg:hidden" />
          <div class="pt-v4 lt-lg:hidden" />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
        <div class="w-full pt-v16 lg-hidden" />
        <div
          class={$join(
            'relative col-start-1 row-start-2 col-end-7 overflow-hidden -z-1',
            'lt-md:aspect-3/2',
            'at-md:aspect-7/4',
            'at-lg:aspect-9/4',
            'lt-xl:row-end-4',
            'xl:(row-end-4 aspect-11/4)',
          )}
        >
          <UnsplashImage
            class="items-center justify-center at-lg:-mt-25% lt-lg:-mt-35%"
            image={{
              url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3',
              width: 5884,
              height: 3310,
            }}
          />
        </div>
        <div
          class={$join(
            'flex col-start-2 justify-self-center self-center',
            'lt-md:(w-full -mt-0.25)',
            'at-md:(items-center h-0)',
            'at-lg:(items-center h-0)',
            'lt-xl:(col-end-6 row-start-4)',
            'xl:(col-end-4 w-max row-start-2 row-end-3 self-end)',
          )}
        >
          <div
            class={$join(
              'flex justify-self-center gap-v16 bg-yellow py-v8',
              'lt-md:(cont flex-wrap justify-center)',
              'md:px-v12',
            )}
          >
            <div class="flex flex-col lt-md:items-center">
              <div class="lt-sm:text-h1 sm:text-display">12+</div>
              <div class="text-body-1">Blogs published</div>
            </div>
            <div class="flex flex-col lt-md:items-center">
              <div class="lt-sm:text-h1 sm:text-display">18K+</div>
              <div class="text-body-1">Views on Finsweet</div>
            </div>
            <div class="flex flex-col lt-md:items-center">
              <div class="lt-sm:text-h1 sm:text-display">30K+</div>
              <div class="text-body-1">Total active Users</div>
            </div>
          </div>
        </div>
        <div
          class={$join(
            'lt-xl:hidden',
            'col-start-2 row-start-3 col-end-5 h-6 bg-purple pt-6',
          )}
        />
        <div class="col-start-3 row-start-3 col-end-5 h-6 bg-yellow pt-6 lt-xl:hidden" />
      </div>
    </div>
  );
}
