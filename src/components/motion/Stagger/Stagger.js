'use client';

import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function StaggerGroup({ children, className, as = 'div' }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = 'div' }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
