'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const pathname = usePathname();
  const [managementOpen, setManagementOpen] = useState(false);
  const navLinkClass = (active: boolean) =>
    `text-lg text-white hover:text-[#dff7ff] hover:no-underline md:text-xl ${active ? 'font-semibold underline' : ''}`;
  const isManagementActive =
    pathname === '/meetings' ||
    pathname === '/meetings/new' ||
    (pathname.startsWith('/meetings/') &&
      pathname !== '/meetings/current' &&
      pathname !== '/meetings/search');

  return (
    <nav
      aria-label="Primary"
      className="nav mx-auto mt-4 w-full max-w-4xl text-lg md:text-xl"
    >
      <ul className="flex list-none flex-wrap items-center justify-center gap-x-8 gap-y-3 p-0">
        <li>
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className={navLinkClass(pathname === '/')}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/meetings/current"
            aria-current={pathname === '/meetings/current' ? 'page' : undefined}
            className={navLinkClass(pathname === '/meetings/current')}
          >
            Current
          </Link>
        </li>
        <li>
          <Link
            href="/meetings/search"
            aria-current={pathname === '/meetings/search' ? 'page' : undefined}
            className={navLinkClass(pathname === '/meetings/search')}
          >
            Find a Meeting
          </Link>
        </li>
        {isAuthenticated ? (
          <li
            className="group relative"
            onMouseEnter={() => setManagementOpen(true)}
            onMouseLeave={() => setManagementOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setManagementOpen(false);
              }
            }}
          >
            <button
              type="button"
              aria-expanded={managementOpen}
              aria-controls="management-menu"
              onClick={() => setManagementOpen(!managementOpen)}
              className={`${navLinkClass(isManagementActive)} bg-transparent p-0`}
            >
              Management
              <span
                aria-hidden="true"
                className={`ml-2 inline-block border-x-4 border-t-4 border-x-transparent border-t-current align-[3px] transition-transform ${managementOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <ul
              id="management-menu"
              className={`absolute left-0 top-full z-20 min-w-52 list-none border border-white/20 bg-[var(--church-blue-dark)] p-2 text-left shadow-lg ${managementOpen ? 'block' : 'hidden'} group-hover:block group-focus-within:block`}
            >
              <li>
                <Link
                  href="/meetings/new"
                  aria-current={
                    pathname === '/meetings/new' ? 'page' : undefined
                  }
                  className="block px-3 py-2 text-base text-white hover:bg-white/10 hover:text-[#dff7ff] hover:no-underline"
                >
                  New Meeting
                </Link>
              </li>
              <li>
                <Link
                  href="/meetings"
                  aria-current={pathname === '/meetings' ? 'page' : undefined}
                  className="block px-3 py-2 text-base text-white hover:bg-white/10 hover:text-[#dff7ff] hover:no-underline"
                >
                  Update Meeting
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          <li>
            <Link
              href="/login"
              aria-current={pathname === '/login' ? 'page' : undefined}
              className={navLinkClass(pathname === '/login')}
            >
              Log In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
