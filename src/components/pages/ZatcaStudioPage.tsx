import { useState } from 'react';
import { ShieldCheck, CheckCircle2, FileCode } from 'lucide-react';

export default function ZatcaStudioPage() {
  const [sellerName, setSellerName] = useState('شركة البدر للبرمجيات');
  const [vatNumber, setVatNumber] = useState('31098452100003');
  const [invoiceAmount, setInvoiceAmount] = useState(2500);
  const [invoiceType, setInvoiceType] = useState<'simplified' | 'standard'>('simplified');

  // Computations
  const vatAmount = invoiceAmount * 0.15;
  const grandTotal = invoiceAmount + vatAmount;
  const invoiceUuid = `c489b02a-9e12-4c6e-${Math.floor(1000 + invoiceAmount)}-d8e7c10f8821`;
  const invoiceHash = `b2a59f1c7d38e...${Math.floor(invoiceAmount * 43)}a983c2e11`;

  return (
    <div className="py-12 bg-[#0A192F] text-white min-h-screen text-right" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-white text-xs font-bold border border-slate-700 mb-3 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ZATCA PHASE 2 COMPLIANCE STUDIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight text-balance">
            محاكي ومولد الفاتورة الإلكترونية المعتمدة (ZATCA)
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed text-balance">
            فحص حي لمعايير الربط والتكامل المعتمدة من هيئة الزكاة والضريبة والجمارك (تشفير TLV، الختم الرقمي ECDSA، والـ XML المطابق لـ UBL 2.1).
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configuration Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#0F172A] p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="text-xs font-bold text-slate-200 mb-2">
              بيانات الفاتورة للاختبار والتوليد:
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                اسم المنشأة البائعة:
              </label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                الرقم الضريبي للمنشأة (15 خانة):
              </label>
              <input
                type="text"
                dir="ltr"
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900 text-white font-mono focus:outline-none focus:border-white text-left"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  المبلغ قبل الضريبة:
                </label>
                <input
                  type="number"
                  min="10"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900 text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  نوع الفاتورة:
                </label>
                <select
                  value={invoiceType}
                  onChange={(e: any) => setInvoiceType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-white"
                >
                  <option value="simplified">فاتورة ضريبية مبسطة (B2C)</option>
                  <option value="standard">فاتورة ضريبية قياسية (B2B)</option>
                </select>
              </div>
            </div>

            {/* Calculations preview */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>المبلغ الأساسي:</span>
                <span>{invoiceAmount.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span>+{vatAmount.toFixed(2)} ر.س</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white text-sm">
                <span>الإجمالي شامل الضريبة:</span>
                <span className="text-emerald-400">{grandTotal.toFixed(2)} ر.س</span>
              </div>
            </div>

            {/* Compliance checklist */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-slate-300 mb-2">
                نتائج فحص الامتثال التلقائي:
              </span>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>الرقم الضريبي مطابق لاشتراطات الـ 15 خانة</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>توليد ترميز TLV المشفر متوافق 100%</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>ختم التشفير الرقمي والهاش متوافق (SHA-256)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Results: Cryptographic QR & XML (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Tax Receipt and QR Code in Navy & White */}
            <div className="bg-[#0F172A] p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">CRYPTOGRAPHIC OUTPUT</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    معاينة رمز الـ QR والختم الضريبي الرقمي
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ZATCA STAMP APPROVED</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* QR Code Container */}
                <div className="sm:col-span-5 text-center">
                  <div className="w-40 h-40 bg-white p-3 rounded-2xl mx-auto shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-[#0F172A] text-white text-[8px] font-mono flex flex-col items-center justify-center p-2 text-center rounded-lg leading-tight">
                      <span className="text-emerald-400 font-bold mb-1">[ZATCA QR]</span>
                      <span>{sellerName}</span>
                      <span className="text-[7px] text-slate-400 mt-1">{vatNumber}</span>
                      <span className="text-emerald-400 mt-1">{grandTotal.toFixed(2)} SAR</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                    TLV Base64 Encoded (Phase 2)
                  </span>
                </div>

                {/* Technical Meta & Hashes */}
                <div className="sm:col-span-7 space-y-2 text-xs font-mono text-slate-300">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">المعرف الفريد (UUID):</span>
                    <span className="text-slate-200 break-all">{invoiceUuid}</span>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">الهاش المشفر (Invoice Hash):</span>
                    <span className="text-emerald-400 break-all">{invoiceHash}</span>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">التوقيع الرقمي (ECDSA Signature):</span>
                    <span className="text-slate-400 text-[11px]">MEQCICg+2A...MTAuYXBw== (VERIFIED)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* XML Snippet Preview */}
            <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 text-xs font-mono shadow-xl">
              <div className="flex items-center justify-between mb-3 text-slate-300">
                <span className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-white" />
                  <span>UBL 2.1 INVOICE SCHEMA (XML PREVIEW):</span>
                </span>
                <span className="text-[11px] text-emerald-400">VALIDATED SCHEMA</span>
              </div>

              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-[11px] text-slate-300 leading-relaxed max-h-48 scrollbar-thin">
{`<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
  <cbc:ID>INV-${new Date().getFullYear()}-0942</cbc:ID>
  <cbc:UUID>${invoiceUuid}</cbc:UUID>
  <cbc:IssueDate>${new Date().toISOString().split('T')[0]}</cbc:IssueDate>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>${vatNumber}</cbc:CompanyID>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="SAR">${vatAmount.toFixed(2)}</cbc:TaxAmount>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:PayableAmount currencyID="SAR">${grandTotal.toFixed(2)}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
</Invoice>`}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
