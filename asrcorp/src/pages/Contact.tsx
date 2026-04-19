import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Camera, Send, CheckCircle2 } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'ASR Corporation, Kadri Hills,\nMangaluru, Karnataka 575002' },
  { icon: Phone, label: 'Phone', value: '+91 8667 150 022' },
  { icon: Mail, label: 'Email', value: 'info@asrcorporation.com' },
  { icon: Clock, label: 'Working Hours', value: 'Mon – Sat: 9:00 AM – 6:00 PM\nSun: By appointment only' },
];

const socials = [
  { icon: Camera, href: 'https://www.instagram.com/asr.corporation/', label: 'Instagram' },
];

const serviceOptions = [
  'Renovation', 'Waterproofing', 'Roofing', 'Interior Design',
  'Construction', 'Painting', 'Real Estate', 'Other',
];

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us — ASR Corporation';
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    reset();
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative bg-dark py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt="Office"
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
              GET IN TOUCH
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-[1.05]">
              CONTACT <span className="gradient-text">US</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-light py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form */}
            <ScrollReveal direction="left" className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 border border-border-light shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <h2 className="font-heading text-3xl font-extrabold text-dark mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {isSubmitSuccessful ? (
                  <div className="text-center py-16">
                    <CheckCircle2 className="w-16 h-16 text-coral mx-auto mb-4" />
                    <h3 className="font-heading text-2xl font-extrabold text-dark mb-2">Message Sent!</h3>
                    <p className="text-muted">Thank you for reaching out. We&apos;ll respond shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          {...register('name')}
                          className="w-full bg-light-muted border border-border-light text-dark placeholder-muted/50 py-3 px-4 font-body focus:border-coral focus:outline-none transition-colors"
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-coral">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="w-full bg-light-muted border border-border-light text-dark placeholder-muted/50 py-3 px-4 font-body focus:border-coral focus:outline-none transition-colors"
                          placeholder="you@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-coral">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-dark mb-2">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className="w-full bg-light-muted border border-border-light text-dark placeholder-muted/50 py-3 px-4 font-body focus:border-coral focus:outline-none transition-colors"
                          placeholder="+91 XXX XXX XXXX"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-coral">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-dark mb-2">
                          Service Interested In *
                        </label>
                        <select
                          id="service"
                          {...register('service')}
                          className="w-full bg-light-muted border border-border-light text-dark py-3 px-4 font-body focus:border-coral focus:outline-none transition-colors"
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.service && <p className="mt-1 text-sm text-coral">{errors.service.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register('message')}
                        className="w-full bg-light-muted border border-border-light text-dark placeholder-muted/50 py-3 px-4 font-body focus:border-coral focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-coral">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="magnetic-btn bg-coral text-white uppercase tracking-wider font-semibold px-8 py-4"
                    >
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right" className="lg:col-span-5">
              <div>
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4 mb-8">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-coral/5 border border-coral/10 text-coral">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-dark">{item.label}</h3>
                      <p className="text-muted text-sm whitespace-pre-line mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}

                {/* Social Links */}
                <div className="pt-8 border-t border-border-light">
                  <h3 className="font-heading font-bold text-dark mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 flex items-center justify-center border border-border-light text-muted hover:bg-coral hover:text-white hover:border-coral transition-all"
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 bg-dark-surface">
        <iframe
          title="ASR Corporation Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62210.34942498659!2d74.82844075!3d12.87432945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x827bbc7a74fcfe64!2sMangaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </PageTransition>
  );
}
