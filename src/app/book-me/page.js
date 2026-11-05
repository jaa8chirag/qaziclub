'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ContactFooter from '@/components/ContactFooter';

function BookMeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || '';

  const [selectedCat, setSelectedCat] = useState(initialCat);
  const currency = 'INR'; // Locked to India (INR / ₹)
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
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
      id: 'Brand Collaborations & Endorsements',
      num: '01',
      title: 'Brand Collaborations & Endorsements',
      category: 'Brand Collaboration',
      tag: 'Brand Ambassador',
      audience: 'Pan-India & Global Reach',
      desc: 'Strategic brand ambassadorships, TV commercial shoots, digital ad campaigns, celebrity product launches, and viral social media promotions.',
      specs: ['TVC & Digital Video Ad Campaigns', 'Official Brand Ambassador Rights', 'Product Launch Event Presence', 'Social Media Collabs & Viral Reels'],
      image: '/images/cards/card-01-brand-collab.jpg',
    },
    {
      id: 'Live Concerts & Live Shows',
      num: '02',
      title: 'Live Concerts & Live Shows',
      category: 'Live Concerts & Live Shows',
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
      id: 'Retro Bollywood',
      num: '04',
      title: 'Retro Bollywood',
      category: 'Retro Bollywood',
      tag: 'Timeless Classics',
      audience: '300 – 2,500+ Guests',
      desc: 'Iconic Retro Bollywood hits, high-energy dance anthems, vintage golden era classics, and electrifying crowd singing.',
      specs: ['Retro Bollywood Vocal Set', 'Golden Era Classics & Mashups', 'Interactive Crowd Anthems', 'Full Stage Live Sound Sync'],
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
      id: 'Corporate Events',
      num: '06',
      title: 'Corporate Events',
      category: 'Corporate Events',
      tag: 'Enterprise Prestige',
      audience: '500 – 5,000+ Delegates',
      desc: 'Annual enterprise celebrations, leadership summits, high-profile awards galas, and brand launch headliners.',
      specs: ['Sophisticated Thematic Repertoire', 'Brand Message Alignment', 'Full Corporate Billing & GST', 'Punctual Stage Run-Order'],
      image: '/images/cards/card-06-corporate-gala.jpg',
    },
    {
      id: 'College Fest',
      num: '07',
      title: 'College Fest',
      category: 'College Fest',
      tag: 'Campus Headliner',
      audience: '1,500 – 25,000+ Students',
      desc: 'High-octane vocal sets, crowd anthems, campus festival headlining, and unforgettable youth engagement.',
      specs: ['90-Min Live Concert Set', 'Sing-along Crowd Anthems', 'Student Council VIP Meet', 'Full Rider Tech Clearance'],
      image: '/images/cards/card-07-college-fest.jpg',
    },
  ];

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      if (cat.toLowerCase().includes('fest') || cat.toLowerCase().includes('college')) {
        setSelectedCat('College Fest');
      } else if (cat.toLowerCase().includes('concert') || cat.toLowerCase().includes('show') || cat.toLowerCase().includes('live') || cat.toLowerCase().includes('arena') || cat.toLowerCase().includes('tour')) {
        setSelectedCat('Live Concerts & Live Shows');
      } else if (cat.toLowerCase().includes('wedding') || cat.toLowerCase().includes('milestone') || cat.toLowerCase().includes('royal')) {
        setSelectedCat('Royal Milestones & VIP');
      } else if (cat.toLowerCase().includes('retro') || cat.toLowerCase().includes('bollywood') || cat.toLowerCase().includes('club') || cat.toLowerCase().includes('party')) {
        setSelectedCat('Retro Bollywood');
      } else if (cat.toLowerCase().includes('meet') || cat.toLowerCase().includes('vip')) {
        setSelectedCat('Meet Qazi in Person');
        setFormData((prev) => ({
          ...prev,
          timeSlot: '1 Hour Meeting',
          expectedGuests: '1',
          city: 'Delhi',
        }));
      } else if (cat.toLowerCase().includes('brand') || cat.toLowerCase().includes('collab')) {
        setSelectedCat('Brand Collaborations & Endorsements');
      } else if (cat.toLowerCase().includes('corporate')) {
        setSelectedCat('Corporate Events');
      }

      // Smooth scroll to booking form on mobile & desktop
      setTimeout(() => {
        const formElement = document.getElementById('booking-form');
        if (formElement) {
          const navHeight = 90;
          const y = formElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 350);
    }
  }, [searchParams]);

  const handleSelectCard = (card) => {
    setSelectedCat(card.id);
    if (card.id === 'Meet Qazi in Person') {
      setFormData((prev) => ({
        ...prev,
        timeSlot: '1 Hour Meeting',
        expectedGuests: '1',
        city: 'Delhi',
      }));
    } else if (formData.timeSlot.includes('Hour')) {
      setFormData((prev) => ({
        ...prev,
        timeSlot: 'Evening Prime (7:00 PM – 10:00 PM)',
      }));
    }
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      const navHeight = 90;
      const y = formElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
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
      case 'College Fest':
        return {
          label: 'College / University Name',
          placeholder: 'e.g. IIT Bombay, BITS Pilani, Delhi University',
        };
      case 'Live Concerts & Live Shows':
        return {
          label: 'Concert / Arena / Tour Name',
          placeholder: 'e.g. Sunburn Arena, Mumbai Stadium Festival',
        };
      case 'Royal Milestones & VIP':
        return {
          label: 'Couple / Family / Wedding Name',
          placeholder: 'e.g. Sharma & Verma Royal Sangeet',
        };
      case 'Retro Bollywood':
        return {
          label: 'Venue / Club / Event Name',
          placeholder: 'e.g. Retro Bollywood Gala, Grand Lounge Mumbai',
        };
      case 'Meet Qazi in Person':
        return {
          label: 'Client / Occasion Name',
          placeholder: 'e.g. Private VIP Meeting / Masterclass',
        };
      case 'Corporate Events':
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

  const handleGoBack = () => {
    setShowModal(false);
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  // Auto-redirect back countdown after submit
  useEffect(() => {
    if (!showModal) return;
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleGoBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hash = 'QAZI-ESCROW-' + Math.floor(1000 + Math.random() * 9000);
    setBookingHash(hash);
    setShowModal(true);

    try {
      await fetch('/api/inquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: `Booking: ${selectedCat || 'General'}`,
          name: formData.repName,
          org_name: selectedCat === 'Meet Qazi in Person' ? '' : formData.orgName,
          category: selectedCat || 'Booking Inquiry',
          event_date: formData.perfDate,
          slot_or_duration: formData.timeSlot,
          city: formData.city,
          phone: formData.phone,
          email: formData.email,
          expected_guests: selectedCat === 'Meet Qazi in Person' ? '1-on-1 VIP Interaction' : formData.expectedGuests,
          budget: currency,
          message: formData.techNotes || formData.notes || '',
        }),
      });
    } catch (err) {
      console.warn('CRM API submission notice:', err);
    }

    // Reset form so submitted details are cleared
    setFormData({
      repName: '',
      orgName: '',
      perfDate: '',
      timeSlot: selectedCat === 'Meet Qazi in Person' ? '1 Hour Meeting' : 'Evening Prime (7:00 PM – 10:00 PM)',
      city: selectedCat === 'Meet Qazi in Person' ? 'Delhi' : '',
      phone: '',
      email: '',
      expectedGuests: selectedCat === 'Meet Qazi in Person' ? '1' : '',
      techNotes: '',
    });
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
                      className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group cursor-pointer border-2 active:scale-[0.99] ${
                        isLastCard ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
                      } ${
                        isSelected
                          ? 'border-[#D8AE56] ring-4 ring-[#D8AE56]/30 shadow-[0_15px_45px_rgba(216,174,86,0.35)] -translate-y-2'
                          : 'border-[#E6DFD1] hover:border-[#D8AE56] shadow-[0_10px_30px_rgba(20,19,18,0.05)] hover:shadow-[0_20px_45px_rgba(182,137,56,0.22)] hover:-translate-y-1'
                      }`}
                    >
                      <div>
                        {/* Card Image */}
                        <div className="relative w-full aspect-[840/460] overflow-hidden bg-[#111111]">
                          <img
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            alt={item.title}
                            src={item.image}
                          />
                          {isSelected && (
                            <div className="absolute top-3 right-3 bg-[#111111]/90 backdrop-blur-md border border-[#D8AE56] px-3 py-1 rounded-full text-xs font-bold text-[#F3D084] flex items-center gap-1 shadow-md z-10">
                              <span className="material-symbols-outlined text-sm text-[#D8AE56]">check_circle</span>
                              <span>Selected</span>
                            </div>
                          )}
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
                    onClick = {(e) => {
                  e.stopPropagation();
                handleSelectCard(item);
                          }}
                className={`w-full py-3.5 px-5 rounded-xl text-sm uppercase font-extrabold tracking-wider transition-all flex items-center justify-between border-2 cursor-pointer active:scale-[0.98] ${isSelected
                    ? 'bg-gradient-to-r from-[#D8AE56] to-[#B68938] text-[#1A1203] border-[#D8AE56] shadow-md'
                              : 'bg-[#F6F2E9] hover:bg-gradient-to-r hover:from-[#D8AE56] hover:to-[#B68938] hover:text-[#261B04] text-[#111111] border-[#DDD5C5]'
                          }`}
                style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                <span>{isSelected ? '✓ Selected — Book Now' : 'Book Now'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </button>
            </div>
          </div>
          );
                })}
        </div>
    </div>

            {/* ========================================================================= */ }
  {/* 2. THE MASTER BOOKING FORM & ARTIST DOSSIER (ANCHOR: #booking-form)        */ }
  {/* ========================================================================= */ }
    <div id="booking-form" className="pt-6 scroll-mt-24">
      {/* Line explaining the form */}
      <div className="mb-6 text-center px-2">
        <p className="text-base md:text-lg text-[#191714] font-semibold">
          {selectedCat && activeCardInfo ? (
            selectedCat === 'Meet Qazi in Person' ? (
              <>
                Please fill in your details below to{' '}
                <strong className="text-[#9B7018] font-black">Meet Qazi in Person</strong>:
              </>
            ) : (
              <>
                Please fill in your details below to book Qazi for{' '}
                <strong className="text-[#9B7018] font-black">{activeCardInfo.title}</strong>:
              </>
            )
          ) : (
            <>
              Please select an event format above or fill in your details below to book{' '}
              <strong className="text-[#9B7018] font-black">Qazi Touqeer</strong>:
            </>
          )}
        </p>
      </div>

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
            {/* Event Format / Category Selector */}
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <label
                  className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Selected Event Category <span className="text-[#9B7018] font-black">*</span>
                </label>
                <span className="text-[11px] font-semibold text-[#87672D]">
                  (Choose or change category)
                </span>
              </div>
              <select
                className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-bold text-sm sm:text-base border-2 border-[#D8AE56] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none cursor-pointer"
                value={selectedCat}
                onChange={(e) => {
                  const found = eventCards.find((c) => c.id === e.target.value);
                  if (found) handleSelectCard(found);
                }}
              >
                {eventCards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 1: Your Name & Dynamic Organization / College Name */}
            <div className={`grid grid-cols-1 ${selectedCat !== 'Meet Qazi in Person' ? 'md:grid-cols-2' : ''} gap-5 sm:gap-6`}>
              <div className="space-y-2 text-left">
                <label
                  className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Your Name <span className="text-[#9B7018] font-black">*</span>
                </label>
                <input
                  className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                  placeholder="e.g. Rahul Sharma"
                  required
                  type="text"
                  value={formData.repName}
                  onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                />
              </div>

              {selectedCat !== 'Meet Qazi in Person' && (
                <div className="space-y-2 text-left">
                  <label
                    className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    {orgConfig.label} <span className="text-[#9B7018] font-black">*</span>
                  </label>
                  <input
                    className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                    placeholder={orgConfig.placeholder}
                    required={selectedCat !== 'Meet Qazi in Person'}
                    type="text"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  />
                </div>
              )}
            </div>

            {/* Row 2: Event Date & Time Slot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="space-y-2 text-left">
                <label
                  className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  {selectedCat === 'Meet Qazi in Person' ? 'Meeting Date' : 'Event Date'} <span className="text-[#9B7018] font-black">*</span>
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
                  {selectedCat === 'Meet Qazi in Person' ? 'Meeting Duration' : 'Preferred Time Slot'} <span className="text-[#9B7018] font-black">*</span>
                </label>
                {selectedCat === 'Meet Qazi in Person' ? (
                  <select
                    className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-bold text-sm sm:text-base border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none cursor-pointer"
                    required
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  >
                    <option value="1 Hour Meeting">1 Hour Meeting</option>
                    <option value="2 Hours Meeting">2 Hours Meeting</option>
                    <option value="3 Hours Meeting">3 Hours Meeting</option>
                    <option value="Half Day / Custom Interaction">Half Day / Custom Interaction</option>
                  </select>
                ) : (
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
                )}
              </div>
            </div>

            {/* Row 3: City / Venue Location (with Auto-Detect GPS) & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="space-y-2 text-left">
                {selectedCat === 'Meet Qazi in Person' ? (
                  <>
                    <label
                      className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Location (Delhi) <span className="text-[#9B7018] font-black">*</span>
                    </label>
                    <select
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-bold text-sm sm:text-base border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none cursor-pointer"
                      required
                      value={formData.city || 'Delhi'}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      <option value="Delhi">Delhi</option>
                    </select>
                  </>
                ) : (
                  <>
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
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
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
                  </>
                )}
              </div>

              <div className="space-y-2 text-left">
                <label
                  className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Phone / WhatsApp Number <span className="text-[#9B7018] font-black">*</span>
                </label>
                <input
                  className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                  placeholder="+91 98765 43210"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Row 4: Email & Expected Guests */}
            <div className={`grid grid-cols-1 ${selectedCat !== 'Meet Qazi in Person' ? 'md:grid-cols-2' : ''} gap-5 sm:gap-6`}>
              <div className="space-y-2 text-left">
                <label
                  className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Email Address <span className="text-[#9B7018] font-black">*</span>
                </label>
                <input
                  className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                  placeholder="yourname@gmail.com"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {selectedCat !== 'Meet Qazi in Person' && (
                <div className="space-y-2 text-left">
                  <label
                    className="block text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Expected Guests <span className="text-[#9B7018] font-black">*</span>
                  </label>
                  <input
                    className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-sm sm:text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                    placeholder="e.g. 1500"
                    required={selectedCat !== 'Meet Qazi in Person'}
                    type="number"
                    min="1"
                    value={formData.expectedGuests}
                    onChange={(e) => setFormData({ ...formData, expectedGuests: e.target.value })}
                  />
                </div>
              )}
            </div>

            {/* Row 6: Event Details or Special Requests */}
            <div className="space-y-2 text-left">
              <label
                className="flex items-center justify-between text-xs sm:text-sm font-bold text-[#141210] uppercase tracking-wider text-left"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                {selectedCat === 'Meet Qazi in Person' ? (
                  <>
                    <span>
                      Let us know the actual reason to meet <span className="text-[#9B7018] font-black">*</span>
                    </span>
                    <span className="text-[#9B7018] text-xs font-bold lowercase">(mandatory)</span>
                  </>
                ) : (
                  <>
                    <span>Event Details or Special Requests</span>
                    <span className="text-[#7A7366] text-xs font-semibold lowercase">(optional)</span>
                  </>
                )}
              </label>
              <textarea
                className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-medium text-sm sm:text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                placeholder={
                  selectedCat === 'Meet Qazi in Person'
                    ? "Please describe the genuine purpose, topic, or reason to meet Qazi in person..."
                    : "Tell us about the event timing, stage setup, song preferences, or any other requirements..."
                }
                required={selectedCat === 'Meet Qazi in Person'}
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

          {/* Clean, Normal-sized Thank You Modal with Centered Backdrop */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl border-2 border-[#D8AE56] relative">
                <div className="w-14 h-14 rounded-full bg-[#FAF5EC] border-2 border-[#D8AE56] text-[#9B7018] flex items-center justify-center mx-auto shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>

                <div className="space-y-1">
                  <span
                    className="text-[11px] uppercase tracking-widest text-[#9B7018] font-extrabold block"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Inquiry Received
                  </span>
                  <h3
                    className="text-2xl text-[#111111] font-bold"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    Thank You!
                  </h3>
                </div>

                <p className="text-sm text-[#443E35] leading-relaxed">
                  We have received your booking inquiry for <strong className="text-[#111111]">{activeCardInfo?.title || 'Qazi Touqeer'}</strong>.
                  Our management team will check availability and contact you shortly.
                </p>

                <div className="inline-block px-3.5 py-1 rounded-full bg-[#FAF8F5] border border-[#DDD5C5] text-xs font-bold text-[#87672D]">
                  Booking Ref: <span className="text-[#111111] font-mono font-black">{bookingHash}</span>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] text-[#1A1203] font-black text-xs uppercase tracking-widest shadow-md hover:scale-[1.02] transition-transform cursor-pointer flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Go Back ({countdown}s)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      router.push('/');
                    }}
                    className="w-full py-2.5 px-6 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFE6] text-[#141312] font-bold text-xs uppercase tracking-wider border border-[#DDD5C5] transition-colors cursor-pointer flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    <span className="material-symbols-outlined text-[18px]">home</span>
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
        </div >
      </main >

    <ContactFooter />
    </div >
  );
}

export default function BookMePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#131315] text-center pt-32 text-primary">Loading Dossier...</div>}>
      <BookMeContent />
    </Suspense>
  );
}
