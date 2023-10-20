import PaginationLink from './PaginationLink';

export default function Pagination<
  T extends { prev?: string; next?: string },
>(props: { pagination: T; makeUrl: (page: string) => string }) {
  function url(page: string | undefined) {
    if (page === undefined) return undefined;
    return props.makeUrl(page);
  }

  return (
    <div class="flex gap-x-4">
      <PaginationLink href={url(props.pagination.prev)}>
        {'< Prev'}
      </PaginationLink>
      <PaginationLink href={url(props.pagination.next)}>
        {'Next >'}
      </PaginationLink>
    </div>
  );
}
