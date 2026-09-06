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
      setStatus('PDF를 만들지 못했습니다. 잠시 후 다시 눌러 주세요.');
    } finally {
      inProgress.current = false;
      setBusy(false);
    }
  }

  return (
    <div className="pdf-downloads">
      <button className="pdf-download-button" type="button" onClick={generate} disabled={busy} aria-busy={busy} aria-describedby="pdf-status">
        {busy ? 'PDF 생성 중…' : 'PDF 다운로드 ↓'}
      </button>
      <p id="pdf-status" className="pdf-status" role="status" aria-live="polite">{status}</p>
    </div>
  );
}
