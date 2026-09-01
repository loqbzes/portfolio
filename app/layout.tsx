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
  title: '이동호 | Python Backend Developer',
  description:
    'Python, Django, Celery, AWS를 사용한 이동호의 경력과 프로젝트 포트폴리오입니다.',
  openGraph: {
    title: '이동호 | Python Backend Engineer',
    description: 'Python 백엔드 개발 경력 및 프로젝트',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: '/og.png', width: 1792, height: 938, alt: '이동호 Python Backend Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이동호 | Python Backend Engineer',
    description: 'Python 백엔드 개발 경력 및 프로젝트',
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
