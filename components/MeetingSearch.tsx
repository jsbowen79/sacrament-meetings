'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    const targetPath = pathname === '/' ? '/meetings/search' : pathname;
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${targetPath}?${params.toString()}`);
  }, 300);

  return (
    <section className="w-full rounded-xl border border-slate-300 bg-white p-4 shadow-sm">
      <div className="grid gap-2 md:grid-cols-[140px_1fr] md:items-center">
        <label
          htmlFor="search"
          className="m-0 text-base font-semibold text-[var(--church-blue-dark)]"
        >
          Search Term
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search by speaker, leader, or meeting type..."
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search meetings"
          className="m-0"
        />
      </div>
    </section>
  );
}
