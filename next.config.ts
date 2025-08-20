import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 支持静态导出
  output: 'export',
  
  // 关闭图片优化（静态导出不支持）
  images: {
    unoptimized: true,
  },
  
  // GitHub Pages子路径配置
  basePath: process.env.NODE_ENV === 'production' ? '/graduation-service-platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/graduation-service-platform/' : '',
  
  // 关闭服务端功能
  trailingSlash: true,
};

export default nextConfig;
