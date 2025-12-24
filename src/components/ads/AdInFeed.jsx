import React from 'react';

const AdInFeed = ({ slot = '1234567890' }) => {
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
    <div className="my-8 flex justify-center" style={{ minHeight: '320px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-format="fluid"
        data-ad-layout-key="-fg+5n+6t-1d8+7x"
        data-ad-client="ca-pub-3343641949304708"
        data-ad-slot={slot}
      ></ins>
    </div>
  );
};

export default React.memo(AdInFeed);
