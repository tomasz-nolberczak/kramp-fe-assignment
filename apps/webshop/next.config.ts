import { composePlugins, withNx } from '@nx/next';
import { WithNxOptions } from '@nx/next/plugins/with-nx';

const nextConfig: WithNxOptions = {
  images: {
    remotePatterns: [new URL('https://placehold.co/**')],
  },
  nx: {},
};

const plugins = [withNx];

const config = composePlugins(...plugins)(nextConfig);

export default config;
