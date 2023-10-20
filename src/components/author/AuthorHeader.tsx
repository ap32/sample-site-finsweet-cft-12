import { Show } from 'solid-js';
import type { Author } from '~/api-types';
import AvatarPlaceholder from '../AvatarPlaceholder';
import { A } from 'solid-start';
import FacebookIcon from '../icons/social/facebook';
import TwitterIcon from '../icons/social/twitter';
import InstagramIcon from '../icons/social/instagram';
import LinkedInIcon from '../icons/social/linkedin';

export default function AuthorHeader(props: { author: Author | undefined }) {
  return (
    <Show when={props.author}>
      {(author) => (
        <header class="w-full flex flex-col items-center bg-lavender">
          <div class="cont w-full pt-v32" />
          <div class="cont flex gap-v8 lt-md:flex-col lt-md:text-center">
            <AvatarPlaceholder
              class="h-48 w-48 rounded-full lt-md:self-center"
              baseWidth={192}
              id={author().avatarId}
              sizes="12rem"
            />
            <div class="flex flex-col gap-v6">
              <h1 class="lt-sm:text-h2 sm:text-h1">{author().name}</h1>
              <p class="max-w-160 text-body-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
              <div class="flex lt-md:justify-center">
                <A href="#facebook-placeholder" class="p-2" title="facebook">
                  <FacebookIcon class="w-4" />
                </A>
                <A href="#twitter-placeholder" class="p-2" title="twitter">
                  <TwitterIcon class="w-4" />
                </A>
                <A href="#instagram-placeholder" class="p-2" title="instagram">
                  <InstagramIcon class="w-4" />
                </A>
                <A href="#linkedin-placeholder" class="p-2" title="linkedin">
                  <LinkedInIcon class="w-4" />
                </A>
              </div>
            </div>
          </div>
          <div class="cont w-full pt-v32" />
          <div class="lg:cont flex -mt-6 lt-md:h-4 md:h-6 lt-lg:self-stretch">
            <div class="grow-8 bg-yellow" />
            <div class="grow-5 bg-purple" />
          </div>
        </header>
      )}
    </Show>
  );
}
