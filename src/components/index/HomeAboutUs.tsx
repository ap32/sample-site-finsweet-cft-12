import { A } from '@solidjs/router';
import $join from 'join.macro';
import { aboutUsLink } from '~/utils/link';

export default function HomeAboutUs() {
  return (
    <div class={$join('flex w-full', 'md:(cont)')}>
      <div
        class={$join(
          'cont flex bg-lavender py-v24',
          'lt-sm:(flex-col gap-y-v24)',
          'sm:gap-x-cont',
        )}
      >
        <div class={$join('flex flex-col basis-0 grow-1')}>
          <h2 class="text-cap-1">About us</h2>
          <div class="pt-v6" />
          <div class="flex flex-col gap-y-v4">
            <h3 class={$join('lt-lg:text-h3', 'lg:text-h2')}>
              {
                'We are a community of content writers who share their learnings'
              }
            </h3>
            <p class="text-body-1 text-medium-gray">
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              }
            </p>
            <A
              href={aboutUsLink}
              class="self-start p-2 text-4.5/8 font-bold font-sen text-purple -m-2"
            >
              {'Read More >'}
            </A>
          </div>
        </div>
        <div class={$join('flex flex-col basis-0 grow-1')}>
          <h2 class="text-cap-1">{'Our mision'}</h2>
          <div class="pt-v6" />
          <div class="flex flex-col gap-y-v4">
            <h3 class={$join('lt-lg:text-h4', 'lg:text-h3')}>
              {'Creating valuable content for creatives all around the world'}
            </h3>
            <p class="text-body-1 text-medium-gray">
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
