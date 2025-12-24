import React from 'react';

const AdSidebar = ({ slot = '1234567890' }) => {
  React.useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <aside className="hidden lg:block sticky top-4">
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          minWidth: '300px',
          width: '300px',
          minHeight: '600px',
        }}
        data-ad-client="ca-pub-3343641949304708"
        data-ad-slot={slot}
        data-ad-format="vertical"
        data-full-width-responsive="false"
      ></ins>
    </aside>
  );
};

export default React.memo(AdSidebar);
