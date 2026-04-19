import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Check, User, Briefcase, FileText, Send } from 'lucide-react';
import PageTransition from '@/components/layout/PageTransition';

const step1Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

const step2Schema = z.object({
  serviceType: z.string().min(1, 'Please select a service'),
  location: z.string().min(2, 'Please enter a location'),
  areaSqft: z.string().min(1, 'Please enter the area'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
});

const step3Schema = z.object({
  notes: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

const steps = [
  { number: 1, title: 'Personal Info', icon: User },
  { number: 2, title: 'Project Details', icon: Briefcase },
  { number: 3, title: 'Additional Info', icon: FileText },
  { number: 4, title: 'Confirmation', icon: Send },
];

const serviceOptions = [
  'Renovation', 'Waterproofing', 'Roofing', 'Interior Design',
  'Construction', 'Painting', 'Real Estate',
];

const budgetRanges = [
  'Under ₹5 Lakhs', '₹5 – ₹15 Lakhs', '₹15 – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore', 'Above ₹1 Crore',
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
};

export default function Quote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    serviceType: '', location: '', areaSqft: '', budgetRange: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Get a Quote — ASR Corporation';
  }, []);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { name: formData.name, email: formData.email, phone: formData.phone },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { serviceType: formData.serviceType, location: formData.location, areaSqft: formData.areaSqft, budgetRange: formData.budgetRange },
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { notes: formData.notes },
  });

  const goNext = () => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 4));
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleStep1 = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goNext();
  };

  const handleStep2 = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goNext();
  };

  const handleStep3 = (data: Step3Data) => {
    setFormData((prev) => ({ ...prev, notes: data.notes ?? '' }));
    goNext();
  };

  const handleFinalSubmit = () => {
    console.log('Quote request submitted:', formData);
    setIsSubmitted(true);
  };

  const inputClass = 'w-full bg-light-muted border border-border-light text-dark placeholder-muted/50 py-3 px-4 font-body focus:border-coral focus:outline-none transition-colors';

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative bg-dark py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
            alt="Blueprint"
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
            <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-[1.05]">
              GET A FREE<br />
              <span className="gradient-text">QUOTE</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-light py-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-16">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center font-heading font-bold text-sm transition-all duration-500 ${
                      currentStep > step.number
                        ? 'text-coral'
                        : currentStep === step.number
                        ? 'text-coral ring-2 ring-coral ring-offset-2 ring-offset-light rounded-full'
                        : 'text-muted'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5 text-coral" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-body hidden sm:block ${
                    currentStep >= step.number ? 'text-dark font-semibold' : 'text-muted'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-3 transition-colors duration-500 ${
                    currentStep > step.number ? 'bg-coral' : 'bg-border-light'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <div className="bg-white border border-border-light p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] min-h-[400px]">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="gradient-text text-7xl font-heading font-extrabold mb-6">
                  <Check className="w-16 h-16 mx-auto" style={{ stroke: 'url(#grad)' }} />
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF4D4D" />
                        <stop offset="100%" stopColor="#FFB800" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h2 className="font-heading text-3xl font-extrabold text-dark mb-3">
                  Quote Submitted!
                </h2>
                <p className="text-muted max-w-md mx-auto">
                  Thank you, {formData.name}! Our team will review your project details and
                  get back to you with a detailed estimate within 48 hours.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait" custom={direction}>
                {/* Step 1 */}
                {currentStep === 1 && (
                  <motion.form
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    onSubmit={step1Form.handleSubmit(handleStep1)}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-heading text-2xl font-extrabold text-dark mb-1">Personal Information</h2>
                      <p className="text-muted text-sm">Let us know how to reach you.</p>
                    </div>
                    <div>
                      <label htmlFor="q-name" className="block text-sm font-medium text-dark mb-2">Full Name *</label>
                      <input id="q-name" type="text" {...step1Form.register('name')} className={inputClass} placeholder="Your full name" />
                      {step1Form.formState.errors.name && <p className="mt-1 text-sm text-coral">{step1Form.formState.errors.name.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="q-email" className="block text-sm font-medium text-dark mb-2">Email *</label>
                        <input id="q-email" type="email" {...step1Form.register('email')} className={inputClass} placeholder="you@example.com" />
                        {step1Form.formState.errors.email && <p className="mt-1 text-sm text-coral">{step1Form.formState.errors.email.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="q-phone" className="block text-sm font-medium text-dark mb-2">Phone *</label>
                        <input id="q-phone" type="tel" {...step1Form.register('phone')} className={inputClass} placeholder="+91 XXX XXX XXXX" />
                        {step1Form.formState.errors.phone && <p className="mt-1 text-sm text-coral">{step1Form.formState.errors.phone.message}</p>}
                      </div>
                    </div>
                    <div className="flex justify-end pt-4">
                      <button type="submit" className="magnetic-btn bg-coral text-white uppercase tracking-wider font-semibold px-8 py-4">
                        <span className="flex items-center gap-2">Next <ArrowRight className="w-4 h-4" /></span>
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <motion.form
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    onSubmit={step2Form.handleSubmit(handleStep2)}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-heading text-2xl font-extrabold text-dark mb-1">Project Details</h2>
                      <p className="text-muted text-sm">Tell us about your project requirements.</p>
                    </div>
                    <div>
                      <label htmlFor="q-service" className="block text-sm font-medium text-dark mb-2">Service Type *</label>
                      <select id="q-service" {...step2Form.register('serviceType')} className={inputClass}>
                        <option value="">Select a service</option>
                        {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {step2Form.formState.errors.serviceType && <p className="mt-1 text-sm text-coral">{step2Form.formState.errors.serviceType.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="q-location" className="block text-sm font-medium text-dark mb-2">Project Location *</label>
                        <input id="q-location" type="text" {...step2Form.register('location')} className={inputClass} placeholder="e.g., Kadri, Mangaluru" />
                        {step2Form.formState.errors.location && <p className="mt-1 text-sm text-coral">{step2Form.formState.errors.location.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="q-area" className="block text-sm font-medium text-dark mb-2">Area (sq. ft.) *</label>
                        <input id="q-area" type="text" {...step2Form.register('areaSqft')} className={inputClass} placeholder="e.g., 1500" />
                        {step2Form.formState.errors.areaSqft && <p className="mt-1 text-sm text-coral">{step2Form.formState.errors.areaSqft.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="q-budget" className="block text-sm font-medium text-dark mb-2">Budget Range *</label>
                      <select id="q-budget" {...step2Form.register('budgetRange')} className={inputClass}>
                        <option value="">Select budget range</option>
                        {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {step2Form.formState.errors.budgetRange && <p className="mt-1 text-sm text-coral">{step2Form.formState.errors.budgetRange.message}</p>}
                    </div>
                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={goBack} className="border border-border-light text-muted hover:border-coral hover:text-coral px-6 py-3 font-body transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button type="submit" className="magnetic-btn bg-coral text-white uppercase tracking-wider font-semibold px-8 py-4">
                        <span className="flex items-center gap-2">Next <ArrowRight className="w-4 h-4" /></span>
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <motion.form
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    onSubmit={step3Form.handleSubmit(handleStep3)}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-heading text-2xl font-extrabold text-dark mb-1">Additional Details</h2>
                      <p className="text-muted text-sm">Any extra information that helps us understand your project better.</p>
                    </div>
                    <div>
                      <label htmlFor="q-notes" className="block text-sm font-medium text-dark mb-2">Project Notes</label>
                      <textarea
                        id="q-notes"
                        rows={6}
                        {...step3Form.register('notes')}
                        className={`${inputClass} resize-none`}
                        placeholder="Describe your project vision, special requirements, preferred timeline, reference images you have in mind..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">Reference Images (Optional)</label>
                      <div className="border-2 border-dashed border-border-light p-8 text-center hover:border-coral/40 transition-colors cursor-pointer">
                        <p className="text-muted text-sm">
                          Drag &amp; drop images here, or <span className="text-coral font-semibold">browse files</span>
                        </p>
                        <p className="text-muted/50 text-xs mt-1">PNG, JPG up to 10MB each</p>
                      </div>
                    </div>
                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={goBack} className="border border-border-light text-muted hover:border-coral hover:text-coral px-6 py-3 font-body transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button type="submit" className="magnetic-btn bg-coral text-white uppercase tracking-wider font-semibold px-8 py-4">
                        <span className="flex items-center gap-2">Review <ArrowRight className="w-4 h-4" /></span>
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-heading text-2xl font-extrabold text-dark mb-1">Review Your Request</h2>
                      <p className="text-muted text-sm">Please verify your details before submitting.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-light-muted border border-border-light p-6">
                        <h3 className="text-coral text-xs font-semibold uppercase tracking-wider mb-3">Personal Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div><span className="text-muted">Name:</span> <span className="text-dark font-bold">{formData.name}</span></div>
                          <div><span className="text-muted">Email:</span> <span className="text-dark font-bold">{formData.email}</span></div>
                          <div><span className="text-muted">Phone:</span> <span className="text-dark font-bold">{formData.phone}</span></div>
                        </div>
                      </div>

                      <div className="bg-light-muted border border-border-light p-6">
                        <h3 className="text-coral text-xs font-semibold uppercase tracking-wider mb-3">Project Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div><span className="text-muted">Service:</span> <span className="text-dark font-bold">{formData.serviceType}</span></div>
                          <div><span className="text-muted">Location:</span> <span className="text-dark font-bold">{formData.location}</span></div>
                          <div><span className="text-muted">Area:</span> <span className="text-dark font-bold">{formData.areaSqft} sq. ft.</span></div>
                          <div><span className="text-muted">Budget:</span> <span className="text-dark font-bold">{formData.budgetRange}</span></div>
                        </div>
                      </div>

                      {formData.notes && (
                        <div className="bg-light-muted border border-border-light p-6">
                          <h3 className="text-coral text-xs font-semibold uppercase tracking-wider mb-3">Additional Notes</h3>
                          <p className="text-dark text-sm">{formData.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={goBack} className="border border-border-light text-muted hover:border-coral hover:text-coral px-6 py-3 font-body transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="magnetic-btn bg-coral text-white uppercase tracking-wider font-semibold px-8 py-4"
                      >
                        <span className="flex items-center gap-2">Submit Request <Send className="w-4 h-4" /></span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
