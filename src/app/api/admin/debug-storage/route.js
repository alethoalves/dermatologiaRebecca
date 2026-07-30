import { NextResponse } from 'next/server';
import { readdir, stat, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { requireSession } from '@/lib/auth/require-session';

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const cwd = process.cwd();
  const uploadsRoot = path.join(cwd, 'public', 'uploads');
  const postsDir = path.join(uploadsRoot, 'posts');

  const info = { cwd, uploadsRoot, postsDir };

  try {
    info.uploadsRootStat = await stat(uploadsRoot).then((s) => ({ isDirectory: s.isDirectory(), mode: s.mode.toString(8) }));
  } catch (e) {
    info.uploadsRootError = e.message;
  }

  try {
    await mkdir(postsDir, { recursive: true });
    info.postsDirEntries = await readdir(postsDir);
  } catch (e) {
    info.postsDirError = e.message;
  }

  try {
    const testPath = path.join(uploadsRoot, 'write-test.txt');
    await writeFile(testPath, `written at ${new Date().toISOString()}`);
    info.writeTestOk = true;
  } catch (e) {
    info.writeTestError = e.message;
  }

  return NextResponse.json(info);
}
