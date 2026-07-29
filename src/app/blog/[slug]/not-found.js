import Header from '@/components/landing/Header/Header';
import Footer from '@/components/landing/Footer/Footer';
import Container from '@/components/ui/Container/Container';
import Button from '@/components/ui/Button/Button';

export default function PostNotFound() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div style={{ padding: 'var(--space-9) 0', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-4)' }}>Post não encontrado</h1>
            <p style={{ color: 'var(--color-ink-soft)', marginBottom: 'var(--space-6)' }}>
              O conteúdo que você procura não existe ou foi removido.
            </p>
            <Button href="/blog">Voltar para o blog</Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
