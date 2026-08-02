import { db } from '@/lib/db';
import { nextOrderValue, normalizeOrder, moveOrderedItem } from '@/lib/ordering';

export { parseHours, buildMapSrc } from './format';

export async function getClinicsForPublic() {
  return db.clinicAddress.findMany({ orderBy: { order: 'asc' } });
}

export async function getAllClinicsForAdmin() {
  return db.clinicAddress.findMany({ orderBy: { order: 'asc' } });
}

export async function getClinicById(id) {
  return db.clinicAddress.findUnique({ where: { id } });
}

export async function createClinic({ name, neighborhood, city, state, address, zip, hours, note }) {
  return db.clinicAddress.create({
    data: {
      name,
      neighborhood,
      city,
      state,
      address,
      zip,
      hours,
      note,
      order: await nextOrderValue('clinicAddress'),
    },
  });
}

export async function updateClinic(id, { name, neighborhood, city, state, address, zip, hours, note }) {
  return db.clinicAddress.update({
    where: { id },
    data: { name, neighborhood, city, state, address, zip, hours, note },
  });
}

export async function deleteClinic(id) {
  await db.clinicAddress.delete({ where: { id } });
  await normalizeOrder('clinicAddress');
}

export async function moveClinic(id, direction) {
  await moveOrderedItem('clinicAddress', id, direction);
}
