'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y, Keyboard } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './GallerySlider.module.scss';

const AUTOPLAY_DELAY = 5000;

export default function GallerySlider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = images[activeIndex];

  return (
    <div className={styles.wrap}>
      <div className={styles.viewportOuter}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
          className={styles.swiper}
          centeredSlides
          loop={images.length > 1}
          grabCursor
          speed={600}
          slidesPerView="auto"
          spaceBetween={16}
          keyboard={{ enabled: true }}
          navigation={
            images.length > 1
              ? { prevEl: `.${styles.arrowPrev}`, nextEl: `.${styles.arrowNext}` }
              : false
          }
          pagination={images.length > 1 ? { clickable: true, el: `.${styles.dots}`, bulletClass: styles.dot, bulletActiveClass: styles.dotActive } : false}
          autoplay={images.length > 1 ? { delay: AUTOPLAY_DELAY, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            768: { spaceBetween: 24 },
          }}
        >
          {images.map((image, i) => (
            <SwiperSlide
              key={image.id}
              className={styles.slide}
              style={{ aspectRatio: image.width && image.height ? `${image.width} / ${image.height}` : '4 / 3' }}
            >
              <div className={styles.frame}>
                <Image
                  src={image.imageUrl}
                  alt={image.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 560px, 80vw"
                  className={styles.image}
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {images.length > 1 && (
          <>
            <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} aria-label="Foto anterior">
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} aria-label="Próxima foto">
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      {current.caption && <p className={styles.caption}>{current.caption}</p>}

      {images.length > 1 && <div className={styles.dots} />}
    </div>
  );
}
