import { A } from '@solidjs/router';
import $join from 'join.macro';

export default function HomeFeaturedIn() {
  return (
    <div class={$join('cont text-medium-gray')}>
      <div
        class={$join(
          'flex items-end',
          'lt-sm:gap-6',
          'at-sm:gap-7',
          'at-md:gap-8',
          'lt-lg:(justify-start flex-wrap)',
          'at-lg:(justify-between gap-8 flex-wrap)',
          'xl:(justify-between gap-8)',
        )}
      >
        <h2 class="at-lg:mb-3 at-sm:mb-2 lt-sm:mb-2 xl:mr-2 lt-xl:w-full">
          <div class="text-body-2">We are</div>
          <div class="text-h4">Featured in</div>
        </h2>
        <A href="#">
          <img src="/img/logos/logoipsum-211.svg" class="h-8" />
        </A>
        <A href="#">
          <img src="/img/logos/logoipsum-213.svg" class="h-8" />
        </A>
        <A href="#">
          <img src="/img/logos/logoipsum-216.svg" class="h-8" />
        </A>
        <A href="#">
          <img src="/img/logos/logoipsum-217.svg" class="h-8" />
        </A>
        <A href="#">
          <img src="/img/logos/logoipsum-218.svg" class="h-8" />
        </A>
      </div>
    </div>
  );
}
