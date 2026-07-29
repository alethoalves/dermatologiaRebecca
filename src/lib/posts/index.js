import { db } from '@/lib/db';
import { slugify } from '@/lib/slugify';

export async function getPublishedPosts({ page = 1, perPage = 9 } = {}) {
  const skip = (page - 1) * perPage;
  const [posts, total] = await Promise.all([
    db.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: perPage,
    }),
    db.post.count({ where: { status: 'PUBLISHED' } }),
  ]);
  return { posts, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

export async function getLatestPublishedPosts(limit = 3) {
  return db.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: limit,
  });
}

export async function getPostBySlug(slug) {
  return db.post.findFirst({ where: { slug, status: 'PUBLISHED' } });
}

export async function getPostById(id) {
  return db.post.findUnique({ where: { id } });
}

export async function getAllPostsForAdmin({ status } = {}) {
  return db.post.findMany({
    where: status ? { status } : undefined,
    orderBy: { updatedAt: 'desc' },
    include: { author: { select: { name: true } } },
  });
}

async function ensureUniqueSlug(baseSlug, excludeId) {
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await db.post.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }
}

export async function createPost({ title, slug, excerpt, coverImageUrl, contentHtml, status, seoDescription, authorId }) {
  const baseSlug = slugify(slug || title);
  const uniqueSlug = await ensureUniqueSlug(baseSlug);

  return db.post.create({
    data: {
      title,
      slug: uniqueSlug,
      excerpt,
      coverImageUrl,
      contentHtml,
      seoDescription,
      authorId,
      status: status ?? 'DRAFT',
      publishedAt: status === 'PUBLISHED' ? new Date() : null,
    },
  });
}

export async function updatePost(id, { title, slug, excerpt, coverImageUrl, contentHtml, status, seoDescription }) {
  const current = await db.post.findUnique({ where: { id } });
  if (!current) throw new Error('Post não encontrado');

  const baseSlug = slugify(slug || current.slug);
  const uniqueSlug = baseSlug === current.slug ? current.slug : await ensureUniqueSlug(baseSlug, id);
  const becomingPublished = status === 'PUBLISHED' && current.status !== 'PUBLISHED';

  return db.post.update({
    where: { id },
    data: {
      title,
      slug: uniqueSlug,
      excerpt,
      coverImageUrl,
      contentHtml,
      seoDescription,
      status,
      publishedAt: becomingPublished ? new Date() : current.publishedAt,
    },
  });
}

export async function deletePost(id) {
  return db.post.delete({ where: { id } });
}
