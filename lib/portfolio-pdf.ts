import { PDFDocument, PDFName, PDFString, rgb } from 'pdf-lib';
import type { PDFFont, PDFPage, RGB } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { Portfolio } from '../app/portfolio-data';

type Fonts = { regular: ArrayBuffer | Uint8Array; bold: ArrayBuffer | Uint8Array };
type TextOptions = { size?: number; bold?: boolean; color?: RGB; indent?: number; gap?: number };

const WIDTH = 595.28;
const HEIGHT = 841.89;
const MARGIN = 44;
const BOTTOM = 60;
const CONTENT = WIDTH - MARGIN * 2;
const INK = rgb(.09, .09, .08);
const MUTED = rgb(.38, .38, .35);
const LINE = rgb(.82, .82, .78);
const ACCENT = rgb(.85, 1, .26);

const clean = (text: string) => text.replace(/[\u2010-\u2015\u2212]/g, '-');

export async function createPortfolioPdf(data: Portfolio, fonts: Fonts) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  // Full embedding preserves composite Hangul glyphs across PDF viewers.
  const regular = await doc.embedFont(fonts.regular);
  const bold = await doc.embedFont(fonts.bold);
  doc.setTitle(`${data.profile.name} | ${data.profile.role} Portfolio`);
  doc.setAuthor(data.profile.name);
  doc.setSubject('개발 경력 및 주요 프로젝트 포트폴리오');
  doc.setCreator('Portfolio PDF');
  doc.setLanguage('ko-KR');
  let page: PDFPage;
  let y = 0;
  let context = '경력 요약';

  function wrap(text: string, font: PDFFont, size: number, width: number) {
    const lines: string[] = [];
    for (const paragraph of clean(text).split('\n')) {
      let line = '';
      for (const character of paragraph) {
        if (line && font.widthOfTextAtSize(line + character, size) > width) {
          const space = line.lastIndexOf(' ');
          if (space > line.length * .45) {
            lines.push(line.slice(0, space));
            line = line.slice(space + 1) + character;
          } else {
            lines.push(line.trimEnd());
            line = character.trimStart();
          }
        } else line += character;
      }
      if (line) lines.push(line.trimEnd());
    }
    return lines;
  }

  function newPage(continued = false) {
    page = doc.addPage([WIDTH, HEIGHT]);
    page.drawText(clean(`${data.profile.name} / ${data.profile.role}`), {
      x: MARGIN, y: HEIGHT - 29, font: regular, size: 8, color: MUTED,
    });
    page.drawLine({ start: { x: MARGIN, y: HEIGHT - 37 }, end: { x: WIDTH - MARGIN, y: HEIGHT - 37 }, color: LINE, thickness: .5 });
    y = HEIGHT - 58;
    if (continued) paragraph(`${context} (계속)`, { bold: true, size: 11, gap: 14 });
  }

  function ensure(height: number) {
    if (y - height < BOTTOM) newPage(true);
  }

  function measure(text: string, options: TextOptions = {}) {
    const { size = 10.5, bold: isBold = false, indent = 0, gap = 6 } = options;
    return wrap(text, isBold ? bold : regular, size, CONTENT - indent).length * size * 1.5 + gap;
  }

  function paragraph(text: string, options: TextOptions = {}) {
    const { size = 10.5, bold: isBold = false, color = INK, indent = 0, gap = 6 } = options;
    const font = isBold ? bold : regular;
    const lines = wrap(text, font, size, CONTENT - indent);
    const height = lines.length * size * 1.5 + gap;
    // Keep normal paragraphs together, but allow unusually long future content to span pages.
    if (height < HEIGHT - 140) ensure(height);
    for (const line of lines) {
      ensure(size * 1.5);
      page.drawText(line, { x: MARGIN + indent, y: y - size, size, font, color });
      y -= size * 1.5;
    }
    y -= gap;
  }

  function heading(label: string, firstText = '') {
    ensure(27 + (firstText ? measure(firstText) : 20));
    y -= 7;
    page.drawRectangle({ x: MARGIN, y: y - 11, width: 3, height: 10, color: ACCENT });
    paragraph(label, { size: 10.5, bold: true, indent: 11, gap: 7 });
  }

  function section(label: string, items: string[], numbered = false) {
    if (!items.length) return;
    const height = 30 + items.reduce((sum, text) => sum + measure(`- ${text}`), 0);
    if (height < HEIGHT - 140) ensure(height);
    heading(label, items[0]);
    for (const [index, text] of items.entries()) {
      paragraph(`${numbered ? String(index + 1).padStart(2, '0') + '.' : '-'} ${text}`);
    }
  }

  function highlight(text: string) {
    const lines = wrap(text, bold, 10.5, CONTENT - 24);
    const height = 31 + lines.length * 16;
    ensure(height + 12);
    page.drawRectangle({ x: MARGIN, y: y - height, width: CONTENT, height, color: ACCENT });
    page.drawText('주요 결과', { x: MARGIN + 12, y: y - 14, size: 8, font: regular, color: INK });
    for (const [index, line] of lines.entries()) page.drawText(line, {
      x: MARGIN + 12, y: y - 31 - index * 16, size: 10.5, font: bold, color: INK,
    });
    y -= height + 12;
  }

  function link(text: string, uri: string) {
    const startY = y;
    paragraph(text, { size: 9, color: MUTED, gap: 3 });
    const annotation = doc.context.register(doc.context.obj({
      Type: 'Annot', Subtype: 'Link',
      Rect: [MARGIN, y, MARGIN + regular.widthOfTextAtSize(text, 9), startY],
      Border: [0, 0, 0], A: { Type: 'Action', S: 'URI', URI: PDFString.of(uri) },
    }));
    page.node.addAnnot(annotation);
  }

  newPage();
  paragraph('PORTFOLIO', { size: 31, bold: true, gap: 4 });
  paragraph(`${data.profile.name} | ${data.profile.role}`, { size: 15, bold: true, gap: 12 });
  paragraph(data.profile.intro, { size: 11, gap: 10 });
  paragraph(`${data.profile.company} · ${data.profile.position} | ${data.profile.period}`, { size: 10, bold: true });
  paragraph(`지원 분야: ${data.profile.target} / 주요 분야: ${data.profile.specialties}`, { size: 9, color: MUTED });
  section('경력 요약', data.careerHighlights);
  heading('기술', data.skills[0]?.join(' : '));
  for (const [category, items] of data.skills) paragraph(`${category}  |  ${items}`, { size: 9.5, gap: 6 });
  heading('학력', data.profile.education);
  paragraph(`${data.profile.education} · ${data.profile.educationStatus} | ${data.profile.educationPeriod}`, { size: 10 });
  heading('연락처 및 웹 포트폴리오', data.profile.email);
  link(data.profile.email, `mailto:${data.profile.email}`);
  link(data.profile.phone, data.profile.phoneHref);
  link(data.profile.siteUrl, data.profile.siteUrl);

  for (const [index, project] of data.projects.entries()) {
    context = project.title;
    newPage();
    paragraph(`PROJECT ${String(index + 1).padStart(2, '0')} / ${project.period}`, { size: 9, color: MUTED, gap: 10 });
    paragraph(project.title, { size: 19, bold: true, gap: 14 });
    const study = project.caseStudy;
    if (study) {
      if (study.outcomes.length) highlight(study.outcomes[0]);
      if (study.background) {
        heading('프로젝트 범위', study.background);
        paragraph(study.background);
      }
      if (study.history) section('리뉴얼 전 개발·개선', study.history);
      section(study.problemLabel ?? '기존 문제', study.problem);
      heading('담당 범위', study.ownership[0]);
      for (const ownership of study.ownership) paragraph(ownership);
      if (study.flow?.length) {
        heading('처리 구조', study.flow[0]);
        for (const [step, text] of study.flow.entries()) {
          const guards = step === study.flow.length - 1 ? study.guardrails : undefined;
          if (guards?.length) ensure(measure(text) + 27 + guards.reduce((sum, guard) => sum + measure(guard, { size: 9.5, indent: 18 }), 0));
          paragraph(`${String(step + 1).padStart(2, '0')}. ${text}`);
          if (guards?.length) {
            paragraph('코드 수정 조건', { bold: true, size: 9.5, indent: 18 });
            for (const guard of guards) paragraph(`- ${guard}`, { size: 9.5, indent: 18 });
          }
        }
      }
      if (study.operations) section('운영 및 모니터링', study.operations);
      section('도입 결과', study.outcomes.slice(1));
    } else {
      section('수행 업무', project.work);
      if (project.result) highlight(project.result);
    }
    heading('기술 스택', project.stack.join(' · '));
    paragraph(project.stack.join(' · '), { size: 9, color: MUTED });
  }

  const date = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date());
  for (const [index, item] of doc.getPages().entries()) {
    item.drawLine({ start: { x: MARGIN, y: 43 }, end: { x: WIDTH - MARGIN, y: 43 }, color: LINE, thickness: .5 });
    item.drawText(`PDF 생성일 ${date}`, { x: MARGIN, y: 28, font: regular, size: 8, color: MUTED });
    const pageNumber = `${index + 1} / ${doc.getPageCount()}`;
    item.drawText(pageNumber, { x: WIDTH - MARGIN - regular.widthOfTextAtSize(pageNumber, 8), y: 28, font: regular, size: 8, color: MUTED });
  }
  doc.catalog.set(PDFName.of('PageMode'), PDFName.of('UseNone'));
  return doc.save();
}
