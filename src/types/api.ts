export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'EXTERNAL_SERVICE_ERROR'
  | 'CONFIGURATION_ERROR'
  | 'INTERNAL_SERVER_ERROR';

export interface PaginationMeta {
  readonly page: number;
  readonly pageSize: number;
  readonly totalItems: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export interface ApiResponseMeta {
  readonly requestId: string;
  readonly timestamp: string;
  readonly pagination?: PaginationMeta;
}

export interface ApiErrorDetail {
  readonly code: ApiErrorCode;
  readonly message: string;
  readonly details?: Record<string, readonly string[]>;
}

export interface ApiSuccessResponse<TData> {
  readonly success: true;
  readonly data: TData;
  readonly meta: ApiResponseMeta;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly error: ApiErrorDetail;
  readonly meta: ApiResponseMeta;
}

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;
