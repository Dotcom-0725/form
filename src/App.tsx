import { useState, useEffect, type FormEvent } from "react";

// ---------- Types ----------
type FormData = {
  // Step 1
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  city: string;
  whatsappLink: string;
  // Step 2
  businessType: string;
  services: string[];
  projectSize: string;
  experience: string;
  // Step 3
  goals: string[];
  mainGoal: string;
  // Step 4
  pages: string[];
  hasLogo: string;
  hasImages: string;
  hasTexts: string;
  hasSocial: string;
  socialLinks: { facebook: string; instagram: string; tiktok: string };
  // Step 5
  colorStyle: string;
  shapePreference: string;
  hasBrandIdentity: string;
  // Step 6
  hasDomain: string;
  hasHosting: string;
  deliveryDate: string;
  budget: string;
  contactedBefore: string;
  // Step 7
  finalName: string;
};

const initialData: FormData = {
  fullName: "",
  companyName: "",
  phone: "",
  email: "",
  city: "",
  whatsappLink: "",
  businessType: "",
  services: [],
  projectSize: "",
  experience: "",
  goals: [],
  mainGoal: "",
  pages: [],
  hasLogo: "",
  hasImages: "",
  hasTexts: "",
  hasSocial: "",
  socialLinks: { facebook: "", instagram: "", tiktok: "" },
  colorStyle: "",
  shapePreference: "",
  hasBrandIdentity: "",
  hasDomain: "",
  hasHosting: "",
  deliveryDate: "",
  budget: "",
  contactedBefore: "",
  finalName: "",
};

const STEPS = [
  { id: 1, title: "معلومات التواصل", icon: "👤" },
  { id: 2, title: "معلومات النشاط", icon: "💼" },
  { id: 3, title: "أهداف الموقع", icon: "🎯" },
  { id: 4, title: "محتوى الموقع", icon: "📄" },
  { id: 5, title: "الهوية البصرية", icon: "🎨" },
  { id: 6, title: "تفاصيل إضافية", icon: "⚙️" },
  { id: 7, title: "إرسال الاستمارة", icon: "✅" },
];

const WHATSAPP_NUMBER = "212628537649";
const STORAGE_KEY = "rachid-devworks-onboarding-v2";

// ---------- Option Data ----------
const BUSINESS_TYPES = [
  { id: "ecommerce", label: "تجارة إلكترونية", icon: "🛒" },
  { id: "services", label: "خدمات مهنية", icon: "💼" },
  { id: "restaurant", label: "مطعم / فندق", icon: "🍽️" },
  { id: "health", label: "صحة وجمال", icon: "💆" },
  { id: "education", label: "تعليم وتدريب", icon: "🎓" },
  { id: "realestate", label: "عقارات", icon: "🏠" },
  { id: "tourism", label: "سياحة وسفر", icon: "✈️" },
  { id: "industry", label: "صناعة وتصنيع", icon: "🏭" },
  { id: "tech", label: "تقنية ومعلومات", icon: "💻" },
  { id: "other", label: "أخرى", icon: "✨" },
];

const SERVICE_OPTIONS = [
  { id: "products", label: "بيع منتجات" },
  { id: "professional", label: "تقديم خدمات مهنية" },
  { id: "medical", label: "استشارات طبية" },
  { id: "legal", label: "استشارات قانونية" },
  { id: "meals", label: "تقديم وجبات" },
  { id: "financial", label: "استشارات مالية" },
  { id: "education", label: "دورات تعليمية" },
  { id: "realestate", label: "عقارات" },
  { id: "tourism", label: "خدمات سياحية" },
  { id: "creative", label: "خدمات إبداعية" },
  { id: "sports", label: "خدمات رياضية" },
  { id: "other", label: "أخرى" },
];

const SOCIAL_PLATFORMS = [
  { id: "facebook", label: "Facebook", icon: "📘", placeholder: "https://facebook.com/..." },
  { id: "instagram", label: "Instagram", icon: "📸", placeholder: "https://instagram.com/..." },
  { id: "tiktok", label: "TikTok", icon: "🎵", placeholder: "https://tiktok.com/@..." },
];

const SIZE_OPTIONS = [
  { id: "startup", label: "مشروع جديد يبدأ", icon: "🌱" },
  { id: "small", label: "صغير (1-10 موظفين)", icon: "🏢" },
  { id: "medium", label: "متوسط (10-50)", icon: "🏬" },
  { id: "large", label: "كبير (50+)", icon: "🏙️" },
];

const EXPERIENCE_OPTIONS = [
  { id: "none", label: "لا يوجد موقع حالياً", icon: "🆕" },
  { id: "basic", label: "موقع بسيط", icon: "📄" },
  { id: "old", label: "موقع قديم يحتاج تحديث", icon: "🔄" },
  { id: "redesign", label: "أريد إعادة تصميم موقعي", icon: "✨" },
];

