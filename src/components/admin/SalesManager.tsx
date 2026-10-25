import { useState } from 'react';
import { 
  Plus, Search, Printer, X, Eye, ShieldCheck
} from 'lucide-react';
import { SaleRecord, CustomerRecord, ProductRecord } from '../../types';

interface SalesManagerProps {
  sales: SaleRecord[];
  customers: CustomerRecord[];
  products: ProductRecord[];
  onAddSale: (saleData: any) => void;
  onUpdateSaleStatus: (id: string, status: 'paid' | 'pending' | 'cancelled') => void;
}

export default function SalesManager({
  sales,
  customers,
  products,
  onAddSale,
  onUpdateSaleStatus,
}: SalesManagerProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'cancelled'>('all');
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);
  const [selectedInvoiceForView, setSelectedInvoiceForView] = useState<SaleRecord | null>(null);

  // New Sale Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [saleItems, setSaleItems] = useState<
    { productId: string; productName: string; quantity: number; unitPrice: number; total: number }[]
  >([
    {
      productId: products[0]?.id || 'p1',
      productName: products[0]?.name || 'البدر لنقاط البيع',
      quantity: 1,
      unitPrice: products[0]?.price || 1850,
      total: products[0]?.price || 1850,
    },
  ]);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'مدى (Mada)' | 'تحويل بنكي' | 'بطاقة ائتمانية' | 'نقدي'>('مدى (Mada)');
  const [paymentStatus, setPaymentStatus] = useState<'paid' | 'pending'>('paid');

  // Stats
  const totalRevenue = sales
    .filter((s) => s.paymentStatus === 'paid')
    .reduce((sum, s) => sum + s.grandTotal, 0);

  const totalVat = sales
    .filter((s) => s.paymentStatus === 'paid')
    .reduce((sum, s) => sum + s.vatAmount, 0);

  const paidCount = sales.filter((s) => s.paymentStatus === 'paid').length;
  const avgTicket = paidCount > 0 ? totalRevenue / paidCount : 0;

  // Items manipulation in modal
  const handleItemProductChange = (index: number, prodId: string) => {
    const prod = products.find((p) => p.id === prodId);
    if (!prod) return;
    setSaleItems((prev) =>
      prev.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            productId: prod.id,
            productName: prod.name,
            unitPrice: prod.price,
            total: prod.price * item.quantity,
          };
        }
        return item;
      })
    );
  };

  const handleItemQuantityChange = (index: number, qty: number) => {
    const safeQty = Math.max(1, qty);
    setSaleItems((prev) =>
      prev.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            quantity: safeQty,
            total: item.unitPrice * safeQty,
          };
        }
        return item;
      })
    );
  };

  const addItemRow = () => {
    const firstProd = products[0] || { id: 'p0', name: 'خدمة برمجية', price: 1000 };
    setSaleItems((prev) => [
      ...prev,
      {
        productId: firstProd.id,
        productName: firstProd.name,
        quantity: 1,
        unitPrice: firstProd.price,
        total: firstProd.price,
      },
    ]);
  };

  const removeItemRow = (index: number) => {
    if (saleItems.length <= 1) return;
    setSaleItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Subtotals
  const calculatedSubtotal = saleItems.reduce((sum, i) => sum + i.total, 0);
  const calculatedVat = Math.max(0, calculatedSubtotal - discount) * 0.15;
  const calculatedGrandTotal = Math.max(0, calculatedSubtotal - discount) + calculatedVat;

  const handleSaveSale = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

    onAddSale({
      customerId: customer?.id || 'cust-direct',
      customerName: customer?.fullName || 'عميل مباشر',
      companyName: customer?.companyName || 'منشأة تجارية',
      items: saleItems,
      discount,
      paymentMethod,
      paymentStatus,
    });

    setIsNewSaleOpen(false);
  };

  const filteredSales = sales.filter((s) => {
    const matchesStatus = statusFilter === 'all' || s.paymentStatus === statusFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      s.invoiceNumber.toLowerCase().includes(query) ||
      s.customerName.toLowerCase().includes(query) ||
      s.companyName.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right">
      
      {/* 4 Quantitative KPI Cards in Navy & White */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 block mb-1">إجمالي المبيعات المحصلة</span>
          <div className="text-2xl font-black text-[#0F172A] font-mono tabular-nums">
            {totalRevenue.toLocaleString('en-US')} <span className="text-xs font-sans">ر.س</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-1">
            صافي بعد الضريبة والخصومات
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 block mb-1">ضريبة القيمة المضافة ZATCA (15%)</span>
          <div className="text-2xl font-black text-slate-800 font-mono tabular-nums">
            {totalVat.toLocaleString('en-US')} <span className="text-xs font-sans">ر.س</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            جاهزة للإقرار الضريبي الربعي
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 block mb-1">الفواتير المسددة</span>
          <div className="text-2xl font-black text-[#0F172A] font-mono tabular-nums">
            {paidCount} <span className="text-xs font-sans">فاتورة</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            من إجمالي {sales.length} فواتير
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 block mb-1">متوسط قيمة العملية (AOV)</span>
          <div className="text-2xl font-black text-[#0F172A] font-mono tabular-nums">
            {Math.round(avgTicket).toLocaleString('en-US')} <span className="text-xs font-sans">ر.س</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            لكل اشتراك أو ترخيص
          </span>
        </div>
      </div>

      {/* Filter and New Sale Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="ابحث برقم الفاتورة، العميل، الشركة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-9 pl-4 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white text-slate-700"
          >
            <option value="all">كافة الحالات</option>
            <option value="paid">فواتير مسددة</option>
            <option value="pending">بانتظار السداد</option>
            <option value="cancelled">ملغاة</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSelectedCustomerId(customers[0]?.id || '');
            setSaleItems([
              {
                productId: products[0]?.id || 'p1',
                productName: products[0]?.name || 'البدر لنقاط البيع',
                quantity: 1,
                unitPrice: products[0]?.price || 1850,
                total: products[0]?.price || 1850,
              },
            ]);
            setDiscount(0);
            setIsNewSaleOpen(true);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>إصدار فاتورة بيع جديدة</span>
        </button>
      </div>

      {/* Sales Invoices Table in Navy & White */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">رقم الفاتورة</th>
                <th className="py-3 px-4">التاريخ</th>
                <th className="py-3 px-4">العميل / المنشأة</th>
                <th className="py-3 px-4">الأنظمة المشتراة</th>
                <th className="py-3 px-4">المجموع قبل الضريبة</th>
                <th className="py-3 px-4">ضريبة 15%</th>
                <th className="py-3 px-4">الإجمالي الكلي</th>
                <th className="py-3 px-4">طريقة الدفع</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4 text-center">عرض</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    لا توجد فواتير مطابقة لخيارات البحث.
                  </td>
                </tr>
              ) : (
                filteredSales.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {s.invoiceNumber}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {s.date}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{s.customerName}</div>
                      <div className="text-[11px] text-slate-400">{s.companyName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="line-clamp-1 max-w-xs text-slate-600">
                        {s.items.map((i) => `${i.productName} (${i.quantity})`).join(', ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums">
                      {s.subtotal.toFixed(2)} ر.س
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-500">
                      +{s.vatAmount.toFixed(2)} ر.س
                    </td>
                    <td className="py-3 px-4 font-mono font-black text-[#0F172A] tabular-nums">
                      {s.grandTotal.toFixed(2)} ر.س
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {s.paymentMethod}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={s.paymentStatus}
                        onChange={(e: any) => onUpdateSaleStatus(s.id, e.target.value)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          s.paymentStatus === 'paid'
                            ? 'bg-slate-100 text-slate-900 border-slate-300'
                            : s.paymentStatus === 'pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        <option value="paid">مسددة</option>
                        <option value="pending">معلقة</option>
                        <option value="cancelled">ملغاة</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedInvoiceForView(s)}
                        className="p-1.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded"
                        title="معاينة الفاتورة الضريبية"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Sale Modal */}
      {isNewSaleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right my-8">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">
                إصدار وتسجيل فاتورة بيع جديدة (معتمدة ZATCA)
              </h3>
              <button
                onClick={() => setIsNewSaleOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSale} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  العميل / المنشأة المشترية:
                </label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} - {c.companyName} ({c.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Line items */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-900">
                    بنود الفاتورة والأنظمة:
                  </label>
                  <button
                    type="button"
                    onClick={addItemRow}
                    className="text-xs text-[#0F172A] font-bold hover:underline"
                  >
                    + إضافة بند آخر
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {saleItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                      <select
                        value={item.productId}
                        onChange={(e) => handleItemProductChange(idx, e.target.value)}
                        className="flex-1 px-2 py-1.5 border border-slate-300 rounded bg-white text-slate-900 text-xs"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.price} ر.س)
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-slate-500">الكمية:</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemQuantityChange(idx, Number(e.target.value))}
                          className="w-14 px-1.5 py-1 border border-slate-300 rounded font-mono text-center"
                        />
                      </div>

                      <div className="font-mono tabular-nums font-bold text-slate-800 w-24 text-left">
                        {item.total.toLocaleString('en-US')} ر.س
                      </div>

                      {saleItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItemRow(idx)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    خصم تجاري (ر.س):
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    طريقة الدفع:
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e: any) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
                  >
                    <option value="مدى (Mada)">مدى (Mada)</option>
                    <option value="تحويل بنكي">تحويل بنكي</option>
                    <option value="بطاقة ائتمانية">بطاقة ائتمانية (Visa / Master)</option>
                    <option value="نقدي">نقدي (Cash)</option>
                  </select>
                </div>
              </div>

              {/* Calculations Box */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono tabular-nums">{calculatedSubtotal.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>الخصم المطبق:</span>
                  <span className="font-mono tabular-nums text-amber-600">-{discount.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ضريبة القيمة المضافة ZATCA (15%):</span>
                  <span className="font-mono tabular-nums">+{calculatedVat.toFixed(2)} ر.س</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                  <span>المبلغ الإجمالي النهائي:</span>
                  <span className="font-mono tabular-nums text-[#0F172A]">{calculatedGrandTotal.toFixed(2)} ر.س</span>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors"
                >
                  اعتماد وحفظ الفاتورة
                </button>
                <button
                  type="button"
                  onClick={() => setIsNewSaleOpen(false)}
                  className="py-2.5 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Full Tax Invoice Modal */}
      {selectedInvoiceForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden text-right my-8 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div>
                <span className="text-[11px] font-mono text-emerald-700 font-bold block">
                  ZATCA SIMPLIFIED TAX INVOICE
                </span>
                <h3 className="text-base font-black text-[#0F172A]">
                  فاتورة ضريبية مبسطة
                </h3>
              </div>
              <button
                onClick={() => setSelectedInvoiceForView(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Receipt Header */}
            <div className="text-center pb-4 border-b border-dashed border-slate-200 text-xs space-y-1">
              <div className="font-bold text-sm text-[#0F172A]">شركة البدر للبرمجيات</div>
              <div className="text-slate-500">الرقم الضريبي للمنشأة: 31098452100003</div>
              <div className="text-slate-500 font-mono">رقم الفاتورة: {selectedInvoiceForView.invoiceNumber}</div>
              <div className="text-slate-400 font-mono text-[11px]">تاريخ ووقت الإصدار: {selectedInvoiceForView.date} 14:32:10</div>
            </div>

            {/* Buyer Details */}
            <div className="py-3 border-b border-slate-100 text-xs space-y-1 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">اسم العميل:</span>
                <span className="font-bold text-slate-900">{selectedInvoiceForView.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">المنشأة:</span>
                <span>{selectedInvoiceForView.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">طريقة الدفع:</span>
                <span className="font-semibold">{selectedInvoiceForView.paymentMethod}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="py-3">
              <table className="w-full text-xs">
                <thead className="text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-1.5 text-right font-bold">البند</th>
                    <th className="py-1.5 text-center font-bold">الكمية</th>
                    <th className="py-1.5 text-left font-bold">السعر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedInvoiceForView.items.map((i, idx) => (
                    <tr key={idx} className="py-1.5">
                      <td className="py-1.5 font-medium text-slate-800">{i.productName}</td>
                      <td className="py-1.5 text-center font-mono">{i.quantity}</td>
                      <td className="py-1.5 text-left font-mono tabular-nums">{i.total.toFixed(2)} ر.س</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="border-t border-slate-200 pt-3 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>المجموع الخاضع للضريبة:</span>
                <span className="font-mono tabular-nums">{(selectedInvoiceForView.subtotal - selectedInvoiceForView.discount).toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span className="font-mono tabular-nums">+{selectedInvoiceForView.vatAmount.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-dashed border-slate-200">
                <span>المجموع الإجمالي شامل الضريبة:</span>
                <span className="font-mono tabular-nums text-emerald-700">{selectedInvoiceForView.grandTotal.toFixed(2)} ر.س</span>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <div className="w-28 h-28 bg-[#0F172A] text-white text-[9px] font-mono flex items-center justify-center mx-auto p-2 rounded">
                [ZATCA BASE64 ENCODED QR]
                <br />
                {selectedInvoiceForView.invoiceNumber}
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-mono">
                فاتورة إلكترونية معتمدة - هيئة الزكاة والضريبة والجمارك
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الفاتورة</span>
              </button>
              <button
                onClick={() => setSelectedInvoiceForView(null)}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
