import Header from '@/components/landing/Header/Header';
import Hero from '@/components/landing/Hero/Hero';
import WhyChooseUs from '@/components/landing/WhyChooseUs/WhyChooseUs';
import Treatments from '@/components/landing/Treatments/Treatments';
import Faq from '@/components/landing/Faq/Faq';
import About from '@/components/landing/About/About';
import BlogTeaser from '@/components/landing/BlogTeaser/BlogTeaser';
import Location from '@/components/landing/Location/Location';
import Footer from '@/components/landing/Footer/Footer';
import { getLatestPublishedPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const posts = await getLatestPublishedPosts(3);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Treatments />
        <Faq />
        <About />
        <BlogTeaser posts={posts} />
        <Location />
      </main>
      <Footer />
    </>
  );
}
