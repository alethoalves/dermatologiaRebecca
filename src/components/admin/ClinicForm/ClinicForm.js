'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';
import styles from './ClinicForm.module.scss';

export default function ClinicForm({ clinic }) {
  const router = useRouter();
  const isEditing = !!clinic;

  const [name, setName] = useState(clinic?.name || '');
  const [neighborhood, setNeighborhood] = useState(clinic?.neighborhood || '');
  const [city, setCity] = useState(clinic?.city || '');
  const [state, setState] = useState(clinic?.state || '');
  const [address, setAddress] = useState(clinic?.address || '');
  const [zip, setZip] = useState(clinic?.zip || '');
  const [hours, setHours] = useState(clinic?.hours || '');
  const [note, setNote] = useState(clinic?.note || '');
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setError(null);

    if (!name.trim()) {
      setError('Informe o nome da clínica.');
      return;
    }
    if (!address.trim()) {
      setError('Informe o endereço.');
      return;
    }

    setIsSaving(true);
    const payload = { name, neighborhood, city, state, address, zip, hours, note };

    try {
      const res = await fetch(isEditing ? `/api/admin/clinics/${clinic.id}` : '/api/admin/clinics', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Falha ao salvar o endereço');

      router.push('/admin/clinics');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <h1 className={styles.title}>{isEditing ? 'Editar endereço' : 'Novo endereço'}</h1>
        <div className={styles.actions}>
          <Button disabled={isSaving} onClick={handleSave}>
            {isSaving ? 'Salvando…' : 'Salvar'}
          </Button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Nome da clínica
        </label>
        <input
          id="name"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: Instituto da Pele"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="neighborhood">
          Bairro
        </label>
        <input
          id="neighborhood"
          className={styles.input}
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          placeholder="Ex.: Batista Campos"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="city">
          Cidade
        </label>
        <input id="city" className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex.: Belém" />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="state">
          Estado (UF)
        </label>
        <input id="state" className={styles.input} value={state} onChange={(e) => setState(e.target.value)} placeholder="Ex.: PA" />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="address">
          Endereço completo
        </label>
        <input
          id="address"
          className={styles.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ex.: Travessa Apinagés, 440 - Batista Campos, Belém - Pará"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="zip">
          CEP
        </label>
        <input id="zip" className={styles.input} value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Ex.: 66030-460" />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hours">
          Horário de funcionamento
        </label>
        <textarea
          id="hours"
          className={styles.textarea}
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder={'Segunda a Sexta: 08:00 às 19:30\nSábado: 08:00 às 13:00\nDomingo: Fechado'}
        />
        <span className={styles.hint}>Uma linha por horário, no formato Rótulo: valor.</span>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="note">
          Observação (opcional)
        </label>
        <textarea
          id="note"
          className={styles.textarea}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ex.: Atendimento somente com hora marcada."
        />
      </div>
    </div>
  );
}
