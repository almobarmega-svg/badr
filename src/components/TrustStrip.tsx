import { Shield, Award, CheckCircle, Server } from 'lucide-react';
import { KEY_METRICS } from '../data/companyData';

export default function TrustStrip() {
  return (
    <section className="bg-white border-b border-slate-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quantitative Proof Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-8 border-b border-slate-100">
          {KEY_METRICS.map((metric, idx) => (
            <div key={idx} className="flex flex-col text-right">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono tabular-nums tracking-tight">
                {metric.value}
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1">
                {metric.label}
              </span>
              <span className="text-xs text-slate-500 mt-0.5">
                {metric.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Official Certifications & Compliance Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-semibold text-slate-500 text-center md:text-right">
            امتثال وتوافق تقني كامل مع المعايير الحكومية والمالية:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>معتمد للفاتورة الإلكترونية ZATCA (السعودية)</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span>مطابق لمنظومة الفاتورة والإيصال الإلكتروني (مصر)</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>مراكز بيانات سحابية مشفرة بنظام SSL/TLS 256-bit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
              <span>نسخ احتياطي يومي تلقائي متعدد السيرفرات</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
