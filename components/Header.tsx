import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="app-header">
      <div className="text-2xl font-bold">
        <h1 className="text-4xl text-center">Gathered in His Name</h1>
        <h2 className="text-center text-3xl">
          &quot;Whatsoever you record on Earth shall be recorded in heaven&quot;
        </h2>
        <p className="text-center text-l">D&C 128:8</p>
        <NavLinks />
      </div>
    </header>
  );
}
