export function SiteFooter() {
  return (
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
  );
}
