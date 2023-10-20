import { UnsplashImage } from '../UnsplashImage';

export default function AboutUsTeamOfCreatives() {
  return (
    <div class="cont gap-v16 lg:(grid grid-cols-2) lt-lg:(flex flex-col)">
      <div class="relative col-start-2 row-start-1 flex">
        <div class="w-0 flex justify-center at-md:mt-19 lg:mt-29 lt-md:hidden">
          <div class="shrink-0 bg-yellow at-md:(h-19 w-16 rounded-tl-8) lg:(h-29 w-25 rounded-tl-16)" />
        </div>
        <div class="relative w-full flex justify-start overflow-hidden">
          <div class="relative flex at-md:aspect-2 at-sm:aspect-7/4 lt-sm:aspect-3/2 lg:(w-127% -mr-27%) lt-lg:w-full">
            <UnsplashImage
              image={{
                width: 5040,
                height: 3360,
                url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              class="items-center justify-center -z-1"
            />
          </div>
        </div>
      </div>
      <div class="col-start-1 row-start-1 flex flex-col gap-v4 lg:(py-v20 pr-v16)">
        <hgroup class="flex flex-col gap-v4">
          <h2 class="lt-sm:text-h3 sm:text-h2">Our team of creatives</h2>
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
