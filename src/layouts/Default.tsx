import { For, createEffect, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
import type { JSX } from 'solid-js';
import $join from 'join.macro';
import MenuIcon from '~/components/icons/menu';
import { useBreakpoints } from '~/utils/breakpoints';
import { createEventListener } from '@solid-primitives/event-listener';
import Footer from '~/components/layouts/default/Footer';
import {
  aboutUsLink,
  blogPageLink,
  contactUsLink,
  homeLink,
} from '~/utils/link';

const links = [
  { href: homeLink, text: 'Home' },
  { href: blogPageLink(), text: 'Blog' },
  { href: aboutUsLink, text: 'About us' },
  { href: contactUsLink, text: 'Contact us' },
];

export default function DefaultLayout(props: { children: JSX.Element }) {
  const breakpoints = useBreakpoints();

  const [isOpen, setIsOpen] = createSignal(false);

  createEffect(() => {
    if (breakpoints.md) close();
  });

  function close() {
    setIsOpen(false);
  }

  function onClick(e: MouseEvent) {
    if (e.altKey || e.ctrlKey) return;
    close();
  }

  const [menuButtonRef, setMenuButtonRef] = createSignal<HTMLButtonElement>();
  const [listRef, setListRef] = createSignal<HTMLUListElement>();

  createEventListener(
    () => (isOpen() ? window : undefined),
    'click',
    (e) => {
      const menuButton = menuButtonRef();
      const list = listRef();
      const { target } = e;
      if (!(target instanceof Node)) {
        close();
        return;
      }

      if (
        (menuButton !== undefined && menuButton.contains(target)) ||
        (list !== undefined && list.contains(target))
      ) {
        return;
      }

      close();
    },
  );

  return (
    <>
      <div class="sticky top-0 z-1 w-full flex flex-col items-center bg-dark-blue">
        <div class={$join('h-20 max-w-360 w-full flex items-center', 'cont')}>
          <A href={homeLink}>
            <img src="/img/finsweet.svg" class="w-35" />
          </A>
          <ul
            ref={setListRef}
            class={$join(
              isOpen()
                ? 'lt-md:top-full lt-md:left-0 lt-md:w-full lt-md:items-start lt-md:bg-dark-blue'
                : 'lt-md:hidden',
              'absolute ml-auto flex flex-col items-center',
              'md:relative md:top-initial md:flex-row',
            )}
          >
            <For each={links}>
              {({ href, text }) => (
                <MenuLink href={href} class="lt-md:cont!" onClick={onClick}>
                  {text}
                </MenuLink>
              )}
            </For>
            <div class="lt-md:cont flex lt-md:mb-6">
              <a
                onClick={onClick}
                class={$join(
                  'bg-light-gray bg-white py-4 text-size-lg font-bold line-height-[calc(4em/3)] font-sen color-dark-blue',
                  'px-4 lt-md:ml-0 lt-md:mt-3',
                  'md:px-5 md:ml-5',
                  'lg:px-8',
                  'xl:px-12',
                )}
                href="#subscribe"
              >
                {'Subscribe'}
              </a>
            </div>
          </ul>
          <button
            ref={setMenuButtonRef}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            class="ml-auto bg-transparent p-4.5 text-white -mr-4.5 md:hidden"
          >
            <MenuIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
      {props.children}
      <Footer />
    </>
  );
}

function MenuLink(props: {
  href: string;
  children: string;
  class?: string;
  onClick?: (e: MouseEvent) => void;
}) {
  return (
    <A
      class={$join(
        'p-3 text-size-base line-height-28px font-inter color-white',
        props.class ?? '',
      )}
      href={props.href}
      onClick={props.onClick}
    >
      {props.children}
    </A>
  );
}
