'use client';

import { MapPin, Clock, Car } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs/Tabs';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import { parseHours, buildMapSrc } from '@/lib/clinics/format';
import styles from './Location.module.scss';

export default function LocationTabs({ clinics }) {
  return (
    <Tabs defaultValue={clinics[0].id}>
      <TabsList>
        {clinics.map((clinic) => (
          <TabsTrigger key={clinic.id} value={clinic.id}>
            {clinic.city}
          </TabsTrigger>
        ))}
      </TabsList>

      {clinics.map((clinic) => (
        <TabsContent key={clinic.id} value={clinic.id}>
          <div className={styles.grid}>
            <div className={styles.body}>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <MapPin size={20} strokeWidth={1.5} className={styles.infoIcon} />
                  <div>
                    <div className={styles.infoLabel}>Endereço</div>
                    <div className={styles.infoValue}>
                      {clinic.address} — CEP {clinic.zip}
                    </div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Clock size={20} strokeWidth={1.5} className={styles.infoIcon} />
                  <div>
                    <div className={styles.infoLabel}>Horário de funcionamento</div>
                    <div className={styles.hours}>
                      {parseHours(clinic.hours).map((h) => (
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

              {clinic.note && <p className={styles.note}>{clinic.note}</p>}

              <WhatsAppButton variant="primary" />
            </div>

            <div className={styles.mapWrap}>
              <iframe
                className={styles.map}
                src={buildMapSrc(clinic)}
                title={`Mapa — ${clinic.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
