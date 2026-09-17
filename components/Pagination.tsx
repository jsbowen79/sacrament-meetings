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
  return (
    <nav aria-label="Pagination" className="h-[60px] flex items-center">
      <div className="my-auto">
        {totalPages > 1 && (
          <Link
            href={createPageURL(currentPage - 1)}
            className="mx-2 h-[40px] border p-2 m-2 my-auto"
          >
            Previous
          </Link>
        )}
        <span className="my-auto mx-2">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <Link
            href={createPageURL(currentPage + 1)}
            className="my-auto mx-2 border text-white p-2"
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  );
}
