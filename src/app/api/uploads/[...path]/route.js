import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { UPLOADS_ROOT } from '@/lib/storage/drivers/local';

const MIME_BY_EXT = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

// Serve os uploads lendo o disco a cada request, em vez de depender da pasta
// public/ do Next.js — que mapeia os arquivos estáticos uma vez, na subida do
// servidor, e não percebe arquivos gravados depois (uploads feitos em runtime
// ficavam invisíveis até o próximo deploy reiniciar o processo).
export async function GET(request, { params }) {
  const { path: segments } = await params;

  const requestedPath = path.join(UPLOADS_ROOT, ...segments);
  if (!requestedPath.startsWith(UPLOADS_ROOT + path.sep)) {
    return new Response('Not found', { status: 404 });
  }

  const ext = path.extname(requestedPath).toLowerCase();
  const contentType = MIME_BY_EXT[ext];
  if (!contentType) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const buffer = await readFile(requestedPath);
    return new Response(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
