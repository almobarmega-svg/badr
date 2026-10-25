import { useState } from 'react';
import { 
  Monitor, Database, Smartphone, Stethoscope, ArrowLeft, 
  Check, Truck, MapPin, Box, Layers
} from 'lucide-react';

interface SolutionsHubPageProps {
  onOpenDemo: (systemName: string) => void;
  onOpenPosSimulator: () => void;
}

export default function SolutionsHubPage({ onOpenDemo, onOpenPosSimulator }: SolutionsHubPageProps) {
  const [activeSystem, setActiveSystem] = useState<'erp' | 'pos' | 'mobile' | 'clinic'>('erp');

  // ERP State: Warehouse Transfer Simulator
  const [stockRiyadh, setStockRiyadh] = useState(480);
  const [stockJeddah, setStockJeddah] = useState(120);
  const [transferAmount, setTransferAmount] = useState(30);
  const [transferLogs, setTransferLogs] = useState<string[]>([
    'تم اعتماد أمر صرف مخزني رقم TR-2026-901 من مستودع الرياض إلى فرع جدة (30 وحدة)',
    'اكتمال جرد الربع الأول في مستودع الرياض بنسبة مطابقة 99.8%',
  ]);

  const handleExecuteTransfer = () => {
    if (stockRiyadh < transferAmount) return;
    setStockRiyadh((prev) => prev - transferAmount);
    setStockJeddah((prev) => prev + transferAmount);
    const log = `تم نقل ${transferAmount} وحدة من مستودع الرياض إلى مستودع جدة بتاريخ اليوم (${new Date().toLocaleTimeString('ar-SA')})`;
    setTransferLogs((prev) => [log, ...prev.slice(0, 4)]);
  };

  // Mobile Field Rep State: Visits & Route simulation
  const [repsVisits] = useState([
    { id: 1, client: 'سوبرماركت النخبة', time: '09:30 ص', status: 'completed', amount: '1,450 ر.س' },
    { id: 2, client: 'مؤسسة الوفاء للتجارة', time: '11:15 ص', status: 'completed', amount: '2,800 ر.س' },
    { id: 3, client: 'بقالة السلام الحديثة', time: '01:45 م', status: 'in-progress', amount: 'قيد الزيارة' },
    { id: 4, client: 'تموينات الأمل المركزية', time: '03:30 م', status: 'pending', amount: 'بانتظار الوصول' },
  ]);

  // Clinic State: Appointments & Prescription
  const [patientQueue] = useState([
    { id: 'PT-101', name: 'أحمد بن عبد الله', doctor: 'د. خالد العمري (استشاري باطنة)', time: '10:00 ص', status: 'مكتمل' },
    { id: 'PT-102', name: 'سارة عبد الرحمن', doctor: 'د. منى الشريف (طب أطفال)', time: '10:30 ص', status: 'داخل العيادة' },
    { id: 'PT-103', name: 'محمد عبد العزيز', doctor: 'د. خالد العمري (استشاري باطنة)', time: '11:00 ص', status: 'في الانتظار' },
  ]);

  return (
    <div className="py-12 bg-slate-50 min-h-screen text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-900 text-xs font-bold border border-slate-300 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>المختبر التفاعلي لأنظمة البدر البرمجية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight text-balance">
            جرّب كفاءة الأنظمة وتكاملها السحابي بشكل حي
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            استكشف واجهات التشغيل التفاعلية لمختلف المنظومات: إدارة المخازن والمؤسسات، نقاط البيع، تتبع المناديب الميدانية، والأنظمة الطبية.
          </p>
        </div>

        {/* System Selector Tabs in Navy & White */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setActiveSystem('erp')}
            className={`p-4 rounded-xl border text-right transition-all flex items-center justify-between ${
              activeSystem === 'erp'
                ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="text-xs font-bold opacity-80 block mb-0.5">منظومة ERP</div>
              <div className="text-sm font-extrabold">إدارة المخازن والمؤسسات</div>
            </div>
            <Database className="w-5 h-5 opacity-90" />
          </button>

          <button
            onClick={() => setActiveSystem('pos')}
            className={`p-4 rounded-xl border text-right transition-all flex items-center justify-between ${
              activeSystem === 'pos'
                ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="text-xs font-bold opacity-80 block mb-0.5">نظام POS</div>
              <div className="text-sm font-extrabold">المبيعات ونقاط البيع</div>
            </div>
            <Monitor className="w-5 h-5 opacity-90" />
          </button>

          <button
            onClick={() => setActiveSystem('mobile')}
            className={`p-4 rounded-xl border text-right transition-all flex items-center justify-between ${
              activeSystem === 'mobile'
                ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="text-xs font-bold opacity-80 block mb-0.5">تطبيقات ذكية</div>
              <div className="text-sm font-extrabold">المناديب والمبيعات الميدانية</div>
            </div>
            <Smartphone className="w-5 h-5 opacity-90" />
          </button>

          <button
            onClick={() => setActiveSystem('clinic')}
            className={`p-4 rounded-xl border text-right transition-all flex items-center justify-between ${
              activeSystem === 'clinic'
                ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div>
              <div className="text-xs font-bold opacity-80 block mb-0.5">القطاع الصحي</div>
              <div className="text-sm font-extrabold">المراكز الطبية والعيادات</div>
            </div>
            <Stethoscope className="w-5 h-5 opacity-90" />
          </button>
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* 1. ERP & WAREHOUSE TRANSFER SIMULATOR */}
          {activeSystem === 'erp' && (
            <div className="p-6 sm:p-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                    نظام البدر السحابي لإدارة المؤسسات والمخازن (ERP Suite)
                  </span>
                  <h2 className="text-2xl font-black text-[#0F172A] mt-1">
                    محاكي نقل البضائع بين المستودعات والجرد اللحظي
                  </h2>
                </div>
                <button
                  onClick={() => onOpenDemo('البدر لإدارة المؤسسات ERP')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-colors shadow-xs"
                >
                  طلب تجربة كاملة لنظام ERP
                </button>
              </div>

              {/* Interactive Transfer Engine */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
                {/* Warehouse A: Riyadh */}
                <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-900 flex items-center justify-center mx-auto mb-3">
                    <Box className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    المستودع الرئيسي (الرياض)
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">كود المستودع: WH-RUH-01</p>
                  
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">الرصيد المخزني الحالي:</span>
                    <span className="text-3xl font-black text-[#0F172A] font-mono tabular-nums">
                      {stockRiyadh}
                    </span>
                    <span className="text-xs text-slate-500 mr-1">وحدة</span>
                  </div>
                </div>

                {/* Transfer Action Center */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4">
                  <div className="text-xs font-bold text-slate-700 mb-2">
                    الكمية المطلوب نقلها وتحويلها:
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setTransferAmount(Math.max(5, transferAmount - 5))}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-xl font-black text-[#0F172A] font-mono tabular-nums w-16">
                      {transferAmount}
                    </span>
                    <button
                      onClick={() => setTransferAmount(Math.min(stockRiyadh, transferAmount + 5))}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleExecuteTransfer}
                    disabled={stockRiyadh < transferAmount}
                    className="w-full py-3 px-6 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>تنفيذ أمر المناقلة السحابية فوراً</span>
                  </button>
                  <span className="text-[11px] text-slate-400 mt-2">
                    يتم إصدار سند إخراج وسند استلام آلياً
                  </span>
                </div>

                {/* Warehouse B: Jeddah */}
                <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-900 flex items-center justify-center mx-auto mb-3">
                    <Box className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    مستودع التوزيع (جدة)
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">كود المستودع: WH-JED-02</p>
                  
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">الرصيد المخزني الحالي:</span>
                    <span className="text-3xl font-black text-[#0F172A] font-mono tabular-nums">
                      {stockJeddah}
                    </span>
                    <span className="text-xs text-slate-500 mr-1">وحدة</span>
                  </div>
                </div>
              </div>

              {/* Audit Trail & Ledger in Midnight Navy */}
              <div className="bg-[#0A192F] text-slate-200 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-white">سجل حركات النظام والتدقيق المحاسبي المباشر (Audit Log):</span>
                  <span className="font-mono text-emerald-400 font-semibold">STATUS: REALTIME SYNC</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  {transferLogs.map((log, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-900 rounded-lg text-slate-300 border border-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. POS INTERACTIVE SYSTEM */}
          {activeSystem === 'pos' && (
            <div className="p-6 sm:p-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                    البدر لنقاط البيع السحابية (POS Pro)
                  </span>
                  <h2 className="text-2xl font-black text-[#0F172A] mt-1">
                    محطة الكاشير السريعة مع الفاتورة الإلكترونية المعتمدة
                  </h2>
                </div>
                <button
                  onClick={onOpenPosSimulator}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-colors shadow-xs"
                >
                  فتح المحاكي التفاعلي للكاشير بالكامل
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="text-base font-bold text-slate-900 mb-2">أجهزة الكاشير ونقاط البيع المحمولة الذكية (Smart 3D POS)</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      أجهزة مبيعات متطورة تجمع شاشة اللمس السريعة، طابعة الفواتير الحرارية، وماسح الباركود في قبضة يد واحدة، مع دعم كامل للفاتورة الإلكترونية المعتمدة ZATCA والعمل بدون اتصال بالإنترنت.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>طباعة إيصالات ZATCA فورية</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>دفع ببطاقات مدى وApple Pay</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>بطارية ضخمة تدوم 24 ساعة</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>مزامنة سحابية مع الفروع والمخازن</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={onOpenPosSimulator}
                      className="px-6 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-xs"
                    >
                      تشغيل محاكي الكاشير التفاعلي
                    </button>
                    <button
                      onClick={() => onOpenDemo('أجهزة نقاط البيع المحمولة')}
                      className="px-5 py-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300"
                    >
                      طلب تسعير الأجهزة المحمولة
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-xl group">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <img
                      src="/images/handheld_pos_3d_blue_1792945988135.jpg"
                      alt="جهاز كاشير متنقل ذكي ثلاثي الأبعاد باللون الأزرق"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 right-3 left-3 text-right">
                      <span className="text-[10px] font-mono text-cyan-300 font-bold block">AL-BADR SMART POS X-1</span>
                      <span className="text-xs font-bold text-white">جهاز محمول كاشير وطابعة وماسح في جهاز واحد</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. MOBILE APP & FIELD TRACKING */}
          {activeSystem === 'mobile' && (
            <div className="p-6 sm:p-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                    تطبيقات المبيعات والمناديب الميدانية (Field Operations)
                  </span>
                  <h2 className="text-2xl font-black text-[#0F172A] mt-1">
                    محاكي متابعة خطوط سير المناديب وفواتير التوزيع الحية
                  </h2>
                </div>
                <button
                  onClick={() => onOpenDemo('تطبيقات المناديب والمبيعات')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-colors shadow-xs"
                >
                  طلب تفاصيل تطبيق المناديب
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Visits List */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="text-xs font-bold text-slate-900 mb-2">
                    جدول خطة زيارات المندوب اليومية (الرياض - قطاع التجزئة):
                  </div>

                  {repsVisits.map((v) => (
                    <div
                      key={v.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono text-[11px] ${
                            v.status === 'completed'
                              ? 'bg-slate-900 text-white'
                              : v.status === 'in-progress'
                              ? 'bg-slate-700 text-white'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {v.id}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{v.client}</div>
                          <div className="text-slate-400 text-[11px] mt-0.5">{v.time}</div>
                        </div>
                      </div>

                      <div className="text-left font-mono">
                        <div className="font-bold text-[#0F172A]">{v.amount}</div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            v.status === 'completed'
                              ? 'bg-slate-100 text-slate-900'
                              : v.status === 'in-progress'
                              ? 'bg-slate-200 text-slate-900'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {v.status === 'completed' && 'تم البيع والتحصيل'}
                          {v.status === 'in-progress' && 'جاري الفحص وإصدار الفاتورة'}
                          {v.status === 'pending' && 'بانتظار الزيارة'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated GPS in Navy */}
                <div className="lg:col-span-6 bg-[#0A192F] text-white p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-slate-200">التتبع الجغرافي للمندوب (GPS Live Route):</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400">ACTIVE GPS</span>
                  </div>

                  <div className="aspect-16/9 bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800 mb-4">
                    <div className="text-center p-4">
                      <div className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center mx-auto mb-2 shadow-md">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-white">سيارة التوزيع #12 - حي الروضة</div>
                      <div className="text-[11px] text-slate-300 font-mono mt-1">السرعة: 42 كم/س · إجمالي المبيعات المحصلة: 4,250 ر.س</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">الزيارات المنجزة</span>
                      <span className="font-mono font-bold text-white text-sm">2 من 4</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">إجمالي التحصيل</span>
                      <span className="font-mono font-bold text-white text-sm">4,250 ر.س</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">مزامنة السيرفر</span>
                      <span className="font-mono font-bold text-emerald-400 text-sm">لحظي (0s)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. CLINIC SYSTEM */}
          {activeSystem === 'clinic' && (
            <div className="p-6 sm:p-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
                <div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                    البدر لإدارة العيادات والمراكز الطبية (Clinic & EMR)
                  </span>
                  <h2 className="text-2xl font-black text-[#0F172A] mt-1">
                    محاكي جدول مواعيد المرضى والملف الصحي الإلكتروني
                  </h2>
                </div>
                <button
                  onClick={() => onOpenDemo('البدر لإدارة العيادات الطبية')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-colors shadow-xs"
                >
                  طلب تجربة النظام الطبي
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-3">
                  <div className="text-xs font-bold text-slate-900 mb-2">
                    قائمة انتظار ومواعيد العيادات اليوم:
                  </div>

                  <div className="space-y-2.5">
                    {patientQueue.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{p.name}</span>
                            <span className="font-mono text-[10px] text-slate-400">({p.id})</span>
                          </div>
                          <div className="text-slate-500 text-[11px] mt-0.5">{p.doctor}</div>
                        </div>

                        <div className="text-left">
                          <div className="font-mono font-bold text-slate-700">{p.time}</div>
                          <span className="text-[10px] font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded border border-slate-300 mt-0.5 inline-block">
                            {p.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    الملف الطبي الإلكتروني والروشتة الرقمية
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    حفظ التاريخ المرضي، الفحوصات المخبرية، صور الأشعة، والروشتات الدوائية في ملف موحد سحابي مؤمن بأعلى معايير الخصوصية.
                  </p>
                  
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs space-y-2 mb-4 font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>مطالبات التأمين الطبي:</span>
                      <span className="text-slate-900 font-bold">جاهزة للإرسال</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>حساب نسب وأتعاب الأطباء:</span>
                      <span className="text-slate-900 font-bold">آلية بنسبة 100%</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>تذكير المواعيد عبر SMS / واتساب:</span>
                      <span className="text-slate-900 font-bold">مفعل</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenDemo('البدر للعيادات الطبية')}
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl transition-colors"
                  >
                    حجز جلسة استعراض للنظام الطبي
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
