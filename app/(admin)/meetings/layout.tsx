export default function MeetingsLayout({ children }: LayoutProps<'/'>) {
  return (
    <main className="bg-white w-[95%] max-w-[1200px] mx-auto">{children}</main>
  );
}
