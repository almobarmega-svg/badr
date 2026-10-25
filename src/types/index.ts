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

export interface ProductRecord {
  id: string;
  name: string;
  category: 'pos' | 'erp' | 'mobile' | 'clinic' | 'custom';
  price: number;
  billingType: 'monthly' | 'yearly' | 'one-time';
  licensesAvailable: number;
  description: string;
  features: string[];
  zatcaReady: boolean;
  status: 'active' | 'draft' | 'archived';
  image?: string;
  createdAt: string;
}

export interface CustomerRecord {
  id: string;
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  city: string;
  assignedSystem: string;
  planType: 'سحابي سنوي' | 'سحابي شهري' | 'ترخيص دائم';
  status: 'active' | 'trial' | 'expired';
  branchesCount: number;
  totalSpent: number;
  joinDate: string;
  notes?: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface SaleRecord {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  companyName: string;
  date: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  vatAmount: number; // 15% ZATCA VAT
  grandTotal: number;
  paymentMethod: 'مدى (Mada)' | 'تحويل بنكي' | 'بطاقة ائتمانية' | 'نقدي';
  paymentStatus: 'paid' | 'pending' | 'cancelled';
  zatcaQrCode?: string;
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

export interface HandheldSalesDevice {
  id: string;
  name: string;
  modelCode: string;
  tagline: string;
  image: string;
  colorTheme: string;
  priceSAR: number;
  bestFor: string;
  features: string[];
  specs: {
    display: string;
    printer: string;
    battery: string;
    connectivity: string;
    nfcPayment: string;
    weight: string;
  };
  sampleSales: {
    id: string;
    item: string;
    amount: number;
    time: string;
    status: string;
  }[];
}

