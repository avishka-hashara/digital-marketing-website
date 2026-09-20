import React from 'react';
import { Search, X, ChevronRight, ChevronsUpDown, Maximize2, Minimize2 } from 'lucide-react';

const ServiceSidebar = ({
  pillars = [],
  activePillarId,
  searchQuery,
  onSearchChange,
  matchCount,
  onExpandAll,
  onCollapseAll,
}) => {
  return (
    <aside className="lg:w-1/4 flex-shrink-0">
      <div className="sticky top-24 bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 z-30">
        
        {/* Search Box */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search 30+ services..."
            className="block w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:border-bloom-coral focus:ring-2 focus:ring-bloom-coral/20 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results Count if active */}
        {searchQuery && (
          <div className="text-xs font-bold text-bloom-coral bg-orange-50 px-3 py-1.5 rounded-lg mb-4 border border-orange-200 flex items-center justify-between">
            <span>Found {matchCount} service{matchCount === 1 ? '' : 's'}</span>
          </div>
        )}

        {/* Desktop Vertical Nav */}
        <nav className="hidden lg:flex flex-col space-y-1 mb-6">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
            Service Pillars
          </div>
          {pillars.map((pillar) => {
            const isActive = activePillarId === pillar.id;
            return (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-bloom-coral text-white shadow-sm font-extrabold translate-x-1'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{pillar.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ml-2 font-extrabold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200/60 text-slate-500'}`}>
                  {pillar.services.length}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Mobile Horizontal Chips */}
        <nav className="lg:hidden flex overflow-x-auto space-x-2 mb-5 -mx-5 px-5 no-scrollbar pb-1">
          {pillars.map((pillar) => {
            const isActive = activePillarId === pillar.id;
            return (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-bold transition shrink-0 ${
                  isActive
                    ? 'bg-bloom-coral text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {pillar.title.split('&')[0].trim()}
              </a>
            );
          })}
        </nav>

        {/* Expand / Collapse Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onExpandAll}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition py-2 px-3 rounded-lg hover:bg-slate-100 flex-1 border border-slate-200 flex items-center justify-center gap-1.5"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand All</span>
          </button>
          <button
            onClick={onCollapseAll}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition py-2 px-3 rounded-lg hover:bg-slate-100 flex-1 border border-slate-200 flex items-center justify-center gap-1.5"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Collapse</span>
          </button>
        </div>

      </div>
    </aside>
  );
};

export default ServiceSidebar;
