import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Toasts removed
import { generateNewsArticleSchema } from '@/lib/schema';
import { Helmet } from 'react-helmet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Translation cache to avoid repeated API calls
const translationCache = new Map();

const NewsCard = ({ article, selectedLanguage }) => {
  const [translatedTitle, setTranslatedTitle] = useState(article.title);
  const [translatedDescription, setTranslatedDescription] = useState(article.description);
  // Toasts removed
  const isMountedRef = useRef(true);
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsVisible(entry.isIntersecting));
      },
      { rootMargin: '200px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedLanguage !== 'en' && isVisible) {
      translateContent();
    } else if (selectedLanguage === 'en') {
      setTranslatedTitle(article.title);
      setTranslatedDescription(article.description);
    }
  }, [selectedLanguage, article.id, isVisible]);

  const translateContent = async () => {
    const cacheKey = `${article.id}-${selectedLanguage}`;
    
    // Check cache first
    if (translationCache.has(cacheKey)) {
      const cached = translationCache.get(cacheKey);
      if (isMountedRef.current) {
        setTranslatedTitle(cached.title);
        setTranslatedDescription(cached.description);
      }
      return;
    }

    try {
      // Using Google Translate API (free tier via MyMemory) with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const titleResponse = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(article.title)}&langpair=en|${selectedLanguage}`,
        { signal: controller.signal }
      );
      const titleData = await titleResponse.json();
      
      const descResponse = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(article.description)}&langpair=en|${selectedLanguage}`,
        { signal: controller.signal }
      );
      const descData = await descResponse.json();
      
      clearTimeout(timeoutId);

      const translated = {
        title: titleData.responseData?.translatedText || article.title,
        description: descData.responseData?.translatedText || article.description,
      };
      
      // Cache result
      translationCache.set(cacheKey, translated);

      if (isMountedRef.current) {
        setTranslatedTitle(translated.title);
        setTranslatedDescription(translated.description);
      }
    } catch (error) {
      console.warn('Translation error (using fallback):', error);
      // Fallback to original content if translation fails
      if (isMountedRef.current) {
        setTranslatedTitle(article.title);
        setTranslatedDescription(article.description);
      }
    }
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(article.link);
    const text = encodeURIComponent(article.title);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(article.link);
        return;
      default:
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -8 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 hover:border-yellow-400/50 transition-all duration-300 group"
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateNewsArticleSchema(article))}
        </script>
      </Helmet>
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
          {translatedTitle}
        </h3>
        
        <p className="text-slate-300 text-sm mb-4 line-clamp-3">
          {translatedDescription}
        </p>

        <div className="flex items-center justify-between">
          <Button
            onClick={() => window.open(article.link, '_blank')}
            variant="ghost"
            size="sm"
            className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
          >
            Read More
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white">
              <DropdownMenuItem
                onClick={() => handleShare('facebook')}
                className="cursor-pointer hover:bg-slate-700"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleShare('twitter')}
                className="cursor-pointer hover:bg-slate-700"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleShare('linkedin')}
                className="cursor-pointer hover:bg-slate-700"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleShare('copy')}
                className="cursor-pointer hover:bg-slate-700"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(NewsCard);