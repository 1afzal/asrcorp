import { services } from '@/data/services';
import ServiceCard from '@/components/ui/ServiceCard';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ServicesOverview() {
  return (
    <section className="py-24 px-6 bg-light">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="WHAT WE DO"
          title="Services Built Around You"
          subtitle="Comprehensive construction, renovation, and real estate solutions engineered for coastal Karnataka's unique demands."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
