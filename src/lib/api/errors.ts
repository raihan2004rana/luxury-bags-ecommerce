import 'server-only';

import { MongoServerError } from 'mongodb';
import { ZodError } from 'zod';

import type { ApiErrorCode } from '@/types/api';

export interface AppErrorOptions {
  readonly code: ApiErrorCode;
  readonly statusCode: number;
  readonly details?: Record<string, readonly string[]>;
  readonly cause?: unknown;
  readonly isOperational?: boolean;
}

/**
 * Base application error carrying HTTP status, machine-readable code, and safe client details.
 */
export class AppError extends Error {
  public readonly code: ApiErrorCode;
  public readonly statusCode: number;
  public readonly details?: Record<string, readonly string[]>;
  public readonly isOperational: boolean;

  constructor(message: string, options: AppErrorOptions) {
    super(message, { cause: options.cause });
    this.name = new.target.name;
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.details = options.details;
    this.isOperational = options.isOperational ?? true;
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Invalid request.', details?: Record<string, readonly string[]>) {
    super(message, { code: 'BAD_REQUEST', statusCode: 400, details });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication is required.') {
    super(message, { code: 'UNAUTHORIZED', statusCode: 401 });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to perform this action.') {
    super(message, { code: 'FORBIDDEN', statusCode: 403 });
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'The requested resource was not found.') {
    super(message, { code: 'NOT_FOUND', statusCode: 404 });
  }
}

export class ConflictError extends AppError {
  constructor(message = 'A resource conflict occurred.') {
    super(message, { code: 'CONFLICT', statusCode: 409 });
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed.', details?: Record<string, readonly string[]>) {
    super(message, { code: 'VALIDATION_ERROR', statusCode: 422, details });
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please try again shortly.') {
    super(message, { code: 'RATE_LIMITED', statusCode: 429 });
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = 'An upstream service error occurred.', cause?: unknown) {
    super(message, { code: 'EXTERNAL_SERVICE_ERROR', statusCode: 502, cause });
  }
}

export class ConfigurationError extends AppError {
  constructor(message = 'Server configuration is incomplete.', cause?: unknown) {
    super(message, {
      code: 'CONFIGURATION_ERROR',
      statusCode: 500,
      cause,
      isOperational: false,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'An unexpected server error occurred.', cause?: unknown) {
    super(message, {
      code: 'INTERNAL_SERVER_ERROR',
      statusCode: 500,
      cause,
      isOperational: false,
    });
  }
}

function formatZodIssues(error: ZodError): Record<string, readonly string[]> {
  const details: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const path = issue.path.length > 0 ? issue.path.join('.') : '_root';
    const existing = details[path] ?? [];
    existing.push(issue.message);
    details[path] = existing;
  }
  return details;
}

/**
 * Converts arbitrary thrown values into a safe, predictable `AppError`.
 * Internal details from unknown errors are intentionally masked from API consumers.
 */
export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new ValidationError('Input validation failed.', formatZodIssues(error));
  }

  if (error instanceof MongoServerError && error.code === 11000) {
    return new ConflictError('A record with the provided unique value already exists.');
  }

  return new InternalServerError('An unexpected server error occurred.', error);
}
