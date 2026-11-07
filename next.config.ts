import { withAgentSeo } from '@agent-seo/next';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default withAgentSeo({
  siteName: 'Felipe Pontiggia',
  siteDescription: 'Software engineer from Argentina, in San Francisco building Circleback. I build side projects, break things, and write about what I figure out.',
  baseUrl: 'https://www.felipepontiggia.com',
  sitemap: true,
})(nextConfig);
