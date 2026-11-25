import type { ObjectId } from 'mongodb';

export const COLLECTION_NAMES = {
  USERS: 'users',
  PRODUCTS: 'products',
  COLLECTIONS: 'collections',
  CARTS: 'carts',
  ORDERS: 'orders',
} as const;

export type CollectionName = (typeof COLLECTION_NAMES)[keyof typeof COLLECTION_NAMES];

export interface BaseDocument {
  readonly _id: ObjectId;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
