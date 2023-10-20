import { Match, Switch } from 'solid-js';
import { A } from 'solid-start';

export default function PaginationLink(props: {
  href: string | undefined;
  children: string;
}) {
  return (
    <Switch>
      <Match when={props.href}>
        {(url) => (
          <A class="lt-sm:text-h5 sm:text-h4" href={url()}>
            {props.children}
          </A>
        )}
      </Match>
      <Match when={!props.href}>
        <div class="lt-sm:text-h5 sm:text-h4 text-medium-gray">
          {props.children}
        </div>
      </Match>
    </Switch>
  );
}
