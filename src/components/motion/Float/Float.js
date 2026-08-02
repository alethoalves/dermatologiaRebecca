'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];

export default function Float({
  children,
  className,
  delay = 0,
  y = 12,
  floatDistance = 8,
  floatDuration = 3,
}) {
  const [floating, setFloating] = useState(false);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={!floating ? { opacity: 1, y: 0 } : undefined}
      animate={floating ? { opacity: 1, y: [0, -floatDistance, 0] } : undefined}
      viewport={{ once: true, margin: '-80px' }}
      transition={
        floating
          ? { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0.6, delay, ease: EASE }
      }
      onAnimationComplete={() => setFloating(true)}
    >
      {children}
    </motion.div>
  );
}
