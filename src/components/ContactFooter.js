'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#F4EFE6] text-[#524E46] border-t border-[#DDD5C5]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center group py-1">
              <img
                src="/images/logos/qazi-club-header-light.png"
                alt="QAZI CLUB — Actor • Performer • Singer"
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
            <p className="text-sm text-[#524E46] max-w-sm leading-relaxed">
              Pioneering high-echelon theatrical performance and cinematic live curation for premier festivals, arenas, and confidential ultra-private galas worldwide.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span
                className="text-[11px] uppercase tracking-widest text-[#7C5E26] font-bold"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                Global Headliner Operations Division
              </span>
            </div>
          </div>

          {/* Agency Hubs */}
          <div className="lg:col-span-3 space-y-3">
            <h3
              className="text-xs uppercase tracking-wider text-[#141312] font-bold"
              style={{ fontFamily: 'Space Grotesk, monospace' }}
            >
              Agency Hubs
            </h3>
            <ul className="space-y-2.5 text-xs text-[#524E46]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">pin_drop</span>
                <span>Mumbai — Operations Hub</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">pin_drop</span>
                <span>Greater Noida — NCR Hub</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">pin_drop</span>
                <span>London — UK &amp; Europe Liaison</span>
              </li>
            </ul>
          </div>

          {/* Rider & Protocol */}
          <div className="lg:col-span-2 space-y-3">
            <h3
              className="text-xs uppercase tracking-wider text-[#141312] font-bold"
              style={{ fontFamily: 'Space Grotesk, monospace' }}
            >
              Rider & Protocol
            </h3>
            <ul
              className="space-y-2.5 text-xs uppercase text-[#524E46]"
              style={{ fontFamily: 'Space Grotesk, monospace' }}
            >
              <li className="hover:text-primary transition-colors cursor-pointer">Acoustic Specs</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Pyrotechnics Rider</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Hospitality Directive</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Private Jet Logistics</li>
            </ul>
          </div>

          {/* VIP Dispatch Roster */}
          <div className="lg:col-span-3 space-y-3">
            <h3
              className="text-xs uppercase tracking-wider text-[#141312] font-bold"
              style={{ fontFamily: 'Space Grotesk, monospace' }}
            >
              VIP Dispatch Roster
            </h3>
            <p className="text-xs text-[#524E46] leading-relaxed">
              Strictly confidential dispatch for qualified enterprise talent buyers and venue curators.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="buyer@enterprise.com"
                required
                className="flex-1 bg-white px-3.5 py-2.5 rounded-lg text-[#141312] text-xs placeholder:text-[#9C9487] border border-[#DDD5C5] focus:outline-none focus:border-primary shadow-sm"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#D8AE56] to-[#B68938] text-[#261B04] text-[11px] uppercase font-bold tracking-wider hover:opacity-95 transition-opacity shadow-sm"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                {subscribed ? 'Joined' : 'Join'}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-[#7C5E26] font-semibold block">Priority liaison dispatch active.</span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#DDD5C5] flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#7A7469] font-medium"
            style={{ fontFamily: 'Space Grotesk, monospace' }}
          >
            <span className="material-symbols-outlined text-primary text-[15px]">lock</span>
            <span>Encrypted Liaison • Strictly Confidential • Global Artist Management</span>
          </div>
          <div className="text-xs text-[#7A7469]">
            © 2026 QAZI Live Worldwide. All performance rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
