import React from 'react';
import { 
  Globe, 
  Layers, 
  Bot, 
  ShieldCheck, 
  Lock, 
  BarChart3, 
  GraduationCap,
  Shield,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import ServiceItem from './ServiceItem';

const pillarIcons = {
  1: <Globe className="w-6 h-6" />,
  2: <Layers className="w-6 h-6" />,
  3: <Bot className="w-6 h-6" />,
  4: <ShieldCheck className="w-6 h-6" />,
  5: <Lock className="w-6 h-6" />,
  6: <BarChart3 className="w-6 h-6" />,
  7: <GraduationCap className="w-6 h-6" />
};

const pillarColors = {
  1: { bg: 'bg-orange-500/10', text: 'text-bloom-coral', border: 'border-orange-500/20' },
  2: { bg: 'bg-teal-500/10', text: 'text-bloom-teal', border: 'border-teal-500/20' },
  3: { bg: 'bg-rose-500/10', text: 'text-rose-600', border: 'border-rose-500/20' },
  4: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20' },
  5: { bg: 'bg-slate-800/10', text: 'text-slate-800', border: 'border-slate-800/20' },
  6: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/20' },
  7: { bg: 'bg-indigo-500/10', text: 'text-indigo-600', border: 'border-indigo-500/20' }
};

const ServiceGroup = ({
  group,
  openItems,
  onToggleItem,
  onDiscussService,
}) => {
  const color = pillarColors[group.number] || pillarColors[1];
  const icon = pillarIcons[group.number] || <Globe className="w-6 h-6" />;

  return (
    <section id={group.id} className="group-section scroll-mt-28 mb-16">
      {/* Pillar Title & Header */}
      <div className="flex items-center gap-4 mb-3">
        <div className={`w-12 h-12 rounded-2xl ${color.bg} ${color.text} flex items-center justify-center border ${color.border} shadow-sm shrink-0`}>
          {icon}
        </div>
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
            Pillar 0{group.number}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {group.title}
          </h2>
        </div>
      </div>

      {/* Promise Subheading */}
      <p className="text-base sm:text-lg text-slate-600 font-medium mb-6 pl-1 border-l-2 border-slate-300 ml-1.5">
        {group.promise}
      </p>

      {/* AI Principles Banner if present */}
      {group.aiPrinciples && group.aiPrinciples.length > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>Our AI Delivery Principles (Guaranteed in Every Project)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {group.aiPrinciples.map((item, idx) => (
              <div key={idx} className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60">
                <h4 className="font-bold text-sm text-slate-100 mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-bloom-coral"></span>
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accordion list of services */}
      <div className="space-y-3.5">
        {group.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isOpen={!!openItems[service.id]}
            onToggle={() => onToggleItem(service.id)}
            onDiscuss={onDiscussService}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceGroup;
