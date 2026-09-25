import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="bg-[var(--church-blue-dark)] pb-4 pt-5 text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-8">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold">Gathered in His Name</h1>
          <h2 className="text-2xl md:text-3xl">
            &quot;Whatsoever you record on Earth shall be recorded in
            heaven&quot;
          </h2>
          <p className="text-base md:text-lg">D&C 128:8</p>
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
