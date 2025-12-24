import React from 'react';

const AdBanner = ({ slot = '1234567890', format = 'auto' }) => {
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
    <div className="my-6 flex justify-center" style={{ minHeight: '250px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format={format}
        data-ad-client="ca-pub-3343641949304708"
        data-ad-slot={slot}
      ></ins>
    </div>
  );
};

export default React.memo(AdBanner);
