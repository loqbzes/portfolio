import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { portfolio } from '../app/portfolio-data.ts';
import { createPortfolioPdf } from '../lib/portfolio-pdf.ts';

const python = process.argv[2] ?? 'python';
const verifier = fileURLToPath(new URL('./verify-pdf.py', import.meta.url));
function verify(path, data) {
  const result = spawnSync(python, [verifier], { input: JSON.stringify({ path, data }), encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  console.log(result.stdout.trim());
}
verify(fileURLToPath(new URL('../public/portfolio.pdf', import.meta.url)), portfolio);

// A fresh input must reach the generated PDF without relying on the saved download.
const latest = structuredClone(portfolio);
latest.profile.name = '최신 내용 반영 확인';
latest.projects[0].caseStudy.outcomes[0] = '실시간으로 전달된 새로운 프로젝트 결과';
const regular = await readFile(new URL('../public/fonts/NanumGothic-Regular.ttf', import.meta.url));
const bold = await readFile(new URL('../public/fonts/NanumGothic-Bold.ttf', import.meta.url));
const bytes = await createPortfolioPdf(latest, { regular, bold });
assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), '%PDF-');
const directory = new URL('../outputs/pdf-review/', import.meta.url);
await mkdir(directory, { recursive: true });
const output = new URL('fresh-content-test.pdf', directory);
await writeFile(output, bytes);
verify(fileURLToPath(output), latest);
