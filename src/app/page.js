'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ContactFooter from '@/components/ContactFooter';

export default function Home() {
  const performanceDisciplines = [
    {
      num: '01',
      title: 'College Cultural Fest & Star Night',
      category: 'College Cultural Fest',
      tag: 'Campus Headliner',
      audience: '1,500 – 25,000+ Students',
      desc: 'High-octane vocal sets, crowd anthems, campus festival headlining, and unforgettable youth engagement.',
      specs: ['90-Min Live Concert Set', 'Sing-along Crowd Anthems', 'Student Council VIP Meet', 'Full Rider Tech Clearance'],
      link: '/book-me?cat=College Fest',
      image: '/images/cards/card-01-college-fest.jpg',
    },
    {
      num: '02',
      title: 'Stadium Arena Concert & Global Tours',
      category: 'Stadium Arena Concert',
      tag: 'Stadium Scale',
      audience: '5,000 – 50,000+ Fans',
      desc: 'Monumental public ticketed arena shows, festival mainstage concerts, and multi-city national tours.',
      specs: ['Full Touring Band & Tech Crew', 'L-Acoustics K1/K2 Audio Sync', 'DMX Pyrotechnics & Cryo', '4K LED Visual Timecode'],
      link: '/book-me?cat=Arena Concert',
      image: '/images/cards/card-02-arena-concert.jpg',
    },
    {
      num: '03',
      title: 'Royal Milestones & Luxury Weddings',
      category: 'Royal Milestones & VIP',
      tag: 'Private Luxury',
      audience: '200 – 2,500+ Guests',
      desc: 'Exclusive Sangeet night live sets, bespoke couple dedications, and opulent palace gala performances.',
      specs: ['Curated Romantic Setlist', 'VIP Family Stage Appearance', 'Custom Acoustic Arrangements', 'Red Carpet Photo Session'],
      link: '/book-me?cat=Wedding',
      image: '/images/cards/card-03-luxury-wedding.jpg',
    },
    {
      num: '04',
      title: 'Clubs, Superlounges & Afterparties',
      category: 'Clubs & Superlounges',
      tag: 'High Energy Nightlife',
      audience: '300 – 1,200+ Patrons',
      desc: 'Late-night electronic Sufi club sets, VIP table engagement, explosive drops, and club night anthems.',
      specs: ['Hybrid DJ + Live Vocal Rig', 'Late Night Schedule Clearance', 'VIP Table Photo Interludes', 'Club Sound Telemetry'],
      link: '/book-me?cat=Club',
      image: '/images/cards/card-04-nightclub-party.jpg',
    },
    {
      num: '05',
      title: 'Meet Qazi in Person',
      category: 'Meet Qazi in Person',
      tag: 'Exclusive',
      audience: '1-on-1 Meeting',
      desc: 'Private green room access, candid masterclass conversation, signed mementos, and bespoke acoustic set.',
      specs: ['1-on-1 Conversation Session', 'Signed Tour Memorabilia', 'High-Res Photographic Keepsake', 'Personal Acoustic Song Request'],
      link: '/book-me?cat=Meet Qazi',
      image: '/images/cards/card-05-vip-meet.jpg',
    },
    {
      num: '06',
      title: 'Corporate Gala & Global Conclave',
      category: 'Corporate Gala & Conclave',
      tag: 'Enterprise Prestige',
      audience: '500 – 5,000+ Delegates',
      desc: 'Annual enterprise celebrations, leadership summits, high-profile awards galas, and brand launch headliners.',
      specs: ['Sophisticated Thematic Repertoire', 'Brand Message Alignment', 'Full Corporate Billing & GST', 'Punctual Stage Run-Order'],
      link: '/book-me?cat=Corporate',
      image: '/images/cards/card-06-corporate-gala.jpg',
    },
    {
      num: '07',
      title: 'Brand Collaborations & Endorsements',
      category: 'Brand Collaboration',
      tag: 'Brand Ambassador',
      audience: 'Pan-India & Global Reach',
      desc: 'Strategic brand ambassadorships, TV commercial shoots, digital ad campaigns, celebrity product launches, and viral social media promotions.',
      specs: ['TVC & Digital Video Ad Campaigns', 'Official Brand Ambassador Rights', 'Product Launch Event Presence', 'Social Media Collabs & Viral Reels'],
      link: '/book-me?cat=Brand Collab',
      image: '/images/cards/card-07-brand-collab.jpg',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#141312]">
      <Navbar />

      <main className="flex-1">
        {/* WORLD-CLASS ROCKSTAR HERO SECTION WITH ALL 5 REAL CLIENT PHOTOS & SALMAN KHAN MOMENTS */}
        <Hero />

        {/* 7 PERFORMANCE DISCIPLINES SHOWCASE */}
        <section id="disciplines" className="w-full py-16 md:py-20 bg-[#FAF8F5] border-b border-[#E6DFD1]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="pb-10 text-center md:text-left">
              <span
                className="text-sm uppercase tracking-[0.2em] text-[#9B7018] font-extrabold block"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                Curated Disciplines
              </span>
              <h2
                className="text-3xl md:text-5xl text-[#111111] tracking-tight mt-2 font-black"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Event Categories
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {performanceDisciplines.map((item) => (
                <div
                  key={item.num}
                  className={`bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(20,19,18,0.05)] hover:shadow-[0_20px_45px_rgba(182,137,56,0.22)] transition-all duration-300 flex flex-col justify-between group border-2 border-[#E6DFD1] hover:border-[#D8AE56] ${
                    item.num === '07' ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
                  }`}
                >
                  <div>
                    {/* Card Image */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        alt={item.title}
                        src={item.image}
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-7">
                      <h3
                        className="text-2xl text-[#111111] font-bold mb-3"
                        style={{ fontFamily: 'Bodoni Moda, serif' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#38342D] leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-7 pt-0">
                    <Link
                      href={item.link}
                      className="w-full py-3.5 px-5 rounded-xl bg-[#F6F2E9] hover:bg-gradient-to-r hover:from-[#D8AE56] hover:to-[#B68938] hover:text-[#261B04] text-[#111111] text-sm uppercase font-extrabold tracking-wider transition-all flex items-center justify-between border-2 border-[#DDD5C5]"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span>Book Now</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <ContactFooter />
    </div>
  );
}
