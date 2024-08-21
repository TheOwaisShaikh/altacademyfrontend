// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Adding headers to handle CORS for API routes
//   async headers() {
//     return [
//       {
//         // Matching all API routes
//         source: '/api/:path*',
//         headers: [
//           {
//             key: 'Access-Control-Allow-Credentials',
//             value: 'true', // Allow credentials (cookies, authorization headers, etc.)
//           },
//           {
//             key: 'Access-Control-Allow-Origin',
//             value: 'https://altacademy.org', // Replace with your allowed origin
//           },
//           {
//             key: 'Access-Control-Allow-Methods',
//             value: 'GET,HEAD,POST,OPTIONS', // Allowed methods
//           },
//           {
//             key: 'Access-Control-Allow-Headers',
//             value: 'X-Requested-With, Accept, Content-Type, Authorization', // Allowed headers
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Matching all API routes for CORS headers
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://altacademy.org',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,HEAD,POST,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Accept, Content-Type, Authorization',
          },
        ],
      },
      {
        // Matching all routes for iframe embedding headers
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Allows embedding on the same origin
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://altacademy.org", // Allows embedding from your domain
          },
        ],
      },
    ];
  },
};

export default nextConfig;
