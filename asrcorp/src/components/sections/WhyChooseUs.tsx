import { Shield, Clock, Users, Award, Wrench, HeartHandshake } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const leftReasons = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description:
      'Every project meets the highest standards with rigorous quality checks at every construction milestone.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description:
      'We respect your timelines. Our project management ensures deadlines are met without compromising quality.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description:
      'Skilled architects, engineers, and craftsmen with decades of combined experience in coastal construction.',
  },
];

const rightReasons = [
  {
    icon: Award,
    title: '5-Year Warranty',
    description:
      'We stand behind our work with comprehensive warranties on all construction and renovation projects.',
  },
  {
    icon: Wrench,
    title: 'Modern Techniques',
    description:
      "Advanced construction methods and premium materials designed for Mangaluru's tropical monsoon climate.",
  },
  {
    icon: HeartHandshake,
    title: 'Transparent Pricing',
    description:
      'No hidden costs. Detailed quotations and regular progress updates keep you informed at every stage.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left half */}
        <div className="bg-dark py-24 pl-6 md:pl-16 pr-12">
          <SectionHeading
            tag="WHY US"
            title="Built Different"
            centered={false}
            light
          />
          <div className="mt-12">
            {leftReasons.map((reason, index) => (
              <ScrollReveal key={reason.title} delay={index * 0.15}>
                <div className="border-l-2 border-coral pl-6 py-4 mb-8">
                  <reason.icon className="w-6 h-6 text-coral mb-3" />
                  <h3 className="font-heading font-bold text-white text-lg">
                    {reason.title}
                  </h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Right half */}
        <div className="bg-dark-surface py-24 pr-6 md:pr-16 pl-12">
          <div className="lg:mt-[calc(theme(spacing.12)+theme(spacing.12)+3rem)]">
            {rightReasons.map((reason, index) => (
              <ScrollReveal key={reason.title} delay={index * 0.15 + 0.2}>
                <div className="border-l-2 border-coral pl-6 py-4 mb-8">
                  <reason.icon className="w-6 h-6 text-coral mb-3" />
                  <h3 className="font-heading font-bold text-white text-lg">
                    {reason.title}
                  </h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
