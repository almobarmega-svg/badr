import { useState, useEffect } from 'react';
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
import SolutionsHubPage from './components/pages/SolutionsHubPage';
import ZatcaStudioPage from './components/pages/ZatcaStudioPage';
import RoiCalculatorPage from './components/pages/RoiCalculatorPage';
import { useAdminStore } from './hooks/useAdminStore';
import { 
  MessageSquare, LayoutDashboard, Sparkles, ShieldCheck, 
  TrendingUp, Home, Database, Layers
} from 'lucide-react';
import { COMPANY_INFO } from './data/companyData';

type PageView = 'home' | 'solutions' | 'zatca' | 'roi' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isPosSimulatorOpen, setIsPosSimulatorOpen] = useState(false);
  const [selectedSystemForDemo, setSelectedSystemForDemo] = useState<string | undefined>(undefined);

  // Admin Data Store
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

  // Scroll to top when changing page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleOpenDemo = (systemTitle?: string) => {
    setSelectedSystemForDemo(systemTitle);
    setIsDemoModalOpen(true);
  };

  const handleOpenCalculator = () => {
    setCurrentPage('roi');
  };

  const handleSelectPlanFromCalculator = (planDetails: string) => {
    setSelectedSystemForDemo(planDetails);
    setIsDemoModalOpen(true);
  };

  const handleSaveSaleFromSimulator = (saleData: any) => {
    addSale(saleData);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white" dir="rtl">
      {/* Top Navbar with Active Page Tabs */}
      <Navbar
        activePage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
        onOpenDemo={handleOpenDemo}
        onOpenPosSimulator={() => setIsPosSimulatorOpen(true)}
      />

      {/* Dynamic Main Viewport */}
      <main className="flex-1">
        {/* Page 1: Home / Landing Overview */}
        {currentPage === 'home' && (
          <>
            <Hero
              onOpenDemo={handleOpenDemo}
              onOpenPosSimulator={() => setIsPosSimulatorOpen(true)}
            />
            <TrustStrip />
            
            {/* Interactive Feature Banner: Quick Access to Interactive Studios */}
            <section className="py-8 bg-[#0F172A] text-white border-y border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400 font-bold block mb-1">
                      INTERACTIVE PLATFORM EXPERIENCES
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      استكشف صفحات المحاكاة التفاعلية المتخصصة
                    </h2>
                    <p className="text-xs text-slate-300 mt-1">
                      جرّب بنفسك: مناقلات المستودعات السحابية، التحقق من الفاتورة الإلكترونية ZATCA، وحاسبة العائد المالي.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => setCurrentPage('solutions')}
                      className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>مركز الحلول والمستودعات</span>
                    </button>

                    <button
                      onClick={() => setCurrentPage('zatca')}
                      className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>محاكي الزكاة ZATCA</span>
                    </button>

                    <button
                      onClick={() => setCurrentPage('roi')}
                      className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                      <span>حاسبة الوفر والعائد</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <ProductsSection onOpenDemo={handleOpenDemo} />
            <ServicesSection onOpenDemo={handleOpenDemo} />
            <InteractiveCalculator onSelectPlan={handleSelectPlanFromCalculator} />
            <CaseStudiesSection onOpenDemo={handleOpenDemo} />
            <TestimonialsSection />
            <FaqSection />
          </>
        )}

        {/* Page 2: Interactive Solutions Suite */}
        {currentPage === 'solutions' && (
          <SolutionsHubPage
            onOpenDemo={handleOpenDemo}
            onOpenPosSimulator={() => setIsPosSimulatorOpen(true)}
          />
        )}

        {/* Page 3: ZATCA Phase 2 Studio & Validator */}
        {currentPage === 'zatca' && (
          <ZatcaStudioPage />
        )}

        {/* Page 4: ROI & Pricing Suite */}
        {currentPage === 'roi' && (
          <RoiCalculatorPage onOpenDemo={handleOpenDemo} />
        )}

        {/* Page 5: Master Admin Control Panel */}
        {currentPage === 'admin' && (
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
            onExitAdmin={() => setCurrentPage('home')}
            onOpenPosSimulator={() => setIsPosSimulatorOpen(true)}
          />
        )}
      </main>

      {/* Footer (rendered on non-admin pages) */}
      {currentPage !== 'admin' && (
        <Footer
          onOpenDemo={() => handleOpenDemo()}
          onChangePage={(page) => setCurrentPage(page)}
        />
      )}

      {/* Consultation / Demo Request Modal */}
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

      {/* Floating Action Navigation Dock */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-2.5">
        {/* Quick jump to Admin */}
        <button
          onClick={() => setCurrentPage('admin')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group focus-visible:outline-2 ${
            currentPage === 'admin'
              ? 'bg-[#0F172A] text-white ring-2 ring-white/20'
              : 'bg-[#0F172A] hover:bg-slate-800 text-white border border-slate-700'
          }`}
          aria-label="لوحة التحكم والإدارة"
        >
          <LayoutDashboard className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">لوحة التحكم والإدارة</span>
        </button>

        {/* Quick launch POS Simulator */}
        <button
          onClick={() => setIsPosSimulatorOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group focus-visible:outline-2 focus-visible:outline-slate-900"
          aria-label="محاكي الكاشير التفاعلي"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline">محاكي الكاشير التفاعلي</span>
        </button>

        {/* Direct WhatsApp */}
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن أنظمة شركة البدر للبرمجيات')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 group focus-visible:outline-2 focus-visible:outline-emerald-500"
          aria-label="تواصل مباشر عبر الواتساب"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">واتساب المبيعات</span>
        </a>
      </div>
    </div>
  );
}
