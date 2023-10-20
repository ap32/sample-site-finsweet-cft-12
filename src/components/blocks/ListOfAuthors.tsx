import { For } from 'solid-js';
import type { AuthorPreview } from '~/api-types';
import AvatarPlaceholder from '~/components/AvatarPlaceholder';
import { A } from '@solidjs/router';
import FacebookIcon from '../icons/social/facebook';
import TwitterIcon from '../icons/social/twitter';
import InstagramIcon from '../icons/social/instagram';
import LinkedInIcon from '../icons/social/linkedin';
import { authorLink } from '~/utils/link';

export default function ListOfAuthors(props: {
  authors: AuthorPreview[] | undefined;
}) {
  return (
    <div class="grid grid-cols-[repeat(auto-fit,minmax(16.25rem,1fr))] cont lt-sm:gap-6 sm:gap-8">
      <For each={props.authors}>
        {(author) => (
          <div class="flex flex-col items-center bg-light-gray lt-sm:pb-8 sm:pb-10">
            <a
              href={authorLink(author.id)}
              class="w-full flex flex-col items-center pb-2 -mb-2 lt-sm:(px-8 pt-8) sm:(px-10 pt-10)"
            >
              <AvatarPlaceholder
                sizes="8rem"
                baseWidth={128}
                id={author.avatarId}
                class="w-32 rounded-full"
              />
              <div class="w-full pt-v5" />
              <h3 class="text-center text-h3">{author.name}</h3>
              <div class="w-full pt-1" />
              <p class="text-center text-body-2 text-medium-gray">
                {'Content Writer @Company'}
              </p>
            </a>
            <div class="w-full pt-v5" />
            <div class="flex">
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
        )}
      </For>
    </div>
  );
}
