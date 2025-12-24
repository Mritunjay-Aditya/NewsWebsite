import React from 'react';
import { Sparkles, ShieldCheck, Globe2 } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Sparkles,
      title: 'Real-time coverage',
      description: 'Curated feeds from trusted publishers with rapid updates and minimal noise.',
    },
    {
      icon: ShieldCheck,
      title: 'Curation with context',
      description: 'We summarize, dedupe, and surface key stories across categories and regions.',
    },
    {
      icon: Globe2,
      title: 'Multi-language friendly',
      description: 'Language toggles per article with quick translations for broader reach.',
    },
  ];

  return (
    <section className="space-y-8">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700/60 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white mb-3">About JPLIVE24</h1>
        <p className="text-slate-200 leading-7 max-w-3xl">
          JPLIVE24 is a focused news experience that brings the latest headlines, business
          insights, regional coverage, technology highlights, entertainment, sports, and
          lifestyle stories into one streamlined destination. We aggregate from multiple
          reputable sources, remove duplicates, and present a clean reading flow with fast
          filtering by category and language.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white/5 border border-slate-700/60 rounded-xl p-6 shadow-lg backdrop-blur-sm hover:border-yellow-400/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-yellow-400/20 text-yellow-200 p-2 rounded-lg">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </div>
              <p className="text-slate-300 text-sm leading-6">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default About;
