import $join from 'join.macro';
import Button from '~/components/button/Button';

export default function ContactUs() {
  return (
    <main class="flex flex-col items-center">
      <div class="w-full pt-v32" />
      <hgroup class="cont max-w-232 flex flex-col gap-v3 text-center">
        <h1 class="text-cap-3">Contact Us</h1>
        <p class="lt-sm:text-h2 sm:text-h1">Let’s Start a Conversation</p>
      </hgroup>
      <div class="w-full pt-v6" />
      <p class="cont max-w-232 text-center text-body-1 text-medium-gray">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
      </p>
      <div class="w-full pt-v16" />
      <div class="max-w-232 md:cont flex flex-col lt-md:w-full">
        <div class="grid-cols-2 lt-lg:cont max-w-232 bg-purple py-v12 text-white sm:grid lt-sm:(flex flex-col gap-v12 text-center) sm:gap-10 lg:px-16">
          <div class="flex flex-col gap-4">
            <h2 class="text-body-2 text-white/70">Working hours</h2>
            <div class="w-full border-b border-b-white/10" />
            <div class="flex flex-col">
              <p class="text-h5">Monday To Friday</p>
              <p class="text-h5">9:00 AM to 8:00 PM</p>
              <p class="text-body-1 text-white/70">
                Our Support Team is available 24/7
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <h2 class="text-body-2 text-white/70">Contact Us</h2>
            <div class="w-full border-b border-b-white/10" />
            <div class="flex flex-col">
              <p class="text-h5">020 7993 2905</p>
              <p class="text-body-1 text-white/70">hello@finsweet.com</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full pt-v8" />
      <form
        onSubmit={(e) => e.preventDefault()}
        class="cont max-w-232 flex flex-col gap-4"
      >
        <input
          placeholder="Full Name"
          class={$join(
            'h-19 rounded-0.5 p-6 text-body-1  placeholder:text-dark-blue',
            'outline-1 outline-[#6D6E76]/50 outline -outline-offset-1',
          )}
        />
        <input
          placeholder="Your Email"
          class={$join(
            'h-19 rounded-0.5 p-6 text-body-1 placeholder:text-dark-blue',
            'outline-1 outline-[#6D6E76]/50 outline -outline-offset-1',
          )}
        />
        <textarea
          placeholder="Message"
          class={$join(
            'min-h-36 resize-y rounded-0.5 p-6 text-body-1 placeholder:text-dark-blue',
            'outline-1 outline-[#6D6E76]/50 outline -outline-offset-1',
          )}
        />
        <Button type="submit">Send Message</Button>
      </form>
      <div class="w-full pt-v32" />
    </main>
  );
}
