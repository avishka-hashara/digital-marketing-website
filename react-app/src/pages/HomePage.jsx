import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Bot, 
  Layers, 
  ShieldCheck, 
  Globe, 
  MessageCircle, 
  Check, 
  Send,
  ExternalLink,
  BarChart3
} from 'lucide-react';
import BlurText from '../components/reactbits/BlurText';

import FoldText from '../components/reactbits/FoldText';
import SpecularButton from '../components/reactbits/SpecularButton';

const LightPillar = lazy(() => import('../components/LightPillar'));

const portfolioData = [
  {
    id: 1,
    category: ['social', 'branding'],
    tag: 'Fashion',
    platform: 'Instagram',
    title: 'Boutique Style Co.',
    description: 'Complete social media makeover with content strategy and influencer partnerships.',
    gradient: 'from-pink-400 via-rose-500 to-orange-400',
    stats: [
      { label: 'Engagement', value: '+340%' },
      { label: 'Followers', value: '15K' }
    ]
  },
  {
    id: 2,
    category: ['ads', 'social'],
    tag: 'F&B',
    platform: 'Meta Ads',
    title: 'Spice Kitchen',
    description: 'Lead generation campaign driving online orders through targeted Facebook ads.',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    stats: [
      { label: 'ROAS', value: '5.2x' },
      { label: 'Orders', value: '2.5K' }
    ]
  },
  {
    id: 3,
    category: ['branding'],
    tag: 'Technology',
    platform: 'Branding',
    title: 'InnovateTech',
    description: 'Full brand identity redesign including social templates and brand guidelines.',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    stats: [
      { label: 'Rebrand', value: '100%' },
      { label: 'Assets', value: '50+' }
    ]
  },
  {
    id: 4,
    category: ['social'],
    tag: 'Beauty',
    platform: 'TikTok',
    title: 'Glow Cosmetics',
    description: 'Viral TikTok strategy with short-form video content that drove massive brand awareness.',
    gradient: 'from-amber-400 via-yellow-500 to-orange-500',
    stats: [
      { label: 'Views', value: '2.1M' },
      { label: 'Followers', value: '45K' }
    ]
  },
  {
    id: 5,
    category: ['ads'],
    tag: 'E-commerce',
    platform: 'Conversion',
    title: 'Urban Threads',
    description: 'Full-funnel ad campaign from awareness to purchase with retargeting strategy.',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    stats: [
      { label: 'Revenue', value: 'LKR 8M' },
      { label: 'ROAS', value: '4.8x' }
    ]
  },
  {
    id: 6,
    category: ['social', 'branding'],
    tag: 'B2B',
    platform: 'LinkedIn',
    title: 'ConsultPro Agency',
    description: 'LinkedIn thought leadership campaign positioning founders as industry experts.',
    gradient: 'from-rose-400 via-red-500 to-orange-500',
    stats: [
      { label: 'Leads', value: '120+' },
      { label: 'Connections', value: '8K' }
    ]
  }
];

