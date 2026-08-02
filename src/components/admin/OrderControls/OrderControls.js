'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronUp, ChevronDown } from 'lucide-react';
import styles from './OrderControls.module.scss';

export default function OrderControls({ endpoint, isFirst, isLast }) {
  const router = useRouter();
  const [isMoving, setIsMoving] = useState(false);

  async function move(direction) {
    setIsMoving(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction }),
      });
      if (!res.ok) throw new Error('Falha ao reordenar');
      router.refresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsMoving(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.button}
        onClick={() => move('up')}
        disabled={isFirst || isMoving}
        aria-label="Mover para cima"
      >
        <ChevronUp size={16} strokeWidth={1.5} />
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={() => move('down')}
        disabled={isLast || isMoving}
        aria-label="Mover para baixo"
      >
        <ChevronDown size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
