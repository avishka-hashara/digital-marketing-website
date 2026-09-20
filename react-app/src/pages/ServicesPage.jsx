import React, { useState, useEffect, useMemo, useRef } from 'react';
import { serviceCatalogue } from '../data/serviceData';
import ServiceHero from '../components/services/ServiceHero';
import ServiceSidebar from '../components/services/ServiceSidebar';
import ServiceGroup from '../components/services/ServiceGroup';
import { Sparkles, MessageCircle, Send, X, ArrowRight, CheckCircle2 } from 'lucide-react';

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});
  const [activePillarId, setActivePillarId] = useState(serviceCatalogue[0]?.id || '');
  const [selectedService, setSelectedService] = useState(null);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Filter service catalogue according to search query
  const filteredCatalogue = useMemo(() => {
    if (!searchQuery.trim()) {
      return serviceCatalogue;
    }
    const q = searchQuery.toLowerCase().trim();

    return serviceCatalogue
      .map((pillar) => {
        const matchingServices = pillar.services.filter((s) => {
          const matchTitle = s.title.toLowerCase().includes(q);
          const matchDesc = s.description.toLowerCase().includes(q);
          const matchBest = s.bestFor.some((b) => b.toLowerCase().includes(q));
          const matchDeliv = s.deliverables.some((d) => d.toLowerCase().includes(q));
          const matchVal = s.businessValue.some((v) => v.toLowerCase().includes(q));
          return matchTitle || matchDesc || matchBest || matchDeliv || matchVal;
        });

        return {
          ...pillar,
          services: matchingServices,
        };
      })
      .filter((pillar) => pillar.services.length > 0);
  }, [searchQuery]);

  const totalMatches = useMemo(() => {
    return filteredCatalogue.reduce((acc, p) => acc + p.services.length, 0);
  }, [filteredCatalogue]);

  // If user enters a search query, automatically open all matching items
  useEffect(() => {
    if (searchQuery.trim()) {
      const allOpen = {};
      filteredCatalogue.forEach((p) => {
        p.services.forEach((s) => {
          allOpen[s.id] = true;
        });
      });
      setOpenItems(allOpen);
    }
  }, [searchQuery, filteredCatalogue]);

  // Scrollspy observer for active pillar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const pillar of serviceCatalogue) {
        const el = document.getElementById(pillar.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActivePillarId(pillar.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleItem = (serviceId) => {
    setOpenItems((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const handleExpandAll = () => {
    const all = {};
    serviceCatalogue.forEach((p) => {
      p.services.forEach((s) => {
        all[s.id] = true;
      });
    });
    setOpenItems(all);
  };

  const handleCollapseAll = () => {
    setOpenItems({});
  };

  const handleExploreClick = () => {
    const el = document.getElementById('services-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscussService = (service) => {
    setSelectedService(service);
    setContactSuccess(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setSelectedService(null);
      setContactSuccess(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero Header */}
      <ServiceHero onExploreClick={handleExploreClick} />

      {/* Main Content Area */}
      <div
        id="services-list"
        className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10 max-w-7xl relative"
      >
        {/* Sticky Sidebar */}
        <ServiceSidebar
          pillars={serviceCatalogue}
          activePillarId={activePillarId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          matchCount={totalMatches}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
        />

        {/* Main Service Sections */}
        <main className="lg:w-3/4 flex flex-col min-h-screen pb-20">
          {filteredCatalogue.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-12">
              <Sparkles className="w-12 h-12 text-bloom-coral mx-auto mb-4 opacity-75" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                No matching services found
              </h3>
              <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                We couldn't find any services matching "{searchQuery}". Try a different keyword or browse through our full catalogue.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2.5 bg-bloom-coral text-white font-bold rounded-xl text-sm hover:bg-orange-600 transition shadow-sm"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            filteredCatalogue.map((group) => (
              <ServiceGroup
                key={group.id}
                group={group}
                openItems={openItems}
                onToggleItem={handleToggleItem}
                onDiscussService={handleDiscussService}
              />
            ))
          )}
        </main>
      </div>

      {/* Contact Section at bottom */}
      <section id="contact" className="py-20 bg-white border-t border-slate-200 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-bloom-coral uppercase tracking-widest bg-orange-50 px-3 py-1.5 rounded-full border border-orange-200">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-4 tracking-tight">
              Ready to Accelerate Your Business?
            </h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto mt-3">
              Book a free discovery consultation with our Sri Lankan team to plan your digital transformation, AI agents, or ERP deployment.
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Perera"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bloom-coral focus:ring-2 focus:ring-bloom-coral/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ceylon Logistics Ltd"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bloom-coral focus:ring-2 focus:ring-bloom-coral/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="kasun@example.com"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bloom-coral focus:ring-2 focus:ring-bloom-coral/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+94 77 123 4567"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bloom-coral focus:ring-2 focus:ring-bloom-coral/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Services You're Interested In
              </label>
              <select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bloom-coral focus:ring-2 focus:ring-bloom-coral/20 text-slate-700">
                <option value="">Select a service category or specific service...</option>
                {serviceCatalogue.map((pillar) => (
                  <optgroup key={pillar.id} label={`Pillar ${pillar.number}: ${pillar.title}`}>
                    {pillar.services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.number} - {s.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Project Details / Objectives
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your current challenges, timeline, or objectives..."
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bloom-coral focus:ring-2 focus:ring-bloom-coral/20"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-bloom-coral to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition text-base flex items-center justify-center gap-2"
            >
              <span>Submit Discovery Request</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* Discuss Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {contactSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Request Received!
                </h3>
                <p className="text-slate-600 text-sm">
                  Our team will contact you regarding{' '}
                  <span className="font-bold text-slate-800">{selectedService.title}</span>{' '}
                  shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-bloom-coral flex items-center justify-center font-bold text-sm">
                    {selectedService.number}
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Service Enquiry
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedService.description}
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bloom-coral focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+94 77 123 4567"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bloom-coral focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-bloom-coral focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-bloom-coral text-white font-bold rounded-xl hover:bg-orange-600 transition shadow-md shadow-orange-500/20 text-sm flex items-center justify-center gap-2"
                  >
                    <span>Request Details for this Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
