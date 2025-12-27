import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NewsCard from '@/components/NewsCard';
import AdInFeed from '@/components/ads/AdInFeed';
import { Loader2 } from 'lucide-react';

const NewsGrid = ({ articles, loading, selectedLanguage }) => {
  const [displayCount, setDisplayCount] = useState(18);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setDisplayCount(18);
  }, [articles]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)'); // Tailwind lg
    const update = () => setIsDesktop(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mb-4" />
        <p className="text-white text-lg">Loading latest news...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-white text-lg">No articles found in this category.</p>
      </div>
    );
  }

  const visible = articles.slice(0, displayCount);
  const adInterval = isDesktop ? 6 : 4;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visible.map((article, index) => (
        <React.Fragment key={article.id}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <NewsCard article={article} selectedLanguage={selectedLanguage} />
          </motion.div>
          {/* Show ad after every N articles (desktop: 6, mobile: 4) */}
          {(index + 1) % adInterval === 0 && index < visible.length - 1 && (
            <motion.div
              key={`ad-${index}`}
              className="col-span-1 md:col-span-2 lg:col-span-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <AdInFeed />
            </motion.div>
          )}
        </React.Fragment>
      ))}
      {articles.length > displayCount && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-4">
          <button
            className="px-5 py-2.5 rounded-full font-semibold text-sm bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
            onClick={() => setDisplayCount((c) => c + 12)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;