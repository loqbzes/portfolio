import { portfolio } from '../../portfolio-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(portfolio, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
