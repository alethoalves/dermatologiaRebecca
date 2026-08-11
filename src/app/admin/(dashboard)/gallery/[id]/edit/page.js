import { notFound } from 'next/navigation';
import GalleryImageForm from '@/components/admin/GalleryImageForm/GalleryImageForm';
import { getGalleryImageById } from '@/lib/gallery';

export const metadata = { title: 'Editar imagem | Admin' };

export default async function EditGalleryImagePage({ params }) {
  const { id } = await params;
  const image = await getGalleryImageById(id);

  if (!image) notFound();

  return <GalleryImageForm image={image} />;
}
