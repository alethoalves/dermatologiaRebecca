import { db } from '@/lib/db';

export async function nextOrderValue(modelName, where = {}) {
  const result = await db[modelName].aggregate({ where, _max: { order: true } });
  return (result._max.order ?? -1) + 1;
}

export async function normalizeOrder(modelName, where = {}) {
  const items = await db[modelName].findMany({
    where,
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: { id: true },
  });

  await db.$transaction(items.map((item, index) => db[modelName].update({ where: { id: item.id }, data: { order: index } })));
}

export async function moveOrderedItem(modelName, id, direction, where = {}) {
  if (direction !== 'up' && direction !== 'down') {
    throw new Error('Direção inválida');
  }

  const items = await db[modelName].findMany({
    where,
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: { id: true },
  });

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) throw new Error('Item não encontrado');

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= items.length) return;

  const reordered = [...items];
  [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];

  await db.$transaction(
    reordered.map((item, i) => db[modelName].update({ where: { id: item.id }, data: { order: i } }))
  );
}
