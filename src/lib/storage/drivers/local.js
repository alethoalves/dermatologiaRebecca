import { writeFile, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';

export const UPLOADS_ROOT = path.join(process.cwd(), 'public', 'uploads');

export async function uploadImage(buffer, { folder, filename }) {
  const dir = path.join(UPLOADS_ROOT, folder);
  await mkdir(dir, { recursive: true });

  const key = `${folder}/${filename}`;
  await writeFile(path.join(UPLOADS_ROOT, key), buffer);

  return { url: `/api/uploads/${key}`, key };
}

export async function deleteImage(key) {
  await unlink(path.join(UPLOADS_ROOT, key)).catch(() => {});
}
