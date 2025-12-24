export const generateNewsArticleSchema = (article) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.pubDate || new Date().toISOString(),
    articleBody: article.originalContent || article.description,
    author: {
      '@type': 'Organization',
      name: 'JPLIVE24',
      url: 'https://jplive24.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'JPLIVE24',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jplive24.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.link,
    },
  };
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JPLIVE24',
    url: 'https://jplive24.com',
    logo: 'https://jplive24.com/logo.png',
    sameAs: [
      'https://twitter.com/JPLIVE24',
      'https://facebook.com/JPLIVE24',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@jplive24.com',
    },
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