const GOAL_OPTIONS = [
  { id: "attract", label: "جذب عملاء جدد", icon: "🧲" },
  { id: "sales", label: "زيادة المبيعات", icon: "💰" },
  { id: "services", label: "عرض الخدمات", icon: "🛠️" },
  { id: "trust", label: "بناء الثقة والمصداقية", icon: "🤝" },
  { id: "bookings", label: "استقبال الحجوزات", icon: "📅" },
  { id: "ecommerce", label: "البيع عبر الإنترنت", icon: "🛒" },
  { id: "info", label: "معلومات عن نشاطي", icon: "ℹ️" },
  { id: "other", label: "أهداف أخرى", icon: "✨" },
];

const MAIN_GOAL_OPTIONS = [
  { id: "presence", label: "الوجود الرقمي الاحترافي" },
  { id: "leads", label: "جذب عملاء محتملين" },
  { id: "online-sales", label: "بيع المنتجات أونلاين" },
  { id: "bookings", label: "استقبال الحجوزات والمواعيد" },
  { id: "info", label: "نشر المعلومات والخدمات" },
  { id: "brand", label: "تعزيز العلامة التجارية" },
];

const PAGE_OPTIONS = [
  { id: "home", label: "الرئيسية", icon: "🏠" },
  { id: "about", label: "من نحن", icon: "👥" },
  { id: "services", label: "الخدمات", icon: "⚡" },
  { id: "products", label: "المنتجات", icon: "📦" },
  { id: "portfolio", label: "معرض الأعمال", icon: "🖼️" },
  { id: "blog", label: "المدونة", icon: "📝" },
  { id: "contact", label: "اتصل بنا", icon: "📞" },
  { id: "booking", label: "صفحة الحجز", icon: "📆" },
  { id: "faq", label: "الأسئلة الشائعة", icon: "❓" },
  { id: "team", label: "فريق العمل", icon: "👨‍💼" },
];

const COLOR_STYLES = [
  { id: "blue", label: "أزرق داكن رسمي", color: "from-blue-700 to-blue-900" },
  { id: "gold", label: "ذهبي فاخر", color: "from-amber-500 to-amber-700" },
  { id: "green", label: "أخضر طبيعي", color: "from-emerald-500 to-emerald-700" },
  { id: "red", label: "أحمر جريء", color: "from-rose-500 to-rose-700" },
  { id: "purple", label: "بنفسجي إبداعي", color: "from-purple-500 to-purple-700" },
  { id: "neutral", label: "محايد وأنيق", color: "from-slate-500 to-slate-700" },
  { id: "custom", label: "ألوان مخصصة لديّ", color: "from-navy-600 to-navy-800" },
];

const SHAPE_OPTIONS = [
  { id: "modern", label: "عصري وأنيق", icon: "✨" },
  { id: "classic", label: "كلاسيكي رسمي", icon: "🏛️" },
  { id: "creative", label: "إبداعي ومميز", icon: "🎨" },
  { id: "minimal", label: "بسيط ونظيف", icon: "⚪" },
  { id: "bold", label: "جريء وقوي", icon: "🔥" },
];

const BUDGET_OPTIONS = [
  { id: "basic", label: "اقتصادي", desc: "موقع بسيط" },
  { id: "standard", label: "قياسي", desc: "موقع متكامل" },
  { id: "premium", label: "متميز", desc: "تصميم احترافي" },
  { id: "vip", label: "VIP", desc: "حل متكامل + تسويق" },
];

const DELIVERY_OPTIONS = [
  { id: "asap", label: "بأسرع وقت ممكن" },
  { id: "1month", label: "خلال شهر" },
  { id: "2months", label: "خلال شهرين" },
  { id: "3months", label: "خلال 3 أشهر" },
  { id: "flexible", label: "مرن" },
];

const CITIES = [
  "الدار البيضاء", "الرباط", "فاس", "مراكش", "طنجة", "أكادير",
  "مكناس", "وجدة", "تطوان", "آسفي", "الناظور", "العيون",
  "الداخلة", "ورزازات", "تازة", "الخريبكة", "بني ملال",
  "سلا", "القنيطرة", "خريبكة", "الصويرة", "الحسيمة",
  "أخرى",
];

// ---------- Icons ----------
const Icon = {
  User: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Briefcase: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  ),
  Target: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  ),
  File: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  ),
  Palette: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="13.5" cy="6.5" r="0.5"/><circle cx="17.5" cy="10.5" r="0.5"/><circle cx="8.5" cy="7.5" r="0.5"/><circle cx="6.5" cy="12.5" r="0.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.97-4.5-9-10-9z"/></svg>
  ),
  Settings: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  Check: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  WhatsApp: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
  ),
  ArrowRight: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  ArrowLeft: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
  ),
  Sparkles: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
  ),
  Phone: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  Mail: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  MapPin: (p: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
};

