import { MapPin, Clock, Car } from 'lucide-react';
import Container from '@/components/ui/Container/Container';
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import Reveal from '@/components/motion/Reveal/Reveal';
import { CLINIC } from '@/lib/constants';
import styles from './Location.module.scss';

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(`${CLINIC.address}, ${CLINIC.zip}`)}&output=embed`;

export default function Location() {
  return (
    <section id="localizacao" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <Reveal className={styles.body}>
            <SectionHeading kicker={CLINIC.name} title={`${CLINIC.neighborhood}, ${CLINIC.city}`} />

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <MapPin size={20} strokeWidth={1.5} className={styles.infoIcon} />
                <div>
                  <div className={styles.infoLabel}>Endereço</div>
                  <div className={styles.infoValue}>
                    {CLINIC.address} — CEP {CLINIC.zip}
                  </div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock size={20} strokeWidth={1.5} className={styles.infoIcon} />
                <div>
                  <div className={styles.infoLabel}>Horário de funcionamento</div>
                  <div className={styles.hours}>
                    {CLINIC.hours.map((h) => (
                      <span key={h.label} className={styles.infoValue}>
                        {h.label}: {h.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Car size={20} strokeWidth={1.5} className={styles.infoIcon} />
                <div className={styles.infoValue}>Estacionamento próprio no local</div>
              </div>
            </div>

            <p className={styles.note}>{CLINIC.note}</p>

            <WhatsAppButton variant="primary" />
          </Reveal>

          <Reveal delay={0.1} className={styles.mapWrap}>
            <iframe
              className={styles.map}
              src={mapSrc}
              title={`Mapa — ${CLINIC.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
