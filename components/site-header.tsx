import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteHeader() {
  return (
    <header className="mb-10 flex items-center justify-between gap-4 md:mb-12">
      <Link
        href="/"
        className="font-serif text-xl tracking-tight transition-colors hover:text-muted-foreground"
      >
        Felipe Pontiggia
      </Link>
      <ThemeToggle />
    </header>
  );
}