const processSteps = [
  { step: '1', title: 'Discovery', desc: 'Discuss goals & sales targets', color: 'bg-slate-800' },
  { step: '2', title: 'Strategy', desc: 'Audit & "Brand Voice"', color: 'bg-bloom-coral' },
  { step: '3', title: 'Creation', desc: 'Design, Write, Approve', color: 'bg-bloom-yellow' },
  { step: '4', title: 'Execution', desc: 'Publishing & Ads Live', color: 'bg-bloom-teal' },
  { step: '5', title: 'Reporting', desc: 'Monthly Performance', color: 'bg-slate-300 text-slate-700' },
];

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [formSuccess, setFormSuccess] = useState(false);

  const filteredPortfolio = portfolioData.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category.includes(activeFilter);
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <header className="relative pt-32 pb-24 md:pb-36 overflow-hidden isolate bg-slate-50 border-b border-slate-200">
        {/* LightPillar WebGL Background */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <Suspense fallback={null}>
            <LightPillar
              topColor="#FF5E3A"
              bottomColor="#F4A261"
              lightMode
              intensity={0.9}
              rotationSpeed={0.3}
              glowAmount={0.005}
              pillarWidth={3.0}
              pillarHeight={0.4}
              noiseIntensity={0.3}
              pillarRotation={0}
              interactive={false}
              mixBlendMode="normal"
              quality="high"
              className="opacity-60"
            />
          </Suspense>
          {/* Soft radial veil to ensure perfect text contrast & readability */}
          <div 
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.4) 70%, rgba(255, 255, 255, 0) 100%)'
            }}
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-100 shadow-sm mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-bloom-coral animate-pulse"></span>
            <span className="text-xs font-bold text-bloom-coral tracking-widest uppercase">
              Accepting New Clients for 2026
            </span>
          </div>

          <h1 className="w-full max-w-4xl mx-auto mb-6 flex flex-col items-center justify-center gap-1 sm:gap-2">
            <FoldText
              text="Smart technology and AI for"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.035}
              ease="power3.out"
              perspective={700}
              creaseShading={0.45}
              fontSize="clamp(2rem, 5.2vw, 3.65rem)"
              fontWeight={800}
              color="#0F172A"
              className="w-full max-w-3xl"
            />
            <FoldText
              text="Sri Lankan businesses"
              splitBy="char"
              hinge="top"
              trigger="mount"
              duration={0.65}
              stagger={0.04}
              ease="power3.out"
              perspective={700}
              creaseShading={0.45}
              fontSize="clamp(2.25rem, 5.8vw, 4.15rem)"
              fontWeight={800}
              color="#FF5E3A"
              className="w-full max-w-3xl"
            />
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We help you get online, run on proper systems, stay compliant with new tax and data rules, and use AI agents that reply to your customers in Sinhala, Tamil and English, 24 hours a day.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-5">
            <SpecularButton
              href="#contact"
              size="lg"
              radius={9999}
              tint="#0F172A"
              tintOpacity={1}
              textColor="#ffffff"
              lineColor="#FF5E3A"
              baseColor="#1E293B"
              intensity={1.6}
              shineSize={18}
              shineFade={40}
              thickness={1.5}
              followMouse={true}
              proximity={280}
              className="!font-bold !text-sm sm:!text-base shadow-xl hover:scale-105 transition-transform"
            >
              <span>Book a Free Digital Health Check</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </SpecularButton>

            <SpecularButton
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noreferrer"
              size="lg"
              radius={9999}
              tint="#ffffff"
              tintOpacity={1}
              textColor="#334155"
              lineColor="#00A896"
              baseColor="#CBD5E1"
              intensity={1.4}
              shineSize={18}
              shineFade={40}
              thickness={1.5}
              followMouse={true}
              proximity={280}
              className="!font-bold !text-sm sm:!text-base border border-slate-200 shadow-sm hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5 text-emerald-500 mr-1" />
              <span>Try our AI agent on WhatsApp</span>
            </SpecularButton>
          </div>

          <p className="mt-8 text-xs sm:text-sm text-slate-600 font-semibold tracking-wide flex flex-wrap items-center justify-center gap-2">
            <span>Trilingual support</span>
            <span>&bull;</span>
            <span>Monthly plans from LKR 6,500</span>
            <span>&bull;</span>
            <span>Built & supported in Sri Lanka</span>
          </p>
        </div>
      </header>

      {/* Services Summary Section */}
      <section id="services-summary" className="py-20 md:py-24 bg-white relative text-center border-b border-slate-200">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-bloom-teal font-bold uppercase text-xs sm:text-sm mb-3 tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>What We Do</span>
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Practical tech & AI for growing businesses
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            We provide a comprehensive suite of services ranging from digital presence and commerce to advanced AI solutions, business systems, and cybersecurity. Built specifically for Sri Lankan businesses.
          </p>
          
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 bg-bloom-coral text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 hover:scale-105 transition transform shadow-lg shadow-orange-500/20 text-sm sm:text-base"
          >
            <span>Explore Full 34+ Service Directory</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <Link
              to="/services#digital-presence-commerce"
              className="p-5 border border-slate-200 rounded-2xl hover:shadow-md transition hover:border-bloom-coral group bg-slate-50/50 hover:bg-white"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-bloom-coral flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-bloom-coral transition">
                Digital Presence
              </h3>
              <p className="text-xs text-slate-500">Websites & E-commerce</p>
            </Link>

            <Link
              to="/services#business-systems-automation"
              className="p-5 border border-slate-200 rounded-2xl hover:shadow-md transition hover:border-bloom-teal group bg-slate-50/50 hover:bg-white"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-bloom-teal flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-bloom-teal transition">
                Business Systems
              </h3>
              <p className="text-xs text-slate-500">ERP, Apps & Automation</p>
            </Link>

            <Link
              to="/services#ai-solutions-agents"
              className="p-5 border border-slate-200 rounded-2xl hover:shadow-md transition hover:border-rose-500 group bg-slate-50/50 hover:bg-white"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-rose-600 transition">
                AI Solutions
              </h3>
              <p className="text-xs text-slate-500">Agents & Chatbots</p>
            </Link>

            <Link
              to="/services"
              className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl hover:shadow-md transition flex flex-col items-center justify-center text-center group"
            >
              <span className="font-extrabold text-bloom-coral text-sm group-hover:scale-105 transition">
                + 4 More Pillars
              </span>
              <span className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                <span>See all 34</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="portfolio" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-bloom-coral font-bold uppercase text-xs tracking-widest mb-2">
              OUR WORK
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Portfolio Showcase
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
              Real results from real brands. See how we've helped businesses scale their digital presence, automate sales, and drive revenue.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'social', label: 'Social Media' },
              { id: 'branding', label: 'Branding' },
              { id: 'ads', label: 'Paid Ads' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-bloom-coral hover:text-bloom-coral'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPortfolio.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-slate-200 bg-white"
              >
                {/* Visual Header */}
                <div className={`aspect-[4/3] bg-gradient-to-br ${item.gradient} relative flex items-center justify-center p-6 text-white overflow-hidden`}>
                  <div className="text-center z-10 transition-transform group-hover:scale-95 duration-300">
                    <h4 className="text-2xl font-black">{item.title}</h4>
                    <span className="text-xs uppercase tracking-widest font-bold opacity-80 mt-1 block">
                      {item.tag} &bull; {item.platform}
                    </span>
                  </div>

                  {/* Hover stats overlay */}
                  <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                    <div className="text-center text-white">
                      <div className="flex gap-6 justify-center">
                        {item.stats.map((stat, idx) => (
                          <div key={idx}>
                            <p className="text-2xl sm:text-3xl font-extrabold text-bloom-coral">{stat.value}</p>
                            <p className="text-xs opacity-80 uppercase tracking-wider">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-orange-50 text-bloom-coral text-xs font-bold rounded-md border border-orange-200">
                      {item.tag}
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-md border border-slate-200">
                      {item.platform}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-bloom-coral to-orange-500 text-white px-8 py-3.5 rounded-full font-bold hover:shadow-lg hover:shadow-orange-200 transition transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <span>View All Services & Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Our Transparent Process
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mb-16">
            How we move from initial discovery to measurable business impact.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className={`w-14 h-14 ${step.color} text-white rounded-2xl flex items-center justify-center text-xl font-black mb-4 shadow-sm`}>
                  {step.step}
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Discovery Form */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-bloom-coral uppercase tracking-widest bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 tracking-tight">
              Ready to Accelerate Your Business?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
              Let's discuss your current bottlenecks and build a cost-effective roadmap to revenue.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl border border-slate-700 space-y-6">
            {formSuccess && (
              <div className="p-4 bg-emerald-900/60 border border-emerald-500/40 rounded-xl text-center text-emerald-300 font-bold text-sm">
                Thank you! Your discovery request has been received. Our team will contact you within 24 hours.
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Perera"
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-bloom-coral text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ceylon Logistics Ltd"
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-bloom-coral text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+94 77 123 4567"
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-bloom-coral text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Primary Interest
                </label>
                <select className="w-full bg-slate-900/70 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bloom-coral text-sm">
                  <option value="ai-agents">Trilingual AI Customer Agents</option>
                  <option value="business-websites">Business Websites & E-Commerce</option>
                  <option value="erp-automation">ERP, CRM & Workflow Automation</option>
                  <option value="tax-compliance">RAMIS Tax & IRD Compliance</option>
                  <option value="cybersecurity">Cybersecurity & Managed IT</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-bloom-coral to-orange-500 text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition duration-200 flex items-center justify-center gap-2"
            >
              <span>Submit Discovery Request</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
