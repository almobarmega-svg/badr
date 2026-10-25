import { useState } from 'react';
import { Check, ArrowLeft } from 'lucide-react';

interface CalculatorProps {
  onSelectPlan: (planDetails: string) => void;
}

export default function InteractiveCalculator({ onSelectPlan }: CalculatorProps) {
  const [sector, setSector] = useState<'retail' | 'wholesale' | 'fnb' | 'medical'>('retail');
  const [deployment, setDeployment] = useState<'cloud' | 'onpremise'>('cloud');
  const [branches, setBranches] = useState<number>(1);
  const [users, setUsers] = useState<number>(2);
  const [includeMobileApp, setIncludeMobileApp] = useState<boolean>(false);
  const [includeZatcaPhase2, setIncludeZatcaPhase2] = useState<boolean>(true);

  // Sector metadata
  const sectorsConfig = {
    retail: {
      name: 'محلات وتجارة التجزئة',
      recommendedSystem: 'البدر للمبيعات ونقاط البيع (POS)',
      baseMonthlyPerBranch: 140,
      baseOnPremisePerBranch: 1800,
    },
    wholesale: {
      name: 'المخازن وتجارة الجملة والتوزيع',
      recommendedSystem: 'البدر لإدارة المؤسسات والمخازن (ERP)',
      baseMonthlyPerBranch: 260,
      baseOnPremisePerBranch: 3200,
    },
    fnb: {
      name: 'المطاعم والكافيهات',
      recommendedSystem: 'البدر للمطاعم ونقاط البيع السريعة',
      baseMonthlyPerBranch: 160,
      baseOnPremisePerBranch: 2100,
    },
    medical: {
      name: 'العيادات والمراكز الطبية',
      recommendedSystem: 'البدر لإدارة العيادات والمراكز الصحية',
      baseMonthlyPerBranch: 220,
      baseOnPremisePerBranch: 2800,
    },
  };

  const selectedConfig = sectorsConfig[sector];

  // Calculation formula
  const basePrice =
    deployment === 'cloud'
      ? selectedConfig.baseMonthlyPerBranch * branches + (users > branches * 2 ? (users - branches * 2) * 35 : 0)
      : selectedConfig.baseOnPremisePerBranch * branches;

  const mobileAppCost = includeMobileApp ? (deployment === 'cloud' ? 95 : 1200) : 0;
  const zatcaCost = includeZatcaPhase2 ? (deployment === 'cloud' ? 50 : 600) : 0;

  const totalCalculated = basePrice + mobileAppCost + zatcaCost;

  const handleBookSelectedPackage = () => {
    const summary = `باقة ${selectedConfig.name} (${deployment === 'cloud' ? 'سحابي سنوي' : 'ترخيص دائم'}) - ${branches} فروع - ${users} مستخدمين`;
    onSelectPlan(summary);
  };

  return (
    <section id="calculator" className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 text-right">
          <div className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
            حاسبة الباقات وتقدير التكلفة
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight text-balance">
            خصص الباقة المناسبة لحجم وطبيعة عملك بدقة
          </h2>
          <p className="mt-3 text-base text-slate-600 text-balance">
            حدد نشاط منشأتك وعدد الفروع والمستخدمين لمعرفة النظام الأنسب لك وتقدير التكلفة الاستثمارية فوراً بدون أي التزام.
          </p>
        </div>

        {/* Interactive Calculator Form Grid in Navy & White */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            {/* 1. Sector Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-3">
                1. نوع النشاط التجاري أو الخدمي:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(sectorsConfig) as Array<keyof typeof sectorsConfig>).map((key) => {
                  const item = sectorsConfig[key];
                  const isSelected = sector === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSector(key)}
                      className={`p-3 text-center rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Deployment Model */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-3">
                2. نموذج التشغيل المفضل:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeployment('cloud')}
                  className={`p-4 rounded-xl text-right transition-all border ${
                    deployment === 'cloud'
                      ? 'bg-slate-50 border-[#0F172A] text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-[#0F172A]">سحابي (Cloud SaaS)</span>
                    <span className="text-[11px] font-bold text-slate-700">اشتراك سنوي</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">
                    يشمل الاستضافة السحابية الآمنة، النسخ الاحتياطي اليومي، وتحديثات النظام الدورية مجاناً.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeployment('onpremise')}
                  className={`p-4 rounded-xl text-right transition-all border ${
                    deployment === 'onpremise'
                      ? 'bg-slate-50 border-[#0F172A] text-slate-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-[#0F172A]">ترخيص مكتبي دائم</span>
                    <span className="text-[11px] font-bold text-slate-700">شراء لمرة واحدة</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">
                    تثبيت البرنامج محلياً على أجهزة المنشأة وشبكتها الداخلية بملكية دائمة للترخيص.
                  </p>
                </button>
              </div>
            </div>

            {/* 3. Branch & User Count Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-900">
                    عدد الفروع أو نقاط البيع:
                  </label>
                  <span className="font-mono tabular-nums text-sm font-bold text-[#0F172A]">
                    {branches} {branches === 1 ? 'فرع' : 'فروع'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={branches}
                  onChange={(e) => setBranches(parseInt(e.target.value, 10))}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>1 فرع</span>
                  <span>15 فرع</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-900">
                    عدد المستخدمين المتزامنين:
                  </label>
                  <span className="font-mono tabular-nums text-sm font-bold text-[#0F172A]">
                    {users} مستخدم
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={users}
                  onChange={(e) => setUsers(parseInt(e.target.value, 10))}
                  className="w-full accent-slate-900 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>
            </div>

            {/* 4. Add-on Checkboxes */}
            <div className="pt-2 border-t border-slate-100">
              <span className="block text-xs font-bold text-slate-900 mb-3">
                خيارات ومميزات إضافية موصى بها:
              </span>
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeZatcaPhase2}
                    onChange={(e) => setIncludeZatcaPhase2(e.target.checked)}
                    className="w-4 h-4 text-slate-900 rounded-sm accent-slate-900"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">تفعيل الربط المباشر مع الفاتورة الإلكترونية (ZATCA)</span>
                    <span className="text-slate-500 block">إرسال الفواتير واعتمادها لحظياً وتوليد الـ QR المشفر</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeMobileApp}
                    onChange={(e) => setIncludeMobileApp(e.target.checked)}
                    className="w-4 h-4 text-slate-900 rounded-sm accent-slate-900"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">تطبيق الجوال للمبيعات والمناديب الميدانيين</span>
                    <span className="text-slate-500 block">إصدار فواتير وتحصيل من موقع العميل وتتبع جغرافي</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Result Card & Recommendation in Deep Navy & White */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-right sticky top-24">
            <div className="text-xs font-bold text-slate-500 mb-1">
              التوصية والتقدير المالي المقترح:
            </div>
            
            <h3 className="text-xl font-black text-[#0F172A] mb-2">
              {selectedConfig.recommendedSystem}
            </h3>

            <p className="text-xs text-slate-500 mb-6">
              باقة مجهزة خصيصاً لتناسب {selectedConfig.name} مع {branches} {branches === 1 ? 'فرع' : 'فروع'}.
            </p>

            {/* Estimated Price Display */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
              <div className="text-xs text-slate-500 mb-1">
                {deployment === 'cloud' ? 'الاشتراك التقديري يبدأ من:' : 'تكلفة الترخيص التقديرية لمرة واحدة:'}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#0F172A] font-mono tabular-nums">
                  {totalCalculated.toLocaleString('en-US')}
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {deployment === 'cloud' ? 'ر.س / شهرياً' : 'ر.س (ترخيص دائم)'}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                * تطبق خصومات مميزة للاشتراك السنوي والمؤسسات متعددة الفروع.
              </div>
            </div>

            {/* What's included checklist */}
            <div className="space-y-2 mb-8 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ترحيل كافة بيانات الأصناف والمخزون مجاناً</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>جلسة تدريبية شاملة للموظفين وإعداد الطابعات</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>دعم فني مباشر عبر الهاتف والواتساب</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ضمان كامل لتوافق الفاتورة الإلكترونية مع الأنظمة الرسمية</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleBookSelectedPackage}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              <span>طلب هذا العرض واستلام تجربة مجانية</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-slate-400 text-center mt-3">
              سيتواصل معك مستشار فني متخصص خلال أقل من 15 دقيقة لمساعدتك.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
