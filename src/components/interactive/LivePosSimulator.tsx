import { useState } from 'react';
import { 
  X, ShoppingBag, Plus, Minus, Trash2, Printer, 
  CreditCard, Banknote, ShieldCheck, CheckCircle2, 
  Search, RefreshCw, Layers, ArrowLeft
} from 'lucide-react';
import { SaleRecord } from '../../types';

interface PosSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSale?: (saleData: any) => void;
}

interface PosProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  barcode: string;
}

const SAMPLE_POS_ITEMS: PosProduct[] = [
  { id: 'pos-item-1', name: 'اشتراك سنوي - البدر POS Pro', category: 'تراخيص برمجية', price: 1850, barcode: '6281001001' },
  { id: 'pos-item-2', name: 'طابعة فواتير حرارية USB / LAN', category: 'أجهزة ونقاط بيع', price: 650, barcode: '6281001002' },
  { id: 'pos-item-3', name: 'قارئ باركود لاسلكي 2D (QR)', category: 'أجهزة ونقاط بيع', price: 380, barcode: '6281001003' },
  { id: 'pos-item-4', name: 'درج كاشير إلكتروني 5 خانات', category: 'أجهزة ونقاط بيع', price: 290, barcode: '6281001004' },
  { id: 'pos-item-5', name: 'باقة ربط الفاتورة الإلكترونية ZATCA', category: 'خدمات سحابية', price: 600, barcode: '6281001005' },
  { id: 'pos-item-6', name: 'رخصة فرع إضافي سحابية', category: 'تراخيص برمجية', price: 950, barcode: '6281001006' },
  { id: 'pos-item-7', name: 'شاشة كاشير لمس 15.6 بوصة POS', category: 'أجهزة ونقاط بيع', price: 1950, barcode: '6281001007' },
  { id: 'pos-item-8', name: 'جلسة تدريب وترحيل بيانات متقدمة', category: 'خدمات سحابية', price: 400, barcode: '6281001008' },
];

