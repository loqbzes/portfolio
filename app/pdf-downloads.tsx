'use client';

import { useRef, useState } from 'react';
import type { Portfolio } from './portfolio-data';

async function getResource(url: string) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`PDF resource unavailable: ${response.status}`);
  return response;
}

export default function PdfDownloads() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const inProgress = useRef(false);

  async function generate() {
    if (inProgress.current) return;
    inProgress.current = true;
    setBusy(true);
    setStatus('최신 내용으로 PDF를 만들고 있습니다.');
    try {
      const [{ createPortfolioPdf }, data, regular, bold] = await Promise.all([
        import('../lib/portfolio-pdf'),
        getResource('/api/portfolio').then((response) => response.json() as Promise<Portfolio>),
        getResource('/fonts/NanumGothic-Regular.ttf').then((response) => response.arrayBuffer()),
        getResource('/fonts/NanumGothic-Bold.ttf').then((response) => response.arrayBuffer()),
      ]);
      const bytes = await createPortfolioPdf(data, { regular, bold });
      const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '이동호_포트폴리오.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setStatus('PDF를 생성했습니다. 다운로드 목록을 확인해 주세요.');
    } catch {
      setStatus('PDF를 만들지 못했습니다. 다시 시도하거나 PDF 다운로드 링크를 이용해 주세요.');
    } finally {
      inProgress.current = false;
      setBusy(false);
    }
  }

  return (
    <div className="pdf-downloads">
      <div className="pdf-actions" aria-label="포트폴리오 PDF">
        <a className="pdf-download" href="/portfolio.pdf" download="이동호_포트폴리오.pdf">PDF 다운로드 ↓</a>
        <button type="button" onClick={generate} disabled={busy} aria-busy={busy} aria-describedby="pdf-status">
          {busy ? 'PDF 생성 중…' : '최신 내용으로 PDF 만들기'}
        </button>
      </div>
      <p className="pdf-description">경력과 전체 프로젝트를 담은 A4 문서입니다.</p>
      <p id="pdf-status" className="pdf-status" role="status" aria-live="polite">{status}</p>
    </div>
  );
}
