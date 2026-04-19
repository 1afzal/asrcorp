import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Gem, Award, Building2, Users, TrendingUp } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { TeamMember, Milestone } from '@/types';

const values = [
  { icon: Target, title: 'Precision', description: 'Every measurement, every joint, every finish — executed with meticulous attention to detail.' },
  { icon: Eye, title: 'Vision', description: 'We see beyond blueprints to imagine spaces that inspire and endure for generations.' },
  { icon: Heart, title: 'Integrity', description: 'Transparent dealings, honest timelines, and fair pricing form the bedrock of our relationships.' },
  { icon: Gem, title: 'Quality', description: 'Premium materials and proven techniques, tailored for the coastal Karnataka climate.' },
];

const team: TeamMember[] = [
  { id: '1', name: 'Afil Rahman', role: 'Founder & CEO', imageUrl: '/ceo.png?v=1?w=400&q=80' },
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
      <section className="relative bg-dark py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
            alt="Construction site"
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
              OUR STORY
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-[1.05]">
              BUILDING SINCE<br />
              <span className="gradient-text">2010</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-light py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <ScrollReveal direction="left" className="lg:col-span-7">
              <div>
                <div className="accent-line mb-6" />
                <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-dark leading-[1.1] mb-8">
                  More Than Just a Construction Company
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  Founded in 2010, ASR Corporation emerged from a simple belief: that every family
                  deserves a home built with integrity, and every business deserves a space that
                  inspires. What started as a small construction firm in Mangaluru has grown into a
                  comprehensive construction and real estate company serving the entire coastal
                  Karnataka region.
                </p>
                <p className="text-muted leading-relaxed mb-6">
                  Our deep understanding of the region&apos;s tropical monsoon climate, laterite-rich
                  soil conditions, and local architectural heritage gives us a unique advantage. We
                  don&apos;t just build structures — we engineer them to thrive in Mangaluru&apos;s
                  distinctive environment.
                </p>
                <p className="text-muted leading-relaxed">
                  Today, with over 500 completed projects and a team of 50+ professionals, we
                  continue to push the boundaries of what&apos;s possible in construction, interior
                  design, and real estate development.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:col-span-5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80"
                  alt="ASR Corporation team at work"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 bg-dark/80 backdrop-blur-sm p-6">
                  <span className="gradient-text font-heading text-5xl font-extrabold block">10+</span>
                  <span className="text-white text-xs tracking-[0.15em] uppercase font-body">Projects</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="relative bg-dark py-24 px-6 overflow-hidden">
        <div className="grain" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="inline-flex items-center text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold mb-6">
              <span className="inline-block w-2 h-2 bg-coral rounded-full mr-3" />
              OUR VALUES
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-16">
              The Principles That<br />Guide Everything We Do
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="bg-dark-card border border-border-dark p-8 relative">
                  <span className="text-coral/30 font-heading text-4xl font-extrabold absolute top-6 right-6">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <value.icon className="w-8 h-8 text-coral mb-5" />
                  <h3 className="font-heading text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CEO */}
      <section className="bg-light py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <ScrollReveal direction="left" className="lg:col-span-5">
              <div className="relative">
                <img
                  src="/ceo.png?v=1?w=600&q=80"
                  alt="Afil Rahman, CEO"
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:col-span-7">
              <div>
                <h2 className="font-heading text-5xl font-extrabold text-dark mb-2">
                  Afil Rahman
                </h2>
                <p className="text-muted uppercase tracking-[0.15em] text-sm font-body mb-8">
                  Founder &amp; Chief Executive Officer
                </p>
                <p className="text-muted leading-relaxed mb-6">
                  A Civil Engineering graduate with specialization in structural design, Afil spent
                  his early career working with leading construction firms across South India. This
                  experience, combined with his roots in Mangaluru, gave him a unique perspective
                  on what coastal Karnataka truly needs — buildings that are not only beautiful but
                  engineered to withstand the region&apos;s challenging weather conditions.
                </p>
                <p className="text-muted leading-relaxed mb-8">
                  Under Afil&apos;s leadership, ASR Corporation has been recognized as one of
                  Dakshina Kannada&apos;s most trusted construction companies, with a portfolio
                  spanning residential, commercial, and institutional projects.
                </p>
                <blockquote className="border-l-2 border-coral pl-6 mb-8">
                  <p className="text-dark font-body italic leading-relaxed">
                    &ldquo;I founded ASR Corporation with a single promise — that we would never
                    compromise on quality, no matter the scale of the project.&rdquo;
                  </p>
                </blockquote>
                <div className="font-heading text-3xl font-extrabold text-dark">
                  Afil Rahman
                  <div className="w-32 h-1 bg-coral mt-3" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-dark-surface py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <span className="inline-flex items-center text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold mb-6">
              <span className="inline-block w-2 h-2 bg-coral rounded-full mr-3" />
              THE TEAM
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-16">
              The People Behind<br />Every Project
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {team.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 0.08}>
                <div className="group relative overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-heading text-white font-bold text-lg">{member.name}</h3>
                    <p className="text-coral text-sm">{member.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-light py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <span className="inline-flex items-center text-coral text-xs tracking-[0.2em] uppercase font-body font-semibold mb-6">
              <span className="inline-block w-2 h-2 bg-coral rounded-full mr-3" />
              OUR JOURNEY
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-dark leading-[1.1] mb-16">
              Key Milestones
            </h2>
          </ScrollReveal>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-light -translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <ScrollReveal key={milestone.year} delay={index * 0.1}>
                <div className={`relative flex items-start gap-8 mb-14 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-14' : 'md:pl-14'}`}>
                    <span className="font-heading text-2xl font-extrabold text-coral">{milestone.year}</span>
                    <h3 className="font-heading font-bold text-dark text-lg mt-1">{milestone.title}</h3>
                    <p className="text-muted text-sm mt-2 leading-relaxed">{milestone.description}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-coral rounded-full -translate-x-1/2 mt-1 border-4 border-light" />

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-dark py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { icon: Award, title: 'Best Construction Firm 2024', org: 'DK Builders Association' },
                { icon: Building2, title: 'ISO 9001:2015 Certified', org: 'Quality Management' },
                { icon: Users, title: 'Top Employer 2023', org: 'Karnataka Construction Guild' },
                { icon: TrendingUp, title: 'Fastest Growing Builder', org: 'Coastal Karnataka Awards' },
              ].map((cert, index) => (
                <ScrollReveal key={cert.title} delay={index * 0.1}>
                  <div className="text-center">
                    <cert.icon className="w-10 h-10 text-coral mx-auto mb-4" />
                    <h3 className="font-heading text-lg text-white font-bold mb-1">{cert.title}</h3>
                    <p className="text-muted text-sm">{cert.org}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
