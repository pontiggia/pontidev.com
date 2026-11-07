const links = [
  { label: 'GitHub', href: 'https://github.com/pontiggia' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/felipe-pontiggia/' },
  { label: 'X', href: 'https://x.com/pontidev' },
];

export function SiteFooter() {
  return (
    <footer className="mt-14 border-t border-border pt-6">
      <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="group inline-flex items-center gap-1 transition-colors hover:text-muted-foreground"
          >
            {label}
            <span className="text-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              ↗
            </span>
          </a>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        want to share something?{' '}
        <a
          href="mailto:felipontiggia@gmail.com"
          className="link"
        >
          felipontiggia@gmail.com
        </a>
      </p>
    </footer>
  );
}
