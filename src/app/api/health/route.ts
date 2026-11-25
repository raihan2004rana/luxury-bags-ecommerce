import { siteConfig } from '@/config/site';
import { withApiHandler } from '@/lib/api/handler';
import { apiSuccess } from '@/lib/api/response';
import { isDatabaseConfigured, pingDatabase } from '@/lib/db/mongodb';

type DatabaseStatus = 'connected' | 'unconfigured' | 'unreachable';

export const dynamic = 'force-dynamic';

export const GET = withApiHandler(async (_request, { requestId }) => {
  let database: DatabaseStatus = 'unconfigured';

  if (isDatabaseConfigured()) {
    try {
      const ok = await pingDatabase();
      database = ok ? 'connected' : 'unreachable';
    } catch {
      database = 'unreachable';
    }
  }

  return apiSuccess(
    {
      status: 'ok',
      service: siteConfig.name,
      database,
    },
    { requestId },
  );
});
