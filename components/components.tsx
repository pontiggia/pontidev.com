import type React from 'react';
import { slugify } from '@/lib/utils/validation';

export const mdxComponents = {
  h2: ({ children }: { children: React.ReactNode }) => {
    const text = typeof children === 'string' ? children : String(children);
    const id = slugify(text);
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }: { children: React.ReactNode }) => {
    const text = typeof children === 'string' ? children : String(children);
    const id = slugify(text);
    return <h3 id={id}>{children}</h3>;
  },
};
