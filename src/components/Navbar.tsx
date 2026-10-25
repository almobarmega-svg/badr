import { useState } from 'react';
import { Layers, Menu, X, ArrowUpRight, PhoneCall, LayoutDashboard, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenDemo: (systemPreference?: string) => void;
  onOpenCalculator: () => void;
  onOpenAdmin: () => void;
  onOpenPosSimulator: () => void;
}

export default function Navbar({
  onOpenDemo,
  onOpenCalculator,
  onOpenAdmin,
  onOpenPosSimulator,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 text-slate-900 group whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-600 rounded-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                {COMPANY_INFO.name}
              </span>
            </div>
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a
              href="#products"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              الأنظمة والحلول
            </a>
            <a
              href="#services"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              الخدمات التقنية
            </a>
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                onOpenCalculator();
                const el = document.getElementById('calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              حاسبة الباقات
            </a>
            <a
              href="#case-studies"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              قصص النجاح
            </a>
            <a
              href="#faq"
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              الأسئلة الشائعة
            </a>
          </nav>

          {/* Zone 3: Actions - Interactive POS, Admin Panel & CTA */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Interactive POS Demo Button */}
            <button
              onClick={onOpenPosSimulator}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              title="تجربة واجهة الكاشير ونقاط البيع السحابية"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>المحاكي التفاعلي</span>
            </button>

            {/* Admin Dashboard Button */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap"
              title="الدخول إلى لوحة إدارة المنتجات والمبيعات"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
              <span>لوحة التحكم والإدارة</span>
            </button>

            {/* Primary Action CTA */}
            <button
              onClick={() => onOpenDemo()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all whitespace-nowrap shadow-xs"
            >
              <span>طلب عرض تجريبي</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-md"
            >
              لوحة التحكم
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPosSimulator();
            }}
            className="w-full text-right px-3 py-2 text-sm font-bold text-blue-700 bg-blue-50 rounded-lg flex items-center justify-between"
          >
            <span>المحاكي التفاعلي للكاشير (ZATCA)</span>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAdmin();
            }}
            className="w-full text-right px-3 py-2 text-sm font-bold text-slate-800 bg-slate-100 rounded-lg flex items-center justify-between"
          >
            <span>لوحة التحكم وإدارة المنتجات والعملاء</span>
            <LayoutDashboard className="w-4 h-4 text-slate-600" />
          </button>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            الأنظمة والحلول
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            الخدمات التقنية
          </a>
          <a
            href="#calculator"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCalculator();
            }}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            حاسبة الباقات والتكلفة
          </a>
          <a
            href="#case-studies"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            قصص النجاح
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            الأسئلة الشائعة
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg"
            >
              طلب عرض تجريبي مجاني
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
