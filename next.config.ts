import { withAgentSeo } from '@agent-seo/next';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default withAgentSeo({
  siteName: 'Felipe Pontiggia',
  siteDescription: 'Software engineer. Been coding since I was 16 and never really stopped, mostly building for the web.',
  baseUrl: 'https://felipepontiggia.com',
  sitemap: true,
})(nextConfig);
