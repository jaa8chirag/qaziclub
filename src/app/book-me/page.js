'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ContactFooter from '@/components/ContactFooter';

function BookMeContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || '';

  const [territory, setTerritory] = useState('domestic'); // 'domestic' | 'intl'
  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [currency, setCurrency] = useState('INR');
  const [showModal, setShowModal] = useState(false);
  const [bookingHash, setBookingHash] = useState('QAZI-ESCROW-8924');
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    repName: '',
    orgName: '',
    perfDate: '2026-11-14',
    timeSlot: 'Evening Prime (7:00 PM – 10:00 PM)',
    city: '',
    phone: '',
    email: '',
    expectedGuests: '',
    techNotes: '',
  });

  const eventCards = [
    {
      id: 'College Cultural Fest',
      num: '01',
      title: 'College Cultural Fest & Star Night',
      category: 'College Cultural Fest',
      tag: 'Campus Headliner',
      audience: '1,500 – 25,000+ Students',
      desc: 'High-octane vocal sets, crowd anthems, campus festival headlining, and unforgettable youth engagement.',
      specs: ['90-Min Live Concert Set', 'Sing-along Crowd Anthems', 'Student Council VIP Meet', 'Full Rider Tech Clearance'],
      image: '/images/cards/card-01-college-fest.jpg',
    },
    {
      id: 'Stadium Arena Concert',
      num: '02',
      title: 'Stadium Arena Concert & Global Tours',
      category: 'Stadium Arena Concert',
      tag: 'Stadium Scale',
      audience: '5,000 – 50,000+ Fans',
      desc: 'Monumental public ticketed arena shows, festival mainstage concerts, and multi-city national tours.',
      specs: ['Full Touring Band & Tech Crew', 'L-Acoustics K1/K2 Audio Sync', 'DMX Pyrotechnics & Cryo', '4K LED Visual Timecode'],
      image: '/images/cards/card-02-arena-concert.jpg',
    },
    {
      id: 'Royal Milestones & VIP',
      num: '03',
      title: 'Royal Milestones & Luxury Weddings',
      category: 'Royal Milestones & VIP',
      tag: 'Private Luxury',
      audience: '200 – 2,500+ Guests',
      desc: 'Exclusive Sangeet night live sets, bespoke couple dedications, and opulent palace gala performances.',
      specs: ['Curated Romantic Setlist', 'VIP Family Stage Appearance', 'Custom Acoustic Arrangements', 'Red Carpet Photo Session'],
      image: '/images/cards/card-03-luxury-wedding.jpg',
    },
    {
      id: 'Clubs & Superlounges',
      num: '04',
      title: 'Clubs, Superlounges & Afterparties',
      category: 'Clubs & Superlounges',
      tag: 'High Energy Nightlife',
      audience: '300 – 1,200+ Patrons',
      desc: 'Late-night electronic Sufi club sets, VIP table engagement, explosive drops, and club night anthems.',
      specs: ['Hybrid DJ + Live Vocal Rig', 'Late Night Schedule Clearance', 'VIP Table Photo Interludes', 'Club Sound Telemetry'],
      image: '/images/cards/card-04-nightclub-party.jpg',
    },
    {
      id: 'Meet Qazi in Person',
      num: '05',
      title: 'Meet Qazi in Person',
      category: 'Meet Qazi in Person',
      tag: 'Exclusive',
      audience: '1-on-1 Meeting',
      desc: 'Private green room access, candid masterclass conversation, signed mementos, and bespoke acoustic set.',
      specs: ['1-on-1 Conversation Session', 'Signed Tour Memorabilia', 'High-Res Photographic Keepsake', 'Personal Acoustic Song Request'],
      image: '/images/cards/card-05-vip-meet.jpg',
    },
    {
      id: 'Corporate Gala & Conclave',
      num: '06',
      title: 'Corporate Gala & Global Conclave',
      category: 'Corporate Gala & Conclave',
      tag: 'Enterprise Prestige',
      audience: '500 – 5,000+ Delegates',
      desc: 'Annual enterprise celebrations, leadership summits, high-profile awards galas, and brand launch headliners.',
      specs: ['Sophisticated Thematic Repertoire', 'Brand Message Alignment', 'Full Corporate Billing & GST', 'Punctual Stage Run-Order'],
      image: '/images/cards/card-06-corporate-gala.jpg',
    },
    {
      id: 'Brand Collaborations & Endorsements',
      num: '07',
      title: 'Brand Collaborations & Endorsements',
      category: 'Brand Collaboration',
      tag: 'Brand Ambassador',
      audience: 'Pan-India & Global Reach',
      desc: 'Strategic brand ambassadorships, TV commercial shoots, digital ad campaigns, celebrity product launches, and viral social media promotions.',
      specs: ['TVC & Digital Video Ad Campaigns', 'Official Brand Ambassador Rights', 'Product Launch Event Presence', 'Social Media Collabs & Viral Reels'],
      image: '/images/cards/card-07-brand-collab.jpg',
    },
  ];

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      if (cat.toLowerCase().includes('fest') || cat.toLowerCase().includes('college')) {
        setSelectedCat('College Cultural Fest');
      } else if (cat.toLowerCase().includes('arena') || cat.toLowerCase().includes('tour') || cat.toLowerCase().includes('concert')) {
        setSelectedCat('Stadium Arena Concert');
      } else if (cat.toLowerCase().includes('wedding') || cat.toLowerCase().includes('milestone') || cat.toLowerCase().includes('royal')) {
        setSelectedCat('Royal Milestones & VIP');
      } else if (cat.toLowerCase().includes('club') || cat.toLowerCase().includes('party')) {
        setSelectedCat('Clubs & Superlounges');
      } else if (cat.toLowerCase().includes('meet') || cat.toLowerCase().includes('vip')) {
        setSelectedCat('Meet Qazi in Person');
      } else if (cat.toLowerCase().includes('brand') || cat.toLowerCase().includes('collab')) {
        setSelectedCat('Brand Collaborations & Endorsements');
      } else if (cat.toLowerCase().includes('corporate')) {
        setSelectedCat('Corporate Gala & Conclave');
      }
    }
  }, [searchParams]);

  const handleSelectCard = (card) => {
    setSelectedCat(card.id);
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTerritorySwitch = (type) => {
    setTerritory(type);
    if (type === 'domestic') {
      setCurrency('INR');
    } else {
      setCurrency('USD');
    }
  };

  // Auto-Detect Location (GPS)
  const handleAutoDetectLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.suburb ||
            data.address?.state_district ||
            'Delhi';
          const state = data.address?.state || '';
          const country = data.address?.country || 'India';
          const fullLoc = [city, state, country].filter(Boolean).join(', ');
          setFormData((prev) => ({ ...prev, city: fullLoc }));
        } catch {
          setFormData((prev) => ({ ...prev, city: 'Delhi, India' }));
        } finally {
          setDetectingLocation(false);
        }
      },
      () => {
        setFormData((prev) => ({ ...prev, city: 'Delhi, India' }));
        setDetectingLocation(false);
      },
      { timeout: 7000 }
    );
  };

  // Category specific organization / college label and placeholder
  const getOrgConfig = (cat) => {
    switch (cat) {
      case 'College Cultural Fest':
        return {
          label: 'College / University Name',
          placeholder: 'e.g. IIT Bombay, BITS Pilani, Delhi University',
        };
      case 'Stadium Arena Concert':
        return {
          label: 'Concert / Arena / Tour Name',
          placeholder: 'e.g. Sunburn Arena, Mumbai Stadium Festival',
        };
      case 'Royal Milestones & VIP':
        return {
          label: 'Couple / Family / Wedding Name',
          placeholder: 'e.g. Sharma & Verma Royal Sangeet',
        };
      case 'Clubs & Superlounges':
        return {
          label: 'Club / Lounge / Venue Name',
          placeholder: 'e.g. Club Mirage Mumbai, Toy Room Delhi',
        };
      case 'Meet Qazi in Person':
        return {
          label: 'Client / Occasion Name',
          placeholder: 'e.g. Private VIP Meeting / Masterclass',
        };
      case 'Corporate Gala & Conclave':
        return {
          label: 'Company / Organization Name',
          placeholder: 'e.g. Google India, Tata Enterprise Summit',
        };
      case 'Brand Collaborations & Endorsements':
        return {
          label: 'Brand / Agency Name',
          placeholder: 'e.g. Pepsi, Puma, Red Bull India',
        };
      default:
        return {
          label: 'College / Organization / Event Name',
          placeholder: 'e.g. IIT Bombay, Royal Sangeet, Google Conclave',
        };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hash = 'QAZI-ESCROW-' + Math.floor(1000 + Math.random() * 9000);
    setBookingHash(hash);
    setShowModal(true);
  };

  const activeCardInfo = eventCards.find((c) => c.id === selectedCat);
  const orgConfig = getOrgConfig(selectedCat);

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface text-on-surface">
      <Navbar />

      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        {/* Top Ambient Glow Field */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-b from-primary/10 via-primary-container/5 to-transparent blur-3xl pointer-events-none"></div>

          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-8 pb-16">

            {/* ========================================================================= */}
            {/* 1. INTERACTIVE EVENT FORMAT CARDS (MATCHING HOME PAGE CARDS EXACTLY)       */}
            {/* ========================================================================= */}
            <div className="mb-14">
              <div className="pb-6 border-b border-[#E6DFD1] mb-8 text-center sm:text-left">
                <span
                  className="text-sm uppercase tracking-[0.2em] text-[#9B7018] font-extrabold block"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Live Event Formats
                </span>
                <h1
                  className="text-3xl md:text-5xl text-[#111111] tracking-tight mt-2 font-black"
                  style={{ fontFamily: 'Bodoni Moda, serif' }}
                >
                  Select Event Format &amp; Book
                </h1>
              </div>

              {/* 7 Event Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {eventCards.map((item) => {
                  const isSelected = selectedCat === item.id;
                  const isLastCard = item.num === '07';
                  return (
                    <div
                      key={item.num}
                      onClick={() => handleSelectCard(item)}
                      className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group cursor-pointer border-2 ${
                        isLastCard ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
                      } ${
                        isSelected
                          ? 'border-[#D8AE56] ring-4 ring-[#D8AE56]/30 shadow-[0_15px_45px_rgba(216,174,86,0.35)] -translate-y-2'
                          : 'border-[#E6DFD1] hover:border-[#D8AE56] shadow-[0_10px_30px_rgba(20,19,18,0.05)] hover:shadow-[0_20px_45px_rgba(182,137,56,0.22)] hover:-translate-y-1'
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
                        <div className="p-6 sm:p-7 text-left">
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
                      <div className="p-6 sm:p-7 pt-0">
                        <button
                          type="button"
                          className={`w-full py-3.5 px-5 rounded-xl text-sm uppercase font-extrabold tracking-wider transition-all flex items-center justify-between border-2 cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#D8AE56] to-[#B68938] text-[#1A1203] border-[#D8AE56] shadow-md'
                              : 'bg-[#F6F2E9] group-hover:bg-gradient-to-r group-hover:from-[#D8AE56] group-hover:to-[#B68938] group-hover:text-[#261B04] text-[#111111] border-[#DDD5C5]'
                          }`}
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          <span>{isSelected ? '✓ Selected' : 'Book Now'}</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. THE MASTER BOOKING FORM & ARTIST DOSSIER (ANCHOR: #booking-form)        */}
            {/* ========================================================================= */}
            <div id="booking-form" className="pt-6">
              {/* Line explaining the form */}
              <div className="mb-6 text-center px-2">
                <p className="text-base md:text-lg text-[#191714] font-semibold">
                  {selectedCat && activeCardInfo ? (
                    <>
                      Please fill in your details below to book Qazi for{' '}
                      <strong className="text-[#9B7018] font-black">{activeCardInfo.title}</strong>:
                    </>
                  ) : (
                    <>
                      Please select an event format above or fill in your details below to book{' '}
                      <strong className="text-[#9B7018] font-black">Qazi Touqeer</strong>:
                    </>
                  )}
                </p>
              </div>

              {/* Territory Switcher (Centered) - Hidden for Meet Qazi in Person */}
              {selectedCat !== 'Meet Qazi in Person' && (
                <div className="flex justify-center mb-8 px-2">
                  <div className="bg-white p-1.5 rounded-full inline-flex items-center gap-2 shadow-lg border-2 border-[#D7CEBE] max-w-full overflow-x-auto">
                    <button
                      type="button"
                      onClick={() => handleTerritorySwitch('domestic')}
                      className={`px-4 sm:px-6 py-2.5 rounded-full text-xs md:text-sm uppercase font-bold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                        territory === 'domestic'
                          ? 'bg-[#D8AE56] text-[#261B04] shadow-[0_0_16px_rgba(216,174,86,0.5)]'
                          : 'text-[#443E35] hover:text-[#111111]'
                      }`}
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      <span>Domestic / India Events</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTerritorySwitch('intl')}
                      className={`px-4 sm:px-6 py-2.5 rounded-full text-xs md:text-sm uppercase font-bold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                        territory === 'intl'
                          ? 'bg-[#D8AE56] text-[#261B04] shadow-[0_0_16px_rgba(216,174,86,0.5)]'
                          : 'text-[#443E35] hover:text-[#111111]'
                      }`}
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span className="material-symbols-outlined text-[18px]">public</span>
                      <span>International Tour / Global</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Centered Booking Form */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(20,19,18,0.08)] relative overflow-hidden border-2 border-[#D7CEBE]">
                  {/* Subtle Top Golden Hairline Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938]"></div>

                  {/* Clean Booking Header */}
                  <div className="bg-[#FAF5EC] rounded-2xl p-4 md:p-5 mb-8 flex items-center gap-3 sm:gap-4 border border-[#D8AE56]/40 shadow-sm text-left">
                    <div className="w-10 h-10 rounded-full bg-[#D8AE56]/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#9B7018] text-[22px]">event_available</span>
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-xs sm:text-sm uppercase tracking-wider text-[#9B7018] font-black truncate"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Direct Artist Booking Inquiry
                      </p>
                      <p className="text-xs sm:text-sm text-[#38342D] font-medium">
                        Fill in your details below to check date availability and book Qazi Touqeer for your event.
                      </p>
                    </div>
                  </div>

                  <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                    {/* Row 1: Your Name & Dynamic Organization / College Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2 text-left">
                        <label
                          className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          Your Name <span className="text-[#9B7018] font-black">*</span>
                        </label>
                        <input
                          className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                          placeholder="e.g. Rahul Sharma"
                          required
                          type="text"
                          value={formData.repName}
                          onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2 text-left">
                        <label
                          className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          {orgConfig.label} <span className="text-[#9B7018] font-black">*</span>
                        </label>
                        <input
                          className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                          placeholder={orgConfig.placeholder}
                          required
                          type="text"
                          value={formData.orgName}
                          onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Row 2: Event Date & Time Slot */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2 text-left">
                        <label
                          className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          Event Date <span className="text-[#9B7018] font-black">*</span>
                        </label>
                        <input
                          className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                          required
                          type="date"
                          value={formData.perfDate}
                          onChange={(e) => setFormData({ ...formData, perfDate: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2 text-left">
                        <label
                          className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          Preferred Time Slot <span className="text-[#9B7018] font-black">*</span>
                        </label>
                        <select
                          className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-bold text-sm sm:text-base border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none cursor-pointer"
                          required
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        >
                          <option value="Evening Prime (7:00 PM – 10:00 PM)">Evening Prime (7:00 PM – 10:00 PM)</option>
                          <option value="Night Headline (8:00 PM – 11:00 PM)">Night Headline (8:00 PM – 11:00 PM)</option>
                          <option value="Late Night (10:00 PM – 1:00 AM)">Late Night (10:00 PM – 1:00 AM)</option>
                          <option value="Sunset Show (4:00 PM – 7:00 PM)">Sunset Show (4:00 PM – 7:00 PM)</option>
                          <option value="Afternoon / Day Fest (12:00 PM – 4:00 PM)">Afternoon / Day Fest (12:00 PM – 4:00 PM)</option>
                          <option value="Flexible / Full Day Schedule">Flexible / Full Day Schedule</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: City / Venue Location (with Auto-Detect GPS) & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2 text-left">
                        <div className="flex items-center justify-between">
                          <label
                            className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                            style={{ fontFamily: 'Space Grotesk, monospace' }}
                          >
                            City / Venue Location <span className="text-[#9B7018] font-black">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={handleAutoDetectLocation}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9B7018] hover:text-[#B68938] transition-colors cursor-pointer"
                            title="Auto-detect city, state and country via GPS"
                          >
                            <span className={`material-symbols-outlined text-[16px] ${detectingLocation ? 'animate-spin' : ''}`}>
                              {detectingLocation ? 'sync' : 'my_location'}
                            </span>
                            <span>{detectingLocation ? 'Detecting...' : 'Auto-Detect (GPS)'}</span>
                          </button>
                        </div>
                        <input
                          className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                          placeholder="e.g. Mumbai, Maharashtra, India"
                          list="city-suggestions"
                          required
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                        <datalist id="city-suggestions">
                          <option value="New Delhi, Delhi, India" />
                          <option value="Mumbai, Maharashtra, India" />
                          <option value="Bengaluru, Karnataka, India" />
                          <option value="Noida, Uttar Pradesh, India" />
                          <option value="Greater Noida, Uttar Pradesh, India" />
                          <option value="Gurugram, Haryana, India" />
                          <option value="Pune, Maharashtra, India" />
                          <option value="Jaipur, Rajasthan, India" />
                          <option value="Ahmedabad, Gujarat, India" />
                          <option value="Kolkata, West Bengal, India" />
                          <option value="Hyderabad, Telangana, India" />
                          <option value="Chennai, Tamil Nadu, India" />
                          <option value="Chandigarh, Punjab, India" />
                          <option value="Lucknow, Uttar Pradesh, India" />
                          <option value="Goa, India" />
                          <option value="Dubai, United Arab Emirates" />
                          <option value="London, United Kingdom" />
                        </datalist>
                      </div>

                      <div className="space-y-2 text-left">
                        <label
                          className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          Phone / WhatsApp Number <span className="text-[#9B7018] font-black">*</span>
                        </label>
                        <input
                          className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                          placeholder="+91 98765 43210"
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Row 4: Email & Expected Guests (Simple Input Field) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                      <div className="space-y-2 text-left">
                        <label
                          className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          Email Address <span className="text-[#9B7018] font-black">*</span>
                        </label>
                        <input
                          className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                          placeholder="yourname@gmail.com"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      {/* SIMPLE EXPECTED GUESTS INPUT FIELD */}
                      <div className="space-y-2 text-left">
                        <label
                          className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          Expected Guests <span className="text-[#9B7018] font-black">*</span>
                        </label>
                        <input
                          className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                          placeholder="e.g. 1500"
                          required
                          type="number"
                          min="1"
                          value={formData.expectedGuests}
                          onChange={(e) => setFormData({ ...formData, expectedGuests: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Row 5: Preferred Currency */}
                    <div className="space-y-2 text-left">
                      <label
                        className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Preferred Currency
                      </label>
                      <select
                        className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-bold text-sm sm:text-base border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none cursor-pointer"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value="INR">INR (₹) - Indian Rupee</option>
                        <option value="USD">USD ($) - US Dollar</option>
                        <option value="AED">AED (د.إ) - UAE Dirham</option>
                        <option value="GBP">GBP (£) - British Pound</option>
                      </select>
                    </div>

                    {/* Row 6: Event Details or Special Requests */}
                    <div className="space-y-2 text-left">
                      <label
                        className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        <span>Event Details or Special Requests</span>
                        <span className="text-[#7A7366] text-xs font-semibold lowercase">(optional)</span>
                      </label>
                      <textarea
                        className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-medium text-sm sm:text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                        placeholder="Tell us about the event timing, stage setup, song preferences, or any other requirements..."
                        rows="3"
                        value={formData.techNotes}
                        onChange={(e) => setFormData({ ...formData, techNotes: e.target.value })}
                      ></textarea>
                    </div>

                    {/* Row 7: Submit Button */}
                    <div className="pt-4 space-y-4">
                      <button
                        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] hover:opacity-95 text-[#1A1203] text-sm sm:text-base uppercase font-black tracking-widest transition-all duration-300 shadow-[0_8px_30px_rgba(216,174,86,0.45)] hover:shadow-[0_12px_40px_rgba(216,174,86,0.65)] flex items-center justify-center gap-2.5 cursor-pointer group border-none hover:scale-[1.01]"
                        type="submit"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        <span className="material-symbols-outlined text-[22px] transition-transform duration-300 group-hover:scale-110">
                          send
                        </span>
                        <span>SUBMIT BOOKING INQUIRY</span>
                      </button>

                      <div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[#443E35] text-xs uppercase tracking-wider font-bold text-center pt-1"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#9B7018] text-[18px]">verified</span>
                          <span>Direct Management Booking</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#9B7018] text-[18px]">lock</span>
                          <span>100% Confidential &amp; Secure</span>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Feedback Toast Modal Container */}
                  {showModal && (
                    <div className="absolute inset-0 bg-[#131315]/95 backdrop-blur-md p-6 sm:p-8 flex flex-col items-center justify-center text-center z-20">
                      <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center text-primary mb-4 shadow-[0_0_32px_rgba(212,175,55,0.4)]">
                        <span className="material-symbols-outlined text-[36px]">verified</span>
                      </div>
                      <span
                        className="text-[11px] uppercase tracking-widest text-primary mb-1 font-semibold"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Inquiry Received
                      </span>
                      <h3
                        className="font-headline-md text-2xl text-white mb-2 font-bold"
                        style={{ fontFamily: 'Bodoni Moda, serif' }}
                      >
                        Thank You!
                      </h3>
                      <p className="font-body-md text-sm text-gray-300 max-w-md mb-6 leading-relaxed">
                        We have received your booking inquiry for <strong className="text-white">{activeCardInfo?.title || 'Qazi Touqeer'}</strong> (Ref: <span className="text-primary font-bold">{bookingHash}</span>). Our management team will check availability and contact you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-6 py-2.5 rounded-full bg-primary text-[#1A1203] hover:opacity-90 text-xs uppercase font-bold cursor-pointer transition-opacity"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ContactFooter />
    </div>
  );
}

export default function BookMePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#131315] text-center pt-32 text-primary">Loading Dossier...</div>}>
      <BookMeContent />
    </Suspense>
  );
}
