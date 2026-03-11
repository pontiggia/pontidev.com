export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  role?: string;
  location?: string;
  period?: string;
  stack: string[];
  highlights?: string[];
  links?: ProjectLink[];
}

export const projects: ProjectEntry[] = [
  {
    id: 'agent-seo',
    title: 'agent-seo',
    description:
      'Open-source library that makes websites AI-readable by serving markdown to AI crawlers while keeping normal HTML for browsers.',
    stack: ['TypeScript', 'Next.js', 'Express', 'Fastify', 'Hono'],
    links: [
      { label: 'github', href: 'https://github.com/pontiggia/agent-seo' },
      { label: 'docs', href: 'https://agent-seo-docs.vercel.app' },
      { label: 'npm', href: 'https://www.npmjs.com/org/agent-seo' },
    ],
  },
  {
    id: 'p0-template',
    title: 'p0-template',
    description:
      'Forkable AI data analyst template that turns natural language into SQL, executes read-only Postgres queries, and streams chart outputs.',
    stack: ['TypeScript', 'Next.js', 'Vercel AI SDK', 'Claude', 'PostgreSQL'],
    links: [
      { label: 'github', href: 'https://github.com/pontiggia/p0-template' },
    ],
  },
  {
    id: 'easyfit',
    title: 'easyfit',
    description:
      'Built and scaled a same-day clothing delivery marketplace with a try-before-you-buy experience.',
    role: 'Co-Founder & CTO',
    stack: [
      'TypeScript',
      'Next.js',
      'Node.js',
      'Express',
      'MongoDB',
      'Socket.IO',
      'AWS ECS/EC2',
      'Vercel',
      'Mercado Pago',
    ],
    links: [
      { label: 'github', href: 'https://github.com/easy-fit/easyfit' },
      { label: 'live', href: 'https://www.easyfit.com.ar' },
    ],
  },
];
