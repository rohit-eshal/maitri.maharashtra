import { useState, useEffect, useRef } from "react";

const MAITRI_LOGO = "https://maitri.maharashtra.gov.in/wp-content/uploads/2024/12/maitri-logo-1.png";
const MAHARASHTRA_EMBLEM = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Seal_of_Maharashtra.svg/200px-Seal_of_Maharashtra.svg.png";
const INDIA_EMBLEM = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/200px-Emblem_of_India.svg.png";
const PM_PHOTO = "https://www.pmindia.gov.in/wp-content/themes/flavor/img/gallery-img/modi.jpg";
const CM_PHOTO = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Devendra_Fadnavis_2024.jpg/220px-Devendra_Fadnavis_2024.jpg";
const MIDC_LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/MIDC_Logo.svg/150px-MIDC_Logo.svg.png";

const sectorIcons = {
    auto: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="10" y="24" width="44" height="18" rx="4" />
            <circle cx="20" cy="42" r="5" /><circle cx="44" cy="42" r="5" />
            <path d="M18 24l4-10h20l4 10" />
            <line x1="26" y1="14" x2="38" y2="14" />
        </svg>
    ),
    aerospace: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M32 6L26 28H14L8 38h18l-4 20 10-14 10 14-4-20h18l-6-10H38z" />
        </svg>
    ),
    agro: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M32 54V30" />
            <path d="M32 30c-6-4-14-2-16 4 4 0 10-2 16-4z" />
            <path d="M32 22c6-6 16-4 18 2-4 2-12 0-18-2z" />
            <path d="M32 36c-8-2-12 2-12 8 4-1 8-4 12-8z" />
            <ellipse cx="32" cy="56" rx="10" ry="3" />
        </svg>
    ),
    chemical: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M24 8v16l-10 24a4 4 0 004 4h28a4 4 0 004-4L40 24V8" />
            <line x1="22" y1="8" x2="42" y2="8" />
            <path d="M20 38c4-2 8 2 12 0s8-2 12 0" />
        </svg>
    ),
    it: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="8" y="10" width="48" height="32" rx="3" />
            <line x1="32" y1="42" x2="32" y2="50" />
            <line x1="20" y1="50" x2="44" y2="50" />
            <path d="M22 26l6 6-6 6M34 26h10" />
        </svg>
    ),
    gems: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polygon points="32,8 12,24 20,52 44,52 52,24" />
            <polyline points="12,24 32,32 52,24" />
            <line x1="20" y1="52" x2="32" y2="32" />
            <line x1="44" y1="52" x2="32" y2="32" />
        </svg>
    ),
    electronics: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="14" y="14" width="36" height="36" rx="4" />
            <rect x="24" y="24" width="16" height="16" rx="2" />
            <line x1="20" y1="14" x2="20" y2="8" />
            <line x1="32" y1="14" x2="32" y2="8" />
            <line x1="44" y1="14" x2="44" y2="8" />
            <line x1="20" y1="50" x2="20" y2="56" />
            <line x1="32" y1="50" x2="32" y2="56" />
            <line x1="44" y1="50" x2="44" y2="56" />
            <line x1="14" y1="26" x2="8" y2="26" />
            <line x1="14" y1="38" x2="8" y2="38" />
            <line x1="50" y1="26" x2="56" y2="26" />
            <line x1="50" y1="38" x2="56" y2="38" />
        </svg>
    ),
    textile: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M16 12c0 8 6 12 16 20s16 12 16 20" />
            <path d="M48 12c0 8-6 12-16 20S16 44 16 52" />
            <line x1="10" y1="12" x2="54" y2="12" />
            <line x1="10" y1="52" x2="54" y2="52" />
        </svg>
    ),
};

const sectors = [
    { key: "auto", label: "Auto & Auto Component" },
    { key: "aerospace", label: "Aerospace & Defence" },
    { key: "agro", label: "Agro Food Processing" },
    { key: "chemical", label: "Chemical & Pharma" },
    { key: "it", label: "IT" },
    { key: "gems", label: "Gems & Jewellery" },
    { key: "electronics", label: "Electronics" },
    { key: "textile", label: "Textile" },
];

