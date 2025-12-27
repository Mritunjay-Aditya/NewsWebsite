import React from 'react';
import { Globe, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const MobileFilterMenu = ({
  selectedCategory,
  onCategoryChange,
  selectedLanguage,
  onLanguageChange,
}) => {
  const categories = [
    'Latest',
    'Business',
    'Regional',
    'Tech',
    'Entertainment',
    'Lifestyle',
    'Sports',
    'Astro',
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === selectedLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Menu
            <span className="text-white/40">•</span>
            <Globe className="w-4 h-4" />
            {currentLanguage.flag} {currentLanguage.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[min(92vw,420px)] bg-slate-800 border-slate-700 text-white">
        <DropdownMenuLabel>Category</DropdownMenuLabel>
        {categories.map((category) => (
          <DropdownMenuItem
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`cursor-pointer hover:bg-slate-700 ${
              selectedCategory === category ? 'bg-slate-700' : ''
            }`}
          >
            {category}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`cursor-pointer hover:bg-slate-700 ${
              selectedLanguage === lang.code ? 'bg-slate-700' : ''
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileFilterMenu;
