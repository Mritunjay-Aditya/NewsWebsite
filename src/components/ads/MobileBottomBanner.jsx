import React from 'react';

const MobileBottomBanner = ({ slot = '1234567890' }) => {
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
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="mx-auto max-w-screen-xl px-4 pb-2">
        <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm">
          <ins
            ref={insRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-3343641949304708"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MobileBottomBanner);
