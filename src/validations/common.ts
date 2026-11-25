import { z } from 'zod';

import { API_DEFAULTS } from '@/config/constants';

export const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[a-fA-F0-9]{24}$/, 'Must be a valid 24-character ObjectId');

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(API_DEFAULTS.DEFAULT_PAGE),
  pageSize: z.coerce
    .number()
    .int()
    .min(1)
    .max(API_DEFAULTS.MAX_PAGE_SIZE)
    .default(API_DEFAULTS.DEFAULT_PAGE_SIZE),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
