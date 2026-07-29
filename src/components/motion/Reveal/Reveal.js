'use client';

import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];

export default function Reveal({ children, className, delay = 0, x = 0, y = 24, once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
