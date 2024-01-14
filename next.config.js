/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  // 다른 설정들...

  // webpack 설정 추가
  webpack: (config, { isServer }) => {
    // 서버 사이드 렌더링 중에는 Quill을 로드하지 않도록 설정
    if (isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^quill$/,
        })
      );
    }
    return config;
  },
};
