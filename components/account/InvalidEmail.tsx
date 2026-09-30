export default function InvalidEmail() {
  return (
    <section>
      <div
        role="alert"
        className="border-l-4 border-red-700 bg-red-50 px-4 py-3 text-sm text-[var(--error-text)]"
      >
        <h3 className="mb-1 font-semibold">Registration failed</h3>
        <p>The email is already registered. Please use another email.</p>
      </div>
    </section>
  );
}
