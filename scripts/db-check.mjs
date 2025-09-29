#!/usr/bin/env node

// Simple MongoDB health check using the native driver (no TS import needed)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';

// Resolve project root regardless of where this script is run from
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load environment variables from .env.local then .env if present (optional)
try {
  const { config } = await import('dotenv');
  const envLocalPath = path.join(projectRoot, '.env.local');
  const envPath = path.join(projectRoot, '.env');
  config({ path: envLocalPath });
  config({ path: envPath });
} catch (_) {
  // dotenv is optional; ignore if not installed
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('[db-check] ERROR - MONGODB_URI is not set in environment');
    process.exit(1);
  }

  const masked = maskMongoUri(uri);
  let client;
  try {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(`[db-check] OK - Connected to MongoDB (${masked})`);
    process.exit(0);
  } catch (err) {
    console.error(`[db-check] ERROR - Failed to connect to MongoDB (${masked})`);
    console.error(err?.stack || err?.message || String(err));
    process.exit(1);
  } finally {
    if (client) {
      try { await client.close(); } catch (_) {}
    }
  }
}

function maskMongoUri(uri) {
  try {
    const u = new URL(uri);
    if (u.username || u.password) {
      u.password = u.password ? '***' : '';
      u.username = u.username ? '***' : '';
      return u.toString();
    }
  } catch (_) {}
  return uri.replace(/:[^@]*@/, ':***@');
}

await main();


