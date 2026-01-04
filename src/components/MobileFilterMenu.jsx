import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
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
          className="w-full justify-between bg-white text-slate-900 hover:bg-white border border-slate-200 shadow-sm"
        >
          <span className="flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold">Menu</span>
            <span className="text-xs text-slate-500">
              {selectedCategory} • {currentLanguage.flag} {currentLanguage.name}
            </span>
          </span>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[min(92vw,420px)] max-h-[280px] overflow-y-auto bg-white border-slate-200 text-slate-900 shadow-lg p-0">
        <div className="px-3 py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white text-sm font-semibold">
          Menu
        </div>
        <div className="p-1">
        <DropdownMenuLabel className="text-slate-700">Category</DropdownMenuLabel>
        {categories.map((category) => (
          <DropdownMenuItem
            key={category}
            onClick={() => onCategoryChange(category)}
            className="cursor-pointer hover:bg-slate-100 focus:bg-slate-100"
          >
            <span className="flex items-center gap-2">
              <span className="w-4">
                {selectedCategory === category ? (
                  <Check className="w-4 h-4 text-slate-700" />
                ) : null}
              </span>
              {category}
            </span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-slate-200" />

        <DropdownMenuLabel className="text-slate-700">Language</DropdownMenuLabel>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className="cursor-pointer hover:bg-slate-100 focus:bg-slate-100"
          >
            <span className="flex items-center gap-2">
              <span className="w-4">
                {selectedLanguage === lang.code ? (
                  <Check className="w-4 h-4 text-slate-700" />
                ) : null}
              </span>
              <span>{lang.flag}</span>
              {lang.name}
            </span>
          </DropdownMenuItem>
        ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileFilterMenu;
