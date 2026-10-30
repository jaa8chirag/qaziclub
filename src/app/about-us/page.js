'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ContactFooter from '@/components/ContactFooter';

export default function AboutUsPage() {
  const [riderModalOpen, setRiderModalOpen] = useState(false);
  const [riderDispatched, setRiderDispatched] = useState(false);

  const handleRiderSubmit = (e) => {
    e.preventDefault();
    setRiderDispatched(true);
    setTimeout(() => {
      setRiderDispatched(false);
      setRiderModalOpen(false);
    }, 3000);
  };

  const milestones = [
    {
      year: '2005',
      tag: 'National Champion',
      title: 'Fame Gurukul Winner & Breakthrough',
      description:
        'Burst onto the national stage as the undisputed winner of India’s biggest reality singing competition, winning the hearts of millions across the nation with over 50 million audience votes.',
      highlight: '50M+ Votes Nationwide',
      badgeIcon: 'military_tech',
    },
    {
      year: '2015',
      tag: 'Bollywood Smash',
      title: 'Global Phenomenon: "Afghan Jalebi" (Phantom)',
      description:
        'Lent his signature electrifying vocals to Bollywood maestro Pritam’s chart-shattering track in Kabir Khan’s film starring Katrina Kaif and Saif Ali Khan. The song became a worldwide dance sensation with over 500 million views.',
      highlight: '500M+ Global Streams',
      badgeIcon: 'music_note',
    },
    {
      year: '2024–2025',
      tag: 'Television Spotlight',
      title: 'Bigg Boss Fame & Salman Khan Bond',
      description:
        'Captivated television audiences nationwide on Bigg Boss with his candid charm, raw honesty, and magnetic screen presence, earning genuine mentorship and affection from Bollywood icon Salman Khan.',
      highlight: 'Prime-Time Sensation',
      badgeIcon: 'tv',
    },
    {
      year: 'Present',
      tag: 'Live Domination',
      title: 'Arena Tours, Campus Fests & Global Shows',
      description:
        'Headlining premier college festivals (IIT Bombay, IIT Delhi, BITS Pilani), royal palace weddings, and international arena concerts across Mumbai, London, Dubai, and beyond.',
      highlight: '500+ Headline Concerts',
      badgeIcon: 'stadium',
    },
  ];

  const galleryImages = [
    {
      src: '/images/qazi-mic-black.jpg',
      title: 'The Rockstar at the Mic',
      category: 'Live Arena Concerts',
      caption: 'Commanding 25,000+ fans with high-voltage vocals and stadium rock energy.',
    },
    {
      src: '/images/qazi-salman-hug.jpg',
      title: 'The Salman Khan Embrace',
      category: 'Bigg Boss Spotlight',
      caption: 'Heartfelt brotherly bond and on-stage moment with Bollywood superstar Salman Khan.',
    },
    {
      src: '/images/qazi-brown-jacket.jpg',
      title: 'Signature Style & Charisma',
      category: 'Editorial & Brand Shoot',
      caption: 'Unapologetic individuality, charm, and magnetic screen presence.',
    },
    {
      src: '/images/qazi-salman-biggboss.jpg',
      title: 'Prime-Time Stardom',
      category: 'National Television',
      caption: 'Sharing prime-time limelight with Salman Khan in front of over 40 million viewers.',
    },
    {
      src: '/images/qazi-white-shirt.jpg',
      title: 'The Voice of Emotion',
      category: 'Acoustic & Studio Sessions',
      caption: 'Soulful Sufi melodies and heartfelt Bollywood ballads.',
    },
    {
      src: '/images/events/arena-concert.jpg',
      title: 'Arena Sea of Lights',
      category: 'Stadium Shows',
      caption: 'Thousands of fans singing along to every lyric under explosive stage lights.',
    },
  ];

  const performancePillars = [
    {
      icon: 'bolt',
      pillar: 'Pillar 01',
      title: 'Electrifying Crowd Hypnotism',
      description:
        'Qazi doesn’t just perform songs; he commands the entire room. From the front row to the farthest bleachers, his high-voltage stage presence and spontaneous call-and-response turn every concert into a unified choir.',
      specs: ['Spontaneous Crowd Hype', 'Front-Row Interactive Energy', 'Full-Stage Mobility'],
    },
    {
      icon: 'music_note',
      pillar: 'Pillar 02',
      title: 'Bollywood & Sufi Fusion Repertoire',
      description:
        'A masterfully balanced setlist spanning chartbuster Bollywood anthems like "Afghan Jalebi", heart-wrenching Sufi-rock melodies, booming Punjabi party tracks, and timeless retro tributes tailored to the event vibe.',
      specs: ['Bollywood Dance Chartbusters', 'Soul-Stirring Sufi Anthems', 'Retro & Modern Mashups'],
    },
    {
      icon: 'verified',
      pillar: 'Pillar 03',
      title: 'Arena-Grade Production & Punctuality',
      description:
        'Backed by a world-class live touring band, synchronized visual timecode, and verified sound engineering. Known across the industry for absolute punctuality, flawless sound checks, and VIP green-room etiquette.',
      specs: ['World-Class Touring Band', 'Shure / Sennheiser Wireless Rig', 'Zero-Latency IEM Calibration'],
    },
  ];

  const testimonials = [
    {
      quote:
        'Qazi was the undisputed showstopper of our annual cultural festival. Over 18,000 students were jumping on their feet from the very first beat of Afghan Jalebi to the final encore. Pure rockstar magic!',
      author: 'Cultural Convenor',
      entity: 'IIT Cultural Fest Bureau',
      badge: '18,000+ Students',
    },
    {
      quote:
        'For our high-profile destination wedding in Udaipur, Qazi brought unmatched charm and regal warmth. He got all three generations dancing on stage. Our guests are still talking about his performance!',
      author: 'Royal Wedding Planner',
      entity: 'Luxury Wedding Management, Mumbai',
      badge: 'Palace Sangeet Gala',
    },
    {
      quote:
        'Working with Qazi and his management team was an absolute breeze. Professional, punctual, and delivered a high-energy show that exceeded every expectation of our corporate leadership summit.',
      author: 'Head of Enterprise Events',
      entity: 'Global Tech Conclave',
      badge: 'Corporate Headliner',
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAF8F5] text-[#141312]">
      <Navbar />

      <main className="w-full pt-20 bg-[#FAF8F5] min-h-[calc(100vh-80px)]">
        {/* ========================================================= */}
        {/* 1. HERO SECTION: MASSIVE SUPERSTAR PORTRAIT OF QAZI       */}
        {/* ========================================================= */}
        <section className="relative w-full -mt-20 pt-28 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F4F0E8] via-[#FAF8F5] to-[#FFFFFF] border-b border-[#E6DFD1]">
          {/* Subtle Ambient Golden Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#D8AE56]/15 rounded-full blur-[140px]"></div>
          <div className="pointer-events-none absolute top-1/3 -right-32 w-[500px] h-[350px] bg-[#B68938]/10 rounded-full blur-[120px]"></div>

          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
            {/* Top Tagline Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-6 pb-8 border-b border-[#E6DFD1]">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] shadow-sm border border-[#E6DFD1]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B68938] animate-pulse"></span>
                <span
                  className="text-xs uppercase tracking-widest text-[#87672D] font-extrabold"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Official Artist Biography • 2026 Edition
                </span>
              </div>
              <div
                className="text-xs uppercase tracking-wider text-[#736B5E] flex items-center gap-2 font-semibold"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                <span>Actor</span>
                <span className="text-[#B68938]">•</span>
                <span>Performer</span>
                <span className="text-[#B68938]">•</span>
                <span className="text-[#141312] font-black">Playback Singer</span>
              </div>
            </div>

            {/* Asymmetric Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-10">
              {/* Left Column: Superstar Narrative */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4F0E8] border border-[#E0D8C8]">
                    <span className="material-symbols-outlined text-[#B68938] text-[18px]">verified</span>
                    <span
                      className="text-xs uppercase tracking-[0.2em] text-[#87672D] font-extrabold"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      The Maverick of Indian Entertainment
                    </span>
                  </div>

                  <h1
                    className="text-4xl sm:text-5xl lg:text-6xl text-[#141312] tracking-tight leading-[1.08] uppercase font-black"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    MEET{' '}
                    <span className="text-[#B68938] italic">QAZI TOUQEER</span>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#524E46] font-normal normal-case mt-2">
                      Awaaz Jo Dil Se Nikle, Stage Pe Aag Laga De.
                    </span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-[#524E46] max-w-2xl leading-relaxed font-medium">
                  From capturing over 50 million hearts as the historic winner of <strong className="text-[#141312] font-bold">Fame Gurukul</strong> to delivering Bollywood’s global chartbuster <strong className="text-[#141312] font-bold">“Afghan Jalebi”</strong> with Pritam, and creating television history on <strong className="text-[#141312] font-bold">Bigg Boss</strong> with Salman Khan — Qazi Touqeer is a powerhouse of raw charisma, vocal adrenaline, and unforgettable live showmanship.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/book-me"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] text-[#1A1203] font-black text-xs uppercase tracking-widest hover:brightness-105 transition-all duration-300 shadow-[0_4px_20px_rgba(216,174,86,0.35)] hover:scale-[1.02]"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    <span>Book Qazi For Events</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>

                  <a
                    href="#journey"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F6F3EC] text-[#141312] font-bold text-xs uppercase tracking-wider transition-colors border border-[#D7D0C0] shadow-sm"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    <span className="material-symbols-outlined text-[#B68938] text-[18px]">history_edu</span>
                    <span>Read The Journey</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setRiderModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-transparent hover:bg-[#F4F0E8] text-[#87672D] font-bold text-xs uppercase tracking-wider transition-colors border border-transparent hover:border-[#D7D0C0] cursor-pointer"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    <span className="material-symbols-outlined text-[#B68938] text-[18px]">description</span>
                    <span>Technical Rider</span>
                  </button>
                </div>

                {/* Micro Quote Banner */}
                <div className="pt-2 flex items-start gap-3 bg-[#FFFFFF] p-4 sm:p-5 rounded-2xl border border-[#E6DFD1] shadow-sm">
                  <span className="material-symbols-outlined text-[#B68938] text-[28px] mt-0.5">format_quote</span>
                  <p className="text-xs sm:text-sm text-[#524E46] italic leading-relaxed">
                    &quot;Stage mere liye sirf ek jagah nahi hai gaane ki — yeh mera ghar hai. Jab audience ke haath hawa mein hote hain aur sab ek saath gaate hain, wahi meri asli daulat hai.&quot;
                    <span
                      className="block text-xs uppercase not-italic text-[#87672D] mt-1.5 font-bold"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      — Qazi Touqeer
                    </span>
                  </p>
                </div>
              </div>

              {/* Right Column: High-Impact Rockstar Photo of Qazi */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#141312] shadow-2xl group border-2 border-[#D8AE56]/50">
                  <img
                    className="w-full h-full object-cover object-top filter brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt="Qazi Touqeer performing live on stage with microphone and sunglasses"
                    src="/images/qazi-mic-black.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent opacity-80"></div>

                  {/* Top Live Badge */}
                  <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-[#141312]/85 backdrop-blur-md border border-[#D8AE56]/60 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span
                      className="text-[10px] uppercase tracking-widest text-[#FAF8F5] font-black"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Stage Rockstar
                    </span>
                  </div>

                  {/* Stage Metadata Watermark Card */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#141312]/90 backdrop-blur-xl rounded-xl border border-[#D8AE56]/40 text-[#FAF8F5] shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className="text-[10px] uppercase tracking-widest text-[#D8AE56] block font-extrabold"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          Bollywood Hitmaker
                        </span>
                        <span
                          className="text-base sm:text-lg text-white font-black"
                          style={{ fontFamily: 'Bodoni Moda, serif' }}
                        >
                          Qazi Touqeer Live
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#261B04] border border-[#D8AE56] text-[#F3D084] text-[10px] uppercase font-bold"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        <span className="material-symbols-outlined text-[14px] text-[#F3D084]">equalizer</span>
                        <span>500+ Shows</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Offset Card (Desktop) */}
                <div className="hidden sm:block absolute -bottom-5 -left-6 bg-[#FFFFFF] p-4 rounded-xl shadow-xl max-w-xs border border-[#E6DFD1]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#D8AE56] flex items-center justify-center text-[#B68938] shrink-0">
                      <span className="material-symbols-outlined text-[24px]">music_note</span>
                    </div>
                    <div>
                      <span
                        className="text-[10px] uppercase tracking-wider text-[#87672D] block font-extrabold"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Global Sensation
                      </span>
                      <span className="text-xs text-[#141312] font-bold block">
                        500M+ Views &bull; Afghan Jalebi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Artist Milestones Row */}
            <div className="mt-14 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#E6DFD1]">
              <div className="p-5 bg-[#FFFFFF] rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow border border-[#E6DFD1]">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] uppercase tracking-widest text-[#87672D] font-extrabold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Fame Gurukul
                  </span>
                  <span className="material-symbols-outlined text-[#B68938] text-[22px]">military_tech</span>
                </div>
                <div className="mt-4">
                  <div className="text-3xl text-[#141312] font-black" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    Winner
                  </div>
                  <div className="text-[11px] text-[#524E46] uppercase tracking-wider mt-1 font-semibold">
                    50M+ Public Votes
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#FFFFFF] rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow border border-[#E6DFD1]">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] uppercase tracking-widest text-[#87672D] font-extrabold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Bollywood Smash
                  </span>
                  <span className="material-symbols-outlined text-[#B68938] text-[22px]">play_circle</span>
                </div>
                <div className="mt-4">
                  <div className="text-3xl text-[#B68938] font-black" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    500M+
                  </div>
                  <div className="text-[11px] text-[#524E46] uppercase tracking-wider mt-1 font-semibold">
                    Afghan Jalebi Views
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#FFFFFF] rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow border border-[#E6DFD1]">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] uppercase tracking-widest text-[#87672D] font-extrabold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Live Concerts
                  </span>
                  <span className="material-symbols-outlined text-[#B68938] text-[22px]">stadium</span>
                </div>
                <div className="mt-4">
                  <div className="text-3xl text-[#141312] font-black" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    500+
                  </div>
                  <div className="text-[11px] text-[#524E46] uppercase tracking-wider mt-1 font-semibold">
                    Arenas & Campus Fests
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#FFFFFF] rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow border border-[#E6DFD1]">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] uppercase tracking-widest text-[#87672D] font-extrabold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    National TV
                  </span>
                  <span className="material-symbols-outlined text-[#B68938] text-[22px]">tv</span>
                </div>
                <div className="mt-4">
                  <div className="text-3xl text-[#B68938] font-black" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    Bigg Boss
                  </div>
                  <div className="text-[11px] text-[#524E46] uppercase tracking-wider mt-1 font-semibold">
                    With Salman Khan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. THE SALMAN KHAN CONNECTION & BIGG BOSS SPOTLIGHT       */}
        {/* ========================================================= */}
        <section className="w-full py-16 md:py-20 bg-[#FFFFFF] border-b border-[#E6DFD1]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="rounded-3xl bg-gradient-to-br from-[#1A1815] via-[#24211D] to-[#141312] p-8 md:p-12 lg:p-14 text-[#FAF8F5] shadow-2xl border-2 border-[#D8AE56]/40 relative overflow-hidden">
              <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 bg-[#D8AE56]/20 rounded-full blur-[100px]"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                {/* Real Salman Khan & Qazi Photo */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black border-2 border-[#D8AE56]/60 shadow-2xl group">
                    <img
                      src="/images/qazi-salman-hug.jpg"
                      alt="Qazi Touqeer in a heartfelt embrace with superstar Salman Khan"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>

                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#141312]/80 backdrop-blur-md border border-[#D8AE56] text-[10px] uppercase tracking-widest text-[#F3D084] font-black">
                      Iconic Moment
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-xs">
                      <div className="text-[#D8AE56] font-bold uppercase text-[10px]">National Television • Bigg Boss</div>
                      <div className="text-white font-semibold">Salman Khan &amp; Qazi Touqeer</div>
                    </div>
                  </div>
                </div>

                {/* Narrative & Quote */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8AE56]/15 border border-[#D8AE56]/30 text-[#F3D084] text-xs uppercase tracking-widest font-extrabold">
                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                    <span>The Salman Khan Bond</span>
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight font-black"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    A Bond of Brotherhood, Respect &amp;{' '}
                    <span className="text-[#F3D084] italic">National Stardom</span>
                  </h2>

                  <p className="text-sm sm:text-base text-[#D7D0C0] leading-relaxed font-normal">
                    When Qazi stepped onto the prestigious stage of <strong className="text-white">Bigg Boss</strong>, his natural charm, razor-sharp wit, and fearless authenticity immediately won over the show&apos;s iconic host, <strong className="text-white">Salman Khan</strong>.
                  </p>

                  <p className="text-sm sm:text-base text-[#D7D0C0] leading-relaxed font-normal">
                    Salman Khan openly commended Qazi&apos;s courage, grounded persona, and organic connection with the masses. Their memorable hugs, candid interactions, and stage banter became viral sensations across India, solidifying Qazi as one of the most beloved personalities in modern entertainment.
                  </p>

                  <div className="p-5 rounded-2xl bg-[#0E0E10]/80 border border-[#D8AE56]/30 space-y-3">
                    <div className="flex items-center gap-2 text-[#D8AE56]">
                      <span className="material-symbols-outlined text-[24px]">format_quote</span>
                      <span className="text-xs uppercase tracking-widest font-bold">In Qazi&apos;s Words</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#F7F1E4] italic leading-relaxed">
                      &quot;Salman Bhai is not just a superstar; he has a heart of pure gold. Standing beside him on that stage and feeling his genuine love and mentorship gave me the conviction to keep dreaming even bigger.&quot;
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      href="/book-me?cat=Meet Qazi"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] text-[#1A1203] font-black text-xs uppercase tracking-widest hover:brightness-105 transition-all shadow-lg"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span>Meet Qazi In Person</span>
                      <span className="material-symbols-outlined text-[18px]">person</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#261B04] hover:bg-[#382806] text-[#F3D084] font-bold text-xs uppercase tracking-wider border border-[#D8AE56]/50 transition-all"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span>Booking Inquiries</span>
                      <span className="material-symbols-outlined text-[18px]">mail</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. THE JOURNEY: CHRONICLES OF TRIUMPH (TIMELINE)          */}
        {/* ========================================================= */}
        <section className="w-full py-16 md:py-24 bg-[#FAF8F5] border-b border-[#E6DFD1]" id="journey">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span
                className="text-xs uppercase tracking-[0.2em] text-[#87672D] font-extrabold block"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                Chronicles of Triumph
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-[#141312] font-black mt-2 tracking-tight"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                The Incredible Journey of Qazi
              </h2>
              <p className="text-sm sm:text-base text-[#524E46] mt-3 leading-relaxed">
                From Srinagar to national television screens, chart-topping Bollywood soundtracks, and the biggest live performance arenas.
              </p>
            </div>

            {/* Timeline Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] p-6 sm:p-7 rounded-2xl flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-[#E6DFD1] hover:border-[#B68938] group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#87672D] text-xs uppercase font-extrabold border border-[#E6DFD1]"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        {item.year}
                      </span>
                      <span className="w-10 h-10 rounded-full bg-[#FAF8F5] group-hover:bg-[#B68938] group-hover:text-white transition-colors flex items-center justify-center text-[#B68938]">
                        <span className="material-symbols-outlined text-[22px]">{item.badgeIcon}</span>
                      </span>
                    </div>

                    <span
                      className="text-[10px] uppercase tracking-widest text-[#B68938] font-bold block mb-1"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      {item.tag}
                    </span>

                    <h3
                      className="text-xl text-[#141312] font-black mb-3 group-hover:text-[#B68938] transition-colors leading-snug"
                      style={{ fontFamily: 'Bodoni Moda, serif' }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#524E46] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E6DFD1] flex items-center justify-between">
                    <span
                      className="text-xs text-[#141312] font-black"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      {item.highlight}
                    </span>
                    <span className="material-symbols-outlined text-[#B68938] text-[18px]">verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. PERFORMANCE PILLARS: WHY QAZI COMMANDS THE STAGE       */}
        {/* ========================================================= */}
        <section className="w-full py-16 md:py-20 bg-[#FFFFFF] border-b border-[#E6DFD1]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <span
                  className="text-xs uppercase tracking-[0.2em] text-[#87672D] font-extrabold block"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Stage DNA &amp; Craft
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl text-[#141312] font-black mt-2 tracking-tight"
                  style={{ fontFamily: 'Bodoni Moda, serif' }}
                >
                  Why Qazi Commands Every Stage
                </h2>
              </div>
              <p className="text-sm text-[#524E46] max-w-md leading-relaxed">
                A seamless synthesis of rockstar crowd hyping, soulful vocal versatility, and bulletproof concert production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {performancePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] p-7 sm:p-8 rounded-2xl flex flex-col justify-between hover:bg-[#FFFFFF] hover:shadow-xl transition-all duration-300 border border-[#E6DFD1] hover:border-[#B68938]"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E6DFD1] flex items-center justify-center text-[#B68938] mb-6 shadow-sm">
                      <span className="material-symbols-outlined text-[28px]">{pillar.icon}</span>
                    </div>

                    <span
                      className="text-[10px] uppercase tracking-widest text-[#87672D] block font-extrabold mb-1"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      {pillar.pillar}
                    </span>

                    <h3
                      className="text-2xl text-[#141312] font-black mb-3"
                      style={{ fontFamily: 'Bodoni Moda, serif' }}
                    >
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-[#524E46] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-8 mt-6 border-t border-[#E6DFD1] space-y-2">
                    {pillar.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#141312] font-bold"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        <span className="material-symbols-outlined text-[#B68938] text-[16px]">check_circle</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. VISUAL PORTFOLIO & REAL STAGE MOMENTS (SUPERSTAR GRID)  */}
        {/* ========================================================= */}
        <section className="w-full py-16 md:py-24 bg-[#FAF8F5] border-b border-[#E6DFD1]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span
                className="text-xs uppercase tracking-[0.2em] text-[#87672D] font-extrabold block"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                Visual Gallery
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-[#141312] font-black mt-2 tracking-tight"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Moments in the Spotlight
              </h2>
              <p className="text-sm sm:text-base text-[#524E46] mt-3 leading-relaxed">
                Authentic captures from live arena tours, national television sets, and private editorial sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#141312] shadow-lg border border-[#E6DFD1] hover:border-[#B68938] transition-all duration-500"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent opacity-85 group-hover:opacity-90 transition-opacity"></div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full bg-[#141312]/80 backdrop-blur-md border border-[#D8AE56]/60 text-[#F3D084] text-[10px] uppercase tracking-wider font-extrabold"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      {img.category}
                    </span>
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#141312]/85 backdrop-blur-md rounded-xl border border-white/10 text-white">
                    <h4
                      className="text-lg font-black text-[#FAF8F5]"
                      style={{ fontFamily: 'Bodoni Moda, serif' }}
                    >
                      {img.title}
                    </h4>
                    <p className="text-xs text-[#D7D0C0] mt-1 leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. VERIFIED EVENT ORGANIZER ACCLAIM                       */}
        {/* ========================================================= */}
        <section className="w-full py-16 md:py-20 bg-[#FFFFFF] border-b border-[#E6DFD1]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span
                className="text-xs uppercase tracking-[0.2em] text-[#87672D] font-extrabold block"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                Promoter &amp; Client Acclaim
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-[#141312] font-black mt-2 tracking-tight"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Trusted by Top Festivals &amp; Hosts
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] p-7 sm:p-8 rounded-2xl relative shadow-md border border-[#E6DFD1] flex flex-col justify-between"
                >
                  <div>
                    <span className="material-symbols-outlined text-[#B68938] text-[32px] mb-3 block">format_quote</span>
                    <p className="text-sm sm:text-base text-[#141312] italic leading-relaxed font-medium">
                      &quot;{item.quote}&quot;
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#E6DFD1] flex items-center justify-between">
                    <div>
                      <span className="text-sm text-[#141312] font-black block">{item.author}</span>
                      <span
                        className="text-[11px] text-[#736B5E] block font-semibold"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        {item.entity}
                      </span>
                    </div>
                    <span
                      className="px-2.5 py-1 rounded bg-[#FFFFFF] border border-[#E6DFD1] text-[10px] uppercase font-bold text-[#87672D]"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. DIRECT BOOKING CALLOUT BANNER                          */}
        {/* ========================================================= */}
        <section className="w-full py-16 md:py-20 bg-[#FAF8F5] relative" id="booking">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C1A17] via-[#24211D] to-[#141312] p-8 md:p-14 shadow-2xl border-2 border-[#D8AE56]/40 text-white">
              <div className="pointer-events-none absolute -bottom-10 -right-10 w-96 h-96 bg-[#D8AE56]/20 rounded-full blur-[100px]"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D8AE56]/20 text-[#F3D084] text-xs uppercase tracking-widest font-extrabold border border-[#D8AE56]/30">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Official Artist Management Booking</span>
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight font-black"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    Ready to bring{' '}
                    <span className="text-[#F3D084] italic">Qazi Touqeer Live</span>{' '}
                    to your campus fest, royal wedding, or arena tour?
                  </h2>

                  <p className="text-sm sm:text-base text-[#D7D0C0] max-w-2xl leading-relaxed">
                    Our direct talent bureau manages inquiries for university star nights, stadium concerts, palace sangeet celebrations, and private VIP engagements with rapid turnaround and verified rider execution.
                  </p>

                  <div
                    className="flex flex-wrap items-center gap-6 pt-3 text-[#D8AE56] text-xs uppercase tracking-wider font-bold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>Fast Confirmation</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      <span>Verified Contract &amp; Escrow</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                      <span>Mumbai &bull; London &bull; Greater Noida</span>
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-4 w-full">
                  <Link
                    href="/book-me"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] text-[#1A1203] text-xs uppercase font-black tracking-widest hover:brightness-105 transition-all shadow-[0_4px_24px_rgba(216,174,86,0.4)] hover:scale-[1.02]"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    <span>Book Qazi Touqeer</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setRiderModalOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#F3D084] text-xs uppercase tracking-wider transition-all border border-[#D8AE56]/40 cursor-pointer font-bold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    <span>Download Technical Rider</span>
                  </button>

                  <span
                    className="text-center text-[10px] uppercase text-[#A39D91] font-semibold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Official Agency Representation &bull; Direct Liaison
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TECHNICAL RIDER MODAL                                     */}
        {/* ========================================================= */}
        {riderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl relative border-2 border-[#D8AE56]/40 text-[#141312]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#B68938] text-[26px]">verified</span>
                  <span
                    className="text-xl text-[#141312] font-black"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    Qazi Technical Rider
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setRiderModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#E6DFD1] text-[#141312] flex items-center justify-center transition-colors cursor-pointer border border-[#E6DFD1]"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#524E46] leading-relaxed font-medium">
                Please enter your organization details to receive the official <strong className="text-[#141312]">2026 Qazi Touqeer Acoustic, Lighting &amp; Stage Blueprint</strong>.
              </p>

              {riderDispatched ? (
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border-2 border-[#B68938] text-center space-y-2">
                  <span className="material-symbols-outlined text-[#B68938] text-[36px]">check_circle</span>
                  <div className="text-sm text-[#141312] font-black">Rider Package Dispatched!</div>
                  <div className="text-xs text-[#524E46]">
                    Please check your email inbox for the full backstage specs and sound blueprints.
                  </div>
                </div>
              ) : (
                <form className="space-y-3.5 pt-2" onSubmit={handleRiderSubmit}>
                  <div>
                    <label
                      className="text-[11px] uppercase tracking-wider text-[#87672D] block mb-1.5 font-bold"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      College / Event / Festival Entity
                    </label>
                    <input
                      className="w-full bg-[#FAF8F5] text-[#141312] px-4 py-2.5 rounded-xl text-xs border border-[#D7D0C0] focus:outline-none focus:border-[#B68938] font-medium"
                      placeholder="e.g. IIT Bombay Cultural Council or Luxury Events Group"
                      required
                      type="text"
                    />
                  </div>

                  <div>
                    <label
                      className="text-[11px] uppercase tracking-wider text-[#87672D] block mb-1.5 font-bold"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Official Talent Buyer Email
                    </label>
                    <input
                      className="w-full bg-[#FAF8F5] text-[#141312] px-4 py-2.5 rounded-xl text-xs border border-[#D7D0C0] focus:outline-none focus:border-[#B68938] font-medium"
                      placeholder="buyer@domain.com"
                      required
                      type="email"
                    />
                  </div>

                  <div>
                    <label
                      className="text-[11px] uppercase tracking-wider text-[#87672D] block mb-1.5 font-bold"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Target Event Format
                    </label>
                    <select className="w-full bg-[#FAF8F5] text-[#141312] px-4 py-2.5 rounded-xl text-xs border border-[#D7D0C0] focus:outline-none focus:border-[#B68938] font-medium">
                      <option>College Cultural Fest &amp; Star Night</option>
                      <option>Stadium Arena Concert &amp; Public Tour</option>
                      <option>Royal Sangeet &amp; Luxury Wedding</option>
                      <option>Clubs, Superlounges &amp; Afterparties</option>
                      <option>Corporate Gala &amp; Leadership Conclave</option>
                      <option>Meet Qazi in Person (Exclusive VIP)</option>
                    </select>
                  </div>

                  <button
                    className="w-full mt-4 py-3.5 bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] text-[#1A1203] text-xs uppercase font-black rounded-xl shadow-md hover:brightness-105 transition-all cursor-pointer border-none tracking-widest"
                    type="submit"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Send Instant Rider Package
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <ContactFooter />
    </div>
  );
}
