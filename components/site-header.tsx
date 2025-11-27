import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

interface SiteHeaderProps {
  name?: string;
}

export function SiteHeader({ name = 'Ponti' }: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between mb-10 md:mb-12">
      <Link href="/blog">
        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight text-foreground hover:text-muted-foreground transition-colors cursor-pointer">
          {name}
        </h1>
      </Link>
      <ThemeToggle />
    </header>
  );
}
