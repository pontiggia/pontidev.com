import Link from 'next/link';

export const metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <section>
      <h1 className="font-serif text-3xl tracking-tight md:text-4xl">
        nothing here.
      </h1>
      <p className="mt-3 text-muted-foreground">
        either this page moved or i broke it.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2"
      >
        go home
        <span className="text-muted-foreground transition-[translate,color] group-hover:translate-x-1 group-hover:text-foreground">
          →
        </span>
      </Link>
    </section>
  );
}
