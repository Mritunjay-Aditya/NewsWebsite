import React from 'react';
import { AlertTriangle, Link2, Shield } from 'lucide-react';

const Disclaimer = () => {
  const points = [
    {
      icon: AlertTriangle,
      title: 'Source ownership',
      detail: 'Headlines, summaries, and links originate from their respective publishers. JPLIVE24 does not claim ownership of third-party content.',
    },
    {
      icon: Link2,
      title: 'External links',
      detail: 'Outbound links open the original article. We are not responsible for availability, accuracy, or practices on external sites.',
    },
    {
      icon: Shield,
      title: 'No warranty',
      detail: 'Information is provided as-is for general information. Always verify critical details directly with the source.',
    },
  ];

  return (
    <section className="space-y-8">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700/60 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white mb-3">Disclaimer</h1>
        <p className="text-slate-200 leading-7 max-w-3xl">
          JPLIVE24 aggregates publicly available RSS feeds and displays headlines with short
          summaries. While we aim for timely and accurate presentation, we cannot guarantee
          completeness or ongoing availability of any feed or article.
        </p>
      </div>

      <div className="space-y-4">
        {points.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white/5 border border-slate-700/60 rounded-xl p-5 shadow-lg backdrop-blur-sm flex gap-4"
            >
              <div className="bg-yellow-400/20 text-yellow-200 p-2 rounded-lg h-fit">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-6">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Disclaimer;
