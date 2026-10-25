import { useState, useRef, useEffect } from 'react';
import { 
  Smartphone, Wifi, BatteryCharging, CreditCard, 
  Receipt, QrCode, Sparkles, CheckCircle2, RotateCw, 
  ArrowLeft, ShoppingCart, TrendingUp, Layers, ShieldCheck, 
  Maximize2, Eye, Zap, Flame, Scan
} from 'lucide-react';
import { HANDHELD_SALES_DEVICES } from '../../data/companyData';
import { HandheldSalesDevice } from '../../types';

interface ModernHandheldSales3DProps {
  onOpenDemo: (deviceName: string) => void;
  onOpenPosSimulator?: () => void;
}

export default function ModernHandheldSales3D({ onOpenDemo, onOpenPosSimulator }: ModernHandheldSales3DProps) {
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState(0);
  const [activeScreenTab, setActiveScreenTab] = useState<'sales' | 'analytics' | 'receipt'>('sales');
  
  // 3D Tilt perspective state
  const [rotateX, setRotateX] = useState(-6);
  const [rotateY, setRotateY] = useState(12);
  const [isHovered, setIsHovered] = useState(false);
  const [perspectiveMode, setPerspectiveMode] = useState<'isometric' | 'front' | 'dynamic'>('dynamic');
  
  // Interactive sales simulation state
  const device = HANDHELD_SALES_DEVICES[selectedDeviceIndex] || HANDHELD_SALES_DEVICES[0];
  const [salesList, setSalesList] = useState(device.sampleSales);
  const [todayRevenue, setTodayRevenue] = useState(14850);
  const [receiptPrinting, setReceiptPrinting] = useState(false);
  const [nfcSuccess, setNfcSuccess] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Sync sales list when device changes
  useEffect(() => {
    setSalesList(device.sampleSales);
    setImageError(false);
  }, [device]);

  // Handle 3D mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (perspectiveMode !== 'dynamic') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    
    // Smooth angle bounds
    const newRotateY = ((x - midX) / midX) * 16;
    const newRotateX = -((y - midY) / midY) * 12;
    
    setRotateX(newRotateX);
    setRotateY(newRotateY);
  };

  const resetRotation = () => {
    if (perspectiveMode === 'isometric') {
      setRotateX(-8);
      setRotateY(15);
    } else if (perspectiveMode === 'front') {
      setRotateX(0);
      setRotateY(0);
    } else {
      setRotateX(-6);
      setRotateY(12);
    }
  };

  const handleSimulateNewSale = () => {
    const products = [
      { name: 'وجبة سبيشال كومبو + مشروب', price: 42.0 },
      { name: 'سماعة رأس لاسلكية Pro', price: 185.0 },
      { name: 'عطر الفخامة الملكي 50مل', price: 320.0 },
      { name: 'كرتون زيت محركات فائق الجودة', price: 540.0 },
      { name: 'كافيه لاتيه بحليب الشوفان', price: 22.0 },
    ];
    const picked = products[Math.floor(Math.random() * products.length)];
    const newId = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSale = {
      id: newId,
      item: picked.name,
      amount: picked.price,
      time: 'الآن',
      status: 'مدفوع مدى NFC',
    };

    setNfcSuccess(true);
    setReceiptPrinting(true);
    setTodayRevenue((prev) => prev + picked.price);
    setSalesList((prev) => [newSale, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setNfcSuccess(false);
    }, 2200);

    setTimeout(() => {
      setReceiptPrinting(false);
    }, 3500);
  };

  return (
    <section id="handheld-pos" className="py-20 bg-linear-to-b from-slate-900 via-[#0A192F] to-[#0F172A] text-white relative overflow-hidden border-y border-slate-800">
      {/* Background 3D Blue Light Effect */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 text-right">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-mono uppercase tracking-wider">NEXT-GEN 3D MOBILE POS HARDWARE</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">أجهزة مبيعات متنقلة ذكية</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              أجهزة نقاط البيع المحمولة الحديثة <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">باللون الأزرق الملكي ثلاثي الأبعاد</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              حوّل مندوبيك وموظفيك إلى محطات بيع متنقلة فائقة السرعة؛ أجهزة مبيعات متطورة بشاشات لمس عالية الدقة، طابعة فواتير ZATCA مدمجة، ودعم فوري لمدفوعات مدى وApple Pay بدون تلامس.
            </p>
          </div>

          {/* Quick Perspective Selector */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 p-1.5 rounded-xl self-start lg:self-auto">
            <span className="text-xs text-slate-400 px-2 font-medium">زاوية الرؤية 3D:</span>
            <button
              onClick={() => { setPerspectiveMode('dynamic'); setRotateX(-6); setRotateY(12); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                perspectiveMode === 'dynamic' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              تفاعلية مع الفأرة
            </button>
            <button
              onClick={() => { setPerspectiveMode('isometric'); setRotateX(-10); setRotateY(20); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                perspectiveMode === 'isometric' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              أيزومترك 3D
            </button>
            <button
              onClick={() => { setPerspectiveMode('front'); setRotateX(0); setRotateY(0); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                perspectiveMode === 'front' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              واجهة أمامية
            </button>
          </div>
        </div>

        {/* Model Selector Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {HANDHELD_SALES_DEVICES.map((item, idx) => {
            const isSelected = selectedDeviceIndex === idx;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedDeviceIndex(idx)}
                className={`p-4 rounded-xl text-right transition-all border relative flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-900/25 ring-1 ring-blue-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-cyan-300 font-bold border border-blue-700/50">
                      {item.modelCode}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>محدد للعرض</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{item.tagline}</p>
                </div>

                <div className="text-left shrink-0">
                  <span className="text-xs text-slate-400 block">السعر التقريبي</span>
                  <span className="text-sm font-bold font-mono text-white tabular-nums">
                    {item.priceSAR} <span className="text-[10px] text-blue-300">ر.س</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Master 3D Showcase Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left/Main Column: Interactive 3D Blue Device Stage (7 cols) */}
          <div 
            className="lg:col-span-7 relative flex flex-col items-center justify-center p-6 sm:p-10 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-2xl overflow-hidden min-h-[520px]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); resetRotation(); }}
            style={{ perspective: '1200px' }}
          >
            {/* Top Interactive Status Bar on Device Stage */}
            <div className="w-full flex items-center justify-between mb-4 z-20">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-medium">الجهاز متصل سحابياً (Online)</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono text-cyan-400 text-[11px]">4G LTE / Wi-Fi 6</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateNewSale}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
                  title="إجراء عملية بيع تجريبية فورا"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>محاكاة عملية بيع حية</span>
                </button>
              </div>
            </div>

            {/* 3D Hardware Canvas Container */}
            <div 
              className="relative w-full max-w-md transition-transform duration-200 ease-out flex items-center justify-center py-4"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Device 3D Blue Shadow and Pedestal */}
              <div className="absolute -bottom-8 w-72 h-14 bg-blue-500/25 blur-2xl rounded-full transform rotateX(80deg) pointer-events-none" />

              {/* Hardware Device Container */}
              <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border-2 border-blue-500/60 shadow-[0_25px_60px_-15px_rgba(30,64,175,0.4)] group">
                
                {/* 3D Blue Metallic Shell Glare & Border Accent */}
                <div className="absolute inset-0 bg-linear-to-tr from-blue-900/40 via-transparent to-cyan-400/20 pointer-events-none z-10" />
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

                {/* Device Screen Header Bar */}
                <div className="px-4 py-2.5 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-300 z-20 relative">
                  <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold">
                    <span>{new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>نظام البدر كاشير 3D</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                    <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono text-[10px]">98%</span>
                  </div>
                </div>

                {/* Image Media or Fallback Screen */}
                <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
                  {!imageError ? (
                    <img
                      src={device.image}
                      alt={device.name}
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                  ) : (
                    /* Fallback High-tech 3D Blue Slate Mockup */
                    <div className="w-full h-full bg-linear-to-b from-[#0F172A] to-[#0A192F] p-6 flex flex-col justify-between text-right">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-cyan-400">AL-BADR SMART TERMINAL 3D</span>
                        <CreditCard className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-center py-6">
                        <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-2 opacity-80" />
                        <h4 className="text-base font-bold text-white">{device.name}</h4>
                        <p className="text-xs text-slate-400">{device.tagline}</p>
                      </div>
                      <div className="flex justify-between text-xs text-slate-300 border-t border-slate-800 pt-2">
                        <span>إجمالي اليوم: 14,850 ر.س</span>
                        <span className="text-emerald-400 font-bold">ZATCA 15% Ready</span>
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay for legibility */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0A192F]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Contactless NFC Tap Zone Trigger Overlay */}
                  <div className="absolute top-4 right-4 bg-blue-900/80 backdrop-blur-md border border-blue-400/40 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs text-white shadow-lg">
                    <CreditCard className="w-4 h-4 text-cyan-300" />
                    <span>منطقة الدفع بدون تلامس NFC</span>
                  </div>

                  {/* NFC Success Flash Notification */}
                  {nfcSuccess && (
                    <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 z-30 animate-in fade-in zoom-in-95 duration-200">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-3 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
                        PAYMENT APPROVED · تم الدفع بنجاح
                      </span>
                      <h4 className="text-lg font-bold text-white">مدفوع عبر مدى / Apple Pay</h4>
                      <p className="text-xs text-slate-300 mt-1 font-mono">العملية: تم حفظها بالخزينة وإصدار الفاتورة</p>
                    </div>
                  )}

                  {/* Live Sales Ticker at bottom of device */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md rounded-xl p-2.5 border border-slate-700/80 z-20">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                        <span>آخر العمليات على هذا الجهاز:</span>
                      </span>
                      <span className="font-mono text-cyan-300 font-bold tabular-nums">
                        {salesList[0]?.amount} ر.س
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span className="truncate max-w-[200px]">{salesList[0]?.item}</span>
                      <span className="text-emerald-400 font-mono text-[10px]">{salesList[0]?.status}</span>
                    </div>
                  </div>
                </div>

                {/* Animated Thermal Paper Receipt Slot */}
                <div className="bg-[#0F172A] p-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-medium text-slate-300">طابعة إيصالات ZATCA مدمجة</span>
                  </div>

                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all ${
                    receiptPrinting 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {receiptPrinting ? 'جاري طباعة الإيصال...' : 'جاهزة للطباعة'}
                  </span>
                </div>

              </div>
            </div>

            {/* Mouse tilt prompt hint */}
            <div className="mt-4 text-[11px] text-slate-400 flex items-center gap-2 z-20">
              <RotateCw className="w-3.5 h-3.5 text-blue-400" />
              <span>حرّك الفأرة فوق الجهاز للتحكم في زاوية العرض ثلاثية الأبعاد (3D Perspective)</span>
            </div>
          </div>

          {/* Right Column: Hardware Features & Sales Data (5 cols) */}
          <div className="lg:col-span-5 text-right flex flex-col justify-between space-y-6">
            
            {/* Model Card Header */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  {device.modelCode}
                </span>
                <span className="text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 px-2.5 py-0.5 rounded-full font-bold">
                  معتمد لهيئة الزكاة ZATCA
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{device.name}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {device.tagline}
              </p>

              {/* Today's Sales Live Highlight */}
              <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-300 block">إجمالي مبيعات اليوم على الجهاز</span>
                  <span className="text-xl font-black font-mono text-cyan-300 tabular-nums">
                    {todayRevenue.toLocaleString()} <span className="text-xs text-blue-300">ر.س</span>
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-xs text-slate-400 block">عدد الفواتير</span>
                  <span className="text-sm font-mono font-bold text-white tabular-nums">+48 فاتورة</span>
                </div>
              </div>
            </div>

            {/* Device Technical Specs Bento */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-md">
              <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>المواصفات التقنية للهاردوير:</span>
                <span className="text-[11px] text-blue-400 font-mono">SPECIFICATIONS</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">الشاشة واللمس:</span>
                  <span className="font-semibold text-white mt-0.5 block">{device.specs.display}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">طابعة الفواتير:</span>
                  <span className="font-semibold text-white mt-0.5 block">{device.specs.printer}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">عمر البطارية:</span>
                  <span className="font-semibold text-white mt-0.5 block">{device.specs.battery}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">الاتصال والشبكة:</span>
                  <span className="font-semibold text-white mt-0.5 block">{device.specs.connectivity}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">المدفوعات بدون تلامس:</span>
                  <span className="font-semibold text-emerald-400 mt-0.5 block">{device.specs.nfcPayment}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">الوزن والراحة:</span>
                  <span className="font-semibold text-white mt-0.5 block">{device.specs.weight}</span>
                </div>
              </div>
            </div>

            {/* Key Advantages Checklist */}
            <div className="space-y-2">
              {device.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-blue-900/60 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 border border-blue-700/50">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenDemo(device.name)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md active:scale-98"
              >
                <span>طلب تجربة هذا الجهاز الميداني</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              {onOpenPosSimulator && (
                <button
                  onClick={onOpenPosSimulator}
                  className="py-3.5 px-4 text-xs font-bold text-white bg-blue-700 hover:bg-blue-600 rounded-xl transition-colors border border-blue-500 shadow-sm flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-4 h-4 text-cyan-300" />
                  <span>فتح محاكي الكاشير</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
