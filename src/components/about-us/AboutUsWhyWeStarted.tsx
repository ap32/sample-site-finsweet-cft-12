import { UnsplashImage } from '../UnsplashImage';

export default function AboutUsWhyWeStarted() {
  return (
    <div class="cont gap-v16 lg:(grid grid-cols-2) lt-lg:(flex flex-col)">
      <div class="relative flex flex-col">
        <div class="relative w-full flex grow-1 overflow-hidden">
          <div class="relative flex grow-1 at-md:aspect-2 at-sm:aspect-7/4 lt-sm:aspect-3/2 lg:w-full lt-lg:w-full">
            <UnsplashImage
              image={{
                width: 5231,
                height: 3487,
                url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              class="items-center justify-center -z-1"
            />
          </div>
        </div>
        <div class="h-0 flex items-center at-md:ml-19 lg:ml-26 lt-md:hidden">
          <div class="shrink-0 rounded-full bg-purple at-md:(h-16 w-16) lg:(h-18 w-18)" />
        </div>
      </div>
      <div class="flex flex-col gap-v4 lg:(py-v20 pr-v16)">
        <hgroup class="flex flex-col gap-v4">
          <h2 class="lt-sm:text-h3 sm:text-h2">Why we started this Blog</h2>
          <h2 class="lt-sm:text-h5 sm:text-h4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </h2>
        </hgroup>
        <p class="text-body-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat.
        </p>
      </div>
    </div>
  );
}
