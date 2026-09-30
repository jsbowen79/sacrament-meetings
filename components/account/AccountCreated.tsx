import { Account } from '@/lib/types';

interface AccountCreatedProps {
  account: Account;
}

export default function AccountCreated({ account }: AccountCreatedProps) {
  return (
    <section className="border-l-4 border-emerald-700 bg-emerald-50 p-5 text-emerald-950">
      <h3 className="mb-2 text-xl font-semibold">Registration successful</h3>
      <p className="mb-4 text-sm">Your account has been created.</p>
      <dl className="grid gap-2 text-sm sm:grid-cols-[max-content_1fr] sm:gap-x-4">
        <dt className="font-semibold">Account ID</dt>
        <dd>{account.id}</dd>
        <dt className="font-semibold">Name</dt>
        <dd>{account.name}</dd>
        <dt className="font-semibold">Email</dt>
        <dd>{account.email}</dd>
        <dt className="font-semibold">Account created</dt>
        <dd>{account.createdAt}</dd>
      </dl>
      <p className="mt-4 font-semibold">We hope you enjoy our app.</p>
    </section>
  );
}
