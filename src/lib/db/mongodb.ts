import 'server-only';

import {
  type Collection,
  type Db,
  type Document,
  MongoClient,
  type MongoClientOptions,
} from 'mongodb';

import { DATABASE_DEFAULTS } from '@/config/constants';
import { getServerEnv, requireServerEnv } from '@/lib/env/server';

declare global {
  var __lumeMongoClientPromise: Promise<MongoClient> | undefined;
}

const mongoClientOptions: MongoClientOptions = {
  maxPoolSize: DATABASE_DEFAULTS.MAX_POOL_SIZE,
  minPoolSize: DATABASE_DEFAULTS.MIN_POOL_SIZE,
  serverSelectionTimeoutMS: DATABASE_DEFAULTS.SERVER_SELECTION_TIMEOUT_MS,
  connectTimeoutMS: DATABASE_DEFAULTS.CONNECT_TIMEOUT_MS,
};

let productionClientPromise: Promise<MongoClient> | undefined;

function createClientPromise(): Promise<MongoClient> {
  const uri = requireServerEnv('MONGODB_URI');
  const client = new MongoClient(uri, mongoClientOptions);
  return client.connect();
}

/**
 * Checks whether a MongoDB connection string is configured in the server environment.
 */
export function isDatabaseConfigured(): boolean {
  return Boolean(getServerEnv().MONGODB_URI);
}

/**
 * Returns a shared, pooled MongoDB client instance.
 * Caches the connection promise across Next.js HMR reloads in development.
 */
export async function getMongoClient(): Promise<MongoClient> {
  const { NODE_ENV } = getServerEnv();

  if (NODE_ENV === 'development') {
    if (!globalThis.__lumeMongoClientPromise) {
      globalThis.__lumeMongoClientPromise = createClientPromise().catch((error: unknown) => {
        globalThis.__lumeMongoClientPromise = undefined;
        throw error;
      });
    }
    return globalThis.__lumeMongoClientPromise;
  }

  if (!productionClientPromise) {
    productionClientPromise = createClientPromise().catch((error: unknown) => {
      productionClientPromise = undefined;
      throw error;
    });
  }

  return productionClientPromise;
}

/**
 * Returns the configured MongoDB database instance.
 */
export async function getDatabase(dbName?: string): Promise<Db> {
  const client = await getMongoClient();
  const targetDb = dbName ?? getServerEnv().MONGODB_DB_NAME;
  return client.db(targetDb);
}

/**
 * Returns a typed MongoDB collection handle.
 */
export async function getCollection<TSchema extends Document = Document>(
  collectionName: string,
  dbName?: string,
): Promise<Collection<TSchema>> {
  const db = await getDatabase(dbName);
  return db.collection<TSchema>(collectionName);
}

/**
 * Verifies live database connectivity via an admin ping command.
 */
export async function pingDatabase(): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return false;
  }
  const db = await getDatabase();
  await db.command({ ping: 1 });
  return true;
}
