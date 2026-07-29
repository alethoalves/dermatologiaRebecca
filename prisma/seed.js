// Executado via `npx prisma db seed` (carrega o .env automaticamente).
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

async function main() {
  const name = process.env.SEED_ADMIN_NAME;
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error('SEED_ADMIN_NAME, SEED_ADMIN_EMAIL e SEED_ADMIN_PASSWORD precisam estar definidos no .env');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await db.staffUser.upsert({
    where: { email },
    update: { name, passwordHash },
    create: { name, email, passwordHash, role: 'ADMIN' },
  });

  console.log(`StaffUser pronto: ${user.email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
