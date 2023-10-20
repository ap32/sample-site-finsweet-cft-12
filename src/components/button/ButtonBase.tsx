import { splitProps } from 'solid-js';
import type { ValidComponent } from 'solid-js';
import type { DynamicProps } from 'solid-js/web';
import { Dynamic } from 'solid-js/web';
import $join from 'join.macro';

export default function ButtonBase<
  T extends { class?: string },
  Q extends ValidComponent,
>(props: T & { component: Q } & DynamicProps<Q>) {
  const [local, others] = splitProps(
    props as {
      class?: string;
      component: ValidComponent;
    },
    ['component', 'class'],
  );
  return (
    <Dynamic
      component={local.component}
      class={$join(
        local.class ?? '',
        'bg-yellow px-12 py-4 text-center text-4.5/6 font-bold font-sen text-dark-blue hover:bg-dark-yellow',
      )}
      {...others}
    />
  );
}
