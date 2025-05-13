/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'stg-bcl-image.s3.ap-northeast-1.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: 'bcl-image.s3.ap-northeast-1.amazonaws.com',
        },
      ],
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  };
  
  export default nextConfig;