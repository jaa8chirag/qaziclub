'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // 5 Edited, High-Definition Luxury Photos of Qazi & Salman Khan
  const slides = [
    {
      id: 1,
      caption: 'Moments of Glory with Salman Khan',
      image: '/images/hero/qazi-salman-hug.jpg',
      accentColor: '#D8AE56',
    },
    {
      id: 2,
      caption: 'Rockstar Live Arena & Campus Fest',
      image: '/images/hero/qazi-mic-black.jpg',
      accentColor: '#F59E0B',
    },
    {
      id: 3,
      caption: 'High-Voltage Entertainment with Salman Khan',
      image: '/images/hero/qazi-salman-biggboss.jpg',
      accentColor: '#E63946',
    },
    {
      id: 4,
      caption: 'Velvet & Regal Swag for Royal Sangeets',
      image: '/images/hero/qazi-brown-jacket.jpg',
      accentColor: '#C49742',
    },
    {
      id: 5,
      caption: 'Raw Acoustic Charm & VIP Connection',
      image: '/images/hero/qazi-white-shirt.jpg',
      accentColor: '#10B981',
    },
  ];

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleNext(); // swipe left -> next
    if (diff < -50) handlePrev(); // swipe right -> prev
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const active = slides[currentIdx];

  return (
    <section className="relative w-full bg-[#08070B] text-white pt-24 lg:pt-28 pb-10 overflow-hidden border-b border-[#2A2418]">
      {/* Dynamic Stage Lighting & Ambient Glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20 transition-all duration-1000 -z-0"
        style={{ backgroundColor: active.accentColor }}
      />
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D8AE56]/10 blur-[140px] pointer-events-none -z-0" />

      {/* Subtle Stage Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D8AE56 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: CLEAN, SIMPLE, LUXURY CELEBRITY IDENTITY   */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-5">
            {/* Minimal Celebrity Status Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#D8AE56]/20 to-transparent border-l-4 border-[#D8AE56]">
              <span className="live-pulse-gold" />
              <span
                className="text-xs uppercase font-bold tracking-[0.2em] text-[#F3D084]"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                FAME GURUKUL WINNER • BIGG BOSS PHENOMENON
              </span>
            </div>

            {/* Monumental Headline */}
            <div className="space-y-2">
              <div className="flex items-baseline flex-wrap gap-x-4 gap-y-2">
                <h1
                  className="text-5xl sm:text-7xl md:text-8xl tracking-tight font-extrabold leading-[0.92] gold-shimmer-hero"
                  style={{
                    fontFamily: 'Bodoni Moda, serif',
                    filter: 'drop-shadow(0 0 30px rgba(216,174,86,0.3))',
                  }}
                >
                  QAZI TOUKIR
                </h1>
                <span
                  className="text-xs sm:text-base md:text-xl font-extrabold px-3 py-1 rounded bg-gradient-to-r from-red-600 to-rose-700 text-white tracking-wider shadow-[0_0_15px_rgba(225,29,72,0.4)]"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  LIVE &amp; UNFILTERED
                </span>
              </div>

              {/* Tagline: ACTOR • PERFORMER • SINGER */}
              <div
                className="text-xs sm:text-sm md:text-base font-bold tracking-[0.32em] text-[#D8AE56] uppercase"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                ACTOR • PERFORMER • SINGER
              </div>

              {/* Hindi Iconic Punchline */}
              <div
                className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F3D084] tracking-wide pt-1"
                style={{ fontFamily: 'Bodoni Moda, serif', fontStyle: 'italic' }}
              >
                &ldquo;Awaaz Jo Dil Se Nikle, Stage Pe Aag Laga De&rdquo;
              </div>
            </div>

            {/* Clean, Simple Bio (No Clutter) */}
            <p className="text-sm md:text-base text-gray-300 max-w-xl leading-relaxed">
              The iconic singer and powerhouse stage performer. From winning national hearts to lighting up the stage with <strong className="text-white font-semibold">Salman Khan</strong>, Qazi delivers an adrenaline-fueled arena experience for College Fests, Stadium Arenas, Royal Sangeets, and VIP Events.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <Link
                href="/book-me"
                className="inline-flex items-center gap-2.5 px-8 sm:px-9 py-4 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] text-[#1A1203] text-sm uppercase font-extrabold tracking-wider hover:opacity-95 transition-all duration-300 shadow-[0_8px_30px_rgba(216,174,86,0.45)] hover:shadow-[0_12px_40px_rgba(216,174,86,0.65)] hover:scale-[1.02]"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                <span>BOOK FOR AN EVENT</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>

              <a
                href="#disciplines"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm uppercase font-bold tracking-wider backdrop-blur-md border border-white/20 transition-all hover:border-[#D8AE56]"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                <span className="material-symbols-outlined text-[20px]">theater_comedy</span>
                <span>EXPLORE SHOWS</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-4 rounded-xl text-gray-300 hover:text-[#F3D084] text-xs uppercase font-bold tracking-wider transition-colors"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>CONTACT ARTIST</span>
              </Link>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: PROMINENT, EDITED IMAGE SLIDER             */}
          {/* ======================================================== */}
          <div
            className="lg:col-span-5 relative w-full max-w-[480px] lg:max-w-[500px] mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Ambient Background Glow behind the Card */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl transition-all duration-1000 -z-10"
              style={{ backgroundColor: active.accentColor }}
            />

            {/* Main Luxury Frame */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-[#D8AE56]/80 via-[#D8AE56]/30 to-[#D8AE56]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(216,174,86,0.25)]">
              <div className="relative w-full aspect-[4/5] min-h-[480px] sm:min-h-[540px] rounded-2xl overflow-hidden bg-[#0A090E] group">
                
                {/* Image Slides */}
                {slides.map((slide, idx) => {
                  const isActive = idx === currentIdx;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                        isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.caption}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Smooth Bottom Vignette for Caption */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Bar with Slide Counter */}
                      <div className="absolute top-4 right-4 z-20 pointer-events-none">
                        <div
                          className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white/90 tracking-widest"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          0{currentIdx + 1} / 0{slides.length}
                        </div>
                      </div>

                      {/* Bottom Caption Bar */}
                      <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none space-y-1">
                        <div
                          className="text-[11px] font-bold text-[#D8AE56] tracking-[0.2em] uppercase"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          LIVE PERFORMANCE MOMENT
                        </div>
                        <h3
                          className="text-xl sm:text-2xl text-white font-bold leading-tight"
                          style={{ fontFamily: 'Bodoni Moda, serif' }}
                        >
                          {slide.caption}
                        </h3>
                      </div>
                    </div>
                  );
                })}

                {/* Corner Luxury Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D8AE56] pointer-events-none z-30" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D8AE56] pointer-events-none z-30" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D8AE56] pointer-events-none z-30" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D8AE56] pointer-events-none z-30" />

                {/* Left & Right Chevron Navigation */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D8AE56] backdrop-blur-md text-white hover:text-[#08070B] flex items-center justify-center border border-white/20 hover:border-[#D8AE56] transition-all cursor-pointer shadow-xl z-30"
                >
                  <span className="material-symbols-outlined text-[22px]">chevron_left</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#D8AE56] backdrop-blur-md text-white hover:text-[#08070B] flex items-center justify-center border border-white/20 hover:border-[#D8AE56] transition-all cursor-pointer shadow-xl z-30"
                >
                  <span className="material-symbols-outlined text-[22px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Sleek Minimal Indicator Dots */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIdx === idx
                      ? 'w-8 bg-gradient-to-r from-[#D8AE56] to-[#F3D084] shadow-[0_0_10px_rgba(216,174,86,0.8)]'
                      : 'w-2 bg-white/20 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* HIGH-VOLTAGE GOLDEN CONTINUOUS MARQUEE TICKER            */}
      {/* ======================================================== */}
      <div className="w-full mt-12 py-3.5 bg-gradient-to-r from-[#17130A] via-[#241D0F] to-[#17130A] border-y border-[#D8AE56]/30 overflow-hidden relative z-10">
        <div className="hero-marquee-track flex items-center gap-8 whitespace-nowrap">
          {/* Ticker Repeat 1 */}
          <div
            className="flex items-center gap-8 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'Space Grotesk, monospace' }}
          >
            <span className="text-[#F3D084] flex items-center gap-2">
              <span className="live-pulse-gold" />
              <span>★ BIGG BOSS SENSATION WITH SALMAN KHAN</span>
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-white">⚡ 500+ STADIUM &amp; FEST EXPLOSIONS</span>
            <span className="text-gray-500">•</span>
            <span className="text-[#F3D084]">IIT BOMBAY &amp; BITS CAMPUS HEADLINER</span>
            <span className="text-gray-500">•</span>
            <span className="text-white">ROYAL SANGEET &amp; LUXURY WEDDING ANTHEMS</span>
            <span className="text-gray-500">•</span>
            <span className="text-[#F3D084]">★ DIRECT ARTIST CLEARANCE • ZERO BROKER MARKUPS</span>
            <span className="text-gray-500">•</span>
            <span className="text-white">WORLD TOUR 2026–2027 CALENDAR OPEN</span>
            <span className="text-gray-500">•</span>
            <span className="text-[#F3D084]">EXCLUSIVE VIP FAN MEET &amp; PHOTO-OPS</span>
            <span className="text-gray-500">•</span>
          </div>

          {/* Ticker Repeat 2 */}
          <div
            className="flex items-center gap-8 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'Space Grotesk, monospace' }}
          >
            <span className="text-[#F3D084] flex items-center gap-2">
              <span className="live-pulse-gold" />
              <span>★ BIGG BOSS SENSATION WITH SALMAN KHAN</span>
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-white">⚡ 500+ STADIUM &amp; FEST EXPLOSIONS</span>
            <span className="text-gray-500">•</span>
            <span className="text-[#F3D084]">IIT BOMBAY &amp; BITS CAMPUS HEADLINER</span>
            <span className="text-gray-500">•</span>
            <span className="text-white">ROYAL SANGEET &amp; LUXURY WEDDING ANTHEMS</span>
            <span className="text-gray-500">•</span>
            <span className="text-[#F3D084]">★ DIRECT ARTIST CLEARANCE • ZERO BROKER MARKUPS</span>
            <span className="text-gray-500">•</span>
            <span className="text-white">WORLD TOUR 2026–2027 CALENDAR OPEN</span>
            <span className="text-gray-500">•</span>
            <span className="text-[#F3D084]">EXCLUSIVE VIP FAN MEET &amp; PHOTO-OPS</span>
            <span className="text-gray-500">•</span>
          </div>
        </div>
      </div>
    </section>
  );
}
