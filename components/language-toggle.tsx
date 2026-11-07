import Link from 'next/link';
import type { Language } from '@/lib/mdx';

const languages: { code: Language; label: string; query: string }[] = [
  { code: 'en', label: 'EN', query: '' },
  { code: 'es', label: 'ES', query: '?lang=es' },
];

export function LanguageToggle({
  slug,
  currentLang,
}: {
  slug: string;
  currentLang: Language;
}) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-md bg-secondary p-0.5">
      {languages.map(({ code, label, query }) => (
        <Link
          key={code}
          href={`/blog/${slug}${query}`}
          aria-current={currentLang === code ? 'true' : undefined}
          className={`rounded px-2.5 py-0.5 text-xs font-medium transition-colors ${
            currentLang === code
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
