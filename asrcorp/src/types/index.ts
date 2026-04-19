import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  benefits: string[];
  icon: LucideIcon;
  imageUrl: string;
  slug: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: number;
  imageUrl: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  areaSqft: number;
  budgetRange: string;
  notes: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
}
