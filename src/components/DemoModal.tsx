import { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO, PRODUCTS_DATA } from '../data/companyData';
import { DemoRequestData } from '../types';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSystem?: string;
}

export default function DemoModal({ isOpen, onClose, initialSystem }: DemoModalProps) {
  const [formData, setFormData] = useState<DemoRequestData>({
    fullName: '',
    phone: '',
    email: '',
    companyName: '',
    systemInterest: initialSystem || PRODUCTS_DATA[0].name,
    branchesCount: '1 فرع',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DemoRequestData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Update initial system if prop changes
  useEffect(() => {
    if (initialSystem) {
      setFormData((prev: DemoRequestData) => ({ ...prev, systemInterest: initialSystem }));
    }
  }, [initialSystem]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsSuccess(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Partial<Record<keyof DemoRequestData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      errs.fullName = 'يرجى إدخال الاسم الكريم كاملاً';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'يرجى إدخال رقم هاتف أو واتساب صحيح للتواصل';
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    if (!formData.companyName.trim()) {
      errs.companyName = 'يرجى تحديد اسم المنشأة أو النشاط التجاري';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real network submission with immediate confirmation
    setTimeout(() => {
      const generatedId = `BD-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 450);
  };

  const createWhatsAppLink = () => {
    const text = encodeURIComponent(
      `مرحباً شركة البدر للبرمجيات، أود الاستفسار وتجربة: ${formData.systemInterest} لمنشأتي (${formData.companyName}) - رقم الطلب: ${ticketId || 'جديد'}`
    );
    return `https://wa.me/${COMPANY_INFO.whatsapp}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <div>
            <span className="text-xs font-bold text-blue-600 block mb-0.5">
              شركة البدر للبرمجيات
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              طلب استشارة وتجربة مجانية للنظام
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-2">
                تم استلام طلبك بنجاح!
              </h4>

              <p className="text-xs text-slate-500 font-mono mb-4">
                رقم المتابعة المرجعي: <span className="font-bold text-slate-800 font-mono tabular-nums">{ticketId}</span>
              </p>

              <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto mb-8">
                شكراً لتواصلك مع شركة البدر. سيقوم أحد مهندسينا بالتواصل معك هاتفياً لتقديم عرض حي وتفعيل نسختك التجريبية.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={createWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>متابعة فورية عبر الواتساب</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  الاسم الكامل: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: عبد الله السعيد"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    errors.fullName ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    رقم الهاتف / الواتساب: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    placeholder="+966 5x xxx xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.phone ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    البريد الإلكتروني: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.email ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    اسم المنشأة أو المتجر: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: شركة النخبة للمواد الغذائية"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                      errors.companyName ? 'border-red-500' : 'border-slate-300 focus:border-blue-600'
                    }`}
                  />
                  {errors.companyName && <p className="text-[11px] text-red-600 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    عدد الفروع:
                  </label>
                  <select
                    value={formData.branchesCount}
                    onChange={(e) => setFormData({ ...formData, branchesCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="1 فرع">1 فرع (نقطة واحدة)</option>
                    <option value="2 إلى 4 فروع">2 إلى 4 فروع</option>
                    <option value="5 إلى 10 فروع">5 إلى 10 فروع</option>
                    <option value="أكثر من 10 فروع">+10 فروع (مؤسسات كبرى)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  النظام المطلوب تجربته:
                </label>
                <select
                  value={formData.systemInterest}
                  onChange={(e) => setFormData({ ...formData, systemInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                >
                  {PRODUCTS_DATA.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
                  <option value="تطوير برمجي سحابي مخصص">تطوير برمجي سحابي مخصص للشركات</option>
                  <option value="الربط مع الفاتورة الإلكترونية ZATCA">الربط المباشر مع الفاتورة الإلكترونية ZATCA</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  ملاحظات أو استفسارات إضافية (اختياري):
                </label>
                <textarea
                  rows={2}
                  placeholder="أي تفاصيل ترغب في مشاركتها معنا بخصوص طبيعة نشاطك..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl transition-all shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري إرسال الطلب...</span>
                  ) : (
                    <>
                      <span>تأكيد طلب العرض التجريبي المجاني</span>
                      <Send className="w-4 h-4 rotate-180" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>أو يمكنك الاتصال المباشر على الهاتف:</span>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  dir="ltr"
                  className="text-blue-600 font-mono font-bold hover:underline"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
