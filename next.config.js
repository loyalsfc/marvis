/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'kqsacaiwecwtgdlzfwaq.supabase.co',
            port: '',   
          },
        ],
      },
}

module.exports = nextConfig
