import Register from '@/components/account/Register';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata(
  'Create an Account',
  'Register for an account to manage sacrament meeting records.',
  true,
);

export default function register() {
  return (
    <main className="mx-auto w-[95%] max-w-[1200px] flex-1 px-1 py-10 sm:py-14">
      <section className="mx-auto w-full max-w-2xl border-t-4 border-[var(--church-blue)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase text-[var(--church-blue)]">
          Account access
        </p>
        <h2 className="mb-2 text-3xl font-bold text-[var(--church-blue-dark)]">
          Create an account
        </h2>
        <p className="mb-6 text-[var(--muted)]">
          Registration is limited to members of the Ward Bishopric.
        </p>
        <Register />
      </section>
    </main>
  );
}
