'use client';

import AccountCreated from './AccountCreated';
import InvalidPassword from './InvalidPassword';
import InvalidEmail from './InvalidEmail';
import FormErrors from './FormErrors';
import { useState } from 'react';
import { Account } from '@/lib/types';
import { registerAccount } from '@/lib/register';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [calling, setCalling] = useState('other');
  const [confirm, setConfirm] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string[];
    email?: string[];
    password?: string[];
  }>({});
  const [account, setAccount] = useState<Account | null>(null);

  async function register() {
    setFieldErrors({});
    if (calling == 'other') {
      setRegistrationStatus('calling');
      return;
    }
    if (password !== confirm) {
      setRegistrationStatus('password');
      return;
    } else {
      const result = await registerAccount(name, email, password);
      if (result != null && 'fieldErrors' in result) {
        setRegistrationStatus('errors');
        setFieldErrors(result.fieldErrors);
      } else if (result === null) {
        setRegistrationStatus('email');
      } else {
        setRegistrationStatus('created');
        setAccount(result);
      }
    }
  }

  return (
    <section className="mx-auto w-full">
      <div aria-live="polite" className="mb-5">
        {registrationStatus === 'created' && account !== null && (
          <AccountCreated account={account} />
        )}
        {registrationStatus === 'email' && <InvalidEmail />}
        {registrationStatus === 'password' && <InvalidPassword />}
        {registrationStatus === 'errors' && <FormErrors />}
        {registrationStatus === 'calling' && (
          <div
            role="alert"
            className="border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          >
            <h3 className="mb-1 font-semibold">Registration unavailable</h3>
            <p>Sorry, you must be a member of the Bishopric to register.</p>
          </div>
        )}
      </div>
      {registrationStatus !== 'created' && (
        <div className="space-y-4">
          <div>
            <label className="mb-1 text-sm" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              autoComplete="name"
              required
              onChange={(event) => setName(event.target.value)}
              className="my-0 rounded-md border border-slate-300 px-3 py-2.5 focus:border-[var(--church-blue)]"
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-[var(--error-text)]">
                {fieldErrors.name[0]}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 text-sm" htmlFor="calling">
              Calling
            </label>
            <select
              name="calling"
              id="calling"
              value={calling}
              onChange={(event) => setCalling(event.target.value)}
              className="my-0 rounded-md border border-slate-300 px-3 py-2.5 focus:border-[var(--church-blue)]"
            >
              <option value="bishop">Bishop</option>
              <option value="bishopric1stCounselor">
                Bishopric - 1st Counselor
              </option>
              <option value="bisopric2ndCounselor">
                Bishopric -2nd Counselor
              </option>
              <option value="bishopricExecutiveSecretary">
                Bishop Executive Secretary
              </option>
              <option value="other">Other Callings</option>
            </select>
          </div>

          <div>
            <label className="mb-1 text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              autoComplete="email"
              required
              onChange={(event) => setEmail(event.target.value)}
              className="my-0 rounded-md border border-slate-300 px-3 py-2.5 focus:border-[var(--church-blue)]"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-[var(--error-text)]">
                {fieldErrors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="new-password"
              required
              onChange={(event) => setPassword(event.target.value)}
              className="my-0 rounded-md border border-slate-300 px-3 py-2.5 focus:border-[var(--church-blue)]"
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-[var(--error-text)]">
                {fieldErrors.password[0]}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 text-sm" htmlFor="confirm">
              Confirm password
            </label>
            <input
              type="password"
              id="confirm"
              value={confirm}
              autoComplete="new-password"
              required
              onChange={(event) => setConfirm(event.target.value)}
              className="my-0 rounded-md border border-slate-300 px-3 py-2.5 focus:border-[var(--church-blue)]"
            />
          </div>

          <button
            onClick={register}
            className="w-full rounded-md bg-[var(--church-blue-dark)] px-4 py-3 font-semibold text-white hover:bg-[var(--church-blue)]"
          >
            Register
          </button>
        </div>
      )}
    </section>
  );
}
