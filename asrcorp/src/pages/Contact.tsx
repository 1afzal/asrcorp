import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Globe, Camera, Briefcase, MessageCircle, Send } from 'lucide-react';
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
  { icon: Phone, label: 'Phone', value: '+91 824 245 6789' },
  { icon: Mail, label: 'Email', value: 'info@asrcorporation.com' },
  { icon: Clock, label: 'Working Hours', value: 'Mon – Sat: 9:00 AM – 6:00 PM\nSun: By appointment only' },
];

const socials = [
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Briefcase, href: '#', label: 'LinkedIn' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
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
      <section className="relative py-32 md:py-44 px-6 bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt="Office"
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
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-white"
          >
            Contact <span className="gradient-text italic">Us</span>
          </motion.h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <ScrollReveal direction="left" className="lg:col-span-3">
              <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg">
                <h2 className="font-display text-3xl font-bold text-brand-charcoal mb-2">
                  Send Us a Message
                </h2>
                <p className="text-brand-stone mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {isSubmitSuccessful ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Send className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-brand-charcoal mb-2">Message Sent!</h3>
                    <p className="text-brand-stone">Thank you for reaching out. We&apos;ll respond shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-charcoal mb-2">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          {...register('name')}
                          className="w-full px-4 py-3 border border-brand-stone/20 rounded-sm bg-brand-warm-white text-brand-charcoal placeholder-brand-stone/50 transition-colors"
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal mb-2">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="w-full px-4 py-3 border border-brand-stone/20 rounded-sm bg-brand-warm-white text-brand-charcoal placeholder-brand-stone/50 transition-colors"
                          placeholder="you@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-brand-charcoal mb-2">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className="w-full px-4 py-3 border border-brand-stone/20 rounded-sm bg-brand-warm-white text-brand-charcoal placeholder-brand-stone/50 transition-colors"
                          placeholder="+91 XXX XXX XXXX"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-brand-charcoal mb-2">
                          Service Interested In *
                        </label>
                        <select
                          id="service"
                          {...register('service')}
                          className="w-full px-4 py-3 border border-brand-stone/20 rounded-sm bg-brand-warm-white text-brand-charcoal transition-colors"
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-brand-charcoal mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        {...register('message')}
                        className="w-full px-4 py-3 border border-brand-stone/20 rounded-sm bg-brand-warm-white text-brand-charcoal placeholder-brand-stone/50 transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full md:w-auto px-8 py-4 bg-brand-amber text-white font-body font-semibold rounded-sm hover:bg-brand-amber-light transition-colors flex items-center justify-center gap-2"
                    >
                      Send Message
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right" className="lg:col-span-2">
              <div className="space-y-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-brand-amber/10 border border-brand-amber/20 rounded-sm">
                      <item.icon className="w-5 h-5 text-brand-amber" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-brand-charcoal">{item.label}</h3>
                      <p className="text-brand-stone text-sm whitespace-pre-line mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}

                {/* Social Links */}
                <div className="pt-8 border-t border-brand-stone/20">
                  <h3 className="font-display text-lg font-semibold text-brand-charcoal mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-11 h-11 flex items-center justify-center border border-brand-stone/20 rounded-sm text-brand-stone hover:bg-brand-amber hover:text-white hover:border-brand-amber transition-all"
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
      <section className="h-96 bg-brand-surface">
        <iframe
          title="ASR Corporation Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62210.34942498659!2d74.82844075!3d12.87432945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x827bbc7a74fcfe64!2sMangaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </PageTransition>
  );
}
