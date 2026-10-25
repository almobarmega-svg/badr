import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/companyData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 text-right">
          <div className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
            شهادات شركاء النجاح
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight text-balance">
            ماذا يقول قادة الأعمال عن تجربة برمجيات البدر
          </h2>
        </div>

        {/* Testimonials 3-col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-slate-300 mb-4 rotate-180" />
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  "{item.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-slate-100 text-right">
                <div className="text-sm font-black text-[#0F172A]">
                  {item.author}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {item.position} · <span className="text-slate-800 font-bold">{item.company}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
