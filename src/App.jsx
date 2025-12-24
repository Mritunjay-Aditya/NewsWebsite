import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import NewsGrid from '@/components/NewsGrid';
import LanguageSelector from '@/components/LanguageSelector';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import About from '@/pages/About';
import Disclaimer from '@/pages/Disclaimer';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

function App() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Latest');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const articleMapRef = useRef(new Map());
  const hasFirstRenderRef = useRef(false);

  // RSS Feed URLs for different categories
  const RSS_FEEDS = {
    Latest: [
      'https://feeds.bbci.co.uk/news/rss.xml',
      'https://feeds.feedburner.com/ndtvkha',
      'https://hindi.news18.com/rss/khabar/khabrein.xml',
      'https://tv9hindi.com/feed',
      'https://newsindialive.in/feed',
      'https://www.bhaskar.com/rss-v1--category-11945.xml',
      'https://www.bhaskar.com/rss-v1--category-1125.xml',
      'https://www.bhaskar.com/rss-v1--category-1061.xml',
      'https://www.livemint.com/rss/politics',
      'https://www.livemint.com/rss/news',
      'https://www.livemint.com/rss/education',
      'https://feeds.feedburner.com/ndtvnews-top-stories',
      'https://hindi.oneindia.com/rss/feeds/hindi-international-fb.xml'
    ],
    Business: ['https://feeds.bbci.co.uk/news/business/rss.xml',
    'https://feeds.feedburner.com/ndtvprofit-latest',
    'https://www.thehindu.com/business/agri-business/feeder/default.rss',
    'https://hindi.oneindia.com/rss/feeds/hindi-business-fb.xml',
    ],
    Regional: ['https://feeds.bbci.co.uk/news/world/rss.xml',
      'https://www.republicbharat.com/rss/india/jharkhand.xml',
      'https://www.republicbharat.com/rss/india/delhi-ncr.xml',
      'https://hindi.oneindia.com/rss/feeds/hindi-uttar-pradesh-fb.xml',
      'https://hindi.oneindia.com/rss/feeds/hindi-rajasthan-fb.xml',
      'https://hindi.oneindia.com/rss/feeds/hindi-himachal-pradesh-fb.xml',
      'https://hindi.oneindia.com/rss/feeds/hindi-haryana-fb.xml',
      'https://hindi.oneindia.com/rss/feeds/hindi-bihar-fb.xml'
    ],

    Tech: ['https://feeds.bbci.co.uk/news/technology/rss.xml',
      'https://feeds.feedburner.com/gadgets360-latest',
      'https://www.republicbharat.com/rss/technology/science-and-tech.xml',
      'https://hindi.oneindia.com/rss/feeds/artificial-intelligence-fb.xml'
    ],
    Entertainment: [
      'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
      'https://www.bhaskar.com/rss-v1--category-11215.xml',
      'https://www.bhaskar.com/rss-v1--category-3998.xml',
      'https://hindi.news18.com/commonfeeds/v1/hin/rss/entertainment/film-review.xml',
      'https://hindi.news18.com/commonfeeds/v1/hin/rss/entertainment/tv.xml',
      'https://hindi.news18.com/commonfeeds/v1/hin/rss/entertainment/bollywood.xml',
      'https://www.republicbharat.com/rss/web-stories/entertainment-news.xml',
    ],
    Lifestyle: [
      'https://hindi.news18.com/commonfeeds/v1/hin/rss/lifestyle/culture.xml',
      'https://hindi.news18.com/rss/khabar/lifestyle/lifestyle.xml',
      'https://www.republicbharat.com/rss/galleries/lifestyle.xml',
    ],
    Sports: [
      'https://feeds.bbci.co.uk/sport/rss.xml',
      'https://feeds.feedburner.com/ndtvsports-cricket',
      'https://hindi.news18.com/rss/khabar/sports/sports.xml'
    ],
    Astro: [
      'https://www.republicbharat.com/rss/religion.xml',
      'https://hindi.news18.com/rss/khabar/astro/astro.xml',
      'https://hindi.oneindia.com/rss/feeds/hindi-astrology-fb.xml',
    ]
  };

  useEffect(() => {
    fetchNews();
    
    // Auto-cleanup every 15 days
    const cleanupInterval = setInterval(() => {
      cleanupOldArticles();
    }, 15 * 24 * 60 * 60 * 1000);

    return () => clearInterval(cleanupInterval);
  }, []);

  // Helper to try fetching from multiple services
  const fetchRSS = async (url) => {
    const fetchWithTimeout = (resource, options = {}, timeoutMs = 12000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);
      return fetch(resource, { ...options, signal: controller.signal })
        .finally(() => clearTimeout(id));
    };

    const services = [
      // Service 1: rss2json (Free tier, reliable for JSON)
      // Note: Removed api_key parameter to use free tier properly, or replace with valid key if available
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`,
      
      // Service 2: AllOrigins (Proxy to fetch raw XML)
      `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
    ];

    for (const serviceUrl of services) {
      try {
        const response = await fetchWithTimeout(serviceUrl);
        if (!response.ok) continue;

        const data = await response.json();
        
        // Handle rss2json format
        if (serviceUrl.includes('rss2json') && data.status === 'ok') {
          return data.items.map(item => ({
            title: item.title,
            description: item.description,
            link: item.link,
            pubDate: item.pubDate,
            thumbnail: item.thumbnail || item.enclosure?.link,
            content: item.content
          }));
        }
        
        // Handle AllOrigins (Raw XML) format
        if (serviceUrl.includes('allorigins') && data.contents) {
          return parseXML(data.contents);
        }
      } catch (err) {
        console.warn(`Failed to fetch ${url} via ${serviceUrl}`, err);
        continue;
      }
    }
    throw new Error(`All fetch methods failed for ${url}`);
  };

  // Manual XML Parser for fallback
  const parseXML = (xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const items = Array.from(xmlDoc.querySelectorAll("item"));
    
    return items.map(item => {
      const title = item.querySelector("title")?.textContent || "";
      const description = item.querySelector("description")?.textContent || "";
      const link = item.querySelector("link")?.textContent || "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const content = item.querySelector("content\\:encoded")?.textContent || description;
      
      // Try to find image in enclosure or media:content
      const enclosure = item.querySelector("enclosure")?.getAttribute("url");
      const mediaContent = item.getElementsByTagNameNS("*", "content")[0]?.getAttribute("url") 
                        || item.getElementsByTagNameNS("*", "thumbnail")[0]?.getAttribute("url");

      return {
        title,
        description,
        link,
        pubDate,
        thumbnail: enclosure || mediaContent,
        content
      };
    });
  };

  const fetchNews = async () => {
    setLoading(true);
    articleMapRef.current = new Map();
    let successCount = 0;
    let failCount = 0;

    // Load cached data immediately to show something while fetching
    const cached = localStorage.getItem('jplive24_news');
    if (cached) {
      const { articles: cachedArticles } = JSON.parse(cached);
      if (cachedArticles.length > 0) {
        cachedArticles.forEach(item => {
          articleMapRef.current.set(item.link || item.id, item);
        });
        const seeded = Array.from(articleMapRef.current.values()).sort((a, b) => b.pubDate - a.pubDate);
        setArticles(seeded);
        filterByCategory(selectedCategory, seeded);
        // Don't set loading false yet, we want to refresh in background
      }
    }

    const upsertArticles = (items) => {
      if (!items || items.length === 0) return;
      items.forEach(item => {
        const key = item.link || item.id;
        if (key) {
          articleMapRef.current.set(key, item);
        }
      });
      const merged = Array.from(articleMapRef.current.values()).sort((a, b) => b.pubDate - a.pubDate);
      setArticles(merged);
      filterByCategory(selectedCategory, merged);
      if (!hasFirstRenderRef.current) {
        hasFirstRenderRef.current = true;
        setLoading(false);
      }
    };

    try {
      const feedPromises = [];

      for (const [category, feeds] of Object.entries(RSS_FEEDS)) {
        const feedUrls = Array.isArray(feeds) ? feeds : [feeds];
        
        feedUrls.forEach(feedUrl => {
          feedPromises.push(
            fetchRSS(feedUrl)
              .then(items => {
                successCount++;
                const parsedItems = items.map((item) => ({
                  id: `${category}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  title: item.title,
                  description: item.description ? truncateText(stripHtml(item.description), 35) : 'Click to read more...',
                  link: item.link,
                  image: item.thumbnail || extractImageFromContent(item.content) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop',
                  category: category,
                  pubDate: new Date(item.pubDate),
                  originalContent: item.content || item.description
                }));
                upsertArticles(parsedItems);
                return parsedItems;
              })
              .catch(err => {
                console.error(`Failed to load feed: ${feedUrl}`, err);
                failCount++;
                return [];
              })
          );
        });
      }

      await Promise.allSettled(feedPromises);

      const finalArticles = Array.from(articleMapRef.current.values());

      if (finalArticles.length > 0) {
        const newsData = {
          articles: finalArticles,
          lastFetched: Date.now()
        };
        localStorage.setItem('jplive24_news', JSON.stringify(newsData));
        toast({
          title: "News Updated",
          description: `Loaded ${finalArticles.length} articles from ${successCount} sources. (${failCount} failed)`,
        });
      } else {
        toast({
          title: "Update Failed",
          description: "Could not fetch new articles. Please check your internet connection.",
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Global error fetching news:', error);
      toast({
        title: "Error",
        description: "Something went wrong while updating news.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const extractImageFromContent = (content) => {
    if (!content) return null;
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content.match(imgRegex);
    return match ? match[1] : null;
  };

  const truncateText = (text, wordCount) => {
    if (!text) return '';
    const words = text.split(/\s+/);
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  const cleanupOldArticles = () => {
    const fifteenDaysAgo = Date.now() - (15 * 24 * 60 * 60 * 1000);
    const cached = localStorage.getItem('jplive24_news');
    
    if (cached) {
      try {
        const { articles: cachedArticles } = JSON.parse(cached);
        const freshArticles = cachedArticles.filter(article => 
          new Date(article.pubDate).getTime() > fifteenDaysAgo
        );
        
        localStorage.setItem('jplive24_news', JSON.stringify({
          articles: freshArticles,
          lastFetched: Date.now()
        }));
        
        setArticles(freshArticles);
        filterByCategory(selectedCategory, freshArticles);
      } catch (e) {
        console.error("Error cleaning up articles", e);
      }
    }
  };

  const filterByCategory = (category, articlesArray = articles) => {
    setSelectedCategory(category);
    if (category === 'Latest') {
      setFilteredArticles(articlesArray);
    } else {
      const filtered = articlesArray.filter(article => article.category === category);
      setFilteredArticles(filtered);
    }
  };

  const handleCategoryChange = (category) => {
    filterByCategory(category);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    toast({
      title: "Language Changed",
      description: `Switched to ${getLanguageName(language)}`,
    });
  };

  const getLanguageName = (code) => {
    const languages = {
      en: 'English',
      hi: 'Hindi',
      mr: 'Marathi',
      gu: 'Gujarati',
      ta: 'Tamil',
      te: 'Telugu',
      kn: 'Kannada',
      bn: 'Bengali'
    };
    return languages[code] || 'English';
  };

  return (
    <>
      <Helmet>
        <title>JPLIVE24 - Latest News & Updates</title>
        <meta name="description" content="Stay updated with the latest news from JPLIVE24. Get breaking news, business updates, regional stories, technology insights, and entertainment news in multiple languages." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <Header onRefresh={fetchNews} />
        
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                    <CategoryFilter 
                      selectedCategory={selectedCategory}
                      onCategoryChange={handleCategoryChange}
                    />
                    <LanguageSelector 
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={handleLanguageChange}
                    />
                  </div>

                  <NewsGrid 
                    articles={filteredArticles}
                    loading={loading}
                    selectedLanguage={selectedLanguage}
                  />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;