import 'server-only';

import type { NextRequest, NextResponse } from 'next/server';

import { API_DEFAULTS } from '@/config/constants';
import { normalizeError } from '@/lib/api/errors';
import { apiError } from '@/lib/api/response';

export interface ApiHandlerContext<TParams = Record<string, string>> {
  readonly requestId: string;
  readonly params: Promise<TParams>;
}

export type RouteHandler<TParams = Record<string, string>> = (
  request: NextRequest,
  context: ApiHandlerContext<TParams>,
) => Promise<NextResponse>;

/**
 * Wraps Next.js App Router API handlers with request ID correlation and centralized error handling.
 */
export function withApiHandler<TParams = Record<string, string>>(
  handler: RouteHandler<TParams>,
): (request: NextRequest, context: { params: Promise<TParams> }) => Promise<NextResponse> {
  return async (request, routeContext) => {
    const requestId = request.headers.get(API_DEFAULTS.REQUEST_ID_HEADER) ?? crypto.randomUUID();

    try {
      const response = await handler(request, {
        requestId,
        params: routeContext.params,
      });

      if (!response.headers.has(API_DEFAULTS.REQUEST_ID_HEADER)) {
        response.headers.set(API_DEFAULTS.REQUEST_ID_HEADER, requestId);
      }
      return response;
    } catch (error: unknown) {
      const normalized = normalizeError(error);

      if (!normalized.isOperational || normalized.statusCode >= 500) {
        console.error(`[API][${requestId}] ${request.method} ${request.nextUrl.pathname}`, {
          code: normalized.code,
          message: normalized.message,
          cause: normalized.cause ?? error,
        });
      }

      return apiError(normalized, { requestId });
    }
  };
}