export default function LivePosSimulator({ isOpen, onClose, onSaveSale }: PosSimulatorProps) {
  const [cart, setCart] = useState<{ product: PosProduct; quantity: number }[]>([
    { product: SAMPLE_POS_ITEMS[0], quantity: 1 },
    { product: SAMPLE_POS_ITEMS[1], quantity: 1 },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(5);
  const [paymentMethod, setPaymentMethod] = useState<'مدى (Mada)' | 'تحويل بنكي' | 'بطاقة ائتمانية' | 'نقدي'>('مدى (Mada)');
  const [customerName, setCustomerName] = useState<string>('مؤسسة الرؤية الحديثة');
  const [completedInvoice, setCompletedInvoice] = useState<SaleRecord | null>(null);

  if (!isOpen) return null;

  const categories = ['الكل', 'تراخيص برمجية', 'أجهزة ونقاط بيع', 'خدمات سحابية'];

  const filteredItems = SAMPLE_POS_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'الكل' || item.category === selectedCategory;
    const matchesSearch = item.name.includes(searchQuery) || item.barcode.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: PosProduct) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.product.id === productId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as { product: PosProduct; quantity: number }[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountVal = (subtotal * discountPercent) / 100;
  const taxableTotal = Math.max(0, subtotal - discountVal);
  const vatAmount = taxableTotal * 0.15; // 15% ZATCA
  const grandTotal = taxableTotal + vatAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const invoiceData: SaleRecord = {
      id: `sim-${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(2000 + Math.random() * 8000)}`,
      customerId: 'cust-sim',
      customerName: customerName || 'عميل نقدي',
      companyName: customerName || 'منشأة تجارية',
      date: new Date().toISOString().split('T')[0],
      items: cart.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        quantity: i.quantity,
        unitPrice: i.product.price,
        total: i.product.price * i.quantity,
      })),
      subtotal,
      discount: discountVal,
      vatAmount,
      grandTotal,
      paymentMethod,
      paymentStatus: 'paid',
      zatcaQrCode: `ZATCA-EINV-${Date.now()}-APPROVED`,
    };

    setCompletedInvoice(invoiceData);

    if (onSaveSale) {
      onSaveSale({
        customerId: 'cust-101',
        customerName: invoiceData.customerName,
        companyName: invoiceData.companyName,
        items: invoiceData.items,
        discount: invoiceData.discount,
        paymentMethod: invoiceData.paymentMethod,
        paymentStatus: 'paid',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-100 rounded-2xl shadow-2xl border border-slate-300 overflow-hidden text-right flex flex-col max-h-[92vh]">
        
        {/* Top Terminal Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs text-blue-400 font-mono block">LIVE INTERACTIVE POS TERMINAL</span>
              <h3 className="text-sm font-bold text-white">
                محاكي كاشير البدر السحابي المباشر (ZATCA Phase 2)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800 font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ZATCA CLOUD CONNECTED</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success / Invoice Modal View */}
        {completedInvoice ? (
          <div className="p-6 sm:p-10 bg-white overflow-y-auto flex-1 text-center">
            <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h4 className="text-lg font-bold text-slate-900 mb-1">
                تم اعتماد وإصدار الفاتورة الإلكترونية بنجاح!
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                رقم الفاتورة الضريبية: <span className="font-mono font-bold text-slate-800">{completedInvoice.invoiceNumber}</span>
              </p>

              {/* Simulated QR Code for ZATCA */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl inline-block mb-4">
                <div className="w-32 h-32 bg-slate-900 mx-auto flex items-center justify-center text-white text-[10px] font-mono p-2 text-center rounded">
                  [ZATCA CRYPTOGRAPHIC QR CODE]
                  <br />
                  فاتورة ضريبية مبسطة
                </div>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">
                  UUID: {completedInvoice.id}
                </div>
              </div>

              {/* Receipt Summary */}
              <div className="text-right text-xs space-y-1.5 border-t border-slate-200 pt-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>العميل:</span>
                  <span className="font-bold text-slate-900">{completedInvoice.customerName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>طريقة الدفع:</span>
                  <span className="font-bold text-slate-900">{completedInvoice.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>الإجمالي قبل الضريبة:</span>
                  <span className="font-mono tabular-nums">{completedInvoice.subtotal.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>الخصم المطبق:</span>
                  <span className="font-mono tabular-nums text-amber-600">-{completedInvoice.discount.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span className="font-mono tabular-nums">+{completedInvoice.vatAmount.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>صافي المبلغ المدفوع:</span>
                  <span className="font-mono tabular-nums text-emerald-600">{completedInvoice.grandTotal.toFixed(2)} ر.س</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCompletedInvoice(null);
                    setCart([]);
                  }}
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                >
                  إجراء عملية بيع جديدة
                </button>
                <button
                  onClick={() => window.print()}
                  className="py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl flex items-center gap-1.5 justify-center"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة الإيصال</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Main Interactive POS Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 overflow-hidden">
            
            {/* Products catalog area (7 cols) */}
            <div className="lg:col-span-7 p-4 sm:p-6 bg-slate-50 flex flex-col overflow-y-auto border-b lg:border-b-0 lg:border-l border-slate-200">
              
              {/* Category tabs */}
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو امسح الباركود السريع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-9 pl-4 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto flex-1">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="p-3 bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md rounded-xl text-right flex flex-col justify-between transition-all group active:scale-[0.98]"
                  >
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2">
                        {item.name}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-700 tabular-nums">
                        {item.price} ر.س
                      </span>
                      <span className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                <span>انقر على أي عنصر لإضافته إلى فاتورة الكاشير التفاعلية</span>
                <span>دعم مسح الباركود الآلي</span>
              </div>
            </div>

            {/* Cart & Billing terminal area (5 cols) */}
            <div className="lg:col-span-5 p-4 sm:p-6 bg-white flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Customer header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900">سلة الفاتورة الحالية:</span>
                  </div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="اسم العميل..."
                    className="text-xs px-2 py-1 border border-slate-200 rounded-md font-medium text-slate-700 text-left w-40"
                  />
                </div>

                {/* Cart Items list */}
                <div className="space-y-2 max-h-52 overflow-y-auto mb-4 divide-y divide-slate-100">
                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      السلة فارغة. اختر منتجات من القائمة للإضافة.
                    </div>
                  ) : (
                    cart.map((i) => (
                      <div key={i.product.id} className="pt-2 flex items-center justify-between text-xs">
                        <div className="flex-1 pr-1">
                          <div className="font-bold text-slate-800 line-clamp-1">
                            {i.product.name}
                          </div>
                          <div className="text-slate-400 font-mono text-[11px]">
                            {i.product.price} × {i.quantity} = {(i.product.price * i.quantity).toFixed(2)} ر.س
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => updateQuantity(i.product.id, -1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-mono font-bold text-slate-900">
                            {i.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(i.product.id, 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(i.product.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors mr-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Payment method selector */}
                <div className="mb-4 pt-2 border-t border-slate-100">
                  <span className="block text-[11px] font-bold text-slate-700 mb-2">
                    طريقة الدفع:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(['مدى (Mada)', 'تحويل بنكي', 'بطاقة ائتمانية', 'نقدي'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-1.5 px-2 rounded-lg text-center font-semibold border transition-all ${
                          paymentMethod === method
                            ? 'bg-blue-50 border-blue-600 text-blue-700'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom calculations & checkout action */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono tabular-nums">{subtotal.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-slate-500 items-center">
                  <span>خصم ترويجي:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      className="w-12 text-center py-0.5 border border-slate-200 rounded font-mono text-xs"
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span className="font-mono tabular-nums">+{vatAmount.toFixed(2)} ر.س</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>المبلغ الإجمالي المستحق:</span>
                  <span className="font-mono tabular-nums text-blue-700">{grandTotal.toFixed(2)} ر.س</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full mt-3 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl transition-all shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>تأكيد وطباعة الفاتورة الضريبية</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
