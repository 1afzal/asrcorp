import { useEffect } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/ui/StatsBar';
import ServicesOverview from '@/components/sections/ServicesOverview';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import Testimonials from '@/components/sections/Testimonials';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CeoSpotlight from '@/components/sections/CeoSpotlight';
import CtaBanner from '@/components/sections/CtaBanner';

export default function Home() {
  useEffect(() => {
    document.title = 'ASR Corporation — Building Dreams, Delivering Excellence';
  }, []);

  return (
    <PageTransition>
      <Hero />
      <StatsBar />
      <ServicesOverview />
      <FeaturedProjects />
      <Testimonials />
      <WhyChooseUs />
      <CeoSpotlight />
      <CtaBanner />
    </PageTransition>
  );
}
