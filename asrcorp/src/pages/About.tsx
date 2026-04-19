import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Gem, Users, Building2, Award, TrendingUp } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { TeamMember, Milestone } from '@/types';

const values = [
  { icon: Target, title: 'Precision', description: 'Every measurement, every joint, every finish — executed with meticulous attention to detail.' },
  { icon: Eye, title: 'Vision', description: 'We see beyond blueprints to imagine spaces that inspire and endure for generations.' },
  { icon: Heart, title: 'Integrity', description: 'Transparent dealings, honest timelines, and fair pricing form the bedrock of our relationships.' },
  { icon: Gem, title: 'Quality', description: 'Premium materials and proven techniques, tailored for the coastal Karnataka climate.' },
];

const team: TeamMember[] = [
  { id: '1', name: 'Afil Rahman', role: 'Founder & CEO', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { id: '2', name: 'Priya Shetty', role: 'Head of Design', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { id: '3', name: 'Rakesh Nayak', role: 'Project Manager', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { id: '4', name: 'Meera Kamath', role: 'Lead Architect', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { id: '5', name: 'Suresh Pai', role: 'Site Engineer', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { id: '6', name: 'Kavitha Rao', role: 'Interior Specialist', imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80' },
];

const milestones: Milestone[] = [
  { year: 2010, title: 'Foundation Laid', description: 'ASR Corporation founded in Mangaluru with a team of 5 dedicated professionals.' },
  { year: 2013, title: 'First Major Project', description: 'Completed a 50-unit residential complex in Bejai, establishing our reputation for quality.' },
  { year: 2016, title: 'Service Expansion', description: 'Added waterproofing, interior design, and real estate services to our portfolio.' },
  { year: 2018, title: 'Regional Growth', description: 'Expanded operations to Udupi, Kasaragod, and other coastal Karnataka cities.' },
  { year: 2021, title: '500+ Projects Milestone', description: 'Crossed 500 successfully completed projects with zero major structural complaints.' },
  { year: 2024, title: 'Industry Recognition', description: 'Awarded "Best Construction Firm" in the Dakshina Kannada Builders Association.' },
];

export default function About() {
  useEffect(() => {
    document.title = 'About Us — ASR Corporation';
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-32 md:py-44 px-6 bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
            alt="Construction site"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/50 to-brand-charcoal" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 border border-brand-amber/30 text-brand-amber text-sm tracking-[0.2em] uppercase font-body mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white"
          >
            About <span className="gradient-text italic">ASR Corporation</span>
          </motion.h1>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 px-6 bg-brand-warm-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80"
                  alt="ASR Corporation team at work"
                  className="rounded-sm w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-amber p-8 rounded-sm hidden lg:block">
                  <span className="font-display text-4xl font-bold text-white">15+</span>
                  <p className="text-white/80 text-sm">Years of Excellence</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <div className="accent-line mb-6" />
                <h2 className="font-display text-4xl font-bold text-brand-charcoal mb-6">
                  Building Mangaluru&apos;s Future, One Project at a Time
                </h2>
                <p className="text-brand-stone leading-relaxed mb-4">
                  Founded in 2010, ASR Corporation emerged from a simple belief: that every family
                  deserves a home built with integrity, and every business deserves a space that
                  inspires. What started as a small construction firm in Mangaluru has grown into a
                  comprehensive construction and real estate company serving the entire coastal
                  Karnataka region.
                </p>
                <p className="text-brand-stone leading-relaxed mb-4">
                  Our deep understanding of the region&apos;s tropical monsoon climate, laterite-rich
                  soil conditions, and local architectural heritage gives us a unique advantage. We
                  don&apos;t just build structures — we engineer them to thrive in Mangaluru&apos;s
                  distinctive environment.
                </p>
                <p className="text-brand-stone leading-relaxed">
                  Today, with over 500 completed projects and a team of 50+ professionals, we
                  continue to push the boundaries of what&apos;s possible in construction, interior
                  design, and real estate development.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-24 px-6 bg-brand-charcoal noise-overlay diagonal-top">
        <div className="max-w-7xl mx-auto relative z-10 pt-8">
          <SectionHeading
            title="Our Vision & Values"
            subtitle="The principles that guide every decision, every blueprint, and every handshake."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="text-center p-8 border border-white/10 rounded-sm hover:border-brand-amber/30 transition-all duration-500">
                  <div className="w-16 h-16 mx-auto flex items-center justify-center border border-brand-amber/30 rounded-full mb-6">
                    <value.icon className="w-7 h-7 text-brand-amber" />
                  </div>
                  <h3 className="font-display text-xl text-white font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-24 px-6 bg-brand-warm-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <ScrollReveal direction="left" className="lg:col-span-2">
              <div className="relative max-w-sm mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  alt="Afil Rahman, CEO"
                  className="rounded-sm w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-brand-amber/20 rounded-sm -z-10" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:col-span-3">
              <div>
                <div className="accent-line mb-6" />
                <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-charcoal mb-2">
                  Afil Rahman
                </h2>
                <p className="text-brand-amber font-display text-xl italic mb-8">Founder & Chief Executive Officer</p>
                <p className="text-brand-stone leading-relaxed mb-4">
                  &ldquo;I founded ASR Corporation with a single promise — that we would never
                  compromise on quality, no matter the scale of the project. Whether it&apos;s a
                  single room renovation or a multi-storey commercial complex, every client
                  receives the same dedication and craftsmanship.&rdquo;
                </p>
                <p className="text-brand-stone leading-relaxed mb-4">
                  A Civil Engineering graduate with specialization in structural design, Afil spent
                  his early career working with leading construction firms across South India. This
                  experience, combined with his roots in Mangaluru, gave him a unique perspective
                  on what coastal Karnataka truly needs — buildings that are not only beautiful but
                  engineered to withstand the region&apos;s challenging weather conditions.
                </p>
                <p className="text-brand-stone leading-relaxed mb-8">
                  Under Afil&apos;s leadership, ASR Corporation has been recognized as one of
                  Dakshina Kannada&apos;s most trusted construction companies, with a portfolio
                  spanning residential, commercial, and institutional projects.
                </p>
                <div className="font-display text-3xl italic text-brand-charcoal">
                  Afil Rahman
                  <div className="w-32 h-px bg-brand-charcoal/30 mt-2" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-brand-surface diagonal-top noise-overlay">
        <div className="max-w-7xl mx-auto relative z-10 pt-8">
          <SectionHeading title="Our Team" subtitle="The professionals behind every successful project." light />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
            {team.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 0.08}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-sm aspect-[3/4]">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3 className="font-display text-lg md:text-xl text-white font-semibold">{member.name}</h3>
                      <p className="text-brand-amber text-sm">{member.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-brand-warm-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Our Journey" subtitle="Key milestones that shaped ASR Corporation." />
          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brand-stone/20 -translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <ScrollReveal key={milestone.year} delay={index * 0.1}>
                <div className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <span className="text-brand-amber font-display text-2xl font-bold">{milestone.year}</span>
                    <h3 className="font-display text-xl font-semibold text-brand-charcoal mt-1">{milestone.title}</h3>
                    <p className="text-brand-stone text-sm mt-2 leading-relaxed">{milestone.description}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-brand-amber rounded-full -translate-x-1/2 mt-2 ring-4 ring-brand-warm-white" />

                  {/* Spacer for the other side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 px-6 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Certifications & Awards" subtitle="Recognized for excellence in construction and service." light />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { icon: Award, title: 'Best Construction Firm 2024', org: 'DK Builders Association' },
              { icon: Building2, title: 'ISO 9001:2015 Certified', org: 'Quality Management' },
              { icon: Users, title: 'Top Employer 2023', org: 'Karnataka Construction Guild' },
              { icon: TrendingUp, title: 'Fastest Growing Builder', org: 'Coastal Karnataka Awards' },
            ].map((cert, index) => (
              <ScrollReveal key={cert.title} delay={index * 0.1}>
                <div className="text-center p-8">
                  <cert.icon className="w-10 h-10 text-brand-amber mx-auto mb-4" />
                  <h3 className="font-display text-lg text-white font-semibold mb-1">{cert.title}</h3>
                  <p className="text-brand-stone text-sm">{cert.org}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
