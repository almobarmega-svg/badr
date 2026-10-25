import { useState } from 'react';
import { 
  Package, Users, ShoppingCart, BarChart3, 
  ArrowRight, Sparkles, RefreshCw, Plus, 
  ShieldCheck, DollarSign
} from 'lucide-react';
import AlBadrLogo from '../brand/AlBadrLogo';
import { ProductRecord, CustomerRecord, SaleRecord } from '../../types';
import ProductsManager from './ProductsManager';
import CustomersManager from './CustomersManager';
import SalesManager from './SalesManager';

interface AdminDashboardProps {
  products: ProductRecord[];
  customers: CustomerRecord[];
  sales: SaleRecord[];
  onAddProduct: (prod: any) => void;
  onUpdateProduct: (id: string, updated: any) => void;
  onDeleteProduct: (id: string) => void;
  onAddCustomer: (cust: any) => void;
  onUpdateCustomer: (id: string, updated: any) => void;
  onDeleteCustomer: (id: string) => void;
  onAddSale: (sale: any) => void;
  onUpdateSaleStatus: (id: string, status: any) => void;
  onResetDefaults: () => void;
  onExitAdmin: () => void;
  onOpenPosSimulator: () => void;
}

export default function AdminDashboard({
  products,
  customers,
  sales,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
  onAddSale,
  onUpdateSaleStatus,
  onResetDefaults,
  onExitAdmin,
  onOpenPosSimulator,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'customers' | 'sales'>('overview');

  // Overview metrics
  const totalRevenue = sales
    .filter((s) => s.paymentStatus === 'paid')
    .reduce((sum, s) => sum + s.grandTotal, 0);

  const activeCustomersCount = customers.filter((c) => c.status === 'active').length;
  const trialCustomersCount = customers.filter((c) => c.status === 'trial').length;
  const activeProductsCount = products.filter((p) => p.status === 'active').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans" dir="rtl">
      {/* Top Admin Header in Navy & White */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand Emblem & Header title */}
            <div className="flex items-center gap-3">
              <AlBadrLogo size="sm" showSubtitle={false} />
              <div className="border-r border-slate-200 pr-3 mr-1 hidden sm:block">
                <span className="text-xs font-bold text-slate-500 block">لوحة الإدارة المركزية</span>
                <span className="text-xs font-extrabold text-[#0F172A]">إدارة المنتجات والعملاء والمبيعات</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onOpenPosSimulator}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 border border-slate-300 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-700" />
                <span>المحاكي التفاعلي للكاشير</span>
              </button>

              <button
                onClick={onExitAdmin}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors shadow-2xs"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة للموقع التعريفي</span>
              </button>
            </div>

          </div>
        </div>

        {/* Navigation Tabs in Navy & White */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100">
          <nav className="flex space-x-1 sm:space-x-4 rtl:space-x-reverse overflow-x-auto py-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>نظرة عامة والتقارير</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>إدارة المنتجات ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'customers'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>بيانات العملاء ({customers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('sales')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'sales'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>إدارة المبيعات والفواتير ({sales.length})</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Admin Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTab === 'overview' && (
          <div className="space-y-8 text-right">
            
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold">إجمالي إيرادات المبيعات</span>
                  <DollarSign className="w-4 h-4 text-slate-800" />
                </div>
                <div className="text-2xl font-black text-[#0F172A] font-mono tabular-nums">
                  {totalRevenue.toLocaleString('en-US')} <span className="text-xs font-sans">ر.س</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-bold mt-1">
                  محدث لحظياً من الفواتير المعتمدة
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold">العملاء والمنشآت النشطة</span>
                  <Users className="w-4 h-4 text-slate-800" />
                </div>
                <div className="text-2xl font-black text-[#0F172A] font-mono tabular-nums">
                  {activeCustomersCount} <span className="text-xs font-sans">منشأة نشطة</span>
                </div>
                <div className="text-[11px] text-amber-600 font-bold mt-1">
                  +{trialCustomersCount} عملاء في الفترة التجريبية
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold">الأنظمة والبرمجيات المعروضة</span>
                  <Package className="w-4 h-4 text-slate-800" />
                </div>
                <div className="text-2xl font-black text-[#0F172A] font-mono tabular-nums">
                  {activeProductsCount} <span className="text-xs font-sans">نظام متاح</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">
                  نقاط البيع، ERP، وتطبيقات الجوال
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold">الامتثال الضريبي ZATCA</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-emerald-700 font-mono tabular-nums">
                  100%
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">
                  ربط وتكامل المرحلة الثانية معتمد
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Recent Sales Invoices (8 cols) */}
              <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    أحدث فواتير المبيعات المسجلة
                  </h3>
                  <button
                    onClick={() => setActiveTab('sales')}
                    className="text-xs font-bold text-[#0F172A] hover:underline"
                  >
                    عرض كل الفواتير ({sales.length})
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {sales.slice(0, 4).map((s) => (
                    <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#0F172A] ml-2">
                          {s.invoiceNumber}
                        </span>
                        <span className="text-slate-600 font-medium">{s.customerName} - {s.companyName}</span>
                        <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                          {s.date} · {s.paymentMethod}
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="font-mono font-bold text-[#0F172A] tabular-nums">
                          {s.grandTotal.toFixed(2)} ر.س
                        </div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-0.5 ${
                            s.paymentStatus === 'paid'
                              ? 'bg-slate-100 text-slate-900'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {s.paymentStatus === 'paid' ? 'مسددة' : 'معلقة'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Launch & Database Management (4 cols) */}
              <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3">
                    أدوات وإجراءات سريعة
                  </h3>
                  
                  <div className="space-y-2.5">
                    <button
                      onClick={() => setActiveTab('products')}
                      className="w-full text-right p-3 rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs font-bold text-slate-800"
                    >
                      <span>إدخال نظام أو منتج جديد</span>
                      <Plus className="w-4 h-4 text-slate-900" />
                    </button>

                    <button
                      onClick={() => setActiveTab('customers')}
                      className="w-full text-right p-3 rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs font-bold text-slate-800"
                    >
                      <span>تسجيل اشتراك عميل جديد</span>
                      <Plus className="w-4 h-4 text-slate-900" />
                    </button>

                    <button
                      onClick={onOpenPosSimulator}
                      className="w-full text-right p-3 rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs font-bold text-slate-800"
                    >
                      <span>تجربة محاكي الكاشير التفاعلي</span>
                      <Sparkles className="w-4 h-4 text-slate-900" />
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  <div className="text-[11px] text-slate-400 mb-2">
                    حفظ البيانات محلياً عبر LocalStorage:
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('هل تريد إعادة تعيين كافة البيانات إلى الحالة الافتراضية الأولية؟')) {
                        onResetDefaults();
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>استعادة البيانات الافتراضية</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {activeTab === 'products' && (
          <ProductsManager
            products={products}
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
          />
        )}

        {activeTab === 'customers' && (
          <CustomersManager
            customers={customers}
            products={products}
            onAddCustomer={onAddCustomer}
            onUpdateCustomer={onUpdateCustomer}
            onDeleteCustomer={onDeleteCustomer}
          />
        )}

        {activeTab === 'sales' && (
          <SalesManager
            sales={sales}
            customers={customers}
            products={products}
            onAddSale={onAddSale}
            onUpdateSaleStatus={onUpdateSaleStatus}
          />
        )}
      </main>
    </div>
  );
}
