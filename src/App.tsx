import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import ProductsSection from './components/ProductsSection';
import ServicesSection from './components/ServicesSection';
import InteractiveCalculator from './components/InteractiveCalculator';
import CaseStudiesSection from './components/CaseStudiesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from './data/companyData';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedSystemForDemo, setSelectedSystemForDemo] = useState<string | undefined>(undefined);

  const handleOpenDemo = (systemTitle?: string) => {
    setSelectedSystemForDemo(systemTitle);
    setIsDemoModalOpen(true);
  };

  const handleOpenCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlanFromCalculator = (planDetails: string) => {
    setSelectedSystemForDemo(planDetails);
    setIsDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar strictly following 3-zone contract */}
      <Navbar
        onOpenDemo={handleOpenDemo}
        onOpenCalculator={handleOpenCalculator}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* Proof & Trust Strip adjacent to Hero */}
        <TrustStrip />

        {/* Flagship Products Showcase with Interactive Simulation */}
        <ProductsSection onOpenDemo={handleOpenDemo} />

        {/* Engineering & Specialized Technical Services */}
        <ServicesSection onOpenDemo={handleOpenDemo} />

        {/* Interactive Pricing & ROI Estimator */}
        <InteractiveCalculator onSelectPlan={handleSelectPlanFromCalculator} />

        {/* Quantified Evidence & Case Studies */}
        <CaseStudiesSection onOpenDemo={handleOpenDemo} />

        {/* Attributable Client Testimonials */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenDemo={() => handleOpenDemo()} />

      {/* Interactive Consultation / Demo Request Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        initialSystem={selectedSystemForDemo}
      />

      {/* Floating Action Button for Direct WhatsApp & Support */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-2.5">
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن أنظمة شركة البدر للبرمجيات')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group focus-visible:outline-2 focus-visible:outline-emerald-500"
          aria-label="تواصل مباشر عبر الواتساب"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">محادثة واتساب مباشرة</span>
        </a>
      </div>
    </div>
  );
}
