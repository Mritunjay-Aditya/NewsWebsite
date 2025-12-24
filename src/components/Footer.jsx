import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Mail, Globe2 } from 'lucide-react';

const Footer = () => {
  const links = [
    { label: 'About', to: '/about' },
    { label: 'Disclaimer', to: '/disclaimer' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="mt-12 border-t border-slate-800/60 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 items-start">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-40 rounded-full"></div>
            <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <p className="text-xl font-black text-white tracking-tight">JPLIVE24</p>
            <p className="text-xs text-blue-200 tracking-wider">NEWS NETWORK</p>
          </div>
        </div>

        <div className="flex gap-4 md:justify-center">
          {links.map((link) => (
            <Button
              key={link.to}
              asChild
              variant="ghost"
              size="sm"
              className="text-white hover:text-yellow-300 hover:bg-yellow-400/10"
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
        </div>

        <div className="space-y-2 md:text-right">
          <p className="text-slate-300 text-sm flex items-center gap-2 md:justify-end">
            <Mail className="w-4 h-4" /> hello@jplive24.com
          </p>
          <p className="text-slate-300 text-sm flex items-center gap-2 md:justify-end">
            <Globe2 className="w-4 h-4" /> Multi-language newsroom for India and beyond
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
