import { readFile, writeFile } from 'node:fs/promises';
import { portfolio } from '../app/portfolio-data.ts';
import { createPortfolioPdf } from '../lib/portfolio-pdf.ts';

const regular = await readFile(new URL('../public/fonts/NanumGothic-Regular.ttf', import.meta.url));
const bold = await readFile(new URL('../public/fonts/NanumGothic-Bold.ttf', import.meta.url));
const bytes = await createPortfolioPdf(portfolio, { regular, bold });
await writeFile(new URL('../public/portfolio.pdf', import.meta.url), bytes);
console.log(`Portfolio PDF generated (${bytes.length} bytes).`);
