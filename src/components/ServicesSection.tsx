import { ArrowLeft, Check, Layers } from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';

interface ServicesSectionProps {
  onOpenDemo: (serviceTitle: string) => void;
}

export default function ServicesSection({ onOpenDemo }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-right">
          <div className="text-xs font-bold text-blue-700 mb-2">
            الخدمات التقنية والهندسة البرمجية
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            كفاءات هندسية لبناء حلول رقمية تدوم وتتوسع
          </h2>
          <p className="mt-3 text-base text-slate-600 text-balance">
            بالإضافة إلى باقة أنظمتنا الجاهزة، نقدم خدمات تطوير البرمجيات المخصصة واستشارات التحول الرقمي وفق أعلى معايير الجودة والأمان.
          </p>
        </div>

        {/* Editorial Numbered Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.number}
              className="p-8 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Number & Headline */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono tabular-nums">
                    {service.number}.
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                    {service.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.summary}
                </p>

                {/* Deliverables */}
                <div className="space-y-2.5 mb-8">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  استشارة فنية متخصصة
                </span>
                <button
                  onClick={() => onOpenDemo(`خدمة ${service.title}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>طلب تفاصيل العرض</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
