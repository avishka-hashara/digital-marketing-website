import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isServices = location.pathname === '/services';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo33.png"
              alt="Bloom Labs Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-bloom-coral transition-colors">
              Bloom Labs
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600 items-center">
            <Link
              to="/"
              className={`${
                isHome
                  ? 'text-bloom-coral relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-bloom-coral'
                  : 'hover:text-bloom-coral transition relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-bloom-coral after:transition-all hover:after:w-full'
              }`}
            >
              Home
            </Link>

            <Link
              to="/services"
              className={`${
                isServices
                  ? 'text-bloom-coral relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-bloom-coral'
                  : 'hover:text-bloom-coral transition relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-bloom-coral after:transition-all hover:after:w-full'
              }`}
            >
              Services
            </Link>

            <a
              href="/#portfolio"
              className="hover:text-bloom-coral transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-bloom-coral after:transition-all hover:after:w-full"
            >
              Portfolio
            </a>

            <a
              href="/#process"
              className="hover:text-bloom-coral transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-bloom-coral after:transition-all hover:after:w-full"
            >
              Our Process
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-bloom-coral to-orange-500 text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-orange-200 transition transform hover:-translate-y-0.5 text-sm"
            >
              <span>Book Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-800 p-2 focus:outline-none rounded-lg hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-3 pb-4 border-t border-slate-200 pt-4 animate-in fade-in duration-200">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-bold ${isHome ? 'bg-orange-50 text-bloom-coral' : 'text-slate-700 hover:text-bloom-coral'}`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`px-3 py-2 rounded-lg font-bold ${isServices ? 'bg-orange-50 text-bloom-coral' : 'text-slate-700 hover:text-bloom-coral'}`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <a
              href="/#portfolio"
              className="text-slate-600 font-medium hover:text-bloom-coral px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </a>
            <a
              href="/#process"
              className="text-slate-600 font-medium hover:text-bloom-coral px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              Our Process
            </a>
            <a
              href="#contact"
              className="bg-bloom-coral text-white text-center py-3 rounded-xl font-bold shadow-sm hover:bg-orange-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Book Discovery Call
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
