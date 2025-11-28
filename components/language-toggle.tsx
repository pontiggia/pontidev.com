'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Language } from '@/lib/mdx';

interface LanguageToggleProps {
  hasEnglish: boolean;
  hasSpanish: boolean;
  currentLang: Language;
}

export function LanguageToggle({
  hasEnglish,
  hasSpanish,
  currentLang,
}: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!hasEnglish || !hasSpanish) {
    return null;
  }

  const switchLanguage = (lang: Language) => {
    const params = new URLSearchParams(searchParams.toString());

    if (lang === 'es') {
      params.set('lang', 'es');
    } else {
      params.delete('lang');
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="inline-flex items-center gap-0.5 p-0.5 bg-secondary rounded-md">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 text-sm font-medium transition-all cursor-pointer rounded ${
          currentLang === 'en'
            ? 'bg-white text-black shadow-sm dark:bg-white dark:text-black'
            : 'lang-toggle text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('es')}
        className={`px-3 py-1 text-sm font-medium transition-all cursor-pointer rounded ${
          currentLang === 'es'
            ? 'bg-white text-black shadow-sm dark:bg-white dark:text-black'
            : 'lang-toggle text-muted-foreground hover:text-foreground'
        }`}
      >
        ES
      </button>
    </div>
  );
}
