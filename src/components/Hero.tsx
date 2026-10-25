import { useState } from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2, Monitor, Cloud, Smartphone, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/companyData';

interface HeroProps {
  onOpenDemo: (system?: string) => void;
  onOpenPosSimulator?: () => void;
}

export default function Hero({ onOpenDemo, onOpenPosSimulator }: HeroProps) {
  const [activeTabPreview, setActiveTabPreview] = useState<'pos' | 'erp' | 'mobile'>('pos');
  const [heroImageError, setHeroImageError] = useState(false);

  // Dynamic preview image based on active tab
  const getPreviewImage = () => {
    switch (activeTabPreview) {
      case 'pos':
        return '/images/hero_handheld_pos_enterprise_1792945986584.jpg';
      case 'erp':
        return '/images/cloud_pos_handheld_duo_1792945989475.jpg';
      case 'mobile':
        return '/images/mobile_sales_device_3d_1792945988780.jpg';
      default:
        return HERO_IMAGE;
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200 bg-linear-to-b from-white via-slate-50/50 to-slate-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column: Navy Typography & Messaging */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            {/* Clean unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-4">
              <span className="font-mono text-slate-500 uppercase tracking-wider">AL-BADR ENTERPRISE</span>
              <span aria-hidden="true">·</span>
              <span>حلول برمجية سحابية معتمدة للشركات ونقاط البيع</span>
              <span aria-hidden="true">·</span>
              <span>منذ عام 2013</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.25] text-balance mb-6">
              أنظمة سحابية ذكية تضبط المخزون والمبيعات، وترتقي بأرباح منشأتك
            </h1>

            {/* Body proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl text-balance">
              منظومة برمجية متكاملة تضم نقاط البيع السحابية (POS)، برامج تخطيط الموارد (ERP)، الفاتورة الإلكترونية المعتمدة من هيئة الزكاة والضريبة والجمارك (ZATCA)، وتطبيقات الجوال الميدانية المصممة لنمو أعمالك بدون تعقيد.
            </p>

            {/* CTAs in Navy Blue & Crisp White */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => onOpenDemo('البدر لنقاط البيع السحابية')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-[#0F172A] rounded-xl hover:bg-[#1E293B] active:scale-[0.98] transition-all shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-slate-900"
              >
                <span>احجز عرضاً تقديمياً مجانياً</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              {onOpenPosSimulator && (
                <button
                  onClick={onOpenPosSimulator}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-slate-700" />
                  <span>تشغيل محاكي الكاشير التفاعلي</span>
                </button>
              )}
            </div>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 w-full text-slate-800 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
                <span>ربط لحظي مع الفاتورة الإلكترونية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
                <span>دعم تشغيل بدون إنترنت (Offline)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0" />
                <span>دعم فني وتدريب مجاني شامل</span>
              </div>
            </div>
          </div>

          {/* Left Column: Deep Navy Visual Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-[#0A192F] border border-slate-300 shadow-xl">
              {/* Image Frame */}
              <div className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden">
                {!heroImageError ? (
                  <img
                    src={getPreviewImage()}
                    alt="أجهزة نقاط البيع المحمولة الذكية ثلاثية الأبعاد - شركة البدر للبرمجيات"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImageError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 flex flex-col justify-between text-right">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400">AL-BADR 3D SMART POS</span>
                      <Smartphone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">أجهزة المبيعات المحمولة الحديثة</h3>
                      <p className="text-xs text-slate-300">كاشير وطابعة فواتير ZATCA وماسح باركود في جهاز واحد</p>
                    </div>
                    <div className="text-xs font-mono text-emerald-400">100% ZATCA Compliant</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#0A192F] via-[#0A192F]/30 to-transparent pointer-events-none" />
                
                {/* Floating 3D Device / ZATCA Indicator */}
                <div className="absolute top-4 right-4 bg-[#0F172A]/90 backdrop-blur-md text-white border border-blue-500/40 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-semibold shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>أجهزة مبيعات 3D معتمدة للزكاة (ZATCA)</span>
                </div>

                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <p className="text-xs text-cyan-300 font-mono tracking-wide">
                    AL-BADR 3D SMART HANDHELD POS SYSTEM
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    أجهزة كاشير محمولة ذكية باللون الأزرق الأنيق مع تحصيل فوري وطباعة إيصالات
                  </p>
                </div>
              </div>

              {/* Module Switcher Bar */}
              <div className="p-4 bg-[#0A192F] text-white border-t border-slate-800">
                <div className="text-xs text-slate-300 mb-2 font-medium">
                  اختر النظام لمعاينة سريعة لأهم مميزاته:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setActiveTabPreview('pos')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-bold rounded-lg transition-colors ${
                      activeTabPreview === 'pos'
                        ? 'bg-white text-[#0A192F] shadow-xs'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>نقاط البيع</span>
                  </button>
                  <button
                    onClick={() => setActiveTabPreview('erp')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-bold rounded-lg transition-colors ${
                      activeTabPreview === 'erp'
                        ? 'bg-white text-[#0A192F] shadow-xs'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>إدارة ERP</span>
                  </button>
                  <button
                    onClick={() => setActiveTabPreview('mobile')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-bold rounded-lg transition-colors ${
                      activeTabPreview === 'mobile'
                        ? 'bg-white text-[#0A192F] shadow-xs'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>تطبيقات المبيعات</span>
                  </button>
                </div>

                {/* Switcher details text */}
                <div className="mt-3 text-xs text-slate-300 leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                  {activeTabPreview === 'pos' && (
                    <div className="flex justify-between items-center">
                      <span>إصدار فواتير كاشير فورية، ربط أجهزة مدى، باركود، وتوافق تام مع الطابعات الحرارية.</span>
                      {onOpenPosSimulator && (
                        <button
                          onClick={onOpenPosSimulator}
                          className="text-white font-bold underline shrink-0 mr-2 flex items-center gap-1 hover:text-slate-200"
                        >
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>فتح المحاكي</span>
                        </button>
                      )}
                    </div>
                  )}
                  {activeTabPreview === 'erp' && (
                    <div className="flex justify-between items-center">
                      <span>إدارة المخازن المتعددة، شجرة الحسابات، دورة المشتريات، وتقارير الأرباح والمبيعات.</span>
                      <button
                        onClick={() => onOpenDemo('البدر لإدارة المؤسسات ERP')}
                        className="text-white font-bold underline shrink-0 mr-2 hover:text-slate-200"
                      >
                        تفاصيل
                      </button>
                    </div>
                  )}
                  {activeTabPreview === 'mobile' && (
                    <div className="flex justify-between items-center">
                      <span>تطبيقات المناديب والمبيعات الميدانية مع تتبع المواقع وإصدار الفواتير فوراً.</span>
                      <button
                        onClick={() => onOpenDemo('تطبيقات الجوال والمتاجر الذكية')}
                        className="text-white font-bold underline shrink-0 mr-2 hover:text-slate-200"
                      >
                        تفاصيل
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
