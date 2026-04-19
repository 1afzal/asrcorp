import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, ClipboardList, HardHat, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '@/data/services';
import PageTransition from '@/components/layout/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';

const processSteps = [
  { icon: MessageSquare, title: 'Consultation', description: 'We discuss your vision, requirements, budget, and timeline in a free initial meeting.' },
  { icon: ClipboardList, title: 'Planning', description: 'Our architects and engineers create detailed blueprints, material estimates, and project timelines.' },
  { icon: HardHat, title: 'Execution', description: 'Skilled teams bring plans to life with rigorous quality checks at every milestone.' },
  { icon: CheckCircle2, title: 'Handover', description: 'Final inspection, documentation, and a seamless handover with warranty assurance.' },
];

export default function Services() {
  useEffect(() => {
    document.title = 'Our Services — ASR Corporation';
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-32 md:py-44 px-6 bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
            alt="Construction blueprint"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/50 to-brand-charcoal" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 border border-brand-amber/30 text-brand-amber text-sm tracking-[0.2em] uppercase font-body mb-6"
          >
            What We Do
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white"
          >
            Our <span className="gradient-text italic">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg"
          >
            Comprehensive construction and real estate solutions crafted for Mangaluru&apos;s
            unique coastal landscape and your specific needs.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          className={`py-24 px-6 ${index % 2 === 0 ? 'bg-brand-warm-white' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
              index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
            }`}>
              <ScrollReveal direction={index % 2 === 0 ? 'left' : 'right'} className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className="relative">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="rounded-sm w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 w-14 h-14 bg-brand-amber flex items-center justify-center rounded-sm">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction={index % 2 === 0 ? 'right' : 'left'} className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                <div>
                  <div className="accent-line mb-6" />
                  <h2 className="font-display text-4xl font-bold text-brand-charcoal mb-6">
                    {service.title}
                  </h2>
                  <p className="text-brand-stone leading-relaxed mb-6 whitespace-pre-line">
                    {service.longDescription}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 text-brand-stone">
                        <CheckCircle2 className="w-5 h-5 text-brand-amber mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/quote"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-amber text-white font-body font-semibold rounded-sm hover:bg-brand-amber-light transition-colors"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ))}

      {/* How We Work */}
      <section className="py-24 px-6 bg-brand-charcoal noise-overlay diagonal-top">
        <div className="max-w-6xl mx-auto relative z-10 pt-8">
          <SectionHeading title="How We Work" subtitle="A proven four-step process that ensures every project succeeds." light />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.15}>
                <div className="relative text-center">
                  {/* Step number */}
                  <div className="text-6xl font-display font-bold text-white/5 absolute -top-4 left-1/2 -translate-x-1/2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto flex items-center justify-center bg-brand-amber/10 border border-brand-amber/30 rounded-full mb-6">
                      <step.icon className="w-7 h-7 text-brand-amber" />
                    </div>
                    <h3 className="font-display text-xl text-white font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-brand-amber/30 to-transparent" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
