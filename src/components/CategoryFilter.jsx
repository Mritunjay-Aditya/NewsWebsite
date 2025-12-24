import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Briefcase, MapPin, Cpu, Film, Heart, Trophy, Star } from 'lucide-react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { name: 'Latest', icon: Newspaper },
    { name: 'Business', icon: Briefcase },
    { name: 'Regional', icon: MapPin },
    { name: 'Tech', icon: Cpu },
    { name: 'Entertainment', icon: Film },
    { name: 'Lifestyle', icon: Heart },
    { name: 'Sports', icon: Trophy },
    { name: 'Astro', icon: Star }
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category, index) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.name;
        
        return (
          <motion.button
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category.name)}
            className={`
              px-5 py-2.5 rounded-full font-semibold text-sm
              transition-all duration-300 shadow-lg
              flex items-center gap-2
              ${isSelected 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-yellow-500/50' 
                : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            {category.name}
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;