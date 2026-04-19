import { services } from '@/data/services';
import ServiceCard from '@/components/ui/ServiceCard';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ServicesOverview() {
  return (
    <section className="py-24 px-6 bg-brand-warm-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive construction and real estate solutions tailored for Karnataka's unique landscape and climate."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
