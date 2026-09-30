'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const router = useRouter();

  async function logIn(e: React.SubmitEvent) {
    e.preventDefault();

    const loggedIn = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (loggedIn.ok && !loggedIn.error) {
      router.push('/meetings');
      router.refresh();
    } else {
      setLoginStatus('invalid');
    }
  }

  return (
    <main className="mx-auto w-[95%] max-w-[1200px] flex-1 px-1 py-10 sm:py-14">
      <section className="mx-auto w-full max-w-lg border-t-4 border-[var(--church-blue)] bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-2 text-sm font-semibold uppercase text-[var(--church-blue)]">
          Account access
        </p>
        <h2 className="mb-2 text-3xl font-bold text-[var(--church-blue-dark)]">
          Log in
        </h2>
        <p className="mb-6 text-[var(--muted)]">
          Enter your credentials to manage meeting records.
        </p>
        {loginStatus === 'invalid' && (
          <p
            role="alert"
            className="mb-5 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-[var(--error-text)]"
          >
            Those credentials were not recognized. Please try again.
          </p>
        )}
        <form onSubmit={logIn} className="space-y-4">
          <div>
            <label className="mb-1 text-sm" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              value={email}
              type="email"
              autoComplete="email"
              required
              onChange={(event) => setEmail(event.target.value)}
              className="my-0 rounded-md border border-slate-300 px-3 py-2.5 focus:border-[var(--church-blue)]"
            />
          </div>
          <div>
            <label className="mb-1 text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              required
              onChange={(event) => setPassword(event.target.value)}
              className="my-0 rounded-md border border-slate-300 px-3 py-2.5 focus:border-[var(--church-blue)]"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[var(--church-blue-dark)] px-4 py-3 font-semibold text-white hover:bg-[var(--church-blue)]"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Need an account?{' '}
          <Link
            className="font-semibold text-[var(--church-blue-dark)] underline"
            href="/register"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
