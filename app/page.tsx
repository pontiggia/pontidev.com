import Link from 'next/link';
import { Greeting } from '@/components/greeting';

const events = [
  {
    title: 'Puentes',
    role: 'fellow · antigravity capital',
    meta: 'sf · 2026',
    href: 'https://puentes.antigravity.capital/fellows/',
  },
  {
    title: 'YC Startup School Hackathon',
    role: 'judge · c0mpiled',
    meta: 'taipei · 2026',
    href: 'https://luma.com/compiled-poy7',
  },
  {
    title: 'c0mpiled: SanFransokyo',
    role: 'host · yc rfs hackathon',
    meta: 'tokyo · 2026',
    href: 'https://luma.com/tptokyo2026_c0mpiled15',
  },
];

export default function Home() {
  return (
    <>
      <section className="max-w-3xl">
        <Greeting />
        <h1 className="mb-3 font-serif text-2xl leading-snug tracking-tight text-balance md:text-3xl">
          i'm a software engineer from argentina, now in san francisco building{' '}
          <a href="https://circleback.ai" className="link">
            circleback
          </a>
          .
        </h1>
        <p className="font-serif text-xl leading-snug tracking-tight text-balance text-muted-foreground md:text-2xl">
          sometimes i try to break things too.
        </p>
      </section>

      <section className="mt-12">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-serif text-lg md:text-xl"
        >
          blog
          <span className="text-muted-foreground transition-[translate,color] group-hover:translate-x-1 group-hover:text-foreground">
            →
          </span>
        </Link>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="mb-1 font-serif text-xl tracking-tight">out in the world</h2>
        <ul className="divide-y divide-border">
          {events.map((event) => (
            <li key={event.title}>
              <a href={event.href} className="group block py-3">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="inline-flex items-center gap-1 transition-colors group-hover:text-muted-foreground">
                    {event.title}
                    <span className="text-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </span>
                  <span className="shrink-0 text-sm text-muted-foreground tabular-nums">
                    {event.meta}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{event.role}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
