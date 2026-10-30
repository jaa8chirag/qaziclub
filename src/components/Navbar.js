'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === '/';

  // Listen for scroll on home page to switch between dark hero mode and white content mode
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use dark navbar ONLY when at the top of the home page over the black hero
  const isDark = isHome && !scrolled;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/book-me', label: 'Book Me' },
    { href: '/about-us', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isDark
          ? 'bg-[#09080C]/92 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.6)] border-b border-[#2A2418]'
          : 'bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(20,19,18,0.08)] border-b border-[#D8AE56]/30'
      }`}
    >
      <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between gap-4">
        {/* Brand Logo & VIP Hotline */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center group py-1">
            <img
              src={isDark ? "/images/logos/qazi-club-header-transparent.png" : "/images/logos/qazi-club-header-light.png"}
              alt="QAZI CLUB — Actor • Performer • Singer"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] uppercase tracking-wider transition-colors py-1.5 relative ${
                  active
                    ? isDark
                      ? 'text-[#F3D084] font-black'
                      : 'text-[#000000] font-black'
                    : isDark
                    ? 'text-gray-200 hover:text-[#F3D084] font-bold'
                    : 'text-[#1A1816] hover:text-[#B68938] font-bold'
                }`}
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                {link.label}
                {active && (
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-[3px] rounded-full ${
                      isDark ? 'bg-[#D8AE56]' : 'bg-[#B68938]'
                    }`}
                  ></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Social Media & Contact Links */}
        <div className="flex items-center gap-2">
          {/* Desktop Only Social Media Icons (Hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Instagram - Outline Style */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Follow Qazi on Instagram"
              className="w-9 h-9 rounded-full border-2 border-[#E1306C] text-[#E1306C] bg-transparent hover:bg-[#E1306C]/15 hover:scale-110 transition-all duration-200 flex items-center justify-center shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Facebook - Outline Style */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Follow Qazi on Facebook"
              className="w-9 h-9 rounded-full border-2 border-[#1877F2] text-[#1877F2] bg-transparent hover:bg-[#1877F2]/15 hover:scale-110 transition-all duration-200 flex items-center justify-center shrink-0"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>

            {/* YouTube - Outline Style */}
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="Subscribe to Qazi on YouTube"
              className="w-9 h-9 rounded-full border-2 border-[#FF0000] text-[#FF0000] bg-transparent hover:bg-[#FF0000]/15 hover:scale-110 transition-all duration-200 flex items-center justify-center shrink-0"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 focus:outline-none transition-colors ${
              isDark ? 'text-gray-200 hover:text-white' : 'text-[#111111] hover:text-[#9B7018]'
            }`}
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-5 space-y-4 shadow-xl ${
            isDark
              ? 'bg-[#09080C] border-[#2A2418]'
              : 'bg-white border-[#D8AE56]/30'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base uppercase tracking-wider font-bold ${
                isActive(link.href)
                  ? isDark
                    ? 'text-[#F3D084] font-black'
                    : 'text-[#000000] font-black'
                  : isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-[#1A1816] hover:text-[#B68938]'
              }`}
              style={{ fontFamily: 'Space Grotesk, monospace' }}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              href="/book-me"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-full bg-gradient-to-r from-[#D8AE56] to-[#B68938] text-[#1A1203] font-black text-sm uppercase tracking-wider shadow-md"
              style={{ fontFamily: 'Space Grotesk, monospace' }}
            >
              Book Me Now
            </Link>
          </div>

          {/* Social Icons Inside Mobile Drawer */}
          <div className={`pt-4 border-t flex flex-col items-center gap-2.5 ${isDark ? 'border-[#2A2418]' : 'border-[#D8AE56]/20'}`}>
            <span
              className={`text-xs uppercase tracking-[0.2em] font-extrabold ${
                isDark ? 'text-gray-400' : 'text-[#87672D]'
              }`}
              style={{ fontFamily: 'Space Grotesk, monospace' }}
            >
              Connect With Qazi
            </span>
            <div className="flex items-center justify-center gap-4 pt-1">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border-2 border-[#E1306C] text-[#E1306C] bg-[#E1306C]/10 flex items-center justify-center transition-transform hover:scale-110"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border-2 border-[#1877F2] text-[#1877F2] bg-[#1877F2]/10 flex items-center justify-center transition-transform hover:scale-110"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border-2 border-[#FF0000] text-[#FF0000] bg-[#FF0000]/10 flex items-center justify-center transition-transform hover:scale-110"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
