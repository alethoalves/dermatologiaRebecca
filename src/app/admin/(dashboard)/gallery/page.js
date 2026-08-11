import GalleryImageTable from '@/components/admin/GalleryImageTable/GalleryImageTable';
import { getAllGalleryImagesForAdmin } from '@/lib/gallery';

export const metadata = { title: 'Galeria | Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const images = await getAllGalleryImagesForAdmin();
  return <GalleryImageTable images={images} />;
}
