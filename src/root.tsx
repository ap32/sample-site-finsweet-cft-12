// @refresh reload
import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';

import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import DefaultLayout from './layouts/Default';

import RoutesCustom from './routes-custom';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Organick - sample site</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/favicons/manifest.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sen:wght@500..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <Body class="overflow-y-scroll text-dark-blue">
        <DefaultLayout>
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
                <RoutesCustom />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </DefaultLayout>
        <Scripts />
      </Body>
    </Html>
  );
}
