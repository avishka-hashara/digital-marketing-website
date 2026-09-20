import React from 'react';
import { 
  Globe, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Lock, 
  BarChart3, 
  GraduationCap, 
  ShoppingCart, 
  PhoneCall, 
  Cpu, 
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';
import BlurText from '../reactbits/BlurText';
import InfiniteSpiral from '../reactbits/InfiniteSpiral';

const spiralItems = [
  {
    icon: <Globe className="w-7 h-7" />,
    label: "Digital Presence",
    subtitle: "Websites & Stores",
    href: "#digital-presence-commerce",
    iconBg: "rgba(255,94,58,0.14)",
    iconColor: "#FF5E3A"
  },
  {
    icon: <Bot className="w-7 h-7" />,
    label: "AI Agents",
    subtitle: "24/7 WhatsApp & Web",
    href: "#ai-solutions-agents",
    iconBg: "rgba(0,168,150,0.14)",
    iconColor: "#00A896"
  },
  {
    icon: <Layers className="w-7 h-7" />,
    label: "Business Systems",
    subtitle: "ERP & Workflows",
    href: "#business-systems-automation",
    iconBg: "rgba(42,157,143,0.14)",
    iconColor: "#2A9D8F"
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    label: "Tax & Compliance",
    subtitle: "VAT & RAMIS API",
    href: "#tax-compliance-data-protection",
    iconBg: "rgba(244,162,97,0.18)",
    iconColor: "#E76F51"
  },
  {
    icon: <Lock className="w-7 h-7" />,
    label: "Cybersecurity",
    subtitle: "Audits & Backups",
    href: "#cybersecurity-managed-it",
    iconBg: "rgba(30,41,59,0.14)",
    iconColor: "#1E293B"
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    label: "Data & BI",
    subtitle: "Dashboards & Insights",
    href: "#data-business-intelligence",
    iconBg: "rgba(255,94,58,0.14)",
    iconColor: "#FF5E3A"
  },
  {
    icon: <GraduationCap className="w-7 h-7" />,
    label: "Training & Adoption",
    subtitle: "Team AI Upskilling",
    href: "#training-digital-adoption",
    iconBg: "rgba(0,168,150,0.14)",
    iconColor: "#00A896"
  },
  {
    icon: <ShoppingCart className="w-7 h-7" />,
    label: "E-Commerce",
    subtitle: "PayHere & LankaQR",
    href: "#digital-presence-commerce",
    iconBg: "rgba(244,162,97,0.18)",
    iconColor: "#E76F51"
  },
  {
    icon: <PhoneCall className="w-7 h-7" />,
    label: "AI Voice Agents",
    subtitle: "Trilingual Calls",
    href: "#ai-solutions-agents",
    iconBg: "rgba(42,157,143,0.14)",
    iconColor: "#2A9D8F"
  }
];

const ServiceHero = ({ onExploreClick }) => {
  return (
    <header className="relative overflow-hidden bg-slate-50 border-b border-slate-200 pt-28 pb-14 lg:pt-32 lg:pb-16">
      {/* Background styling */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-bloom-coral/5 rounded-bl-[150px] sm:rounded-bl-[240px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-bloom-teal/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div 
          className="absolute inset-0 opacity-25" 
          style={{ 
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-8 lg:gap-12">
          
          {/* Left: Hero Copy */}
          <div className="text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bloom-teal/10 border border-bloom-teal/20 text-bloom-teal font-bold uppercase text-xs tracking-widest mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Service Directory & Catalogue</span>
            </div>

            <h1 className="font-extrabold mb-6 leading-[1.12] text-slate-900 tracking-tight text-4xl sm:text-5xl lg:text-6xl">
              <BlurText
                text="End-to-End Solutions for Digital Growth."
                delay={120}
                animateBy="words"
                direction="top"
                className="font-extrabold"
              />
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              From reliable business websites and trilingual AI agents to ERP systems and RAMIS tax compliance. Every service is built specifically for Sri Lankan SMEs and enterprises.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#services-list"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreClick?.();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-bloom-coral text-white font-bold rounded-xl hover:bg-orange-600 transition transform hover:-translate-y-0.5 shadow-md shadow-orange-500/20 text-sm"
              >
                <span>Explore 30+ Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-bold rounded-xl hover:bg-slate-50 border border-slate-300 transition text-sm shadow-sm"
              >
                <span>Request Custom Quote</span>
              </a>
            </div>

            {/* Micro stats banner */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block text-2xl font-black text-slate-900">7</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pillars</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900">34+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Services</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-bloom-teal">100%</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Localized</span>
              </div>
            </div>
          </div>

          {/* Right: InfiniteSpiral 3D Visualizer */}
          <div className="relative flex items-center justify-center min-h-[460px] lg:min-h-[560px]">
            <div className="w-full max-w-[620px]">
              <InfiniteSpiral
                items={spiralItems}
                speed={0.45}
                radius={200}
                cardWidth={155}
                cardHeight={155}
                verticalSpacing={80}
                perspective={1000}
                cardRadius={20}
                centerScale={1.18}
                edgeBlur={0}
                edgeFade={0.7}
                cardsPerTurn={6.5}
                pauseOnHover={true}
                animationMode="all"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default ServiceHero;
