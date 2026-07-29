import Image from 'next/image';

const SOURCES = {
  horizontal: {
    ink: { src: '/images/brand/logo-horizontal-ink.png', width: 3237, height: 926 },
    cream: { src: '/images/brand/logo-horizontal-cream.png', width: 3237, height: 926 },
  },
  monogram: {
    ink: { src: '/images/brand/logo-monogram-ink.png', width: 911, height: 926 },
    cream: { src: '/images/brand/logo-monogram-cream.png', width: 911, height: 926 },
  },
};

export default function Logo({ type = 'horizontal', tone = 'ink', height = 40, priority = false, className = '' }) {
  const asset = SOURCES[type][tone];
  const width = Math.round((asset.width / asset.height) * height);

  return (
    <Image
      src={asset.src}
      alt="Rebecca Perez de Amorim — Dermatologista"
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ height: 'auto', width: '100%' }}
    />
  );
}
