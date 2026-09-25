'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className="w-full px-3 py-4">
      <div className="flex items-center justify-center gap-3">
        {totalPages > 1 && currentPage > 1 && (
          <Link
            href={createPageURL(currentPage - 1)}
            className="inline-flex w-24 items-center justify-center rounded-md border border-[var(--church-blue-dark)] bg-[var(--church-blue-light)] px-3 py-2 text-sm font-medium text-[var(--church-blue-dark)] hover:bg-[var(--church-blue-dark)] hover:!text-white hover:no-underline hover:opacity-100"
          >
            Previous
          </Link>
        )}

        <span className="text-sm font-medium text-[var(--church-gray-dark)]">
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages && (
          <Link
            href={createPageURL(currentPage + 1)}
            className="inline-flex w-24 items-center justify-center rounded-md border border-[var(--church-blue-dark)] bg-[var(--church-blue-light)] px-3 py-2 text-sm font-medium text-[var(--church-blue-dark)] hover:bg-[var(--church-blue-dark)] hover:!text-white hover:no-underline hover:opacity-100"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}