const navButtons = ["ODOP", "Cluster Development Program", "Critical Infra scheme", "Policies", "Events", "Schemes", "Export"];
const quickButtons = ["MAITRI Overview", "Initiatives", "EoDB Best Practices", "Publications", "News", "Gallery", "User Manuals"];
const relatedLinks = ["Maharashtra Govt", "MSSIDC", "MCED", "GeM", "Ministry of MSME", "NSIC Ltd.", "india.gov.in", "Directorate of Industries"];
const policyStrategies = [
    "AVGC Parks – Mumbai, Nashik, Nagpur, Chhatrapati Sambhajinagar, Kolhapur/Satara",
    "Centre of Excellence aligned with Indian Institute of Creative Technology, Mumbai",
    "Design Studios & Virtual Production Studios with Testing and Certification Facilities",
    "M-Hub with plug and play facility & Cluster development",
    "WAVES Summit & IP Digital Marketplace for AVGC",
];
const incentives = [
    "AVGC Venture capital Fund of Rs. 300 crores",
    "Subsidy for virtual production studios up to Rs. 10 crores/studio",
    "Rs. 200 crores for WAVES Summit",
    "Critical Infrastructure Fund support for AVGC-XR Parks",
    "Capital Subsidy up to Rs. 25 crores/unit",
    "Stamp duty, Electricity duty exemption, Power tariff subsidy up to 10 years",
    "Production cost incentive up to Rs. 5 crores/unit",
    "Financial Assistance for recruitment, skilling and technology",
    "Grants for Innovation lab up to Rs. 5 crores",
];
const statData = [
    { val: "Mumbai", desc: "Entertainment & Media Hub of India", color: "#22c55e" },
    { val: "550+", desc: "Studios & 20+ universities for animation", color: "#3b82f6" },
    { val: "₹80,000 Cr", desc: "M&E sector (30% share of India)", color: "#f59e0b" },
    { val: "₹25,000 Cr", desc: "AVGC sector estimated", color: "#a855f7" },
    { val: "Highest", desc: "Talent Pool, Fintech & Startup Capital", color: "#14b8a6" },
];
const officials = [
    { name: "Devendra Fadnavis", title: "Chief Minister" },
    { name: "Eknath Shinde", title: "Deputy Chief Minister" },
    { name: "Ajit Pawar", title: "Deputy Chief Minister" },
    { name: "Uday Samant", title: "Minister for Industries" },
    { name: "Indranil Naik", title: "Min. of State for Industries" },
];
const footerLinks = [
    "Disclaimer and Policies", "Citizen Charter", "Aaple Sarkar",
    "Sitemap", "Gallery", "Government of India",
    "Help", "Mygov.in",
];

// Simple circular progress ring
function StatRing({ val, desc, color }) {
    return (
        <div className="flex flex-col items-center justify-center w-[108px] h-[108px] rounded-full relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 108 108">
                <circle cx="54" cy="54" r="48" fill="none" stroke="#e5e7eb" strokeWidth="5" />
                <circle cx="54" cy="54" r="48" fill="none" stroke={color} strokeWidth="5"
                    strokeDasharray={`${Math.random() * 120 + 140} 999`} strokeLinecap="round" />
            </svg>
            <span className="text-[11px] font-bold z-10" style={{ color }}>{val}</span>
            <span className="text-[9px] text-gray-500 text-center px-3 z-10 leading-tight">{desc}</span>
        </div>
    );
}

