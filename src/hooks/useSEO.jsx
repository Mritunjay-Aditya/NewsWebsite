import { Helmet } from 'react-helmet';

export const useSEO = ({
  title = 'JPLIVE24 - Latest News in English & Hindi | Breaking News Today',
  description = 'Stay updated with breaking news, business, regional coverage, tech, entertainment, sports, and lifestyle. Multi-language news platform for India and beyond.',
  canonicalUrl = 'https://jplive24.com/',
  ogImage = 'https://jplive24.com/og-image.jpg',
  ogType = 'website',
  twitterHandle = '@JPLIVE24',
  keywords = 'news, latest news, breaking news, hindi news, english news, india news',
} = {}) => {
  return {
    helmet: (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="JPLIVE24" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content={twitterHandle} />
      </Helmet>
    ),
  };
};

export default useSEO;
