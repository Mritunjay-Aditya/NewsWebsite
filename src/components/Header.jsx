import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Header = ({ onRefresh }) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-2xl border-b border-blue-500/30"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="JPLIVE24 home">
            <Logo />
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-2">
              {[
                { to: '/about', label: 'About' },
                { to: '/disclaimer', label: 'Disclaimer' },
                { to: '/contact', label: 'Contact' },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-semibold px-3 py-2 rounded-full transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Button
              onClick={onRefresh}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh News
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;