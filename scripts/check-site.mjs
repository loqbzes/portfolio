import assert from 'node:assert/strict';
import { portfolio } from '../app/portfolio-data.ts';

const origin = process.argv[2] ?? 'http://localhost:3000';
const response = await fetch(origin);
assert(response.ok, `Page HTTP ${response.status}`);
const html = await response.text();
const articles = [...html.matchAll(/<article class="project">([\s\S]*?)<\/article>/g)].map(match => match[1]);
assert.equal(articles.length, portfolio.projects.length);
assert.equal(articles.length, 6);
assert(articles.slice(0, 5).every(article => article.includes('class="project-highlight"')));
const game = articles.at(-1);
for (const text of ['겨울의 안쪽 / Inside Winter', '개인 프로젝트', '2026.09 — 개발 중', '덱빌딩', 'Codex를 활용해', '주요 기여', '현재 상태', '상용화를 위한 행정 절차', ...portfolio.projects.at(-1).caseStudy.flowTitles]) {
  assert(game.includes(text), `Missing game content: ${text}`);
}
assert(!game.includes('project-highlight'));
assert(!game.includes('도입 결과'));
assert(!game.includes('정식 출시 전 안정화'));
assert.equal((game.match(/class="flow-step"/g) ?? []).length, 5);
assert.equal((html.match(/PDF 다운로드/g) ?? []).length, 1);
const api = await fetch(`${origin}/api/portfolio`, { cache: 'no-store' });
assert(api.ok);
assert(api.headers.get('cache-control')?.includes('no-store'));
assert.deepEqual(await api.json(), portfolio);
console.log('PASS: six projects, approved game copy, no game highlight, footer PDF button, and latest PDF source API.');
