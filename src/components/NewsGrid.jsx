import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NewsCard from '@/components/NewsCard';
import { Loader2 } from 'lucide-react';

const NewsGrid = ({ articles, loading, selectedLanguage }) => {
  const [displayCount, setDisplayCount] = useState(18);

  useEffect(() => {
    setDisplayCount(18);
  }, [articles]);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {visible.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <NewsCard article={article} selectedLanguage={selectedLanguage} />
        </motion.div>
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