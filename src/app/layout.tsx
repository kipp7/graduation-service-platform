import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "毕设助手 - 专业毕业设计辅导服务平台",
  description: "专业的毕业设计辅导服务，提供硬件设计+软件开发+论文写作的全流程辅导。985/211名校导师团队，7-15天交付，100%原创保证，已服务3000+毕业生，98%答辩通过率。",
  keywords: "毕业设计,毕设辅导,论文写作,软件开发,硬件设计,毕业论文,学术辅导",
  authors: [{ name: "毕设助手团队" }],
  creator: "毕设助手",
  publisher: "毕设助手",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://kipp7.github.io/graduation-service-platform/",
    title: "毕设助手 - 专业毕业设计辅导服务",
    description: "专业的毕业设计辅导服务，已服务3000+毕业生，98%答辩通过率",
    siteName: "毕设助手",
  },
  twitter: {
    card: "summary_large_image",
    title: "毕设助手 - 专业毕业设计辅导服务",
    description: "专业的毕业设计辅导服务，已服务3000+毕业生，98%答辩通过率",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
