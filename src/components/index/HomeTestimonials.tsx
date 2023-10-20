import type { Testimonial } from '~/api-types';
import AvatarPlaceholder from '../AvatarPlaceholder';
import $join from 'join.macro';
import ArrowLeftIcon from '../icons/arrow-left';
import ArrowRightIcon from '../icons/arrow-right';
import { createStore } from 'solid-js/store';
import ForRef from '../utils/ForRef';

// @unocss-skip-start
const scrollOpts = { block: 'nearest' } as const;
// @unocss-skip-end

export default function HomeTestomonials(props: {
  testimonials?: Testimonial[];
}) {
  const [refs, setRefs] = createStore([] as (Element | undefined)[]);

  function prev(i: number) {
    if (i <= 0) return;
    refs[i - 1]?.scrollIntoView(scrollOpts);
  }

  function next(i: number) {
    if (i >= refs.length) return;
    refs[i + 1]?.scrollIntoView(scrollOpts);
  }

  return (
    <section class="md:cont flex flex-col lt-md:w-full">
      <div
        class={$join(
          'grid bg-light-yellow',
          'overflow-x-scroll overflow-y-visible snap-x snap-mandatory',
          'xl:[--first-max:32rem] lt-xl:[--first-max:28rem]',
          '[--first:calc(min(50%,_var(--first-max)))]',
          'lt-lg:(grid-cols-[repeat(var(--count),_100%)] grid-rows[auto_0_auto])',
          'lg:(grid-cols-[var(--first)_0_repeat(var(--count),_calc(100%_-_var(--first)))] grid-rows-[min-content])',
        )}
        style={{
          '--count': props.testimonials?.length ?? 0,
        }}
      >
        <div
          class={$join(
            'flex flex-col py-v20 px-cont snap-start grid-row-start-1',
            'lt-lg:(sticky left-0)',
          )}
        >
          <h2 class="text-cap-1">Testimonials</h2>
          <div class="w-full pt-v3" />
          <p class="lt-sm:text-h3 sm:text-h2">What people say about our blog</p>
          <div class="w-full pt-v4" />
          <p class="text-body-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </p>
        </div>
        <div
          class={$join(
            'lt-lg:(grid-row-start-2 -mt-1px mx-cont border-t b-t-medium-gray/40 sticky left-cont)',
            'lg:(grid-row-start-1 -ml-1px my-v20 border-l border-l-medium-gray/40)',
          )}
        />
        <ForRef each={props.testimonials} setRefs={setRefs}>
          {(testimonial, i, setRef) => {
            return (
              <div
                ref={setRef}
                class="flex flex-col-reverse snap-center justify-between gap-v8 px-cont py-v20 lg:row-start-1 lt-lg:row-start-3"
              >
                <div class="flex items-center justify-between gap-4 at-lg:(flex-col gap-12) lt-sm:(flex-col gap-8)">
                  <div class="flex items-center gap-v4 lt-xl:self-start">
                    <AvatarPlaceholder
                      id={testimonial.avatarId}
                      baseWidth={60}
                      sizes="3.75rem"
                      class="h-15 w-15 rounded-full"
                    />
                    <div class="flex flex-col">
                      <h4 class="lt-sm:text-h5 sm:text-h4">
                        {testimonial.name}
                      </h4>
                      <p class="text-body-1 text-medium-gray">
                        {testimonial.place}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-v6 lt-xl:self-end">
                    <button
                      class={$join(
                        'h-12 w-12 flex items-center justify-center rounded-full bg-white text-dark-blue disabled:opacity-50',
                      )}
                      disabled={i() === 0}
                      onClick={() => prev(i())}
                    >
                      <ArrowLeftIcon class="w-5" strokeWidth={5 / 3} />
                    </button>
                    <button
                      class="h-15 w-15 flex items-center justify-center rounded-full bg-dark-blue text-white disabled:opacity-50"
                      disabled={i() === (props.testimonials?.length ?? 0) - 1}
                      onClick={() => next(i())}
                    >
                      <ArrowRightIcon class="w-6" strokeWidth={2} />
                    </button>
                  </div>
                </div>

                <p class="lt-sm:text-h5 sm:text-h4">{testimonial.text}</p>
              </div>
            );
          }}
        </ForRef>
      </div>
    </section>
  );
}
