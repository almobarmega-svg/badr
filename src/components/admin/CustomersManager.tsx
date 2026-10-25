import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, UserPlus, X, Phone, Building2, MapPin } from 'lucide-react';
import { CustomerRecord, ProductRecord } from '../../types';

interface CustomersManagerProps {
  customers: CustomerRecord[];
  products: ProductRecord[];
  onAddCustomer: (customer: Omit<CustomerRecord, 'id' | 'joinDate' | 'totalSpent'>) => void;
  onUpdateCustomer: (id: string, updated: Partial<CustomerRecord>) => void;
  onDeleteCustomer: (id: string) => void;
}

export default function CustomersManager({
  customers,
  products,
  onAddCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
}: CustomersManagerProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'trial' | 'expired'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('الرياض');
  const [assignedSystem, setAssignedSystem] = useState('');
  const [planType, setPlanType] = useState<'سحابي سنوي' | 'سحابي شهري' | 'ترخيص دائم'>('سحابي سنوي');
  const [branchesCount, setBranchesCount] = useState(1);
  const [status, setStatus] = useState<'active' | 'trial' | 'expired'>('active');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const openAddModal = () => {
    setEditingCustomer(null);
    setFullName('');
    setCompanyName('');
    setPhone('+966 5');
    setEmail('');
    setCity('الرياض');
    setAssignedSystem(products[0]?.name || 'البدر لنقاط البيع POS');
    setPlanType('سحابي سنوي');
    setBranchesCount(1);
    setStatus('active');
    setNotes('');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const openEditModal = (c: CustomerRecord) => {
    setEditingCustomer(c);
    setFullName(c.fullName);
    setCompanyName(c.companyName);
    setPhone(c.phone);
    setEmail(c.email);
    setCity(c.city);
    setAssignedSystem(c.assignedSystem);
    setPlanType(c.planType);
    setBranchesCount(c.branchesCount);
    setStatus(c.status);
    setNotes(c.notes || '');
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !companyName.trim() || !phone.trim()) {
      setErrorMsg('يرجى ملء اسم العميل، اسم المنشأة، ورقم الهاتف');
      return;
    }

    if (editingCustomer) {
      onUpdateCustomer(editingCustomer.id, {
        fullName,
        companyName,
        phone,
        email,
        city,
        assignedSystem,
        planType,
        branchesCount,
        status,
        notes,
      });
    } else {
      onAddCustomer({
        fullName,
        companyName,
        phone,
        email,
        city,
        assignedSystem,
        planType,
        branchesCount,
        status,
        notes,
      });
    }

    setIsModalOpen(false);
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      c.fullName.toLowerCase().includes(query) ||
      c.companyName.toLowerCase().includes(query) ||
      c.phone.includes(query) ||
      c.city.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right">
      {/* Top filters and actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="ابحث باسم العميل، المنشأة، الهاتف..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-9 pl-4 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white text-slate-700"
          >
            <option value="all">كافة الحالات</option>
            <option value="active">عملاء نشطون</option>
            <option value="trial">فترة تجريبية</option>
            <option value="expired">منتهي الصلاحية</option>
          </select>
        </div>

        <button
          onClick={openAddModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>إضافة عميل / منشأة جديدة</span>
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-3 px-4">اسم العميل والمنشأة</th>
                <th className="py-3 px-4">الاتصال والمدينة</th>
                <th className="py-3 px-4">النظام المخصص</th>
                <th className="py-3 px-4">نوع الباقة</th>
                <th className="py-3 px-4">الفروع</th>
                <th className="py-3 px-4">إجمالي المبيعات</th>
                <th className="py-3 px-4">الحالة</th>
                <th className="py-3 px-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    لا يوجد عملاء مطابقين لخيارات البحث.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{c.fullName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        <span>{c.companyName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div dir="ltr" className="font-mono text-slate-700 text-left text-[11px]">
                        {c.phone}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-300" />
                        <span>{c.city}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      <div className="line-clamp-1">{c.assignedSystem}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {c.planType}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums">
                      {c.branchesCount} {c.branchesCount === 1 ? 'فرع' : 'فروع'}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-700 tabular-nums">
                      {c.totalSpent.toLocaleString('en-US')} ر.س
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          c.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : c.status === 'trial'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {c.status === 'active' && 'نشط'}
                        {c.status === 'trial' && 'تجريبي'}
                        {c.status === 'expired' && 'منتهي'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                          title="تعديل بيانات العميل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`هل أنت متأكد من حذف العميل: ${c.fullName}؟`)) {
                              onDeleteCustomer(c.id);
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded"
                          title="حذف العميل"
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

      {/* Add / Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-right my-8">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">
                {editingCustomer ? 'تعديل بيانات العميل والمنشأة' : 'تسجيل عميل جديد في النظام'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    اسم المسؤول / العميل:
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: عبد العزيز الشمري"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    اسم المنشأة أو الشركة:
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: شركة الأفق"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    رقم الهاتف / الواتساب:
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="+966 5x xxx xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    البريد الإلكتروني:
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    المدينة / الدولة:
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="الرياض">الرياض (السعودية)</option>
                    <option value="جدة">جدة (السعودية)</option>
                    <option value="الدمام">الدمام (السعودية)</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    <option value="القاهرة">القاهرة (مصر)</option>
                    <option value="الإسكندرية">الإسكندرية (مصر)</option>
                    <option value="دبي">دبي (الإمارات)</option>
                    <option value="أخرى">مدينة أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    عدد الفروع:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={branchesCount}
                    onChange={(e) => setBranchesCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    النظام المشترك به:
                  </label>
                  <select
                    value={assignedSystem}
                    onChange={(e) => setAssignedSystem(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    نوع الاشتراك:
                  </label>
                  <select
                    value={planType}
                    onChange={(e: any) => setPlanType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="سحابي سنوي">سحابي سنوي</option>
                    <option value="سحابي شهري">سحابي شهري</option>
                    <option value="ترخيص دائم">ترخيص مكتبي دائم</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  حالة العميل:
                </label>
                <div className="flex gap-4">
                  {(['active', 'trial', 'expired'] as const).map((st) => (
                    <label key={st} className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="customerStatus"
                        checked={status === st}
                        onChange={() => setStatus(st)}
                        className="text-blue-600"
                      />
                      <span>
                        {st === 'active' && 'نشط (مشترك)'}
                        {st === 'trial' && 'فترة تجريبية'}
                        {st === 'expired' && 'منتهي الاشتراك'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">
                  ملاحظات الدعم والتشغيل:
                </label>
                <textarea
                  rows={2}
                  placeholder="أي تفاصيل تخص الأجهزة، عدد المستخدمين، أو حالة الربط..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  {editingCustomer ? 'حفظ التعديلات' : 'تسجيل العميل'}
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
