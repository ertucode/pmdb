/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
  webpack(config) {

    return config;
  },
};
