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
import LivePosSimulator from './components/interactive/LivePosSimulator';
import AdminDashboard from './components/admin/AdminDashboard';
import { useAdminStore } from './hooks/useAdminStore';
import { MessageSquare, LayoutDashboard, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from './data/companyData';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'admin'>('landing');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPosSimulatorOpen, setIsPosSimulatorOpen] = useState(false);
  const [selectedSystemForDemo, setSelectedSystemForDemo] = useState<string | undefined>(undefined);

  // Admin and Live Store
  const {
    products,
    customers,
    sales,
    addProduct,
    updateProduct,
    deleteProduct,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addSale,
    updateSaleStatus,
    resetToDefaults,
  } = useAdminStore();

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

  const handleSaveSaleFromSimulator = (saleData: any) => {
    addSale(saleData);
  };

  // If in Admin Dashboard View
  if (viewMode === 'admin') {
    return (
      <>
        <AdminDashboard
          products={products}
          customers={customers}
          sales={sales}
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}
          onDeleteProduct={deleteProduct}
          onAddCustomer={addCustomer}
          onUpdateCustomer={updateCustomer}
          onDeleteCustomer={deleteCustomer}
          onAddSale={addSale}
          onUpdateSaleStatus={updateSaleStatus}
          onResetDefaults={resetToDefaults}
          onExitAdmin={() => setViewMode('landing')}
          onOpenPosSimulator={() => setIsPosSimulatorOpen(true)}
        />

        {/* Interactive POS Simulator can be opened from Admin too */}
        <LivePosSimulator
          isOpen={isPosSimulatorOpen}
          onClose={() => setIsPosSimulatorOpen(false)}
          onSaveSale={handleSaveSaleFromSimulator}
        />
      </>
    );
  }

  // Public Marketing & Presentation Website
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar with Admin & Demo toggles */}
      <Navbar
        onOpenDemo={handleOpenDemo}
        onOpenCalculator={handleOpenCalculator}
        onOpenAdmin={() => setViewMode('admin')}
        onOpenPosSimulator={() => setIsPosSimulatorOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenDemo={handleOpenDemo}
          onOpenPosSimulator={() => setIsPosSimulatorOpen(true)}
        />

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

      {/* Live Interactive POS Terminal Simulator */}
      <LivePosSimulator
        isOpen={isPosSimulatorOpen}
        onClose={() => setIsPosSimulatorOpen(false)}
        onSaveSale={handleSaveSaleFromSimulator}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-2.5">
        <button
          onClick={() => setViewMode('admin')}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group focus-visible:outline-2 focus-visible:outline-blue-500 border border-slate-700"
          aria-label="لوحة التحكم والإدارة"
        >
          <LayoutDashboard className="w-4 h-4 text-blue-400" />
          <span className="hidden sm:inline">لوحة التحكم والإدارة</span>
        </button>

        <button
          onClick={() => setIsPosSimulatorOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group focus-visible:outline-2 focus-visible:outline-blue-500"
          aria-label="محاكي الكاشير التفاعلي"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline">تجربة الكاشير التفاعلي</span>
        </button>

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