export default function MaitriWebsite() {
    const [carouselX, setCarouselX] = useState(0);
    const carouselRef = useRef(null);
    const [tickerPaused, setTickerPaused] = useState(false);

    const scrollCarousel = (dir) => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

            {/* ===== ACCESSIBILITY BUTTON ===== */}
            <button className="fixed top-4 left-4 z-50 w-12 h-12 rounded-full bg-blue-500 border-[3px] border-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Accessibility">
                <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <circle cx="12" cy="4" r="2" />
                    <path d="M12 8c-3 0-6 1-6 1v3h3v9h2v-5h2v5h2v-9h3v-3s-3-1-6-1z" />
                </svg>
            </button>

            {/* ===== TICKER BAR ===== */}
            <div className="bg-[#06122b] text-white flex items-center justify-between px-5 h-11 text-sm font-medium">
                <div className="flex items-center gap-2">
                    <span className="font-bold tracking-widest text-lg">W</span>
                    <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide">NEW</span>
                </div>
                <div className="flex gap-10 items-center">
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1.5 text-sm">
                        <span>★</span> MAITRI Rules 2025
                    </a>
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1.5 text-sm">
                        <span>★</span> IGNITE document
                    </a>
                </div>
                <div className="flex gap-1">
                    {["◀", "❚❚", "▶"].map((icon, i) => (
                        <button key={i} className="bg-white/10 border border-white/20 text-white w-7 h-7 flex items-center justify-center text-xs hover:bg-white/20 transition-colors">
                            {icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* ===== HERO BANNER ===== */}
            <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a1a4a 0%, #1a3a7a 40%, #2a5ab0 100%)" }}>
                {/* City silhouette overlay */}
                <div className="absolute bottom-[38%] left-0 w-[45%] h-[60%] opacity-40"
                    style={{
                        clipPath: "polygon(0 100%, 0 40%, 5% 35%, 8% 20%, 10% 35%, 14% 30%, 16% 15%, 18% 30%, 22% 25%, 25% 10%, 28% 25%, 32% 30%, 35% 20%, 38% 32%, 42% 28%, 45% 40%, 50% 100%)",
                        background: "linear-gradient(to right, rgba(30,60,140,0.6), transparent)"
                    }} />

                {/* Top row: PM - Logos - CM */}
                <div className="relative z-10 flex justify-between items-start px-10 pt-6">
                    {/* PM */}
                    <div className="flex flex-col items-center gap-1.5">
                        <span className="text-white font-semibold text-sm">Narendra Modi</span>
                        <span className="text-white/60 text-xs">Prime Minister</span>
                    </div>

                    {/* Center logos */}
                    <div className="flex items-center gap-5 mt-2">

                        <img src={INDIA_EMBLEM} alt="India Emblem" className="h-12 object-contain brightness-0 invert opacity-80" onError={(e) => { e.target.style.display = 'none'; }} />
                        <img src={MAHARASHTRA_EMBLEM} alt="Maharashtra" className="h-14 object-contain brightness-0 invert opacity-80" onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>

                    {/* CM */}
                    <div className="flex flex-col items-center gap-1.5">
                        <span className="text-white font-semibold text-sm">Devendra Fadnavis</span>
                        <span className="text-white/60 text-xs">Chief Minister</span>
                    </div>
                </div>

                {/* Hero content */}
                <div className="relative z-10 flex items-center gap-8 px-10 py-6">
                    {/* Illustration circles */}
                    <div className="flex-shrink-0 w-[200px] h-[160px] relative hidden lg:block">
                        <div className="absolute top-0 left-0 w-28 h-28 rounded-full border-2 border-white/30 bg-green-700/30 flex items-center justify-center">
                            <span className="text-white/80 text-xs font-semibold">🎬 AVGC</span>
                        </div>
                        <div className="absolute top-5 left-[70px] w-28 h-28 rounded-full border-2 border-white/30 bg-blue-700/30 flex items-center justify-center">
                            <span className="text-white/80 text-xs font-semibold">🥽 XR / VR</span>
                        </div>
                        <div className="absolute top-12 left-8 w-24 h-24 rounded-full border-2 border-white/30 bg-red-700/20 flex items-center justify-center">
                            <span className="text-white/80 text-xs font-semibold">🎮 Gaming</span>
                        </div>
                    </div>

                    {/* Text card */}
                    <div className="flex-1 bg-white/95 rounded-md px-9 py-7 shadow-xl">
                        <p className="text-blue-600 font-medium text-base mb-1">Powering the Creative Economy</p>
                        <h1 className="text-[#0a1a3a] font-extrabold text-2xl mb-3 tracking-tight">
                            Maharashtra AVGC - XR POLICY 2025
                        </h1>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The Government of Maharashtra is proud to announce the Animation, Visual Effects, Gaming Comics & Extended Reality (AVGC - XR) Policy 2025.
                        </p>
                    </div>
                </div>
            </div>

            {/* ===== POLICY SECTION ===== */}
            <div className="grid lg:grid-cols-2 gap-8 p-8" style={{ background: "linear-gradient(180deg, #e6eef7 0%, #f0f5fb 100%)" }}>
                {/* Left: Strategies */}
                <div>
                    <h3 className="text-blue-700 font-bold text-sm uppercase tracking-wider border-b-2 border-blue-700 inline-block pb-1.5 mb-4">
                        Policy Strategies
                    </h3>
                    <div className="flex flex-col gap-2">
                        {policyStrategies.map((s, i) => (
                            <div key={i} className="bg-white p-3 rounded border-l-[3px] border-blue-600 text-xs text-gray-700 leading-relaxed shadow-sm">
                                {s}
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 inline-block bg-blue-700 text-white px-4 py-2 rounded text-xs">
                        <strong>AVGC Components:</strong> Audio Visual, Gaming Comics, AR-VR
                    </div>

                    {/* MIDC Footer */}
                    <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-300">
                        <img src={MIDC_LOGO} alt="MIDC" className="w-12 h-12 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                        <div className="text-xs text-gray-600 leading-relaxed">
                            <a href="#" className="text-blue-600">www.midcindia.org</a> | <a href="#" className="text-blue-600">www.maitri.maharashtra.gov.in</a><br />
                            <strong className="text-gray-800">MAHARASHTRA INDUSTRIAL DEVELOPMENT CORPORATION</strong><br />
                            & Maharashtra Industry, Trade & Investment Facilitation Cell (MAITRI)
                        </div>
                    </div>
                </div>

                {/* Right: Leader stats + incentives */}
                <div>
                    <h3 className="text-blue-700 font-bold text-sm uppercase tracking-wider border-b-2 border-blue-700 inline-block pb-1.5 mb-4">
                        Maharashtra as a Leader
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                        {statData.map((s, i) => <StatRing key={i} {...s} />)}
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
                        <h4 className="text-red-600 font-bold text-xs uppercase mb-3">Incentives</h4>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-1.5">
                            {incentives.map((inc, i) => (
                                <div key={i} className="text-[11px] text-gray-600 leading-relaxed flex items-start gap-1.5">
                                    <span className="text-blue-600 mt-0.5">•</span>{inc}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MAITRI Banner */}
                    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-3 rounded text-xs font-medium leading-relaxed">
                        MAITRI - online single window system | Land use and zone relaxation<br />
                        Additional FSI @50% premium | Industry status and 24*7 flexibility
                    </div>

                    {/* Officials */}
                    <div className="flex gap-4 mt-4 flex-wrap">
                        {officials.map((o, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 text-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-blue-600 flex items-center justify-center text-lg">
                                    👤
                                </div>
                                <span className="text-[9px] font-semibold text-gray-700 max-w-[72px] leading-tight">{o.name}</span>
                                <span className="text-[8px] text-gray-400 max-w-[72px] leading-tight">{o.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== SECTORS BAR ===== */}
            <div className="bg-[#06122b] grid grid-cols-4 lg:grid-cols-8 border-t-2 border-white/10">
                {sectors.map((s) => (
                    <div key={s.key} className="flex flex-col items-center justify-center py-6 px-3 gap-3 border-r border-white/[0.06] last:border-r-0 cursor-pointer hover:bg-white/[0.04] transition-colors text-white/70 hover:text-white/90">
                        {sectorIcons[s.key]}
                        <span className="text-xs font-medium text-center leading-tight">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* ===== NAV BUTTONS ===== */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-8 bg-gray-50">
                {navButtons.map((btn) => (
                    <button key={btn} className="bg-white border-2 border-sky-300 rounded-lg py-3.5 px-3 text-center text-sm font-medium text-gray-800 hover:bg-sky-100 hover:border-blue-500 hover:text-blue-700 hover:-translate-y-0.5 transition-all shadow-sm">
                        {btn}
                    </button>
                ))}
            </div>

            {/* ===== WELCOME SECTION ===== */}
            <div className="flex flex-col lg:flex-row gap-10 px-8 py-12 max-w-[1400px] mx-auto">
                {/* Text */}
                <div className="flex-1">
                    <h2 className="text-teal-700 font-bold text-2xl mb-4">WELCOME TO MAITRI</h2>
                    <p className="text-gray-600 text-sm leading-7 mb-4">
                        Maharashtra has always been the first choice of domestic and foreign investors. It has been the reflection of India's growth for decades. Being the biggest contributor to India's GDP, Maharashtra has always remained in the forefront of country's economic development. If India has to grow at 8 per cent, Maharashtra has to grow 10 per cent.
                    </p>
                    <p className="text-gray-600 text-sm leading-7 mb-4">
                        Maharashtra wholeheartedly welcomes investors across the globe. This is the right time to invest in Maharashtra. This is a land of immense opportunities. We assure you that once you decide to come, we will extend all possible help. Our Government will welcome the investors and the business community with red carpet. Soon everything will be brought under one roof. You are assured best infrastructure, power, skilled manpower and other relevant things.
                    </p>
                    <p className="text-gray-600 text-sm leading-7">
                        We welcome you all to Maharashtra.
                    </p>
                </div>
            </div>

            {/* ===== QUICK NAV ===== */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 px-8 pb-10 max-w-[1400px] mx-auto">
                {quickButtons.map((btn) => (
                    <button key={btn} className="bg-sky-50 border-2 border-sky-300 rounded-lg py-3.5 px-3 text-center text-sm font-medium text-gray-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:-translate-y-0.5 transition-all hover:shadow-lg">
                        {btn}
                    </button>
                ))}
            </div>

            {/* ===== RELATED LINKS ===== */}
            <div className="py-10 px-8 text-center">
                <h2 className="text-amber-600 font-bold text-xl mb-6">RELATED LINKS</h2>
                <div className="flex items-center gap-4 justify-center">
                    <button onClick={() => scrollCarousel(-1)} className="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-lg flex-shrink-0">
                        ‹
                    </button>
                    <div ref={carouselRef} className="flex gap-4 overflow-x-auto max-w-[1100px] scrollbar-hide" style={{ scrollbarWidth: "none" }}>
                        {relatedLinks.map((link) => (
                            <div key={link} className="min-w-[160px] h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center px-4 text-xs text-gray-500 font-medium text-center flex-shrink-0 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer">
                                {link}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => scrollCarousel(1)} className="w-9 h-9 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-lg flex-shrink-0">
                        ›
                    </button>
                </div>
            </div>

            {/* ===== FOOTER ===== */}
            <footer className="bg-[#06122b] text-white/80">
                <div className="flex flex-col lg:flex-row gap-10 px-8 py-9 border-b border-white/10">
                    {/* Brand */}
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center">
                                <img src={MAITRI_LOGO} alt="MAITRI" className="h-10 object-contain" onError={(e) => { e.target.parentElement.textContent = 'MAITRI'; }} />
                            </div>
                            <h3 className="text-white font-bold text-sm uppercase tracking-wide leading-tight">
                                Maharashtra Industry, Trade and<br />Investment Facilitation
                            </h3>
                        </div>
                        <p className="text-xs text-white/50 mb-1">
                            📊 Total Visitors : <span className="text-white/80 font-semibold">708938</span> | Today Views : <span className="text-white/80 font-semibold">381</span>
                        </p>
                        <p className="text-[11px] text-white/40">Last Updated On February 3, 2026</p>

                        {/* Socials */}
                        <div className="flex gap-2 mt-4">
                            <a href="#" className="w-9 h-9 rounded-md bg-gray-700 flex items-center justify-center hover:opacity-80 transition-opacity">
                                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-md bg-[#0077b5] flex items-center justify-center hover:opacity-80 transition-opacity">
                                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-md bg-[#1877f2] flex items-center justify-center hover:opacity-80 transition-opacity">
                                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="w-9 h-9 rounded-md flex items-center justify-center hover:opacity-80 transition-opacity" style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}>
                                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex-1">
                        <h4 className="text-white font-semibold text-base mb-4">Quick links</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                            {footerLinks.map((link) => (
                                <a key={link} href="#" className="text-sm text-white/50 hover:text-white transition-colors">{link}</a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom copyright */}
                <div className="text-center py-4 bg-black/20 text-xs text-white/40">
                    Copyrights © 2026, MAITRI. Portal designed and developed by{" "}
                    <a href="#" className="text-sky-400 hover:text-sky-300">MahaIT</a>
                </div>
            </footer>
        </div>
    );
}