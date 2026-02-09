import { SiteHeader } from '@/components/site-header';
import Link from 'next/link';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  if (hour >= 17 && hour < 21) return 'Good evening';
  return 'Hello';
}

export default function Home() {
  const greeting = getGreeting();

  return (
    <main className="h-screen overflow-hidden px-8 md:px-16 lg:px-24 py-8 md:py-10 flex flex-col">
      <SiteHeader name="Felipe Pontiggia" />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <section className="max-w-4xl mb-8">
            <p className="text-base text-muted-foreground mb-4">{greeting}</p>
            <p className="hero-text font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-foreground mb-4 text-balance">
              i'm a software engineer. been coding since i was 16, and never
              really stopped.
            </p>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight text-muted-foreground text-balance">
              sometimes i try to break things too.
            </p>
          </section>

          <section className="max-w-4xl gap-4 mt-16">
            <Link
              href="/blog"
              className="hero-text group inline-flex items-center gap-2 font-serif text-xl md:text-2xl text-foreground hover:underline underline-offset-4"
            >
              blog
              <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              thoughts on code, security, and whatever else is on my mind.
            </p>
          </section>
        </div>

        <footer className="max-w-4xl pt-6 border-t border-border/40">
          <div className="flex flex-wrap gap-x-6 gap-y-3 mb-3">
            <a
              href="https://github.com/pontiggia"
              className="text-base text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group"
            >
              GitHub
              <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                ↗
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/felipe-pontiggia/"
              className="text-base text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group"
            >
              LinkedIn
              <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                ↗
              </span>
            </a>
            <a
              href="https://x.com/pontidev"
              className="text-base text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-1 group"
            >
              X
              <span className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                ↗
              </span>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            want to share something?{' '}
            <a
              href="mailto:felipontiggia@gmail.com"
              className="text-foreground hover:underline underline-offset-2"
            >
              felipontiggia@gmail.com
            </a>{' '}
          </p>
        </footer>
      </div>
    </main>
  );
}
