import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, ClipboardList, HardHat, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '@/data/services';
import PageTransition from '@/components/layout/PageTransition';
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
      <section className="relative bg-dark py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
            alt="Construction blueprint"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark" />
        </div>
        <div className="grain" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
          >
            <span className="inline-flex items-center text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold mb-6">
              <span className="inline-block w-2 h-2 bg-coral rounded-full mr-3" />
              WHAT WE DO
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-[1.05]">
              OUR <span className="gradient-text">SERVICES</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Service Detail Sections */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven ? 'bg-light' : 'bg-dark grain';
        const textTitle = isEven ? 'text-dark' : 'text-white';
        const textBody = isEven ? 'text-muted' : 'text-muted-light';
        const serviceNumber = String(index + 1).padStart(2, '0');

        return (
          <section key={service.id} className={`relative ${bgClass} py-24 px-6 overflow-hidden`}>
            <div className={`${!isEven ? 'relative z-10' : ''} max-w-7xl mx-auto`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Image */}
                <ScrollReveal
                  direction={isEven ? 'left' : 'right'}
                  className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : ''}`}
                >
                  <div className="relative">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-4 right-4 text-coral/20 font-heading text-8xl font-extrabold leading-none pointer-events-none select-none">
                      {serviceNumber}
                    </span>
                  </div>
                </ScrollReveal>

                {/* Content */}
                <ScrollReveal
                  direction={isEven ? 'right' : 'left'}
                  className={`lg:col-span-6 ${!isEven ? 'lg:order-1' : ''}`}
                >
                  <div>
                    <div className="w-12 h-12 bg-coral rounded-full flex items-center justify-center mb-6">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className={`font-heading font-extrabold text-3xl ${textTitle} mb-6`}>
                      {service.title}
                    </h2>
                    <p className={`${textBody} leading-relaxed mb-6 whitespace-pre-line`}>
                      {service.longDescription}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className={`flex items-start gap-3 ${textBody}`}>
                          <span className="w-1.5 h-1.5 bg-coral mt-2 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/quote"
                      className="magnetic-btn bg-coral text-white uppercase tracking-wider font-semibold px-8 py-4 inline-flex items-center gap-2"
                    >
                      <span className="flex items-center gap-2">
                        Get a Quote
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* How We Work */}
      <section className="relative bg-dark py-24 px-6 overflow-hidden">
        <div className="grain" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="inline-flex items-center text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold mb-6">
              <span className="inline-block w-2 h-2 bg-coral rounded-full mr-3" />
              OUR PROCESS
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-16">
              How We Work
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.15}>
                <div className="relative text-center">
                  {/* Decorative large number */}
                  <span className="text-7xl font-heading font-extrabold text-white/5 block mb-4 leading-none select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Icon circle */}
                  <div className="w-16 h-16 mx-auto flex items-center justify-center border border-coral/30 rounded-full mb-6">
                    <step.icon className="w-7 h-7 text-coral" />
                  </div>
                  <h3 className="font-heading text-xl text-white font-bold mb-3">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.description}</p>
                  {/* Connecting line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-[7.5rem] left-[60%] w-[80%] h-px bg-border-dark" />
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
