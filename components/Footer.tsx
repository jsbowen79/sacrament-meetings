export default function Footer() {
  return (
    <footer className="bg-[var(--church-blue-dark)] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 text-center">
        <p className="text-sm md:text-base">
          Copyright &copy; {new Date().getFullYear()} | Joseph Bowen | All
          rights reserved
        </p>
      </div>
    </footer>
  );
}
