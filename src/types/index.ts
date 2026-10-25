export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  suitedFor: string[];
  zatcaCompliant: boolean;
  demoUrl?: string;
  badge?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  duration: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  sector: string;
  location: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  location: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface DemoRequestData {
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  systemInterest: string;
  branchesCount: string;
  notes?: string;
}
