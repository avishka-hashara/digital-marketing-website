import React from 'react';
import { ArrowUpRight, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0f1115] text-white pt-24 pb-12 border-t border-gray-800 mt-auto relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-bloom-coral/5 rounded-full filter blur-3xl pointer-events-none -z-0"></div>

      {/* Big CTA Section */}
      <div className="container mx-auto px-6 mb-20 border-b border-gray-800 pb-16 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <h2 className="text-5xl md:text-[5rem] lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.9] text-center md:text-left">
          Let's Work<br />
          <span className="text-bloom-coral">Together</span>
        </h2>
        
        <a
          href="#contact"
          className="shrink-0 flex items-center justify-center w-36 h-36 md:w-44 md:h-44 bg-[#f44336] text-white rounded-full font-bold text-center hover:scale-105 transition transform shadow-[0_10px_40px_rgba(244,67,54,0.4)] group"
        >
          <div className="flex flex-col items-center">
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mb-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <span className="text-xs md:text-sm uppercase tracking-widest font-black leading-tight mt-1">
              Contact Us<br />Today
            </span>
          </div>
        </a>
      </div>

      {/* Links & Info */}
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 relative z-10">
        {/* Col 1: Logo & Bio */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo33.png"
              alt="Bloom Labs"
              className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
            />
            <span className="text-2xl md:text-3xl font-black tracking-tight uppercase">
              Bloom Labs
            </span>
          </Link>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed pr-4">
            We're a digital agency helping brands grow through strategy, design, and AI automation. Built for Sri Lankan businesses.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-gray-100">
            Quick Links
          </h4>
          <ul className="grid grid-cols-2 gap-y-4 text-sm text-gray-400 font-medium">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><a href="/#process" className="hover:text-white transition">Our Process</a></li>
            <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
            <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="/#portfolio" className="hover:text-white transition">Portfolio</a></li>
          </ul>
        </div>

        {/* Col 3: Contact Info */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-gray-400">
            Contact Us
          </h4>
          <div className="space-y-3">
            <p className="text-xl md:text-2xl font-bold tracking-tight text-white">
              +94 77 123 4567
            </p>
            <a
              href="mailto:hello@bloomlabs.lk"
              className="inline-block text-[#f44336] font-black uppercase tracking-widest text-sm hover:text-white transition"
            >
              HELLO@BLOOMLABS.LK
            </a>
          </div>
        </div>

        {/* Col 4: Location */}
        <div>
          <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-gray-400">
            Location
          </h4>
          <p className="text-lg md:text-xl font-bold leading-snug tracking-tight text-gray-200">
            123 TECH STREET,<br />
            COLOMBO 07,<br />
            SRI LANKA
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 pt-8 border-t border-gray-800/80 flex flex-col xl:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-medium tracking-wide relative z-10">
        <div>
          &copy; 2026 Bloom Labs. All Rights Reserved.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-gray-300 font-black uppercase tracking-[0.15em] text-[10px] md:text-xs">
          <a href="#" className="hover:text-white transition">Facebook</a> &bull;
          <a href="#" className="hover:text-white transition">Instagram</a> &bull;
          <a href="#" className="hover:text-white transition">LinkedIn</a> &bull;
          <a href="#" className="hover:text-white transition">TikTok</a>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <a href="#" className="hover:text-white transition">Terms & Conditions</a>
          <span className="text-gray-600">//</span>
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
