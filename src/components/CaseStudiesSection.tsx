import { MapPin, ArrowLeft } from 'lucide-react';
import { CASE_STUDIES } from '../data/companyData';

interface CaseStudiesSectionProps {
  onOpenDemo: (caseStudyName: string) => void;
}

export default function CaseStudiesSection({ onOpenDemo }: CaseStudiesSectionProps) {
  return (
    <section id="case-studies" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 text-right">
          <div className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
            قصص النجاح والأثر العملي
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight text-balance">
            نتائج قياسية حققتها مؤسسات رائدة مع البدر
          </h2>
          <p className="mt-3 text-base text-slate-600 text-balance">
            قصص واقعية لأصحاب أعمال ومؤسسات تمكنوا من ضبط سلاسل الإمداد ومضاعفة كفاءة العمليات وسرعة خدمة عملائهم.
          </p>
        </div>

        {/* Case Studies Cards in Navy Blue & White */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                {/* Client & Sector info */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{study.location}</span>
                  </span>
                  <span className="font-bold text-slate-800">{study.sector}</span>
                </div>

                <h3 className="text-xl font-black text-[#0F172A] mb-4">
                  {study.client}
                </h3>

                <div className="space-y-4 mb-8 text-xs sm:text-sm text-slate-600">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">
                      التحدي التشغيلي:
                    </span>
                    <p className="leading-relaxed">{study.challenge}</p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 block mb-1">
                      الحل المطبق من البدر:
                    </span>
                    <p className="leading-relaxed text-slate-700">{study.solution}</p>
                  </div>
                </div>
              </div>

              {/* Quantified Metrics Grid in Deep Navy */}
              <div className="pt-6 border-t border-slate-200">
                <div className="grid grid-cols-3 gap-2 text-center mb-6">
                  {study.metrics.map((m, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="text-base sm:text-lg font-black text-[#0F172A] font-mono tabular-nums" dir="ltr">
                        {m.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-600 font-semibold leading-tight mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOpenDemo(`دراسة حالة ${study.client}`)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span>استفسر عن حل مشابه لمنشأتك</span>
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
