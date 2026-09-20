import React from 'react';
import { ChevronDown, Check, Sparkles, ArrowRight, MessageSquare } from 'lucide-react';

const ServiceItem = ({
  service,
  isOpen,
  onToggle,
  onDiscuss,
}) => {
  return (
    <article 
      id={service.id}
      className="service-item bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md overflow-hidden"
    >
      {/* Header / Summary Toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-bloom-coral rounded-2xl"
      >
        <div className="flex items-start sm:items-center gap-4 flex-1">
          {/* Service number tag */}
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
            {service.number}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-bloom-coral transition-colors">
                {service.title}
              </h3>
              {service.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-bloom-coral border border-orange-200">
                  {service.badge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-1">
              {service.description}
            </p>
          </div>
        </div>

        {/* Chevron */}
        <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-orange-50 text-bloom-coral' : ''}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {/* Expanded Details */}
      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 animate-in fade-in-50 slide-in-from-top-2 duration-300">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Best For */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-3 text-xs tracking-wider uppercase flex items-center gap-1.5 text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-bloom-teal" />
                Best For
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {service.bestFor.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white text-slate-700 rounded-lg text-xs font-medium border border-slate-200 shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-3 text-xs tracking-wider uppercase flex items-center gap-1.5 text-slate-700">
                <Check className="w-3.5 h-3.5 text-bloom-teal" />
                What We Deliver
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-bloom-teal mt-1.5 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Value */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-3 text-xs tracking-wider uppercase flex items-center gap-1.5 text-slate-700">
                <ArrowRight className="w-3.5 h-3.5 text-bloom-coral" />
                Business Value
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                {service.businessValue.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-bloom-coral mt-1.5 shrink-0"></span>
                    <span className="font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => onDiscuss?.(service)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-bloom-coral text-white font-bold rounded-lg hover:bg-orange-600 transition text-xs sm:text-sm shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss {service.title.split('(')[0].trim()}</span>
            </button>
            <span className="text-xs text-slate-400 font-medium">
              Ref ID: #{service.id}
            </span>
          </div>
        </div>
      )}
    </article>
  );
};

export default ServiceItem;
