import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
  },
  images: {
    domains: ['cars-by-api-ninjas.p.rapidapi.com'], // Add the external domain here
  },
};

export default nextConfig;
