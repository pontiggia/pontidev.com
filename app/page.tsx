import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
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
    <main className="min-h-screen px-8 md:px-16 lg:px-24 py-8 md:py-10 flex flex-col">
      <SiteHeader name="Felipe Pontiggia" href="/" />

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

          <section className="max-w-4xl mt-16 space-y-8">
            <div>
              <Link
                href="/blog"
                className="hero-text group inline-flex items-center gap-2 font-serif text-lg md:text-xl text-foreground hover:underline underline-offset-4"
              >
                blog
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                thoughts, notes, and whatever else is on my mind.
              </p>
            </div>

            <div>
              <Link
                href="/projects"
                className="hero-text group inline-flex items-center gap-2 font-serif text-lg md:text-xl text-foreground hover:underline underline-offset-4"
              >
                projects
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                things i built and shipped.
              </p>
            </div>

          </section>
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
