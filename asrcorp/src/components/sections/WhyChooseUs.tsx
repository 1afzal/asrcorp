import { Shield, Clock, Users, Award, Wrench, HeartHandshake } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const reasons = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Every project meets the highest standards with rigorous quality checks at every construction milestone.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We respect your timelines. Our project management ensures deadlines are met without compromising quality.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Skilled architects, engineers, and craftsmen with decades of combined experience in coastal construction.',
  },
  {
    icon: Award,
    title: '5-Year Warranty',
    description: 'We stand behind our work with comprehensive warranties on all construction and renovation projects.',
  },
  {
    icon: Wrench,
    title: 'Modern Techniques',
    description: 'Advanced construction methods and premium materials designed for Mangaluru\'s tropical monsoon climate.',
  },
  {
    icon: HeartHandshake,
    title: 'Transparent Pricing',
    description: 'No hidden costs. Detailed quotations and regular progress updates keep you informed at every stage.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 bg-brand-surface diagonal-top noise-overlay">
      <div className="max-w-7xl mx-auto relative z-10 pt-12">
        <SectionHeading
          title="Why Choose ASR Corporation"
          subtitle="We don't just build structures — we build trust that lasts generations."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.title} delay={index * 0.1}>
              <div className="group p-8 border border-white/10 rounded-sm hover:border-brand-amber/30 transition-all duration-500 bg-white/[0.03]">
                <div className="w-14 h-14 flex items-center justify-center border border-brand-amber/30 rounded-sm mb-6 group-hover:bg-brand-amber/10 transition-colors">
                  <reason.icon className="w-6 h-6 text-brand-amber" />
                </div>
                <h3 className="font-display text-xl text-white font-semibold mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {reason.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
