import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, ShieldCheck } from 'lucide-react';
import { ProductRecord } from '../../types';

interface ProductsManagerProps {
  products: ProductRecord[];
  onAddProduct: (product: Omit<ProductRecord, 'id' | 'createdAt'>) => void;
  onUpdateProduct: (id: string, updated: Partial<ProductRecord>) => void;
  onDeleteProduct: (id: string) => void;
}

export default function ProductsManager({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductsManagerProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRecord | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'pos' | 'erp' | 'mobile' | 'clinic' | 'custom'>('pos');
  const [price, setPrice] = useState(1800);
  const [billingType, setBillingType] = useState<'monthly' | 'yearly' | 'one-time'>('yearly');
  const [licensesAvailable, setLicensesAvailable] = useState(100);
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [zatcaReady, setZatcaReady] = useState(true);
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>('active');
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategory('pos');
    setPrice(1800);
    setBillingType('yearly');
    setLicensesAvailable(100);
    setDescription('');
    setFeaturesText('ربط سحابي فوري, دعم الفاتورة الإلكترونية, واجهة كاشير سهلة');
    setZatcaReady(true);
    setStatus('active');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (prod: ProductRecord) => {
    setEditingProduct(prod);
    setName(prod.name);
    setCategory(prod.category);
    setPrice(prod.price);
    setBillingType(prod.billingType);
    setLicensesAvailable(prod.licensesAvailable);
    setDescription(prod.description);
    setFeaturesText(prod.features.join(', '));
    setZatcaReady(prod.zatcaReady);
    setStatus(prod.status);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('يرجى كتابة اسم المنتج أو النظام البرمجي');
      return;
    }

    const featuresList = featuresText
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, {
        name,
        category,
        price,
        billingType,
        licensesAvailable,
        description,
        features: featuresList,
        zatcaReady,
        status,
      });
    } else {
      onAddProduct({
        name,
        category,
        price,
        billingType,
        licensesAvailable,
        description,
        features: featuresList,
        zatcaReady,
        status,
      });
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="ابحث في المنتجات والأنظمة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-9 pl-4 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-slate-900"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white text-slate-700"
          >
            <option value="all">جميع التصنيفات</option>
            <option value="pos">نقاط البيع (POS)</option>
            <option value="erp">المؤسسات والمخازن (ERP)</option>
            <option value="mobile">تطبيقات الجوال</option>
            <option value="clinic">المراكز الطبية</option>
          </select>
        </div>

        <button
          onClick={openAddModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة نظام / منتج جديد</span>
        </button>
      </div>

      {/* Products Table in Navy & White */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">اسم المنتج / النظام</th>
                <th className="py-3 px-4">التصنيف</th>
                <th className="py-3 px-4">السعر</th>
                <th className="py-3 px-4">نموذج الترخيص</th>
                <th className="py-3 px-4">التراخيص المتاحة</th>
                <th className="py-3 px-4">اعتماد ZATCA</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    لا توجد منتجات مطابقة لخيارات البحث.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{p.description}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {p.category === 'pos' && 'نقاط البيع'}
                      {p.category === 'erp' && 'نظام ERP'}
                      {p.category === 'mobile' && 'تطبيقات جوال'}
                      {p.category === 'clinic' && 'مراكز طبية'}
                      {p.category === 'custom' && 'مخصص'}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0F172A] tabular-nums">
                      {p.price.toLocaleString('en-US')} ر.س
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {p.billingType === 'yearly' && 'اشتراك سنوي'}
                      {p.billingType === 'monthly' && 'اشتراك شهري'}
                      {p.billingType === 'one-time' && 'ترخيص دائم'}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-800 font-medium">
                      {p.licensesAvailable} رخصة
                    </td>
                    <td className="py-3 px-4">
                      {p.zatcaReady ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>معتمد</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">غير مطلوب</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.status === 'active'
                            ? 'bg-slate-100 text-slate-900 border border-slate-200'
                            : 'bg-slate-50 text-slate-500'
                        }`}
                      >
                        {p.status === 'active' ? 'نشط' : 'مسودة'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded"
                          title="تعديل المنتج"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`هل أنت متأكد من حذف المنتج: ${p.name}؟`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded"
                          title="حذف المنتج"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right my-8">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? 'تعديل بيانات المنتج / النظام' : 'إضافة نظام برمجيات جديد'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  اسم المنتج أو النظام:
                </label>
                <input
                  type="text"
                  placeholder="مثال: البدر لنقاط البيع السحابية"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    التصنيف:
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
                  >
                    <option value="pos">نقاط البيع (POS)</option>
                    <option value="erp">نظام إدارة المؤسسات (ERP)</option>
                    <option value="mobile">تطبيقات الجوال</option>
                    <option value="clinic">المراكز الطبية</option>
                    <option value="custom">برمجيات مخصصة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    نوع الترخيص:
                  </label>
                  <select
                    value={billingType}
                    onChange={(e: any) => setBillingType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
                  >
                    <option value="yearly">اشتراك سنوي</option>
                    <option value="monthly">اشتراك شهري</option>
                    <option value="one-time">شراء ترخيص دائم</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    السعر الأساسي (ر.س):
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    التراخيص المتاحة:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={licensesAvailable}
                    onChange={(e) => setLicensesAvailable(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  الوصف التعريفي للنظام:
                </label>
                <textarea
                  rows={2}
                  placeholder="وصف مختصر للوظائف وإدارة العمليات..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  المميزات (افصل بينها بفاصلة):
                </label>
                <input
                  type="text"
                  placeholder="ربط سحابي فوري, دعم الفاتورة, تقارير مبيعات"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={zatcaReady}
                    onChange={(e) => setZatcaReady(e.target.checked)}
                    className="w-4 h-4 text-slate-900 rounded accent-slate-900"
                  />
                  <span className="font-bold text-slate-800">متوافق مع ZATCA الفاتورة الإلكترونية</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={status === 'active'}
                    onChange={(e) => setStatus(e.target.checked ? 'active' : 'draft')}
                    className="w-4 h-4 text-slate-900 rounded accent-slate-900"
                  />
                  <span className="font-bold text-slate-800">تفعيل ونشر المنتج فوراً</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors"
                >
                  {editingProduct ? 'حفظ التعديلات' : 'إضافة المنتج'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
