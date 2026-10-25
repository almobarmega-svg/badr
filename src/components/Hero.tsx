import { useState } from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Monitor, Cloud, Smartphone, Sparkles } from 'lucide-react';
import { HERO_IMAGE, COMPANY_INFO } from '../data/companyData';

interface HeroProps {
  onOpenDemo: (system?: string) => void;
  onOpenPosSimulator?: () => void;
}

export default function Hero({ onOpenDemo, onOpenPosSimulator }: HeroProps) {
  const [activeTabPreview, setActiveTabPreview] = useState<'pos' | 'erp' | 'mobile'>('pos');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200 bg-linear-to-b from-white via-slate-50 to-slate-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column (Arabic RTL: text lead on the right) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            {/* Clean unboxed kicker with dot separator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-4">
              <span>البدر للأنظمة والبرمجيات</span>
              <span aria-hidden="true">·</span>
              <span>حلول معتمدة للشركات ونقاط البيع</span>
              <span aria-hidden="true">·</span>
              <span>منذ عام 2013</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.25] text-balance mb-6">
              أنظمة سحابية ذكية تضبط المخزون والمبيعات، وترتقي بأرباح منشأتك
            </h1>

            {/* Body proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl text-balance">
              منظومة برمجية متكاملة تضم نقاط البيع السحابية (POS)، برامج تخطيط الموارد (ERP)، الفاتورة الإلكترونية المعتمدة من هيئة الزكاة والضريبة والجمارك (ZATCA)، وتطبيقات الجوال الميدانية المصممة لنمو أعمالك بدون تعقيد.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => onOpenDemo('البدر لنقاط البيع السحابية')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <span>احجز عرضاً تقديمياً مجانياً</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              {onOpenPosSimulator && (
                <button
                  onClick={onOpenPosSimulator}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-blue-800 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>تشغيل محاكي الكاشير التفاعلي</span>
                </button>
              )}
            </div>

            {/* Value checklist - clean unboxed typography */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 w-full text-slate-700 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ربط لحظي مع الفاتورة الإلكترونية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>دعم تشغيل بدون إنترنت (Offline)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>دعم فني وتدريب مجاني شامل</span>
              </div>
            </div>
          </div>

          {/* Left Column: Visual Focal Anchor & Interactive Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl">
              {/* Image Frame with proper fallback */}
              <div className="relative aspect-16/10 w-full bg-slate-800 overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="فريق هندسة وتطوير أنظمة البدر للبرمجيات"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                
                {/* Floating Trust Indicator (ZATCA Compliance) */}
                <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md text-white border border-slate-700/60 rounded-lg px-3 py-2 flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold">معتمد للفاتورة الإلكترونية (ZATCA)</span>
                </div>

                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <p className="text-xs text-slate-300 font-mono tracking-wide">
                    AL-BADR ENTERPRISE CLOUD ARCHITECTURE
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    بنية سحابية فائقة الأمان مع نسخ احتياطي وتحديثات لحظية
                  </p>
                </div>
              </div>

              {/* Interactive Module Switcher Bar */}
              <div className="p-4 bg-slate-900 text-white border-t border-slate-800">
                <div className="text-xs text-slate-400 mb-2 font-medium">
                  اختر النظام لمعاينة سريعة لأهم مميزاته:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveTabPreview('pos')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-colors ${
                      activeTabPreview === 'pos'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>نقاط البيع</span>
                  </button>
                  <button
                    onClick={() => setActiveTabPreview('erp')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-colors ${
                      activeTabPreview === 'erp'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>إدارة ERP</span>
                  </button>
                  <button
                    onClick={() => setActiveTabPreview('mobile')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-lg transition-colors ${
                      activeTabPreview === 'mobile'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>تطبيقات المبيعات</span>
                  </button>
                </div>

                {/* Switcher details text */}
                <div className="mt-3 text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
                  {activeTabPreview === 'pos' && (
                    <div className="flex justify-between items-center">
                      <span>إصدار فواتير كاشير فورية، ربط أجهزة مدى، باركود، وتوافق تام مع الطابعات الحرارية.</span>
                      {onOpenPosSimulator ? (
                        <button
                          onClick={onOpenPosSimulator}
                          className="text-emerald-400 font-bold hover:underline shrink-0 mr-2 flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>فتح المحاكي</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenDemo('البدر لنقاط البيع POS')}
                          className="text-blue-400 font-bold hover:underline shrink-0 mr-2"
                        >
                          تجربة
                        </button>
                      )}
                    </div>
                  )}
                  {activeTabPreview === 'erp' && (
                    <div className="flex justify-between items-center">
                      <span>إدارة المخازن المتعددة، شجرة الحسابات، دورة المشتريات، وتقارير الأرباح والمبيعات.</span>
                      <button
                        onClick={() => onOpenDemo('البدر لإدارة المؤسسات ERP')}
                        className="text-blue-400 font-bold hover:underline shrink-0 mr-2"
                      >
                        تجربة
                      </button>
                    </div>
                  )}
                  {activeTabPreview === 'mobile' && (
                    <div className="flex justify-between items-center">
                      <span>تطبيقات المناديب والمبيعات الميدانية مع تتبع المواقع وإصدار الفواتير فوراً.</span>
                      <button
                        onClick={() => onOpenDemo('تطبيقات الجوال والمتاجر الذكية')}
                        className="text-blue-400 font-bold hover:underline shrink-0 mr-2"
                      >
                        تجربة
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
