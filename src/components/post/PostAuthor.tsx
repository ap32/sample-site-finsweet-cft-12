import { Show } from 'solid-js';
import type { Post } from '~/api-types';
import AvatarPlaceholder from '../AvatarPlaceholder';
import minutesToISO from '~/utils/minutesToISO';
import minutesToDateStr from '~/utils/formatDate';
import { authorLink } from '~/utils/link';

export default function PostAuthor(props: { post: Post | undefined }) {
  return (
    <Show when={props.post}>
      {(post) => (
        <div class="cont max-w-200 flex gap-x-4">
          <AvatarPlaceholder
            baseWidth={64}
            class="h-16 w-16 rounded-full"
            id={post().author.avatarId}
            sizes="4rem"
          />
          <div class="flex flex-col">
            <a
              href={authorLink(post().author.id)}
              class="text-purple/83 text-h3"
            >
              {post().author.name}
            </a>
            <time
              class="text-body-1 text-medium-gray"
              datetime={minutesToISO(post().date)}
            >{`Posted on ${minutesToDateStr(post().date)}`}</time>
          </div>
        </div>
      )}
    </Show>
  );
}
