import type { Accessor, JSX, Setter } from 'solid-js';
import { For, createEffect, createSignal, onCleanup } from 'solid-js';
import { produce, type SetStoreFunction } from 'solid-js/store';

export default function ForRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends readonly any[],
  U extends JSX.Element,
  V extends Element,
>(props: {
  each: T | undefined | null | false;
  setRefs: SetStoreFunction<(V | undefined)[]>;
  children: (
    item: T[number],
    index: Accessor<number>,
    setRef: Setter<V | undefined>,
  ) => U;
}) {
  return (
    <For each={props.each}>
      {(item, index) => {
        const [ref, setRef] = createSignal<V>();

        createEffect(() => {
          props.setRefs(produce((s) => (s[index()] = ref())));
        });

        if (!props.each) throw new Error('Unexpected behavior');
        {
          // eslint-disable-next-line solid/reactivity
          const i = index();
          while (props.each.length <= i) {
            props.setRefs(
              produce((s) => {
                s.push(undefined);
              }),
            );
          }
        }

        onCleanup(() => {
          props.setRefs(
            produce((s) => {
              s.pop();
            }),
          );
        });
        // eslint-disable-next-line solid/reactivity
        return props.children(item, index, setRef);
      }}
    </For>
  );
}