// ---------- Reusable UI ----------
function Logo({ size = 44 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 via-navy-600 to-navy-800 shadow-lg shadow-navy-900/30"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 32 32" className="w-3/5 h-3/5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8 L16 4 L28 8 L28 18 L16 28 L4 18 Z" />
          <path d="M4 8 L16 16 L28 8" />
          <path d="M16 16 L16 28" />
        </svg>
        <span className="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white" />
      </div>
      <div className="leading-tight">
        <div className="font-extrabold text-navy-900 text-lg tracking-tight">Rachid DevWorks</div>
        <div className="text-[11px] text-navy-500 font-medium">تصميم وتطوير مواقع احترافية</div>
      </div>
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  const percent = Math.round(((step - 1) / (total - 1)) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-bold text-white/90">
          الخطوة <span className="text-white">{step}</span> من <span className="text-white">{total}</span>
        </div>
        <div className="text-sm font-bold text-white">{percent}%</div>
      </div>
      <div className="h-2 w-full bg-white/15 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-l from-emerald-400 via-sky-300 to-white rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.max(8, percent)}%` }}
        />
      </div>
      <div className="hidden md:flex items-center justify-between mt-4 gap-1">
        {STEPS.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-1 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                s.id < step
                  ? "bg-emerald-400 text-navy-900"
                  : s.id === step
                  ? "bg-white text-navy-900 ring-4 ring-white/30 scale-110"
                  : "bg-white/10 text-white/60 border border-white/20"
              }`}
            >
              {s.id < step ? <Icon.Check className="w-4 h-4" /> : s.id}
            </div>
            <span className={`text-[10px] font-medium text-center ${s.id === step ? "text-white" : "text-white/60"}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reusable choice card
function ChoiceCard({
  active,
  onClick,
  icon,
  label,
  desc,
  colorClass,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  desc?: string;
  colorClass?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-right p-4 rounded-2xl border-2 transition-all duration-200 ${
        active
          ? "bg-navy-700 text-white border-navy-700 shadow-lg shadow-navy-700/25 scale-[1.02]"
          : "bg-white text-navy-800 border-navy-100 hover:border-navy-300 hover:bg-navy-50/50"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
            active ? "bg-white/20" : "bg-navy-50"
          }`}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[15px] leading-tight">{label}</div>
          {desc && <div className={`text-xs mt-0.5 ${active ? "text-white/80" : "text-navy-500"}`}>{desc}</div>}
        </div>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          active ? "bg-emerald-400 border-emerald-400" : "border-navy-200"
        }`}>
          {active && <Icon.Check className="w-4 h-4 text-navy-900 animate-check-pop" />}
        </div>
      </div>
      {colorClass && (
        <div className={`absolute top-2 left-2 w-5 h-5 rounded-full bg-gradient-to-br ${colorClass} ring-2 ring-white shadow`} />
      )}
    </button>
  );
}

function QuickInput({
  icon,
  placeholder,
  value,
  onChange,
  dir,
  type = "text",
  required,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  dir?: "ltr" | "rtl";
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400">{icon}</div>
      <input
        type={type}
        dir={dir}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input w-full pr-11 pl-4 py-3.5 bg-white border border-navy-100 rounded-2xl text-navy-900 placeholder:text-navy-300 outline-none text-[15px] font-medium"
      />
    </div>
  );
}

// ---------- Main App ----------
export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Auto-save
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData({ ...initialData, ...parsed });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      const n = { ...e };
      delete n[key as string];
      return n;
    });
  };

  const toggleArray = (key: "services" | "goals" | "pages", value: string) => {
    setData((d) => {
      const arr = d[key];
      return { ...d, [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!data.fullName.trim()) e.fullName = "الرجاء إدخال اسمك";
      if (!data.phone.trim()) e.phone = "الرجاء إدخال رقم الهاتف";
      if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "البريد غير صحيح";
    }
    if (s === 2) {
      if (!data.businessType) e.businessType = "اختر نوع نشاطك";
      if (data.services.length === 0) e.services = "اختر خدمة واحدة على الأقل";
      if (!data.projectSize) e.projectSize = "اختر حجم المشروع";
      if (!data.experience) e.experience = "اختر خبرتك السابقة";
    }
    if (s === 3) {
      if (data.goals.length === 0) e.goals = "اختر هدفاً واحداً على الأقل";
      if (!data.mainGoal) e.mainGoal = "اختر الهدف الرئيسي";
    }
    if (s === 4) {
      if (data.pages.length === 0) e.pages = "اختر صفحة واحدة على الأقل";
      if (!data.hasLogo) e.hasLogo = "اختر أحد الخيارات";
      if (!data.hasImages) e.hasImages = "اختر أحد الخيارات";
      if (!data.hasTexts) e.hasTexts = "اختر أحد الخيارات";
    }
    if (s === 5) {
      if (!data.colorStyle) e.colorStyle = "اختر النمط اللوني";
      if (!data.shapePreference) e.shapePreference = "اختر الشكل";
      if (!data.hasBrandIdentity) e.hasBrandIdentity = "اختر أحد الخيارات";
    }
    if (s === 6) {
      if (!data.hasDomain) e.hasDomain = "اختر أحد الخيارات";
      if (!data.hasHosting) e.hasHosting = "اختر أحد الخيارات";
      if (!data.deliveryDate) e.deliveryDate = "اختر الموعد";
      if (!data.budget) e.budget = "اختر الميزانية";
      if (!data.contactedBefore) e.contactedBefore = "اختر أحد الخيارات";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) {
      setTimeout(() => {
        const firstKey = Object.keys(errors)[0];
        const el = document.querySelector(`[data-field="${firstKey}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setStep((s) => Math.min(7, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prev = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const buildWhatsAppMessage = (): string => {
    const label = (arr: any[]) => arr.map((a) => a.label || a).join("، ");
    const lines: string[] = [];
    lines.push("🚀 *استمارة Rachid DevWorks*");
    lines.push("━━━━━━━━━━━━━━━━━━");
    lines.push("");
    lines.push("📌 *1. معلومات التواصل*");
    lines.push(`• الاسم: ${data.fullName}`);
    lines.push(`• الشركة/المشروع: ${data.companyName || "—"}`);
    lines.push(`• الهاتف: ${data.phone}`);
    lines.push(`• البريد: ${data.email}`);
    lines.push(`• المدينة: ${data.city}`);
    if (data.whatsappLink) lines.push(`• رابط واتساب: ${data.whatsappLink}`);
    lines.push("");
    lines.push("💼 *2. معلومات النشاط*");
    lines.push(`• نوع النشاط: ${BUSINESS_TYPES.find((b) => b.id === data.businessType)?.label}`);
    lines.push(`• الخدمات: ${label(SERVICE_OPTIONS.filter((s) => data.services.includes(s.id)))}`);
    if (data.hasSocial === "yes") {
      const socialLines = [];
      if (data.socialLinks.facebook) socialLines.push(`• Facebook: ${data.socialLinks.facebook}`);
      if (data.socialLinks.instagram) socialLines.push(`• Instagram: ${data.socialLinks.instagram}`);
      if (data.socialLinks.tiktok) socialLines.push(`• TikTok: ${data.socialLinks.tiktok}`);
      if (socialLines.length) lines.push("• وسائل التواصل:", ...socialLines);
    }
    lines.push(`• حجم المشروع: ${SIZE_OPTIONS.find((s) => s.id === data.projectSize)?.label}`);
    lines.push(`• خبرة سابقة: ${EXPERIENCE_OPTIONS.find((e) => e.id === data.experience)?.label}`);
    lines.push("");
    lines.push("🎯 *3. أهداف الموقع*");
    lines.push(`• الأهداف: ${label(GOAL_OPTIONS.filter((g) => data.goals.includes(g.id)))}`);
    lines.push(`• الهدف الرئيسي: ${MAIN_GOAL_OPTIONS.find((g) => g.id === data.mainGoal)?.label}`);
    lines.push("");
    lines.push("📄 *4. محتوى الموقع*");
    lines.push(`• الصفحات: ${label(PAGE_OPTIONS.filter((p) => data.pages.includes(p.id)))}`);
    lines.push(`• لدي شعار؟ ${data.hasLogo === "yes" ? "نعم" : "لا"}`);
    lines.push(`• لدي صور؟ ${data.hasImages === "yes" ? "نعم" : "لا"}`);
    lines.push(`• لدي نصوص؟ ${data.hasTexts === "yes" ? "نعم" : "لا"}`);
    lines.push("");
    lines.push("🎨 *5. التصميم والهوية*");
    lines.push(`• النمط اللوني: ${COLOR_STYLES.find((c) => c.id === data.colorStyle)?.label}`);
    lines.push(`• الشكل: ${SHAPE_OPTIONS.find((s) => s.id === data.shapePreference)?.label}`);
    lines.push(`• لدي هوية بصرية؟ ${data.hasBrandIdentity === "yes" ? "نعم" : "لا"}`);
    lines.push("");
    lines.push("⚙️ *6. تفاصيل إضافية*");
    lines.push(`• لدي نطاق؟ ${data.hasDomain === "yes" ? "نعم" : data.hasDomain === "no" ? "لا" : "سأحتاج المساعدة"}`);
    lines.push(`• لدي استضافة؟ ${data.hasHosting === "yes" ? "نعم" : data.hasHosting === "no" ? "لا" : "سأحتاج المساعدة"}`);
    lines.push(`• موعد التسليم: ${DELIVERY_OPTIONS.find((d) => d.id === data.deliveryDate)?.label}`);
    lines.push(`• الميزانية: ${BUDGET_OPTIONS.find((b) => b.id === data.budget)?.label}`);
    lines.push(`• سبق تواصلت معنا؟ ${data.contactedBefore === "yes" ? "نعم" : "لا لأول مرة"}`);
    lines.push("");
    lines.push("━━━━━━━━━━━━━━━━━━");
    lines.push("شكراً لاختيارك Rachid DevWorks 💙");
    return lines.join("\n");
  };

  const submitForm = (e?: FormEvent) => {
    e?.preventDefault();
    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    setSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => {
      window.open(url, "_blank");
    }, 1800);
  };

  // ---------- Step Renderers ----------
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-5 animate-fade-in-up" key="step1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div data-field="fullName">
                <label className="block text-sm font-bold text-navy-800 mb-2">الاسم الكامل <span className="text-rose-500">*</span></label>
                <QuickInput icon={<Icon.User className="w-5 h-5" />} placeholder="مثال: محمد العلوي" value={data.fullName} onChange={(v) => update("fullName", v)} required />
                {errors.fullName && <p className="text-xs text-rose-500 mt-1">⚠️ {errors.fullName}</p>}
              </div>
              <div data-field="companyName">
                <label className="block text-sm font-bold text-navy-800 mb-2">اسم الشركة أو المشروع</label>
                <QuickInput icon={<Icon.Briefcase className="w-5 h-5" />} placeholder="اختياري" value={data.companyName} onChange={(v) => update("companyName", v)} />
              </div>
              <div data-field="phone">
                <label className="block text-sm font-bold text-navy-800 mb-2">رقم الهاتف <span className="text-rose-500">*</span></label>
                <QuickInput icon={<Icon.Phone className="w-5 h-5" />} placeholder="06XXXXXXXX" value={data.phone} onChange={(v) => update("phone", v)} dir="ltr" required />
                {errors.phone && <p className="text-xs text-rose-500 mt-1">⚠️ {errors.phone}</p>}
              </div>
              <div data-field="email">
                <label className="block text-sm font-bold text-navy-800 mb-2">البريد الإلكتروني <span className="text-rose-500">*</span></label>
                <QuickInput icon={<Icon.Mail className="w-5 h-5" />} placeholder="name@example.com" value={data.email} onChange={(v) => update("email", v)} dir="ltr" type="email" />
                {errors.email && <p className="text-xs text-rose-500 mt-1">⚠️ {errors.email}</p>}
              </div>
            </div>

            <div data-field="city">
              <label className="block text-sm font-bold text-navy-800 mb-2">المدينة <span className="text-rose-500">*</span></label>
              <div className="relative">
                <Icon.MapPin className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
                <select
                  value={data.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="field-input w-full pr-11 pl-10 py-3.5 bg-white border border-navy-100 rounded-2xl text-navy-900 outline-none text-[15px] font-medium appearance-none cursor-pointer"
                >
                  <option value="">— اختر مدينتك —</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <Icon.ArrowLeft className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none rotate-90" />
              </div>
              {errors.city && <p className="text-xs text-rose-500 mt-1">⚠️ {errors.city}</p>}
            </div>

            <div data-field="whatsappLink">
              <label className="block text-sm font-bold text-navy-800 mb-2">رابط واتساب (اختياري)</label>
              <QuickInput icon={<Icon.WhatsApp className="w-5 h-5 text-emerald-500" />} placeholder="https://wa.me/..." value={data.whatsappLink} onChange={(v) => update("whatsappLink", v)} dir="ltr" />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in-up" key="step2">
            <div data-field="businessType">
              <label className="block text-sm font-bold text-navy-800 mb-3">ما هو نوع نشاطك التجاري؟ <span className="text-rose-500">*</span></label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {BUSINESS_TYPES.map((t) => (
                  <ChoiceCard key={t.id} active={data.businessType === t.id} onClick={() => update("businessType", t.id)} icon={<span>{t.icon}</span>} label={t.label} />
                ))}
              </div>
              {errors.businessType && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.businessType}</p>}
            </div>

            <div data-field="services">
              <label className="block text-sm font-bold text-navy-800 mb-1">ما الذي تقدمه؟ <span className="text-rose-500">*</span></label>
              <p className="text-xs text-navy-500 mb-3">يمكنك اختيار أكثر من خيار</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {SERVICE_OPTIONS.map((s) => (
                  <ChoiceCard key={s.id} active={data.services.includes(s.id)} onClick={() => toggleArray("services", s.id)} label={s.label} />
                ))}
              </div>
              {errors.services && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.services}</p>}
            </div>

            <div data-field="hasSocial">
              <label className="block text-sm font-bold text-navy-800 mb-3">هل لديك صفحات تواصل اجتماعي؟</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-3">
                <ChoiceCard active={data.hasSocial === "yes"} onClick={() => update("hasSocial", "yes")} label="✅ نعم، لدي صفحات" />
                <ChoiceCard active={data.hasSocial === "no"} onClick={() => update("hasSocial", "no")} label="❌ لا، ليس لدي" />
              </div>
              {data.hasSocial === "yes" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in">
                  {SOCIAL_PLATFORMS.map((p) => (
                    <div key={p.id}>
                      <label className="block text-xs font-bold text-navy-700 mb-1.5">{p.icon} {p.label}</label>
                      <div className="relative">
                        <input
                          dir="ltr"
                          placeholder={p.placeholder}
                          value={data.socialLinks[p.id as keyof typeof data.socialLinks]}
                          onChange={(e) => update("socialLinks", { ...data.socialLinks, [p.id]: e.target.value })}
                          className="field-input w-full px-3 py-2.5 bg-white border border-navy-100 rounded-xl text-navy-900 placeholder:text-navy-300 outline-none text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div data-field="projectSize">
                <label className="block text-sm font-bold text-navy-800 mb-3">حجم المشروع <span className="text-rose-500">*</span></label>
                <div className="space-y-2">
                  {SIZE_OPTIONS.map((s) => (
                    <ChoiceCard key={s.id} active={data.projectSize === s.id} onClick={() => update("projectSize", s.id)} icon={<span>{s.icon}</span>} label={s.label} />
                  ))}
                </div>
                {errors.projectSize && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.projectSize}</p>}
              </div>

              <div data-field="experience">
                <label className="block text-sm font-bold text-navy-800 mb-3">هل لديك موقع سابق؟ <span className="text-rose-500">*</span></label>
                <div className="space-y-2">
                  {EXPERIENCE_OPTIONS.map((e) => (
                    <ChoiceCard key={e.id} active={data.experience === e.id} onClick={() => update("experience", e.id)} icon={<span>{e.icon}</span>} label={e.label} />
                  ))}
                </div>
                {errors.experience && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.experience}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in-up" key="step3">
            <div data-field="goals">
              <label className="block text-sm font-bold text-navy-800 mb-1">ما هي أهدافك من الموقع؟ <span className="text-rose-500">*</span></label>
              <p className="text-xs text-navy-500 mb-3">اختر كل ما ينطبق على مشروعك</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {GOAL_OPTIONS.map((g) => (
                  <ChoiceCard key={g.id} active={data.goals.includes(g.id)} onClick={() => toggleArray("goals", g.id)} icon={<span>{g.icon}</span>} label={g.label} />
                ))}
              </div>
              {errors.goals && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.goals}</p>}
            </div>

            <div data-field="mainGoal">
              <label className="block text-sm font-bold text-navy-800 mb-3">ما هو الهدف الرئيسي من موقعك؟ <span className="text-rose-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {MAIN_GOAL_OPTIONS.map((g) => (
                  <ChoiceCard key={g.id} active={data.mainGoal === g.id} onClick={() => update("mainGoal", g.id)} label={g.label} />
                ))}
              </div>
              {errors.mainGoal && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.mainGoal}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in-up" key="step4">
            <div data-field="pages">
              <label className="block text-sm font-bold text-navy-800 mb-1">الصفحات المطلوبة <span className="text-rose-500">*</span></label>
              <p className="text-xs text-navy-500 mb-3">اختر كل الصفحات التي تحتاجها</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {PAGE_OPTIONS.map((p) => (
                  <ChoiceCard key={p.id} active={data.pages.includes(p.id)} onClick={() => toggleArray("pages", p.id)} icon={<span className="text-2xl">{p.icon}</span>} label={p.label} />
                ))}
              </div>
              {errors.pages && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.pages}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div data-field="hasLogo">
                <label className="block text-sm font-bold text-navy-800 mb-3">هل لديك شعار؟ <span className="text-rose-500">*</span></label>
                <div className="space-y-2">
                  <ChoiceCard active={data.hasLogo === "yes"} onClick={() => update("hasLogo", "yes")} label="✅ نعم، لدي شعار" />
                  <ChoiceCard active={data.hasLogo === "no"} onClick={() => update("hasLogo", "no")} label="❌ لا، ليس لدي" />
                </div>
                {errors.hasLogo && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.hasLogo}</p>}
              </div>

              <div data-field="hasImages">
                <label className="block text-sm font-bold text-navy-800 mb-3">هل لديك صور للمشروع؟ <span className="text-rose-500">*</span></label>
                <div className="space-y-2">
                  <ChoiceCard active={data.hasImages === "yes"} onClick={() => update("hasImages", "yes")} label="✅ نعم، لدي صور" />
                  <ChoiceCard active={data.hasImages === "no"} onClick={() => update("hasImages", "no")} label="❌ لا، ليس لدي" />
                </div>
                {errors.hasImages && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.hasImages}</p>}
              </div>

              <div data-field="hasTexts">
                <label className="block text-sm font-bold text-navy-800 mb-3">هل لديك نصوص جاهزة؟ <span className="text-rose-500">*</span></label>
                <div className="space-y-2">
                  <ChoiceCard active={data.hasTexts === "yes"} onClick={() => update("hasTexts", "yes")} label="✅ نعم، لدي نصوص" />
                  <ChoiceCard active={data.hasTexts === "no"} onClick={() => update("hasTexts", "no")} label="❌ لا، ليس لدي" />
                </div>
                {errors.hasTexts && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.hasTexts}</p>}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in-up" key="step5">
            <div data-field="colorStyle">
              <label className="block text-sm font-bold text-navy-800 mb-1">ما النمط اللوني المفضل؟ <span className="text-rose-500">*</span></label>
              <p className="text-xs text-navy-500 mb-3">اختر اللون الذي يعكس هويتك</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {COLOR_STYLES.map((c) => (
                  <ChoiceCard
                    key={c.id}
                    active={data.colorStyle === c.id}
                    onClick={() => update("colorStyle", c.id)}
                    label={c.label}
                    colorClass={c.color}
                  />
                ))}
              </div>
              {errors.colorStyle && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.colorStyle}</p>}
            </div>

            <div data-field="shapePreference">
              <label className="block text-sm font-bold text-navy-800 mb-3">ما الشكل الذي تفضله لموقعك؟ <span className="text-rose-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {SHAPE_OPTIONS.map((s) => (
                  <ChoiceCard key={s.id} active={data.shapePreference === s.id} onClick={() => update("shapePreference", s.id)} icon={<span>{s.icon}</span>} label={s.label} />
                ))}
              </div>
              {errors.shapePreference && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.shapePreference}</p>}
            </div>

            <div data-field="hasBrandIdentity">
              <label className="block text-sm font-bold text-navy-800 mb-3">هل لديك هوية بصرية كاملة؟ <span className="text-rose-500">*</span></label>
              <p className="text-xs text-navy-500 mb-3">هوية بصرية = شعار + ألوان + خطوط معتمدة</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <ChoiceCard active={data.hasBrandIdentity === "yes"} onClick={() => update("hasBrandIdentity", "yes")} label="✅ نعم، لدي هوية كاملة" desc="شعار وألوان وخطوط" />
                <ChoiceCard active={data.hasBrandIdentity === "no"} onClick={() => update("hasBrandIdentity", "no")} label="❌ لا، أحتاج المساعدة" desc="سنبنيها معاً من الصفر" />
              </div>
              {errors.hasBrandIdentity && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.hasBrandIdentity}</p>}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in-up" key="step6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div data-field="hasDomain">
                <label className="block text-sm font-bold text-navy-800 mb-3">هل لديك نطاق (Domain)؟ <span className="text-rose-500">*</span></label>
                <div className="space-y-2">
                  <ChoiceCard active={data.hasDomain === "yes"} onClick={() => update("hasDomain", "yes")} label="✅ نعم، لدي نطاق" />
                  <ChoiceCard active={data.hasDomain === "no"} onClick={() => update("hasDomain", "no")} label="❌ لا، ليس لدي" />
                  <ChoiceCard active={data.hasDomain === "need"} onClick={() => update("hasDomain", "need")} label="💡 أحتاج المساعدة في اختياره" />
                </div>
                {errors.hasDomain && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.hasDomain}</p>}
              </div>

              <div data-field="hasHosting">
                <label className="block text-sm font-bold text-navy-800 mb-3">هل لديك استضافة (Hosting)؟ <span className="text-rose-500">*</span></label>
                <div className="space-y-2">
                  <ChoiceCard active={data.hasHosting === "yes"} onClick={() => update("hasHosting", "yes")} label="✅ نعم، لدي استضافة" />
                  <ChoiceCard active={data.hasHosting === "no"} onClick={() => update("hasHosting", "no")} label="❌ لا، ليس لدي" />
                  <ChoiceCard active={data.hasHosting === "need"} onClick={() => update("hasHosting", "need")} label="💡 أحتاج المساعدة" />
                </div>
                {errors.hasHosting && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.hasHosting}</p>}
              </div>
            </div>

            <div data-field="deliveryDate">
              <label className="block text-sm font-bold text-navy-800 mb-3">متى تريد إطلاق الموقع؟ <span className="text-rose-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {DELIVERY_OPTIONS.map((d) => (
                  <ChoiceCard key={d.id} active={data.deliveryDate === d.id} onClick={() => update("deliveryDate", d.id)} label={d.label} />
                ))}
              </div>
              {errors.deliveryDate && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.deliveryDate}</p>}
            </div>

            <div data-field="budget">
              <label className="block text-sm font-bold text-navy-800 mb-3">ما ميزانيتك التقريبية؟ <span className="text-rose-500">*</span></label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {BUDGET_OPTIONS.map((b) => (
                  <ChoiceCard key={b.id} active={data.budget === b.id} onClick={() => update("budget", b.id)} label={b.label} desc={b.desc} />
                ))}
              </div>
              {errors.budget && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.budget}</p>}
            </div>

            <div data-field="contactedBefore">
              <label className="block text-sm font-bold text-navy-800 mb-3">سبق تواصلت معنا قبل ذلك؟ <span className="text-rose-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <ChoiceCard active={data.contactedBefore === "yes"} onClick={() => update("contactedBefore", "yes")} label="✅ نعم، تواصلنا سابقاً" />
                <ChoiceCard active={data.contactedBefore === "no"} onClick={() => update("contactedBefore", "no")} label="🆕 لا، لأول مرة" />
              </div>
              {errors.contactedBefore && <p className="text-xs text-rose-500 mt-2">⚠️ {errors.contactedBefore}</p>}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="text-center py-6 animate-fade-in-up" key="step7">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 rounded-full bg-emerald-400/40" style={{ animation: "pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite" }} />
              <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                <Icon.Check className="w-12 h-12 text-white animate-check-pop" />
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-navy-900 mb-3">
              🎯 شكراً لك على تخصيص وقتك
            </h3>
            <p className="text-navy-600 text-lg max-w-2xl mx-auto leading-relaxed mb-2">
              بمجرد استلام المعلومات، سنقوم بمراجعتها وإعداد أفضل تصور لموقعك الإلكتروني بما يتوافق مع أهداف مشروعك.
            </p>
            <p className="text-navy-500 text-sm mb-8">
              سنرسل لك تفاصيل المشروع والعرض على واتساب في أقرب وقت 🚀
            </p>

            {!submitted ? (
              <button
                onClick={() => submitForm()}
                className="group inline-flex items-center gap-3 bg-gradient-to-l from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-lg px-8 py-5 rounded-2xl shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all hover:scale-105"
              >
                <Icon.WhatsApp className="w-7 h-7" />
                إرسال الاستمارة عبر واتساب
                <Icon.ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full font-bold">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  جاري فتح واتساب...
                </div>
                <p className="text-sm text-navy-500">إذا لم يفتح واتساب، يرجى التأكد من تثبيت التطبيق على جهازك.</p>
              </div>
            )}

            <button
              onClick={() => {
                setStep(1);
                setSubmitted(false);
              }}
              className="mt-6 text-sm text-navy-500 hover:text-navy-700 underline"
            >
              تعديل الإجابات
            </button>
          </div>
        );
    }
  };

  // ---------- Confetti ----------
  const confettiPieces = Array.from({ length: 60 });
  const confettiColors = ["#1f3a85", "#2f4ea3", "#10b981", "#fbbf24", "#ef4444", "#8b5cf6"];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-navy-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confettiPieces.map((_, i) => (
            <span
              key={i}
              className="absolute block"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                width: `${6 + Math.random() * 8}px`,
                height: `${10 + Math.random() * 14}px`,
                background: confettiColors[i % confettiColors.length],
                animation: `confetti-fall ${2 + Math.random() * 2}s linear ${Math.random() * 0.5}s forwards`,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-4xl mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-6 animate-fade-in">
          <Logo />
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-all"
          >
            <Icon.WhatsApp className="w-5 h-5" />
            تواصل معنا
          </a>
        </header>

        {/* Hero */}
        <section className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white border border-navy-100 px-4 py-1.5 rounded-full text-sm font-bold text-navy-700 mb-4 shadow-sm">
            <Icon.Sparkles className="w-4 h-4 text-amber-500" />
            <span>خدمة احترافية بجودة عالمية</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-navy-900 leading-tight mb-4">
            🚀 لنبني موقعك الإلكتروني <span className="shimmer-text">الاحترافي</span>
          </h1>
          <p className="text-navy-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            أنت على بعد دقائق فقط من إطلاق موقع إلكتروني يساعدك على جذب المزيد من العملاء، تعزيز ثقة الزبناء، وزيادة المبيعات.
          </p>
          <p className="text-navy-500 text-sm mt-3 max-w-xl mx-auto">
            💡 كلما كانت الإجابات أسهل وأدق، استطعنا تصميم موقع يحقق أهدافك بشكل أفضل.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm">
            <span className="text-lg">🤝</span>
            <span>استمارة مجانية — بدون أي التزام، ادفع فقط عندما تكون راضياً</span>
          </div>
        </section>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-navy-900/10 border border-navy-100/60 overflow-hidden">
          <div className="bg-gradient-to-l from-navy-900 via-navy-800 to-navy-700 px-6 py-5 text-white">
            <ProgressBar step={step} total={STEPS.length} />
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{STEPS[step - 1].icon}</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900">
                  {STEPS[step - 1].title}
                </h2>
              </div>
              <div className="h-1 w-16 bg-gradient-to-l from-navy-700 to-navy-400 rounded-full" />
            </div>

            {renderStep()}

            {step < 7 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy-100">
                <button
                  onClick={prev}
                  disabled={step === 1}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-navy-700 font-bold hover:bg-navy-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Icon.ArrowRight className="w-5 h-5" />
                  السابق
                </button>
                <div className="text-xs text-navy-400 hidden sm:block">
                  💾 تم حفظ تقدمك تلقائياً
                </div>
                <button
                  onClick={next}
                  className="inline-flex items-center gap-2 bg-gradient-to-l from-navy-700 to-navy-900 hover:from-navy-800 hover:to-navy-950 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-navy-900/20 hover:shadow-xl transition-all"
                >
                  {step === 6 ? "مراجعة الطلب" : "التالي"}
                  <Icon.ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 pb-4">
          <p className="text-navy-700 font-extrabold text-lg mb-1">Rachid DevWorks</p>
          <p className="text-navy-500 text-sm max-w-md mx-auto">
            "نصمم مواقع إلكترونية احترافية تجلب لك زبناء أكثر وتكبر أرباحك."
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-navy-400">
            <span>© {new Date().getFullYear()} Rachid DevWorks</span>
            <span>•</span>
            <span>جميع الحقوق محفوظة</span>
          </div>
        </footer>
      </div>
    </div>
  );
}