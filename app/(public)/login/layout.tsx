import type { ReactNode } from 'react';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata(
  'Log In',
  'Log in to manage sacrament meeting records for your ward.',
  true,
);

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
