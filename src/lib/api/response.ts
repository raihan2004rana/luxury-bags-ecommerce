import 'server-only';

import { NextResponse } from 'next/server';

import { API_DEFAULTS } from '@/config/constants';
import { AppError, normalizeError } from '@/lib/api/errors';
import type {
  ApiErrorResponse,
  ApiResponseMeta,
  ApiSuccessResponse,
  PaginationMeta,
} from '@/types/api';

function buildMeta(requestId?: string, pagination?: PaginationMeta): ApiResponseMeta {
  return {
    requestId: requestId ?? crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...(pagination ? { pagination } : {}),
  };
}

function buildHeaders(requestId: string, headers?: HeadersInit): Headers {
  const responseHeaders = new Headers(headers);
  responseHeaders.set(API_DEFAULTS.REQUEST_ID_HEADER, requestId);
  return responseHeaders;
}

export function apiSuccess<TData>(
  data: TData,
  options?: {
    readonly status?: number;
    readonly requestId?: string;
    readonly headers?: HeadersInit;
  },
): NextResponse<ApiSuccessResponse<TData>> {
  const meta = buildMeta(options?.requestId);
  return NextResponse.json(
    {
      success: true,
      data,
      meta,
    },
    {
      status: options?.status ?? 200,
      headers: buildHeaders(meta.requestId, options?.headers),
    },
  );
}

export function apiCreated<TData>(
  data: TData,
  options?: {
    readonly requestId?: string;
    readonly headers?: HeadersInit;
  },
): NextResponse<ApiSuccessResponse<TData>> {
  return apiSuccess(data, {
    status: 201,
    requestId: options?.requestId,
    headers: options?.headers,
  });
}

export function apiPaginated<TItem>(
  items: readonly TItem[],
  pagination: Omit<PaginationMeta, 'totalPages' | 'hasNextPage' | 'hasPreviousPage'>,
  options?: {
    readonly requestId?: string;
    readonly headers?: HeadersInit;
  },
): NextResponse<ApiSuccessResponse<readonly TItem[]>> {
  const totalPages = Math.max(1, Math.ceil(pagination.totalItems / pagination.pageSize));
  const fullPagination: PaginationMeta = {
    ...pagination,
    totalPages,
    hasNextPage: pagination.page < totalPages,
    hasPreviousPage: pagination.page > 1,
  };
  const meta = buildMeta(options?.requestId, fullPagination);

  return NextResponse.json(
    {
      success: true,
      data: items,
      meta,
    },
    {
      status: 200,
      headers: buildHeaders(meta.requestId, options?.headers),
    },
  );
}

export function apiError(
  error: unknown,
  options?: {
    readonly requestId?: string;
    readonly headers?: HeadersInit;
  },
): NextResponse<ApiErrorResponse> {
  const normalized = error instanceof AppError ? error : normalizeError(error);
  const meta = buildMeta(options?.requestId);

  return NextResponse.json(
    {
      success: false,
      error: {
        code: normalized.code,
        message: normalized.message,
        ...(normalized.details ? { details: normalized.details } : {}),
      },
      meta,
    },
    {
      status: normalized.statusCode,
      headers: buildHeaders(meta.requestId, options?.headers),
    },
  );
}
