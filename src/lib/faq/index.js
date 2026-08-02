import { db } from '@/lib/db';
import { slugify } from '@/lib/slugify';
import { nextOrderValue, normalizeOrder, moveOrderedItem } from '@/lib/ordering';

async function ensureUniqueSlug(baseSlug, excludeId) {
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await db.faqItem.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }
}

export async function getFaqItemsForPublic() {
  return db.faqItem.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, slug: true, question: true, answer: true },
  });
}

export async function getAllFaqItemsForAdmin() {
  return db.faqItem.findMany({ orderBy: { order: 'asc' } });
}

export async function getFaqItemById(id) {
  return db.faqItem.findUnique({ where: { id } });
}

export async function createFaqItem({ question, answer, slug }) {
  const baseSlug = slugify(slug || question);
  const uniqueSlug = await ensureUniqueSlug(baseSlug);

  return db.faqItem.create({
    data: {
      question,
      answer,
      slug: uniqueSlug,
      order: await nextOrderValue('faqItem'),
    },
  });
}

export async function updateFaqItem(id, { question, answer, slug }) {
  const current = await db.faqItem.findUnique({ where: { id } });
  if (!current) throw new Error('Pergunta não encontrada');

  const baseSlug = slugify(slug || current.slug);
  const uniqueSlug = baseSlug === current.slug ? current.slug : await ensureUniqueSlug(baseSlug, id);

  return db.faqItem.update({
    where: { id },
    data: { question, answer, slug: uniqueSlug },
  });
}

export async function deleteFaqItem(id) {
  await db.faqItem.delete({ where: { id } });
  await normalizeOrder('faqItem');
}

export async function moveFaqItem(id, direction) {
  await moveOrderedItem('faqItem', id, direction);
}
