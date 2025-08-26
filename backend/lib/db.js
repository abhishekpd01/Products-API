// lib/db.js
let PrismaClient;

try {
  // Try ES module import first
  const prismaModule = await import('@prisma/client');
  PrismaClient = prismaModule.PrismaClient;
} catch (error) {
  // Fallback to CommonJS require
  const { createRequire } = await import('module');
  const require = createRequire(import.meta.url);
  ({ PrismaClient } = require('@prisma/client'));
}

const prisma = new PrismaClient();

export default prisma;