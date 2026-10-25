import { useState } from 'react';
import { Check, ArrowLeft, Monitor, Database, Smartphone, Stethoscope } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/companyData';

interface ProductsSectionProps {
  onOpenDemo: (systemTitle: string) => void;
}

export default function ProductsSection({ onOpenDemo }: ProductsSectionProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS_DATA[0].id);
  const [interactiveCounter, setInteractiveCounter] = useState<number>(3);
  const [simulatedDiscount, setSimulatedDiscount] = useState<number>(10);

  const currentProduct = PRODUCTS_DATA.find((p) => p.id === selectedProductId) || PRODUCTS_DATA[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'al-badr-pos':
        return <Monitor className="w-4 h-4" />;
      case 'al-badr-erp':
        return <Database className="w-4 h-4" />;
      case 'al-badr-mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'al-badr-clinic':
        return <Stethoscope className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  // Quick live simulation metrics based on state
  const unitPrice = selectedProductId === 'al-badr-pos' ? 120 : selectedProductId === 'al-badr-erp' ? 450 : 280;
  const subtotal = interactiveCounter * unitPrice;
  const discountAmount = (subtotal * simulatedDiscount) / 100;
  const vatAmount = (subtotal - discountAmount) * 0.15;
  const grandTotal = subtotal - discountAmount + vatAmount;

  return (
    <section id="products" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-right">
          <div className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
            الأنظمة والحلول البرمجية
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight text-balance">
            منظومة متكاملة تلبي كافة متطلبات إدارة منشأتك
          </h2>
          <p className="mt-3 text-base text-slate-600 text-balance">
            صُممت برمجيات البدر بأحدث المعايير البرمجية لتمنحك تحكماً شاملاً بالعمليات اليومية، من نقطة البيع وحتى القوائم المالية الختامية.
          </p>
        </div>

        {/* Functional Interactive Segmented Product Selector in Navy & White */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/80 rounded-xl mb-10 w-fit">
          {PRODUCTS_DATA.map((product) => {
            const isActive = product.id === selectedProductId;
            return (
              <button
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-slate-900 ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {getIcon(product.id)}
                <span>{product.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Product Detailed Card: Bento layout in Navy & White */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Info & Features Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Clean unboxed metadata kicker */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-2">
                <span>{currentProduct.tagline}</span>
                <span aria-hidden="true">·</span>
                <span>سحابي ومكتبي</span>
                {currentProduct.zatcaCompliant && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-bold">معتمد للفوترة الإلكترونية</span>
                  </>
                )}
              </div>

              <h3 className="text-2xl font-black text-[#0F172A] mb-4">
                {currentProduct.name}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                {currentProduct.description}
              </p>

              {/* Core Features List */}
              <div className="mb-8">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                  أبرز المميزات والوظائف:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentProduct.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suited for Sectors */}
              <div className="mb-8 pt-6 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900 mb-2">
                  الأنشطة والقطاعات المستهدفة:
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
                  {currentProduct.suitedFor.map((sector, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <span>{sector}</span>
                      {idx < currentProduct.suitedFor.length - 1 && (
                        <span className="text-slate-300" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons in Navy & White */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-100">
              <button
                onClick={() => onOpenDemo(currentProduct.name)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#0F172A] rounded-xl hover:bg-[#1E293B] active:scale-[0.98] transition-all shadow-sm"
              >
                <span>طلب تجربة مجانية للنظام</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenDemo(`استفسار عن ${currentProduct.name}`)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors border border-slate-200"
              >
                طلب عرض أسعار مخصص
              </button>
            </div>
          </div>

          {/* Media & Interactive Simulator Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#0A192F] text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-slate-200">
            {/* High-res Image Preview */}
            <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent" />
              <div className="absolute top-3 left-3 bg-[#0F172A]/90 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-slate-300 border border-slate-700">
                LIVE PRODUCTION UI
              </div>
            </div>

            {/* Live Interactive Calculation Widget */}
            <div className="p-6 bg-[#0A192F] text-right">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-200">
                  محاكي العمليات الحسابية والفوترة السحابية:
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  ZATCA 15% VAT Ready
                </span>
              </div>

              {/* Interactive controls */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 mb-1">الكمية المباعة:</div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setInteractiveCounter(Math.max(1, interactiveCounter - 1))}
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-white"
                    >
                      -
                    </button>
                    <span className="font-mono tabular-nums text-sm font-bold text-white">
                      {interactiveCounter}
                    </span>
                    <button
                      onClick={() => setInteractiveCounter(interactiveCounter + 1)}
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 mb-1">نسبة الخصم التجاري:</div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSimulatedDiscount(Math.max(0, simulatedDiscount - 5))}
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-white"
                    >
                      -
                    </button>
                    <span className="font-mono tabular-nums text-sm font-bold text-white">
                      {simulatedDiscount}%
                    </span>
                    <button
                      onClick={() => setSimulatedDiscount(Math.min(50, simulatedDiscount + 5))}
                      className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Instant calculation summary */}
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>الإجمالي قبل الضريبة والخصم:</span>
                  <span className="font-mono tabular-nums text-slate-200">{subtotal.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>قيمة الخصم ({simulatedDiscount}%):</span>
                  <span className="font-mono tabular-nums text-amber-400">-{discountAmount.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span className="font-mono tabular-nums text-slate-200">+{vatAmount.toFixed(2)} ر.س</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                  <span>صافي الفاتورة الضريبية:</span>
                  <span className="font-mono tabular-nums text-emerald-400">{grandTotal.toFixed(2)} ر.س</span>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-slate-400 text-center">
                يتم توليد رمز الاستجابة السريع (QR Code) المشفر تلقائياً مطابقاً لاشتراطات المرحلة الثانية.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
