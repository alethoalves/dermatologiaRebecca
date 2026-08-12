import Image from 'next/image';

const HORIZONTAL_LOGO_SRC = '/images/brand/logo-final.svg';
const HORIZONTAL_ASPECT_RATIO = 3378 / 954;

const TONE_COLOR = {
  ink: 'var(--color-ink)',
  cream: 'var(--color-cream)',
};

const MONOGRAM_SOURCES = {
  ink: { src: '/images/brand/logo-monogram-ink.png', width: 911, height: 926 },
  cream: { src: '/images/brand/logo-monogram-cream.png', width: 911, height: 926 },
};

const ALT_TEXT = 'Rebecca Perez de Amorim Mileo — Dermatologista';

export default function Logo({ type = 'horizontal', tone = 'ink', height = 40, priority = false, className = '' }) {
  if (type === 'monogram') {
    const asset = MONOGRAM_SOURCES[tone];
    const width = Math.round((asset.width / asset.height) * height);

    return (
      <Image
        src={asset.src}
        alt={ALT_TEXT}
        width={width}
        height={height}
        priority={priority}
        className={className}
        style={{ height: 'auto', width: '100%' }}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={ALT_TEXT}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        aspectRatio: HORIZONTAL_ASPECT_RATIO,
        backgroundColor: TONE_COLOR[tone],
        WebkitMaskImage: `url(${HORIZONTAL_LOGO_SRC})`,
        maskImage: `url(${HORIZONTAL_LOGO_SRC})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  );
}
