import { useState } from 'react';
import { TrendingUp, ArrowLeft, Check } from 'lucide-react';

interface RoiCalculatorPageProps {
  onOpenDemo: (summary: string) => void;
}

export default function RoiCalculatorPage({ onOpenDemo }: RoiCalculatorPageProps) {
  const [branches, setBranches] = useState(3);
  const [employeesPerBranch, setEmployeesPerBranch] = useState(4);
  const [monthlyRevenuePerBranch, setMonthlyRevenuePerBranch] = useState(150000);
  const [currentLossRate, setCurrentLossRate] = useState(2.5); // 2.5% inventory shrinkage or billing errors

  // Calculations
  const totalEmployees = branches * employeesPerBranch;
  const totalMonthlyRevenue = branches * monthlyRevenuePerBranch;
  
  // 14 hours saved per employee monthly on manual inventory, bookkeeping & reconciliations
  const hoursSavedMonthly = totalEmployees * 14;
  const financialValueOfTimeSaved = hoursSavedMonthly * 45; // average 45 SAR / hour labor cost

  // Shrinkage reduction by 60% with Al-Badr ERP/POS
  const monthlyLossPrevented = (totalMonthlyRevenue * (currentLossRate / 100)) * 0.60;

  // Annual total gain
  const totalAnnualBenefit = (financialValueOfTimeSaved + monthlyLossPrevented) * 12;

  // Software estimated annual cost
  const softwareAnnualCost = branches * 2400;
  const netAnnualProfit = Math.max(0, totalAnnualBenefit - softwareAnnualCost);
  const roiMultiplier = softwareAnnualCost > 0 ? (totalAnnualBenefit / softwareAnnualCost).toFixed(1) : '15.0';

  return (
    <div className="py-12 bg-slate-50 min-h-screen text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-900 text-xs font-bold border border-slate-300 mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>حاسبة العائد على الاستثمار والوفر المالي (Enterprise ROI)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight leading-tight text-balance">
            كم ستوفر منشأتك سنوياً بتطبيق أنظمة البدر؟
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            نموذج حسابي دقيق يوضح الأثر المالي المباشر لأتمتة المخازن، تقليص فروقات الجرد، وتسريع عمليات البيع.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel in White & Navy */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              معطيات وبيانات منشأتك الحالية:
            </h3>

            {/* Branches Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-800">
                  عدد الفروع أو المستودعات:
                </label>
                <span className="font-mono tabular-nums text-base font-bold text-[#0F172A]">
                  {branches} {branches === 1 ? 'فرع' : 'فروع'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={branches}
                onChange={(e) => setBranches(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>1 فرع</span>
                <span>25 فرع</span>
              </div>
            </div>

            {/* Employees per branch Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-800">
                  متوسط عدد الموظفين في كل فرع:
                </label>
                <span className="font-mono tabular-nums text-base font-bold text-[#0F172A]">
                  {employeesPerBranch} موظفين
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={employeesPerBranch}
                onChange={(e) => setEmployeesPerBranch(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            {/* Monthly Revenue per branch */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-800">
                  متوسط المبيعات الشهرية للفرع الواحد (ر.س):
                </label>
                <span className="font-mono tabular-nums text-base font-bold text-[#0F172A]">
                  {monthlyRevenuePerBranch.toLocaleString('en-US')} ر.س
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="1000000"
                step="10000"
                value={monthlyRevenuePerBranch}
                onChange={(e) => setMonthlyRevenuePerBranch(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>20,000 ر.س</span>
                <span>1,000,000 ر.س</span>
              </div>
            </div>

            {/* Shrinkage rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-800">
                  نسبة الهدر أو فروقات الجرد والفوترة التقديرية الحالية:
                </label>
                <span className="font-mono tabular-nums text-base font-bold text-amber-600">
                  {currentLossRate}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6"
                step="0.5"
                value={currentLossRate}
                onChange={(e) => setCurrentLossRate(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                <span>0.5% (منخفض)</span>
                <span>6% (مرتفع)</span>
              </div>
            </div>

          </div>

          {/* ROI Results & Gains in Deep Midnight Navy */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Main ROI Showcase Card */}
            <div className="bg-[#0A192F] text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
              <span className="text-xs text-slate-400 font-mono block mb-1">
                ESTIMATED ANNUAL NET VALUE
              </span>
              <h3 className="text-xs font-bold text-slate-300 mb-2">
                صافي الوفر المالي والأثر الربحي السنوي المتوقع:
              </h3>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono tabular-nums">
                  {Math.round(netAnnualProfit).toLocaleString('en-US')}
                </span>
                <span className="text-base font-bold text-slate-300">
                  ر.س / سنوياً
                </span>
              </div>

              {/* Metric Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px] mb-1">معدل العائد على الاستثمار:</span>
                  <span className="text-xl font-black text-white font-mono tabular-nums">
                    {roiMultiplier}x
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">ضعف تكلفة الاشتراك</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px] mb-1">ساعات عمل موفرة شهرياً:</span>
                  <span className="text-xl font-black text-white font-mono tabular-nums">
                    {hoursSavedMonthly} ساعة
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">في مهام الجرد والمطابقة</span>
                </div>
              </div>

              {/* Action Button in Pure White / Navy */}
              <button
                onClick={() =>
                  onOpenDemo(
                    `دراسة جدوى وعائد استثمار لـ ${branches} فروع بمبيعات ${monthlyRevenuePerBranch} ر.س`
                  )
                }
                className="w-full py-3.5 px-6 text-xs sm:text-sm font-bold text-[#0A192F] bg-white hover:bg-slate-100 active:scale-[0.98] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>طلب دراسة جدوى وتجربة مخصصة لمنشأتك</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Value Deliverables checklist */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2.5">
              <div className="font-bold text-slate-900 mb-2">
                كيف تحقق برمجيات البدر هذه الوفورات؟
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <span>إلغاء فاقد المخزون عبر مطابقة الباركود والجرد اللحظي المستمر.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <span>منع الأخطاء البشرية في احتساب ضريبة القيمة المضافة ZATCA والخصومات.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <span>تسريع خدمة العميل في نقطة البيع لتقليص زمن الانتظار ومضاعفة المبيعات.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
