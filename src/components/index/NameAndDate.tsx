import { Link } from '@solidjs/router';
import type { AuthorPreview } from '~/api-types';
import minutesToDateStr from '~/utils/formatDate';
import $join from 'join.macro';
import minutesToISO from '~/utils/minutesToISO';
import { authorLink } from '~/utils/link';

export default function NameAndDate(props: {
  author: AuthorPreview;
  date: number;
  class?: string;
}) {
  return (
    <span
      class={$join(props.class ?? '', 'text-label font-medium text-dark-blue')}
    >
      {'By '}
      <Link class="color-purple" href={authorLink(props.author.id)}>
        {props.author.name}
      </Link>
      <span class="px-2"> | </span>
      <time datetime={minutesToISO(props.date)}>
        {minutesToDateStr(props.date)}
      </time>
    </span>
  );
}
