import { useState } from 'react';
import { Menu, X, ArrowUpRight, LayoutDashboard, Sparkles } from 'lucide-react';
import AlBadrLogo from './brand/AlBadrLogo';

interface NavbarProps {
  activePage: 'home' | 'solutions' | 'zatca' | 'roi' | 'admin';
  onChangePage: (page: 'home' | 'solutions' | 'zatca' | 'roi' | 'admin') => void;
  onOpenDemo: (systemPreference?: string) => void;
  onOpenPosSimulator: () => void;
}

export default function Navbar({
  activePage,
  onChangePage,
  onOpenDemo,
  onOpenPosSimulator,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: 'home' | 'solutions' | 'zatca' | 'roi'; label: string }[] = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'solutions', label: 'مركز الأنظمة التفاعلي' },
    { id: 'zatca', label: 'محاكي الفاتورة ZATCA' },
    { id: 'roi', label: 'حاسبة العائد المالي' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract in Navy Blue & White */}
        <div className="flex items-center justify-between gap-6 h-18">
          
          {/* Zone 1: Bespoke Brand Emblem & Wordmark */}
          <button
            onClick={() => onChangePage('home')}
            className="flex items-center text-right group whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-slate-900 rounded-sm"
          >
            <AlBadrLogo size="md" />
          </button>

          {/* Zone 2: Concise Navigation Links with Navy Active Highlight */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-semibold text-slate-700">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangePage(item.id)}
                  className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#0F172A] text-white font-bold shadow-xs'
                      : 'hover:text-slate-950 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions - POS Simulator, Admin Portal & Primary CTA in Navy & White */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Live POS simulator */}
            <button
              onClick={onOpenPosSimulator}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap border border-slate-200"
              title="تجربة كاشير نقاط البيع"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-700" />
              <span>محاكي الكاشير</span>
            </button>

            {/* Admin Dashboard */}
            <button
              onClick={() => onChangePage('admin')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap border ${
                activePage === 'admin'
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs'
                  : 'text-slate-800 bg-white border-slate-300 hover:bg-slate-50'
              }`}
              title="لوحة إدارة المنتجات والعملاء والمبيعات"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-700" />
              <span>لوحة التحكم</span>
            </button>

            {/* Primary Action CTA in Deep Navy */}
            <button
              onClick={() => onOpenDemo()}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] active:scale-[0.98] rounded-lg transition-all whitespace-nowrap shadow-xs"
            >
              <span>طلب عرض تجريبي</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onChangePage('admin')}
              className="px-2.5 py-1.5 text-xs font-bold text-white bg-[#0F172A] rounded-md"
            >
              لوحة التحكم
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onChangePage(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-right px-3 py-2 text-sm font-semibold rounded-lg ${
                activePage === item.id ? 'bg-[#0F172A] text-white font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPosSimulator();
                setMobileMenuOpen(false);
              }}
              className="w-full text-right px-3 py-2 text-sm font-bold text-slate-900 bg-slate-100 rounded-lg flex items-center justify-between"
            >
              <span>محاكي الكاشير التفاعلي</span>
              <Sparkles className="w-4 h-4 text-slate-700" />
            </button>

            <button
              onClick={() => {
                onChangePage('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-right px-3 py-2 text-sm font-bold text-white bg-[#0F172A] rounded-lg flex items-center justify-between"
            >
              <span>لوحة التحكم والإدارة</span>
              <LayoutDashboard className="w-4 h-4 text-slate-300" />
            </button>

            <button
              onClick={() => {
                onOpenDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-bold text-white bg-[#0F172A] rounded-lg"
            >
              طلب عرض تجريبي مجاني
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
