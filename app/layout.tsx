import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: '이동호 | Python Backend Engineer',
  description:
    '회계·세무 도메인 경험을 바탕으로 자동화, 스크래핑, 백엔드 시스템을 만드는 Python 개발자 이동호의 포트폴리오입니다.',
  openGraph: {
    title: '이동호 | Python Backend Engineer',
    description: '복잡한 실무를 이해하고, 작동하는 자동화로 바꿉니다.',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: '/og.png', width: 1792, height: 938, alt: '이동호 Python Backend Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이동호 | Python Backend Engineer',
    description: '복잡한 실무를 이해하고, 작동하는 자동화로 바꿉니다.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
