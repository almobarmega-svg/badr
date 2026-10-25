import { Phone, Mail, MapPin, ArrowUp, MessageSquare, ShieldCheck } from 'lucide-react';
import AlBadrLogo from './brand/AlBadrLogo';
import { COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onOpenDemo: () => void;
  onChangePage?: (page: 'home' | 'solutions' | 'zatca' | 'roi' | 'admin') => void;
}

export default function Footer({ onOpenDemo, onChangePage }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission (5 cols) */}
          <div className="lg:col-span-5 text-right">
            <div className="mb-4">
              <AlBadrLogo variant="dark" size="md" />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              شركة رائدة ومتخصصة في تطوير الأنظمة السحابية، برامج نقاط البيع والمخازن، منظومات الـ ERP المتكاملة، وتطبيقات الجوال الذكية للشركات والمصانع في الشرق الأوسط.
            </p>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                dir="ltr"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-mono tabular-nums">{COMPANY_INFO.phone}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-slate-700 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>واتساب المبيعات</span>
              </a>
            </div>
          </div>

          {/* Navigation Links & Interactive Hubs (3 cols) */}
          <div className="lg:col-span-3 text-right">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              الصفحات والمختبر التفاعلي
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onChangePage?.('home')}
                  className="hover:text-white transition-colors text-right"
                >
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangePage?.('solutions')}
                  className="hover:text-white transition-colors text-right"
                >
                  مركز الحلول ومحاكي المستودعات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangePage?.('zatca')}
                  className="hover:text-white transition-colors text-right"
                >
                  محاكي الفاتورة ZATCA (المرحلة 2)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangePage?.('roi')}
                  className="hover:text-white transition-colors text-right"
                >
                  حاسبة العائد والوفر السنوي
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangePage?.('admin')}
                  className="text-white hover:text-slate-300 font-bold transition-colors text-right underline underline-offset-4 decoration-slate-600"
                >
                  لوحة التحكم والإدارة (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Offices (4 cols) */}
          <div className="lg:col-span-4 text-right">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              الفروع والمكاتب الإقليمية
            </div>
            <div className="space-y-3 text-xs text-slate-400">
              {COMPANY_INFO.locations.map((loc, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-200 block">
                      {loc.city} - {loc.country}
                    </span>
                    <span className="text-slate-400 text-[11px]">{loc.address}</span>
                  </div>
                </div>
              ))}
              <div className="pt-2 flex items-center gap-2 text-slate-400 text-xs">
                <Mail className="w-3.5 h-3.5 text-slate-300" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {COMPANY_INFO.name}.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>معتمد لهيئة الزكاة والضريبة والجمارك ZATCA</span>
            </span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>إلى الأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
