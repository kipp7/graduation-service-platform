import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 注释掉静态导出，因为我们有API路由
  // output: 'export',
  
  // 关闭图片优化
  images: {
    unoptimized: true,
  },
  
  // 开发环境配置
  // basePath: process.env.NODE_ENV === 'production' ? '/graduation-service-platform' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/graduation-service-platform/' : '',
  
  // trailingSlash: true,
};

export default nextConfig;
