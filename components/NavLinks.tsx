'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="nav">
      <ul className="flex gap-6 width-full justify-between m-2">
        <li>
          <Link
            href="/meetings"
            className={pathname === '/meetings' ? 'active' : ''}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/meetings/current"
            className={pathname === '/current' ? 'active' : ''}
            aria-current={pathname === '/current' ? 'page' : undefined}
          >
            Current
          </Link>
        </li>
        <li>
          <Link
            href="/meetings/search"
            className={pathname === '/previous' ? 'active' : ''}
            aria-current={pathname === '/previous' ? 'page' : undefined}
          >
            Find a Meeting
          </Link>
        </li>
        <li>
          <Link
            href="/meetings/new"
            className={pathname === '/previous' ? 'active' : ''}
            aria-label={pathname === '/previous' ? 'page' : undefined}
          >
            Manage
          </Link>
        </li>
      </ul>
    </nav>
  );
}
