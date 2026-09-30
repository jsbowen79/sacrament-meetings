'use client';

import { signOut } from 'next-auth/react';

export default function AuthenticatedButtons() {
  return (
    <button
      onClick={() => signOut({ redirectTo: '/login' })}
      className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[var(--church-blue-dark)] shadow-sm transition-colors hover:bg-[var(--church-blue-light)]"
    >
      Log Out
    </button>
  );
}
