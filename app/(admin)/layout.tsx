import { auth } from '@/lib/auth';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  {
    const session = await auth();

    if (!session) {
      redirect('/login');
    }
    return children;
  }
}
