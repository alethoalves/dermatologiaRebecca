import { db } from '@/lib/db';
import { nextOrderValue, normalizeOrder, moveOrderedItem } from '@/lib/ordering';

export async function getGalleryImagesForPublic() {
  return db.galleryImage.findMany({
    orderBy: { order: 'asc' },
    select: { id: true, imageUrl: true, imageAlt: true, caption: true, width: true, height: true },
  });
}

export async function getAllGalleryImagesForAdmin() {
  return db.galleryImage.findMany({ orderBy: { order: 'asc' } });
}

export async function getGalleryImageById(id) {
  return db.galleryImage.findUnique({ where: { id } });
}

export async function createGalleryImage({ imageUrl, caption, width, height }) {
  return db.galleryImage.create({
    data: {
      imageUrl,
      caption,
      imageAlt: caption,
      width: width || null,
      height: height || null,
      order: await nextOrderValue('galleryImage'),
    },
  });
}

export async function updateGalleryImage(id, { imageUrl, caption, width, height }) {
  const current = await db.galleryImage.findUnique({ where: { id } });
  if (!current) throw new Error('Imagem não encontrada');

  return db.galleryImage.update({
    where: { id },
    data: {
      imageUrl,
      caption,
      imageAlt: caption,
      width: width || current.width,
      height: height || current.height,
    },
  });
}

export async function deleteGalleryImage(id) {
  await db.galleryImage.delete({ where: { id } });
  await normalizeOrder('galleryImage');
}

export async function moveGalleryImage(id, direction) {
  await moveOrderedItem('galleryImage', id, direction);
}
