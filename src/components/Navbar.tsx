import { useState } from 'react';
import { Layers, Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  onOpenDemo: (systemPreference?: string) => void;
  onOpenCalculator: () => void;
}

export default function Navbar({ onOpenDemo, onOpenCalculator }: NavbarProps) {
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

          {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
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

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              <span dir="ltr" className="tabular-nums font-mono">{COMPANY_INFO.phone}</span>
            </a>
            <button
              onClick={() => onOpenDemo()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all whitespace-nowrap shadow-sm hover:shadow"
            >
              <span>طلب عرض تجريبي</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenDemo()}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md"
            >
              طلب عرض
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
