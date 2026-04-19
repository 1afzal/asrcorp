import { Hammer, Droplets, Home, Paintbrush, Building2, Palette, MapPin } from 'lucide-react';
import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'construction',
    title: 'Construction',
    description: 'End-to-end residential and commercial construction built to withstand Mangaluru\'s coastal climate.',
    longDescription: `ASR Corporation delivers full-scale construction services across Mangaluru and the Dakshina Kannada region. From foundation work engineered for laterite soil to reinforced concrete frameworks designed to endure heavy monsoon rainfall, every structure we build is grounded in durability and precision.

Our construction process accounts for the unique demands of coastal Karnataka — salt-laden air, high humidity, and seasonal flooding. We use corrosion-resistant materials, proper waterproofing at every stage, and ventilation designs that keep interiors cool through the humid months. Whether you are building a family home in Kadri or a commercial complex in Bejai, ASR Corporation ensures your project is delivered on time, within budget, and built to last decades.

Led by CEO Afil Rahman, our experienced team of engineers, architects, and skilled labourers brings a hands-on approach to every project, maintaining strict quality control from the first survey to the final handover.`,
    benefits: [
      'Structures engineered for monsoon and coastal weather resilience',
      'Corrosion-resistant materials suited to humid, salt-air environments',
      'Strict adherence to BIS codes and local municipal regulations',
      'Transparent project timelines with regular progress reporting',
      'End-to-end project management from planning to handover',
    ],
    icon: Building2,
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    slug: 'construction',
  },
  {
    id: 'renovation',
    title: 'Renovation',
    description: 'Modernise aging properties with structural upgrades designed for Mangaluru\'s tropical conditions.',
    longDescription: `Older homes and commercial buildings in Mangaluru often show the toll of decades of monsoon exposure — cracked walls, weakened foundations, corroded reinforcement bars, and outdated layouts. ASR Corporation's renovation services breathe new life into these structures while reinforcing them against future weather damage.

We handle everything from single-room makeovers to complete building overhauls. Our renovation process begins with a thorough structural assessment, identifying moisture damage, load-bearing concerns, and areas where modern materials can replace aging components. We pay special attention to improving natural ventilation and daylight, which are essential for comfort in Mangaluru's humid climate.

Whether it is restoring a heritage Mangalorean tiled home or converting a dated commercial space into a modern office, our team ensures the renovation respects the original character of the building while bringing it up to current safety and comfort standards.`,
    benefits: [
      'Comprehensive structural assessment before work begins',
      'Moisture and termite damage repair for monsoon-affected buildings',
      'Modern material upgrades that extend building lifespan',
      'Improved ventilation and natural light for tropical comfort',
      'Minimal disruption to daily routines during renovation',
    ],
    icon: Hammer,
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    slug: 'renovation',
  },
  {
    id: 'waterproofing',
    title: 'Waterproofing',
    description: 'Professional waterproofing solutions to protect your property from Mangaluru\'s heavy monsoon rainfall.',
    longDescription: `Mangaluru receives over 3,500 mm of rainfall annually, making waterproofing not a luxury but a necessity. ASR Corporation provides advanced waterproofing solutions for roofs, basements, bathrooms, terraces, and exterior walls — protecting your investment from the relentless southwest monsoon.

We use a combination of cementitious coatings, polyurethane liquid membranes, bituminous treatments, and crystalline waterproofing systems depending on the specific needs of your structure. Our team conducts a detailed moisture audit to identify existing leakage points and vulnerable areas before recommending the most effective treatment plan.

From new constructions that need preventive waterproofing to older buildings suffering from persistent seepage, we deliver lasting results. Every waterproofing job comes with a service warranty, and we use only ISI-certified materials from trusted manufacturers.`,
    benefits: [
      'Specialised treatments for Mangaluru\'s 3,500+ mm annual rainfall',
      'Multiple waterproofing systems tailored to each surface type',
      'Detailed moisture audit and leakage point identification',
      'ISI-certified materials with extended service warranty',
      'Preventive and remedial solutions for all building ages',
    ],
    icon: Droplets,
    imageUrl: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800',
    slug: 'waterproofing',
  },
  {
    id: 'roofing',
    title: 'Roofing',
    description: 'Durable roofing installations and repairs engineered to handle coastal winds and torrential rain.',
    longDescription: `The roof is your building's first line of defence against Mangaluru's intense monsoons and coastal winds. ASR Corporation offers complete roofing services — from new installations to repairs and re-roofing — using materials and techniques proven to perform in tropical coastal conditions.

We work with a range of roofing systems including Mangalore tiles, concrete slab roofing, metal sheet roofing, and modern polymer-based solutions. Each installation includes proper slope engineering for effective rainwater drainage, wind-resistant fastening systems, and thermal insulation layers that reduce indoor heat during the pre-monsoon summer months.

Our roofing team also handles gutter installation, ridge capping, and flashing work to ensure every joint and edge is sealed against water ingress. For existing roofs showing signs of wear, we provide patch repairs, re-coating, and full replacement services with minimal disruption to building occupants.`,
    benefits: [
      'Engineered slope and drainage for heavy monsoon runoff',
      'Wind-resistant fastening suited to coastal weather patterns',
      'Thermal insulation to reduce indoor heat during summer',
      'Expertise with traditional Mangalore tiles and modern systems',
      'Complete gutter, ridge, and flashing installation included',
    ],
    icon: Home,
    imageUrl: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800',
    slug: 'roofing',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    description: 'Thoughtful interior spaces that blend modern aesthetics with practical coastal living design.',
    longDescription: `Great interiors in Mangaluru must do more than look good — they need to breathe. ASR Corporation's interior design team creates spaces that are visually striking, functionally efficient, and optimised for the region's tropical humidity and warm climate.

Our design philosophy combines contemporary trends with materials that perform well in coastal conditions. We favour moisture-resistant laminates, marine-grade plywood, anti-fungal paints, and natural stone finishes that age gracefully in humid environments. Every design is tailored to the client's lifestyle, from open-plan living areas that maximise cross-ventilation to compact modular kitchens that make the most of available space.

We handle residential and commercial interiors end to end — concept development, 3D visualisation, material selection, carpentry, electrical layout, lighting design, and final styling. Our goal is to deliver spaces that feel personal, comfortable, and built to last in Mangaluru's unique climate.`,
    benefits: [
      'Humidity-resistant materials selected for coastal environments',
      'Full 3D visualisation before work begins',
      'Custom modular furniture designed to maximise space',
      'Anti-fungal and moisture-proof finishes throughout',
      'End-to-end execution from concept to final styling',
    ],
    icon: Palette,
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
    slug: 'interior-design',
  },
  {
    id: 'painting',
    title: 'Painting',
    description: 'Expert interior and exterior painting using weather-resistant coatings for lasting colour and protection.',
    longDescription: `In a city where monsoon rains can lash walls for four months straight, the right paint job is about protection as much as appearance. ASR Corporation provides professional painting services for residential and commercial properties across Mangaluru, using premium weather-resistant coatings that stand up to the region's harsh conditions.

Our exterior painting process includes thorough surface preparation — pressure washing, crack filling, primer application, and anti-algae treatment — before the topcoat goes on. We use elastomeric and silicone-based exterior paints that flex with temperature changes and resist water penetration. For interiors, we offer a full range of finishes from matte emulsions to textured and designer wall treatments.

Colour consultation is part of every project. Our team helps you choose shades that complement Mangaluru's lush green surroundings and bright coastal light, ensuring your property looks vibrant year-round without premature fading or peeling.`,
    benefits: [
      'Weather-resistant exterior coatings for monsoon protection',
      'Anti-algae and anti-fungal surface treatments included',
      'Thorough surface preparation for long-lasting adhesion',
      'Professional colour consultation tailored to coastal light',
      'Premium paints from trusted brands with manufacturer warranty',
    ],
    icon: Paintbrush,
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800',
    slug: 'painting',
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Trusted real estate services helping you find the right property across Mangaluru and Dakshina Kannada.',
    longDescription: `ASR Corporation's real estate division connects buyers, sellers, and investors with the right opportunities across Mangaluru and the wider Dakshina Kannada district. Whether you are looking for a residential plot in Surathkal, a flat in Kankanady, or commercial space near Lalbagh, our local expertise ensures you make informed decisions.

Our team maintains an updated portfolio of verified properties — from ready-to-move apartments and independent houses to vacant plots and commercial spaces. We handle property valuation, legal due diligence, documentation support, and negotiation on your behalf, making the transaction process smooth and transparent.

As a construction company with deep roots in the region, we bring a builder's perspective to real estate. We can assess a property's structural condition, estimate renovation costs, and advise on future development potential — insights that a typical real estate agent simply cannot offer.`,
    benefits: [
      'Verified property listings across Mangaluru and Dakshina Kannada',
      'Legal due diligence and documentation support included',
      'Builder\'s perspective on structural condition and renovation costs',
      'Market-accurate property valuation and investment guidance',
      'End-to-end support from property search to registration',
    ],
    icon: MapPin,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    slug: 'real-estate',
  },
];
