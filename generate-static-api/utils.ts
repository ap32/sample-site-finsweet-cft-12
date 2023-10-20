import { mkdir, writeFile } from 'node:fs/promises';
import type { Page, PostPreview } from '~/api-types';

export async function saveTo(path: string, obj: object) {
  await mkdir(path.substring(0, path.lastIndexOf('/')), {
    recursive: true,
  });
  await writeFile(path, JSON.stringify(obj, undefined, 2));
}

export async function saveApiResponse(path: string, obj: object) {
  return saveTo(`./public/api${path}.json`, obj);
}

const postsPerPage = 8;

function getPages(postPreviews: PostPreview[]): Page[] {
  const pages: Page[] = [];

  for (let i = 0; ; i += postsPerPage) {
    const data = postPreviews.slice(i, i + postsPerPage);

    if (data.length === 0) break;

    pages.push({
      data,
      pagination: {
        curr: `${i / 8 + 1}`,
      },
    });
  }

  if (pages.length === 0) {
    pages.push({
      data: [],
      pagination: {
        curr: '1',
      },
    });

    return pages;
  }

  for (let i = 1; i < pages.length; i++) {
    pages[i].pagination.prev = `${i}`;
  }

  for (let i = 0; i < pages.length - 1; i++) {
    pages[i].pagination.next = `${i + 2}`;
  }

  return pages;
}

export async function savePages(
  base: string,
  postPreviews: PostPreview[],
  addPrerender: (page: number) => void,
) {
  for (const page of getPages(postPreviews)) {
    addPrerender(parseInt(page.pagination.curr));
    await saveApiResponse(`${base}${page.pagination.curr}`, page);
  }
}
