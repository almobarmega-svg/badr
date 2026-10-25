import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS_DATA } from '../data/companyData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
            مركز المعلومات
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight text-balance">
            الأسئلة الأكثر شيوعاً
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto text-balance">
            إجابات واضحة ومباشرة عن أنظمة البدر، الفوترة الإلكترونية، التثبيت، والدعم الفني.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors bg-white hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-6 text-right flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-slate-900"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.answer}</p>
                    <div className="mt-3 text-[11px] text-[#0F172A] font-bold">
                      التصنيف: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
