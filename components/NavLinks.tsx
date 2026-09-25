'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="nav mx-auto mt-4 w-4/5 text-lg md:text-xl"
    >
      <ul className="flex list-none flex-wrap items-center justify-between gap-3 p-0">
        <li>
          <Link
            href="/meetings"
            aria-current={pathname === '/meetings' ? 'page' : undefined}
            className={`text-lg text-white hover:text-[#dff7ff] hover:no-underline md:text-xl ${
              pathname === '/meetings' ? 'font-semibold underline' : ''
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/meetings/current"
            aria-current={pathname === '/meetings/current' ? 'page' : undefined}
            className={`text-lg text-white hover:text-[#dff7ff] hover:no-underline md:text-xl ${
              pathname === '/meetings/current' ? 'font-semibold underline' : ''
            }`}
          >
            Current
          </Link>
        </li>
        <li>
          <Link
            href="/meetings/search"
            aria-current={pathname === '/meetings/search' ? 'page' : undefined}
            className={`text-lg text-white hover:text-[#dff7ff] hover:no-underline md:text-xl ${
              pathname === '/meetings/search' ? 'font-semibold underline' : ''
            }`}
          >
            Find a Meeting
          </Link>
        </li>
        <li>
          <Link
            href="/meetings/new"
            aria-current={pathname === '/meetings/new' ? 'page' : undefined}
            className={`text-lg text-white hover:text-[#dff7ff] hover:no-underline md:text-xl ${
              pathname === '/meetings/new' ? 'font-semibold underline' : ''
            }`}
          >
            New Meeting
          </Link>
        </li>
      </ul>
    </nav>
  );
}
