import React from 'react';

const AdBanner = ({ slot = '1234567890', format = 'auto' }) => {
  const insRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const ins = insRef.current;
    if (!ins) return;

    const check = () => {
      const status = ins.getAttribute('data-ad-status');
      if (status === 'filled') setVisible(true);
    };

    const observer = new MutationObserver(check);
    observer.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] });

    const timer = setTimeout(check, 1800);

    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="flex justify-center">
      <ins
        ref={insRef}
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
