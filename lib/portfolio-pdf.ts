import { PDFDocument, PDFName, PDFString, rgb } from 'pdf-lib';
import type { PDFFont, PDFPage, RGB } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { Portfolio } from '../app/portfolio-data';

type Fonts = { regular: ArrayBuffer | Uint8Array; bold: ArrayBuffer | Uint8Array };
type TextOptions = { size?: number; bold?: boolean; color?: RGB; indent?: number; gap?: number; width?: number };

const WIDTH = 595.28;
const HEIGHT = 841.89;
const MARGIN = 44;
const BOTTOM = 60;
const CONTENT = WIDTH - MARGIN * 2;
const INK = rgb(.09, .09, .08);
const MUTED = rgb(.38, .38, .35);
const LINE = rgb(.82, .82, .78);
const ACCENT = rgb(.85, 1, .26);
const PAPER = rgb(246 / 255, 245 / 255, 240 / 255);
const PANEL = rgb(235 / 255, 233 / 255, 224 / 255);
const WHITE = rgb(1, 254 / 255, 250 / 255);

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
  let page!: PDFPage;
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
    page.drawRectangle({ x: 0, y: 0, width: WIDTH, height: HEIGHT, color: PAPER });
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
    const { size = 10, bold: isBold = false, indent = 0, gap = 4, width = CONTENT - indent } = options;
    return wrap(text, isBold ? bold : regular, size, width).length * size * 1.45 + gap;
  }

  function paragraph(text: string, options: TextOptions = {}) {
    const { size = 10, bold: isBold = false, color = INK, indent = 0, gap = 4, width = CONTENT - indent } = options;
    const font = isBold ? bold : regular;
    const lines = wrap(text, font, size, width);
    const height = lines.length * size * 1.45 + gap;
    // Keep normal paragraphs together, but allow unusually long future content to span pages.
    if (height < HEIGHT - 140) ensure(height);
    for (const line of lines) {
      ensure(size * 1.45);
      page.drawText(line, { x: MARGIN + indent, y: y - size, size, font, color });
      y -= size * 1.45;
    }
    y -= gap;
  }

  function heading(label: string, firstText = '') {
    ensure(27 + (firstText ? measure(firstText) : 20));
    y -= 7;
    page.drawRectangle({ x: MARGIN, y: y - 11, width: 4, height: 10, color: INK });
    paragraph(label, { size: 10.5, bold: true, indent: 11, gap: 7 });
  }

  // Measured panels keep the site's visual hierarchy without rasterizing text.
  function cards(groups: { label: string; items: string[] }[], fill = WHITE) {
    const gutter = 12;
    const width = (CONTENT - gutter * (groups.length - 1)) / groups.length;
    const options = { size: 10, width: width - 28, gap: 5 };
    const height = 37 + Math.max(...groups.map(group => group.items.reduce((sum, text) => sum + measure(text, options), 0)));
    // Future long content falls back to flowing sections rather than overflowing a card.
    if (height > HEIGHT - 150) {
      for (const group of groups) section(group.label, group.items);
      return;
    }
    ensure(height + 12);
    const top = y;
    groups.forEach((group, index) => {
      const indent = index * (width + gutter);
      page.drawRectangle({ x: MARGIN + indent, y: top - height, width, height, color: fill, borderColor: LINE, borderWidth: .6 });
      y = top - 11;
      paragraph(group.label, { bold: true, size: 10, indent: indent + 14, width: width - 28, gap: 7 });
      for (const text of group.items) paragraph(text, { ...options, indent: indent + 14 });
    });
    y = top - height - 12;
  }

  function tags(items: string[]) {
    const rows: { text: string; width: number }[][] = [[]];
    let used = 0;
    for (const item of items) {
      const width = regular.widthOfTextAtSize(clean(item), 8.5) + 20;
      if (used && used + width > CONTENT) { rows.push([]); used = 0; }
      rows[rows.length - 1].push({ text: clean(item), width });
      used += width + 6;
    }
    ensure(29 + rows.length * 27);
    heading('기술 스택');
    for (const row of rows) {
      let x = MARGIN;
      for (const item of row) {
        const radius = 10;
        page.drawRectangle({ x: x + radius, y: y - 21, width: item.width - 2 * radius, height: 20, color: PANEL });
        page.drawEllipse({ x: x + radius, y: y - 11, xScale: radius, yScale: radius, color: PANEL });
        page.drawEllipse({ x: x + item.width - radius, y: y - 11, xScale: radius, yScale: radius, color: PANEL });
        page.drawText(item.text, { x: x + 10, y: y - 14, font: regular, size: 8.5, color: INK });
        x += item.width + 6;
      }
      y -= 27;
    }
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
    page.drawRectangle({ x: MARGIN, y: y - height, width: 3, height, color: INK });
    page.drawText('주요 결과', { x: MARGIN + 12, y: y - 14, size: 8, font: regular, color: INK });
    for (const [index, line] of lines.entries()) page.drawText(line, {
      x: MARGIN + 12, y: y - 31 - index * 16, size: 10.5, font: bold, color: INK,
    });
    y -= height + 12;
  }

  function link(text: string, uri: string) {
    ensure(measure(text, { size: 9, gap: 3 }));
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
  y -= 7;
  paragraph('PORTFOLIO', { size: 57, bold: true, gap: 1 });
  page.drawRectangle({ x: MARGIN, y: y - 5, width: CONTENT, height: 7, color: ACCENT });
  y -= 24;
  paragraph(`${data.profile.name} | ${data.profile.role}`, { size: 15, bold: true, gap: 10 });
  paragraph(data.profile.intro, { size: 11, gap: 10 });
  paragraph(`${data.profile.company} · ${data.profile.position} | ${data.profile.period}`, { size: 10, bold: true });
  paragraph(`지원 분야: ${data.profile.target} / 주요 분야: ${data.profile.specialties}`, { size: 9, color: MUTED });
  cards([{ label: '경력 요약', items: data.careerHighlights }], PANEL);
  heading('기술', data.skills[0]?.join(' : '));
  for (const [category, items] of data.skills) {
    const height = Math.max(23, measure(items, { size: 9, width: CONTENT - 117, gap: 7 }));
    ensure(height);
    const top = y;
    paragraph(category, { size: 8.5, bold: true, width: 111, gap: 0 });
    y = top;
    paragraph(items, { size: 9, indent: 117, gap: 7 });
    y = top - height;
    page.drawLine({ start: { x: MARGIN, y: y + 3 }, end: { x: WIDTH - MARGIN, y: y + 3 }, color: LINE, thickness: .5 });
  }
  heading('학력', data.profile.education);
  paragraph(`${data.profile.education} · ${data.profile.educationStatus} | ${data.profile.educationPeriod}`, { size: 10 });
  heading('연락처 및 웹 포트폴리오', data.profile.email);
  link(data.profile.email, `mailto:${data.profile.email}`);
  link(data.profile.phone, data.profile.phoneHref);
  link(data.profile.siteUrl, data.profile.siteUrl);

  for (const [index, project] of data.projects.entries()) {
    context = project.title;
    newPage();
    page.drawRectangle({ x: MARGIN, y: y - 22, width: 85, height: 23, color: INK });
    page.drawText(`PROJECT ${String(index + 1).padStart(2, '0')}`, { x: MARGIN + 10, y: y - 14, font: bold, size: 9, color: ACCENT });
    page.drawText(clean(project.period), { x: MARGIN + 100, y: y - 14, font: regular, size: 9, color: MUTED });
    y -= 38;
    paragraph(project.title, { size: 23, bold: true, gap: 12 });
    const study = project.caseStudy;
    if (study) {
      if (study.outcomes.length) highlight(study.outcomes[0]);
      if (study.background) {
        cards([{ label: '프로젝트 범위', items: [study.background] }], PANEL);
      }
      if (study.history) section('리뉴얼 전 개발·개선', study.history);
      cards([
        { label: study.problemLabel ?? '기존 문제', items: study.problem },
        { label: '담당 범위', items: study.ownership },
      ]);
      if (study.flow?.length) {
        // Long renewal studies split at a section boundary, not before a short appendix.
        const flowHeight = 30 + study.flow.reduce((sum, text) => sum + measure(text, { indent: 34 }) + 8, 0);
        const tailHeight = 110 + (study.operations ?? []).concat(study.outcomes.slice(1))
          .reduce((sum, text) => sum + measure(text, { width: CONTENT - 28 }), 0);
        if (study.history?.length && y - flowHeight - tailHeight < BOTTOM) newPage(true);
        heading('처리 구조', study.flow[0]);
        for (const [step, text] of study.flow.entries()) {
          const guards = step === study.flow.length - 1 ? study.guardrails : undefined;
          const guardHeight = guards?.length ? 32 + guards.reduce((sum, guard) => sum + measure(guard, { size: 9.5, width: CONTENT - 62 }), 0) : 0;
          ensure(measure(text, { indent: 34 }) + guardHeight + 8);
          page.drawText(String(step + 1).padStart(2, '0'), { x: MARGIN, y: y - 10.5, size: 10.5, font: bold, color: MUTED });
          paragraph(text, { indent: 34 });
          if (guards?.length) {
            const top = y;
            page.drawRectangle({ x: MARGIN + 34, y: y - guardHeight, width: CONTENT - 34, height: guardHeight, color: PANEL });
            y -= 10;
            paragraph('코드 수정 조건', { bold: true, size: 9.5, indent: 48, width: CONTENT - 62 });
            for (const guard of guards) paragraph(guard, { size: 9.5, indent: 48, width: CONTENT - 62 });
            y = top - guardHeight - 3;
          }
          page.drawLine({ start: { x: MARGIN, y }, end: { x: WIDTH - MARGIN, y }, color: LINE, thickness: .5 });
          y -= 8;
        }
      }
      if (study.operations) cards([{ label: '운영 및 모니터링', items: study.operations }], PANEL);
      if (study.outcomes.length > 1) cards([{ label: '도입 결과', items: study.outcomes.slice(1) }], PANEL);
    } else {
      section('수행 업무', project.work);
      if (project.result) highlight(project.result);
    }
    tags(project.stack);
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
