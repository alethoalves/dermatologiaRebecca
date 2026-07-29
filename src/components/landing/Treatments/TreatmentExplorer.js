'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { StaggerGroup, StaggerItem } from '@/components/motion/Stagger/Stagger';
import styles from './TreatmentExplorer.module.scss';

const EASE = [0.22, 1, 0.36, 1];

export default function TreatmentExplorer({ categories }) {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [activeTreatmentId, setActiveTreatmentId] = useState(categories[0].treatments[0].id);
  const panelRef = useRef(null);

  const activeCategory = categories.find((category) => category.id === activeCategoryId);
  const activeTreatment =
    activeCategory.treatments.find((treatment) => treatment.id === activeTreatmentId) || activeCategory.treatments[0];

  function handleCategoryChange(categoryId) {
    if (categoryId === activeCategoryId) return;
    const nextCategory = categories.find((category) => category.id === categoryId);
    setActiveCategoryId(categoryId);
    setActiveTreatmentId(nextCategory.treatments[0].id);
  }

  function handleTreatmentChange(treatmentId) {
    setActiveTreatmentId(treatmentId);
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.categoryTabs} role="tablist" aria-label="Categorias de tratamento">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={category.id === activeCategoryId}
            className={styles.categoryTab}
            data-active={category.id === activeCategoryId}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        <div className={styles.panel} ref={panelRef}>
          <div className={styles.panelImageWrap}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                className={styles.panelImageMotion}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Image
                  src={activeCategory.image}
                  alt={activeCategory.imageAlt || activeCategory.label}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className={styles.panelImage}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.panelBody} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTreatment.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <h3 className={styles.panelTitle}>{activeTreatment.title}</h3>
                <p className={styles.panelText}>{activeTreatment.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <StaggerGroup key={activeCategory.id} className={styles.list} as="ul">
          {activeCategory.treatments.map((treatment) => (
            <StaggerItem key={treatment.id} as="li">
              <button
                type="button"
                className={styles.listItem}
                data-active={treatment.id === activeTreatmentId}
                onClick={() => handleTreatmentChange(treatment.id)}
              >
                {treatment.id === activeTreatmentId && (
                  <motion.span layoutId="treatment-indicator" className={styles.indicator} transition={{ duration: 0.3, ease: EASE }} />
                )}
                <span className={styles.listItemLabel}>{treatment.title}</span>
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
