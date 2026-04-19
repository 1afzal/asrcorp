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

  const inputClass = 'w-full px-4 py-3 border border-brand-stone/20 rounded-sm bg-brand-warm-white text-brand-charcoal placeholder-brand-stone/50 transition-colors';

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative py-32 md:py-40 px-6 bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80"
            alt="Blueprint"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/50 to-brand-charcoal" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold text-white"
          >
            Get a <span className="gradient-text italic">Free Quote</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 mt-6 max-w-xl mx-auto text-lg"
          >
            Tell us about your project and we&apos;ll provide a detailed estimate within 48 hours.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 bg-brand-warm-white">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-16">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep > step.number
                        ? 'bg-brand-amber text-white'
                        : currentStep === step.number
                        ? 'bg-brand-amber text-white ring-4 ring-brand-amber/20'
                        : 'bg-white border-2 border-brand-stone/20 text-brand-stone'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-body hidden sm:block ${
                    currentStep >= step.number ? 'text-brand-charcoal font-medium' : 'text-brand-stone'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 transition-colors duration-500 ${
                    currentStep > step.number ? 'bg-brand-amber' : 'bg-brand-stone/20'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg min-h-[400px]">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="font-display text-3xl font-bold text-brand-charcoal mb-3">
                  Quote Request Submitted!
                </h2>
                <p className="text-brand-stone max-w-md mx-auto">
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
                      <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-1">Personal Information</h2>
                      <p className="text-brand-stone text-sm">Let us know how to reach you.</p>
                    </div>
                    <div>
                      <label htmlFor="q-name" className="block text-sm font-medium text-brand-charcoal mb-2">Full Name *</label>
                      <input id="q-name" type="text" {...step1Form.register('name')} className={inputClass} placeholder="Your full name" />
                      {step1Form.formState.errors.name && <p className="mt-1 text-sm text-red-500">{step1Form.formState.errors.name.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="q-email" className="block text-sm font-medium text-brand-charcoal mb-2">Email *</label>
                        <input id="q-email" type="email" {...step1Form.register('email')} className={inputClass} placeholder="you@example.com" />
                        {step1Form.formState.errors.email && <p className="mt-1 text-sm text-red-500">{step1Form.formState.errors.email.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="q-phone" className="block text-sm font-medium text-brand-charcoal mb-2">Phone *</label>
                        <input id="q-phone" type="tel" {...step1Form.register('phone')} className={inputClass} placeholder="+91 XXX XXX XXXX" />
                        {step1Form.formState.errors.phone && <p className="mt-1 text-sm text-red-500">{step1Form.formState.errors.phone.message}</p>}
                      </div>
                    </div>
                    <div className="flex justify-end pt-4">
                      <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-brand-amber text-white font-body font-semibold rounded-sm hover:bg-brand-amber-light transition-colors">
                        Next <ArrowRight className="w-4 h-4" />
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
                      <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-1">Project Details</h2>
                      <p className="text-brand-stone text-sm">Tell us about your project requirements.</p>
                    </div>
                    <div>
                      <label htmlFor="q-service" className="block text-sm font-medium text-brand-charcoal mb-2">Service Type *</label>
                      <select id="q-service" {...step2Form.register('serviceType')} className={inputClass}>
                        <option value="">Select a service</option>
                        {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {step2Form.formState.errors.serviceType && <p className="mt-1 text-sm text-red-500">{step2Form.formState.errors.serviceType.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="q-location" className="block text-sm font-medium text-brand-charcoal mb-2">Project Location *</label>
                        <input id="q-location" type="text" {...step2Form.register('location')} className={inputClass} placeholder="e.g., Kadri, Mangaluru" />
                        {step2Form.formState.errors.location && <p className="mt-1 text-sm text-red-500">{step2Form.formState.errors.location.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="q-area" className="block text-sm font-medium text-brand-charcoal mb-2">Area (sq. ft.) *</label>
                        <input id="q-area" type="text" {...step2Form.register('areaSqft')} className={inputClass} placeholder="e.g., 1500" />
                        {step2Form.formState.errors.areaSqft && <p className="mt-1 text-sm text-red-500">{step2Form.formState.errors.areaSqft.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="q-budget" className="block text-sm font-medium text-brand-charcoal mb-2">Budget Range *</label>
                      <select id="q-budget" {...step2Form.register('budgetRange')} className={inputClass}>
                        <option value="">Select budget range</option>
                        {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {step2Form.formState.errors.budgetRange && <p className="mt-1 text-sm text-red-500">{step2Form.formState.errors.budgetRange.message}</p>}
                    </div>
                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={goBack} className="flex items-center gap-2 px-6 py-3 border border-brand-stone/20 text-brand-stone font-body font-medium rounded-sm hover:border-brand-amber hover:text-brand-amber transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-brand-amber text-white font-body font-semibold rounded-sm hover:bg-brand-amber-light transition-colors">
                        Next <ArrowRight className="w-4 h-4" />
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
                      <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-1">Additional Details</h2>
                      <p className="text-brand-stone text-sm">Any extra information that helps us understand your project better.</p>
                    </div>
                    <div>
                      <label htmlFor="q-notes" className="block text-sm font-medium text-brand-charcoal mb-2">Project Notes</label>
                      <textarea
                        id="q-notes"
                        rows={6}
                        {...step3Form.register('notes')}
                        className={`${inputClass} resize-none`}
                        placeholder="Describe your project vision, special requirements, preferred timeline, reference images you have in mind..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-charcoal mb-2">Reference Images (Optional)</label>
                      <div className="border-2 border-dashed border-brand-stone/20 rounded-sm p-8 text-center hover:border-brand-amber/30 transition-colors cursor-pointer">
                        <p className="text-brand-stone text-sm">
                          Drag & drop images here, or <span className="text-brand-amber font-medium">browse files</span>
                        </p>
                        <p className="text-brand-stone/50 text-xs mt-1">PNG, JPG up to 10MB each</p>
                      </div>
                    </div>
                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={goBack} className="flex items-center gap-2 px-6 py-3 border border-brand-stone/20 text-brand-stone font-body font-medium rounded-sm hover:border-brand-amber hover:text-brand-amber transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-brand-amber text-white font-body font-semibold rounded-sm hover:bg-brand-amber-light transition-colors">
                        Review <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Step 4: Confirmation */}
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
                      <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-1">Review Your Request</h2>
                      <p className="text-brand-stone text-sm">Please verify your details before submitting.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-brand-warm-white p-6 rounded-sm">
                        <h3 className="text-sm font-semibold text-brand-amber uppercase tracking-wider mb-3">Personal Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div><span className="text-brand-stone">Name:</span> <span className="text-brand-charcoal font-medium">{formData.name}</span></div>
                          <div><span className="text-brand-stone">Email:</span> <span className="text-brand-charcoal font-medium">{formData.email}</span></div>
                          <div><span className="text-brand-stone">Phone:</span> <span className="text-brand-charcoal font-medium">{formData.phone}</span></div>
                        </div>
                      </div>

                      <div className="bg-brand-warm-white p-6 rounded-sm">
                        <h3 className="text-sm font-semibold text-brand-amber uppercase tracking-wider mb-3">Project Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div><span className="text-brand-stone">Service:</span> <span className="text-brand-charcoal font-medium">{formData.serviceType}</span></div>
                          <div><span className="text-brand-stone">Location:</span> <span className="text-brand-charcoal font-medium">{formData.location}</span></div>
                          <div><span className="text-brand-stone">Area:</span> <span className="text-brand-charcoal font-medium">{formData.areaSqft} sq. ft.</span></div>
                          <div><span className="text-brand-stone">Budget:</span> <span className="text-brand-charcoal font-medium">{formData.budgetRange}</span></div>
                        </div>
                      </div>

                      {formData.notes && (
                        <div className="bg-brand-warm-white p-6 rounded-sm">
                          <h3 className="text-sm font-semibold text-brand-amber uppercase tracking-wider mb-3">Additional Notes</h3>
                          <p className="text-brand-charcoal text-sm">{formData.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between pt-4">
                      <button type="button" onClick={goBack} className="flex items-center gap-2 px-6 py-3 border border-brand-stone/20 text-brand-stone font-body font-medium rounded-sm hover:border-brand-amber hover:text-brand-amber transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="flex items-center gap-2 px-8 py-3 bg-brand-amber text-white font-body font-semibold rounded-sm hover:bg-brand-amber-light transition-colors"
                      >
                        Submit Request <Send className="w-4 h-4" />
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
