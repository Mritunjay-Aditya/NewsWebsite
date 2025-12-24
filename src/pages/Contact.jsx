import React from 'react';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const methods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@jplive24.com',
      href: 'mailto:hello@jplive24.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91-00000-00000',
      href: 'tel:+910000000000',
    },
    {
      icon: MessageSquare,
      label: 'Chat',
      value: 'Twitter DM @JPLIVE24',
      href: 'https://twitter.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Remote-first newsroom',
    },
  ];

  return (
    <section className="space-y-8">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700/60 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-white mb-3">Contact Us</h1>
        <p className="text-slate-200 leading-7 max-w-3xl">
          We welcome feedback, partnership inquiries, and story tips. Reach out using any of the
          channels below and we will respond as soon as possible.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const Content = (
            <div className="flex items-center gap-3">
              <span className="bg-yellow-400/20 text-yellow-200 p-2 rounded-lg">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <p className="text-slate-300 text-xs uppercase tracking-wide">{method.label}</p>
                <p className="text-white font-semibold">{method.value}</p>
              </div>
            </div>
          );

          return method.href ? (
            <a
              key={method.label}
              href={method.href}
              className="bg-white/5 border border-slate-700/60 rounded-xl p-5 shadow-lg backdrop-blur-sm hover:border-yellow-400/50 transition-colors"
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {Content}
            </a>
          ) : (
            <div
              key={method.label}
              className="bg-white/5 border border-slate-700/60 rounded-xl p-5 shadow-lg backdrop-blur-sm"
            >
              {Content}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Contact;
