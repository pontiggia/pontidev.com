import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { projects } from '@/lib/data/projects';

export const metadata = {
  title: 'Projects',
  description: 'Things I built and shipped.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-8 md:px-16 lg:px-24 py-8 md:py-10">
      <SiteHeader name="Ponti" href="/" />

      <section className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-foreground">
          projects
        </h1>
        <p className="text-muted-foreground mt-3">
          things i built and shipped.
        </p>

        <div className="mt-10 space-y-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="border border-border rounded-md p-5 md:p-6"
            >
              <h2 className="font-serif text-2xl text-foreground">
                {project.title}
              </h2>
              {(project.role || project.location || project.period) && (
                <p className="text-sm text-muted-foreground mt-2">
                  {[project.role, project.location, project.period]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              )}
              <p className="text-muted-foreground leading-relaxed mt-2">
                {project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <ul className="mt-4 space-y-2 list-disc pl-5 text-muted-foreground">
                  {project.highlights.map((highlight) => (
                    <li key={`${project.id}-${highlight}`}>{highlight}</li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2 py-1 border border-border rounded-sm text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-5">
                  {project.links.map((link) => (
                    <Link
                      key={`${project.id}-${link.label}`}
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm text-foreground hover:underline underline-offset-4"
                    >
                      {link.label}
                      <span className="text-muted-foreground">↗</span>
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <SiteFooter />
      </div>
    </main>
  );
}
