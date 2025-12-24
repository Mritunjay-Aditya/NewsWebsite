import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Logo = () => {
  return (
    <motion.div 
      className="flex items-center gap-3"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-yellow-400 blur-lg opacity-50 rounded-full"></div>
        <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg shadow-lg">
          <Zap className="w-6 h-6 text-white" fill="white" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-black text-white tracking-tight">
          JPLIVE<span className="text-yellow-400">24</span>
        </span>
        <span className="text-xs text-blue-200 tracking-wider font-medium -mt-1">
          NEWS NETWORK
        </span>
      </div>
    </motion.div>
  );
};

export default Logo;