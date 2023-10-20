import { For } from 'solid-js';
import { A } from 'solid-start';
import ButtonBase from '~/components/button/ButtonBase';
import FacebookIcon from '~/components/icons/social/facebook';
import InstagramIcon from '~/components/icons/social/instagram';
import LinkedInIcon from '~/components/icons/social/linkedin';
import TwitterIcon from '~/components/icons/social/twitter';
import { homeLink } from '~/utils/link';

const links = [
  { href: '/', text: 'Home' },
  { href: '/blog', text: 'Blog' },
  { href: '/about-us', text: 'About us' },
  { href: '/contact-us', text: 'Contact us' },
  { href: '/privacy-policy', text: 'Privacy Policy' },
];

export default function Footer() {
  return (
    <footer class="w-full flex flex-col items-center bg-dark-blue py-v14 text-white">
      <div class="cont flex lt-md:flex-col md:items-center">
        <A href={homeLink}>
          <img title="Finsweet" class="w-35" src="/img/finsweet.svg" />
        </A>
        <div class="grow-1 pl-6 md:h-6 lt-md:pt-v12" />
        <ul class="flex justify-self-end -m-3 lt-md:flex-wrap">
          <For each={links}>
            {({ href, text }) => (
              <A href={href} class="p-3">
                {text}
              </A>
            )}
          </For>
        </ul>
      </div>
      <div class="w-full pt-v14" />
      <div class="md:cont lt-md:self-stretch">
        <div class="lt-md:(cont flex-col) flex gap-v16 bg-white/5 py-v20 md:px-v16">
          <h2 class="lt-md:text-h3 md:text-h2" id="subscribe">
            Subscribe to our news letter to get latest updates and news
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            class="flex gap-v6 at-md:w-64 lt-lg:(flex-col items-stretch) lg:items-start"
          >
            <input
              type="email"
              placeholder="Enter Your Email"
              class="h-14 bg-transparent px-6 text-body-1 outline-1 outline-dark-gray outline"
            />
            <ButtonBase component="button" type="submit">
              Subscribe
            </ButtonBase>
          </form>
        </div>
      </div>
      <div class="w-full pt-v12" />
      <div class="gap cont flex lt-sm:flex-col sm:items-center">
        <div class="text-body-1 opacity-70">
          Finstreet 118 2561 Fintown
          <br />
          Hello@finsweet.com 020 7993 2905
        </div>
        <div class="sm:grow-1 lt-sm:pt-v12" />
        <div class="flex text-medium-gray -m-3">
          <A href="#facebook-placeholder" class="p-3" title="facebook">
            <FacebookIcon class="w-4" />
          </A>
          <A href="#twitter-placeholder" class="p-3" title="twitter">
            <TwitterIcon class="w-4" />
          </A>
          <A href="#instagram-placeholder" class="p-3" title="instagram">
            <InstagramIcon class="w-4" />
          </A>
          <A href="#linkedin-placeholder" class="p-3" title="linkedin">
            <LinkedInIcon class="w-4" />
          </A>
        </div>
      </div>
    </footer>
  );
}
