import { randomUUID } from 'node:crypto';
import * as localDriver from './drivers/local';
import * as blobDriver from './drivers/blob';

const DRIVERS = { local: localDriver, blob: blobDriver };

const ALLOWED_MIME_TO_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const MAX_SIZE_BYTES = 15 * 1024 * 1024;

export const ALLOWED_UPLOAD_FOLDERS = ['posts', 'treatments', 'about'];

function getDriver() {
  const name = process.env.STORAGE_DRIVER || 'local';
  const driver = DRIVERS[name];
  if (!driver) throw new Error(`STORAGE_DRIVER inválido: "${name}"`);
  return driver;
}

export async function uploadImage(file, { folder = 'posts' } = {}) {
  if (!ALLOWED_UPLOAD_FOLDERS.includes(folder)) {
    throw new Error('Pasta de upload inválida.');
  }

  const ext = ALLOWED_MIME_TO_EXT[file.type];
  if (!ext) {
    throw new Error('Tipo de imagem não suportado. Envie um arquivo JPG, PNG ou WEBP.');
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('A imagem excede o tamanho máximo de 15MB.');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}.${ext}`;

  return getDriver().uploadImage(buffer, { folder, filename });
}

export async function deleteImage(key) {
  return getDriver().deleteImage(key);
}
