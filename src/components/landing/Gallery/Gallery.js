import Container from '@/components/ui/Container/Container';
import Reveal from '@/components/motion/Reveal/Reveal';
import GallerySlider from './GallerySlider';
import { getGalleryImagesForPublic } from '@/lib/gallery';
import styles from './Gallery.module.scss';

export default async function Gallery() {
  const images = await getGalleryImagesForPublic();

  if (images.length === 0) return null;

  return (
    <section id="galeria" className={styles.section}>
      <Container>
        <Reveal>
          <GallerySlider images={images} />
        </Reveal>
      </Container>
    </section>
  );
}
