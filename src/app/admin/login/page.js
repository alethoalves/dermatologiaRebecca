import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import Logo from '@/components/ui/Logo/Logo';
import Button from '@/components/ui/Button/Button';
import styles from './page.module.scss';

async function authenticate(formData) {
  'use server';
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/admin/posts',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect('/admin/login?error=1');
    }
    throw error;
  }
}

export const metadata = { title: 'Login | Admin' };

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const hasError = params?.error;

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <Logo type="horizontal" tone="ink" height={32} className={styles.logo} />
        <h1 className={styles.title}>Painel administrativo</h1>

        {hasError && <p className={styles.error}>E-mail ou senha incorretos.</p>}

        <form className={styles.form} action={authenticate}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <input className={styles.input} type="email" id="email" name="email" required autoComplete="email" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Senha
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className={styles.submit}>
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
