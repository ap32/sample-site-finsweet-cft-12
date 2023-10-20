import { useRouteData } from 'solid-start';
import ListOfAuthors from '~/components/blocks/ListOfAuthors';
import AboutUsBlock from '~/components/about-us/AboutUsBlock';
import AboutUsMissionVision from '~/components/about-us/AboutUsMissionVision';
import AboutUsTeamOfCreatives from '~/components/about-us/AboutUsTeamOfCreatives';
import AboutUsWhyWeStarted from '~/components/about-us/AboutUsWhyWeStarted';
import JoinOurTeam from '~/components/blocks/JoinOurTeam';
import { authorPreviewsResource } from '~/utils/resource';

export function routeData() {
  const [authors] = authorPreviewsResource();
  return { authors };
}

export default function AboutUs() {
  const { authors } = useRouteData<typeof routeData>();

  return (
    <main class="flex flex-col items-center">
      <div class="w-full pt-v20" />
      <AboutUsBlock />
      <AboutUsMissionVision />
      <div class="w-full pt-v32" />
      <AboutUsTeamOfCreatives />
      <div class="w-full pt-v32" />
      <AboutUsWhyWeStarted />
      <div class="w-full pt-v32" />
      <h2 class="lt-sm:text-h3 sm:text-h2">List of Authors</h2>
      <div class="w-full pt-v12" />
      <ListOfAuthors authors={authors()} />
      <div class="w-full pt-v32" />
      <JoinOurTeam />
      <div class="w-full pt-v32" />
    </main>
  );
}
