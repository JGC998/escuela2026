// Script to create auth tables using the working Prisma client connection
// Run with: node create-auth-tables.js

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Creating auth tables via Prisma executeRaw...')

    // Create Role enum if it doesn't exist
    await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `)
    console.log('✓ Role enum')

    // Create User table
    await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT NOT NULL,
      "name" TEXT,
      "email" TEXT NOT NULL,
      "emailVerified" TIMESTAMP(3),
      "image" TEXT,
      "password" TEXT,
      "role" "Role" NOT NULL DEFAULT 'USER',
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    );
  `)
    await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
  `)
    console.log('✓ User table')

    // Create Account table
    await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Account" (
      "userId" TEXT NOT NULL,
      "type" TEXT NOT NULL,
      "provider" TEXT NOT NULL,
      "providerAccountId" TEXT NOT NULL,
      "refresh_token" TEXT,
      "access_token" TEXT,
      "expires_at" INTEGER,
      "token_type" TEXT,
      "scope" TEXT,
      "id_token" TEXT,
      "session_state" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
    );
  `)
    await prisma.$executeRawUnsafe(`
    ALTER TABLE "Account" DROP CONSTRAINT IF EXISTS "Account_userId_fkey";
    ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  `)
    console.log('✓ Account table')

    // Create Session table
    await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Session" (
      "sessionToken" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "expires" TIMESTAMP(3) NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken")
    );
  `)
    await prisma.$executeRawUnsafe(`
    ALTER TABLE "Session" DROP CONSTRAINT IF EXISTS "Session_userId_fkey";  
    ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  `)
    console.log('✓ Session table')

    // Create VerificationToken table
    await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "VerificationToken" (
      "identifier" TEXT NOT NULL,
      "token" TEXT NOT NULL,
      "expires" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
    );
  `)
    console.log('✓ VerificationToken table')

    console.log('\n✅ All auth tables created successfully!')
    console.log('\nNow you can create an ADMIN user:')
    console.log('  node create-admin.js')
}

main()
    .catch(e => {
        console.error('❌ Error:', e.message)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
