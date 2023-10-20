import $join from 'join.macro';
import { contactUsLink } from '~/utils/link';
import ButtonLink from '../button/ButtonLink';

export default function JoinOurTeam() {
  return (
    <section class="flex flex-col self-center lt-sm:max-w-105 sm:max-w-140">
      <h2 class={$join('cont text-center', 'lt-sm:text-h3', 'sm:text-h2')}>
        Join our team to be a part of our story
      </h2>
      <div class="w-full pt-v4" />
      <p class="cont text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt.
      </p>
      <div class="w-full pt-v8" />
      <ButtonLink href={contactUsLink} class="self-center">
        Join Now
      </ButtonLink>
    </section>
  );
}
