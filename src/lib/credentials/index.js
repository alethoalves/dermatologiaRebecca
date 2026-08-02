import { db } from '@/lib/db';
import { nextOrderValue, normalizeOrder, moveOrderedItem } from '@/lib/ordering';

export async function getAllCredentials() {
  return db.credential.findMany({ orderBy: { order: 'asc' } });
}

export async function createCredential({ label }) {
  return db.credential.create({
    data: {
      label,
      order: await nextOrderValue('credential'),
    },
  });
}

export async function updateCredential(id, { label }) {
  return db.credential.update({ where: { id }, data: { label } });
}

export async function deleteCredential(id) {
  await db.credential.delete({ where: { id } });
  await normalizeOrder('credential');
}

export async function moveCredential(id, direction) {
  await moveOrderedItem('credential', id, direction);
}
