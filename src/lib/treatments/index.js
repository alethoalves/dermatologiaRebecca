import { db } from '@/lib/db';
import { slugify } from '@/lib/slugify';
import { nextOrderValue, normalizeOrder, moveOrderedItem } from '@/lib/ordering';

async function ensureUniqueCategorySlug(baseSlug, excludeId) {
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await db.treatmentCategory.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }
}

async function ensureUniqueTreatmentSlug(baseSlug, excludeId) {
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await db.treatment.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }
}

export async function getTreatmentCategoriesForPublic() {
  return db.treatmentCategory.findMany({
    orderBy: { order: 'asc' },
    select: {
      id: true,
      slug: true,
      label: true,
      treatments: {
        orderBy: { order: 'asc' },
        select: { id: true, slug: true, title: true, description: true, imageUrl: true, imageAlt: true },
      },
    },
  });
}

export async function getAllTreatmentCategoriesForAdmin() {
  return db.treatmentCategory.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { treatments: true } } },
  });
}

export async function getTreatmentCategoryById(id) {
  return db.treatmentCategory.findUnique({
    where: { id },
    include: { treatments: { orderBy: { order: 'asc' } } },
  });
}

export async function createTreatmentCategory({ label, slug }) {
  const baseSlug = slugify(slug || label);
  const uniqueSlug = await ensureUniqueCategorySlug(baseSlug);

  return db.treatmentCategory.create({
    data: {
      label,
      slug: uniqueSlug,
      order: await nextOrderValue('treatmentCategory'),
    },
  });
}

export async function updateTreatmentCategory(id, { label, slug }) {
  const current = await db.treatmentCategory.findUnique({ where: { id } });
  if (!current) throw new Error('Categoria não encontrada');

  const baseSlug = slugify(slug || current.slug);
  const uniqueSlug = baseSlug === current.slug ? current.slug : await ensureUniqueCategorySlug(baseSlug, id);

  return db.treatmentCategory.update({
    where: { id },
    data: {
      label,
      slug: uniqueSlug,
    },
  });
}

export async function deleteTreatmentCategory(id) {
  await db.treatmentCategory.delete({ where: { id } });
  await normalizeOrder('treatmentCategory');
}

export async function moveTreatmentCategory(id, direction) {
  await moveOrderedItem('treatmentCategory', id, direction);
}

export async function getTreatmentById(id) {
  return db.treatment.findUnique({ where: { id } });
}

export async function getTreatmentsByCategoryId(categoryId) {
  return db.treatment.findMany({ where: { categoryId }, orderBy: { order: 'asc' } });
}

export async function getAllTreatmentsForAdmin() {
  return db.treatment.findMany({
    include: { category: { select: { id: true, label: true } } },
    orderBy: [{ category: { order: 'asc' } }, { order: 'asc' }],
  });
}

export async function createTreatment({ categoryId, title, slug, description, imageUrl, imageAlt }) {
  const category = await db.treatmentCategory.findUnique({ where: { id: categoryId } });
  if (!category) throw new Error('Categoria não encontrada');

  const baseSlug = slugify(slug || title);
  const uniqueSlug = await ensureUniqueTreatmentSlug(baseSlug);

  return db.treatment.create({
    data: {
      title,
      slug: uniqueSlug,
      description,
      imageUrl: imageUrl || null,
      imageAlt: imageAlt || null,
      categoryId,
      order: await nextOrderValue('treatment', { categoryId }),
    },
  });
}

export async function updateTreatment(id, { categoryId, title, slug, description, imageUrl, imageAlt }) {
  const current = await db.treatment.findUnique({ where: { id } });
  if (!current) throw new Error('Tratamento não encontrado');

  const baseSlug = slugify(slug || current.slug);
  const uniqueSlug = baseSlug === current.slug ? current.slug : await ensureUniqueTreatmentSlug(baseSlug, id);

  const categoryChanged = !!categoryId && categoryId !== current.categoryId;
  if (categoryChanged) {
    const category = await db.treatmentCategory.findUnique({ where: { id: categoryId } });
    if (!category) throw new Error('Categoria não encontrada');
  }

  const updated = await db.treatment.update({
    where: { id },
    data: {
      title,
      slug: uniqueSlug,
      description,
      imageUrl: imageUrl || null,
      imageAlt: imageAlt || null,
      ...(categoryChanged ? { categoryId, order: await nextOrderValue('treatment', { categoryId }) } : {}),
    },
  });

  if (categoryChanged) {
    await normalizeOrder('treatment', { categoryId: current.categoryId });
  }

  return updated;
}

export async function deleteTreatment(id) {
  const current = await db.treatment.findUnique({ where: { id } });
  if (!current) throw new Error('Tratamento não encontrado');

  await db.treatment.delete({ where: { id } });
  await normalizeOrder('treatment', { categoryId: current.categoryId });
}

export async function moveTreatment(id, direction) {
  const current = await db.treatment.findUnique({ where: { id } });
  if (!current) throw new Error('Tratamento não encontrado');

  await moveOrderedItem('treatment', id, direction, { categoryId: current.categoryId });
}
