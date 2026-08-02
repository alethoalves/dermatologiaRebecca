import { MapPin, Clock } from 'lucide-react';
import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import Reveal from '@/components/motion/Reveal/Reveal';
import { getClinicsForPublic, parseHours, buildMapSrc } from '@/lib/clinics';
import LocationTabs from './LocationTabs';
import styles from './Location.module.scss';

export default async function Location() {
  const clinics = await getClinicsForPublic();

  if (clinics.length === 0) return null;

  const single = clinics.length === 1 ? clinics[0] : null;

  return (
    <section id="localizacao" className={styles.section}>
      <Container>
        {single ? (
          <div className={styles.grid}>
            <Reveal className={styles.body}>
              <SectionHeading kicker={single.name} title={`${single.neighborhood}, ${single.city}`} />

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <MapPin size={20} strokeWidth={1.5} className={styles.infoIcon} />
                  <div>
                    <div className={styles.infoLabel}>Endereço</div>
                    <div className={styles.infoValue}>
                      {single.address} — CEP {single.zip}
                    </div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Clock size={20} strokeWidth={1.5} className={styles.infoIcon} />
                  <div>
                    <div className={styles.infoLabel}>Horário de funcionamento</div>
                    <div className={styles.hours}>
                      {parseHours(single.hours).map((h) => (
                        <span key={h.label} className={styles.infoValue}>
                          {h.label}: {h.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {single.note && <p className={styles.note}>{single.note}</p>}

              <WhatsAppButton variant="primary" />
            </Reveal>

            <Reveal delay={0.1} className={styles.mapWrap}>
              <iframe
                className={styles.map}
                src={buildMapSrc(single)}
                title={`Mapa — ${single.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        ) : (
          <>
            <Reveal>
              <SectionHeading kicker="Agende sua consulta" title="Nossos endereços" className={styles.heading} />
            </Reveal>
            <Reveal delay={0.1}>
              <LocationTabs clinics={clinics} />
            </Reveal>
          </>
        )}
      </Container>
    </section>
  );
}
