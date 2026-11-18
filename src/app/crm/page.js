'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

const DEFAULT_DUMMY_LEADS = [
  {
    id: 101,
    source: 'Booking: College Fest',
    name: 'Aarav Mehta',
    email: 'cultural.head@iitbombay.org',
    phone: '+91 98201 44521',
    city: 'Mumbai, Maharashtra',
    category: 'College Fest',
    event_date: '2026-12-22',
    slot_or_duration: '90-Min Concert (Evening Prime)',
    expected_guests: '18,000+ Students',
    budget: 'Premium Campus Headliner',
    message: 'Entity/Organization: IIT Bombay Mood Indigo Cultural Council\n\nLooking to book Qazi Touqeer as our celebrity headliner for Star Night on 22nd December 2026. Required: full 90-min Bollywood & Punjabi rock explosive set with live band.',
    status: 'new',
    notes: 'Awaiting stage layout blueprint from student committee.',
    ip_address: '103.21.124.5',
    created_at: '2026-11-18 10:15:00',
  },
  {
    id: 102,
    source: 'Booking: Royal Milestones & VIP',
    name: 'Vikramaditya Singhania',
    email: 'singhania.events@luxuryweddings.in',
    phone: '+91 98110 99882',
    city: 'Udaipur, Rajasthan',
    category: 'Royal Milestones & Luxury Weddings',
    event_date: '2027-01-14',
    slot_or_duration: 'Royal Sangeet Gala (8:30 PM - 11:30 PM)',
    expected_guests: '1,200 VIP Guests',
    budget: 'Luxury Palace Tier',
    message: 'Entity/Organization: The Grand Palace Resort Udaipur\n\nOpulent Sangeet night performance request for high-profile business family wedding. Need romantic sufi dedications + high energy Bollywood dance tracks with custom entry.',
    status: 'in-progress',
    notes: 'Initial quote shared; meeting scheduled with family office in Mumbai next week.',
    ip_address: '122.161.45.18',
    created_at: '2026-11-17 16:40:00',
  },
  {
    id: 103,
    source: 'Booking: Brand Collaborations & Endorsements',
    name: 'Pooja Deshmukh',
    email: 'p.deshmukh@ogilvy-talent.com',
    phone: '+91 99302 77410',
    city: 'Mumbai, Maharashtra',
    category: 'Brand Collaborations & Endorsements',
    event_date: '2026-12-10',
    slot_or_duration: '2-Day Commercial Video Shoot + Digital Rights',
    expected_guests: 'Pan-India Campaign',
    budget: 'Tier-1 Celebrity Endorsement',
    message: 'Entity/Organization: Ogilvy & Mather India\n\nDirect brand ambassador inquiry for youth beverage brand launch. Involves 2 digital TVC ad shoots, viral reels, and attendance at the Mumbai flagship launch event.',
    status: 'closed',
    notes: 'Contract signed; shoot schedule locked for Dec 10-11 at Film City Mumbai.',
    ip_address: '14.143.34.90',
    created_at: '2026-11-16 14:20:00',
  },
  {
    id: 104,
    source: 'Booking: Live Concerts & Live Shows',
    name: 'Zayd Al-Mansoor',
    email: 'zayd@redcarpetdubai.ae',
    phone: '+971 50 123 4567',
    city: 'Dubai, UAE',
    category: 'Live Concerts & Live Shows',
    event_date: '2027-02-28',
    slot_or_duration: 'Arena Public Mega Concert (8:00 PM)',
    expected_guests: '8,500+ Fans',
    budget: 'International Tour Package',
    message: 'Entity/Organization: Red Carpet Events Dubai\n\nHeadlining act for Bollywood Music Explosion Festival at Coca-Cola Arena, Dubai. Flight, 5-star hospitality, and visa logistics cleared on our end.',
    status: 'new',
    notes: 'Tech rider under review by Dubai arena sound engineers.',
    ip_address: '94.200.12.33',
    created_at: '2026-11-15 19:10:00',
  },
  {
    id: 105,
    source: 'Booking: Meet Qazi in Person',
    name: 'Kavita Rathore',
    email: 'kavita.rathore@gmail.com',
    phone: '+91 97171 22334',
    city: 'Noida, Uttar Pradesh',
    category: 'Meet Qazi in Person',
    event_date: '2026-12-05',
    slot_or_duration: '1 Hour VIP Meeting',
    expected_guests: '1-on-1 VIP Interaction',
    budget: 'Exclusive Fan Package',
    message: 'Huge fan since Fame Gurukul days! Want to arrange an exclusive private 1-on-1 meet & greet with acoustic unplugged session on my 30th birthday in Delhi-NCR.',
    status: 'closed',
    notes: 'Payment received in full; venue confirmed at Wave One Noida studio.',
    ip_address: '49.36.88.102',
    created_at: '2026-11-14 11:30:00',
  },
  {
    id: 106,
    source: 'Booking: Live Concerts & Live Shows',
    name: 'Rohan Kapoor',
    email: 'rohan@perceptdmark.com',
    phone: '+91 98200 88123',
    city: 'Vagator, Goa',
    category: 'Live Concerts & Live Shows',
    event_date: '2026-12-30',
    slot_or_duration: 'Sunset Prime Stage (7:00 PM - 8:30 PM)',
    expected_guests: '12,000+ Music Lovers',
    budget: 'Festival Headliner Tier',
    message: 'Entity/Organization: Sunburn Beach Arena\n\nCo-headlining artist invite for New Year Eve Warm-up Concert at Vagator Beach. High BPM Bollywood fusion set required with live brass & percussion section.',
    status: 'in-progress',
    notes: 'Flight bookings from Mumbai to Goa being coordinated with management.',
    ip_address: '115.114.78.20',
    created_at: '2026-11-13 18:45:00',
  },
  {
    id: 107,
    source: 'Booking: International Showcase',
    name: 'Dr. Alistair Sterling',
    email: 'events@ukindiacouncil.org.uk',
    phone: '+44 7700 900543',
    city: 'London, United Kingdom',
    category: 'International Arena Showcase',
    event_date: '2027-03-15',
    slot_or_duration: '2-Hour Royal Gala Performance',
    expected_guests: '4,000 Diaspora Guests',
    budget: 'UK Embassy & Cultural Trust Fund',
    message: 'Entity/Organization: UK-India Cultural Exchange Trust\n\nInviting Qazi Touqeer to headline the Indo-British Youth Festival at Central Hall Westminster, London. Full orchestra accompaniment arranged.',
    status: 'new',
    notes: 'Tier-5 visa formal sponsorship letter drafted.',
    ip_address: '82.165.197.1',
    created_at: '2026-11-12 15:20:00',
  },
  {
    id: 108,
    source: 'Booking: Private Club Gala',
    name: 'Ananya Mehra',
    email: 'president.cultural@delhigymkhana.com',
    phone: '+91 98101 55678',
    city: 'New Delhi, Delhi',
    category: 'Private Club & Corporate Gala',
    event_date: '2027-01-26',
    slot_or_duration: 'Republic Day Members Gala (8:00 PM)',
    expected_guests: '900 Club Members & Diplomats',
    budget: 'Exclusive Heritage Club Package',
    message: 'Entity/Organization: Delhi Gymkhana Club\n\nCelebrity singer performance for annual Republic Day Heritage Gala Dinner. Mix of patriotic anthems, sufi classics, and Bollywood retro hits.',
    status: 'in-progress',
    notes: 'Acoustic rider shared; sound check scheduled for 4 PM on event day.',
    ip_address: '182.72.68.10',
    created_at: '2026-11-11 12:10:00',
  },
  {
    id: 109,
    source: 'Booking: Corporate Mega Event',
    name: 'Harshavardhan Reddy',
    email: 'hr.events@telanganatechpark.in',
    phone: '+91 94400 33456',
    city: 'Hyderabad, Telangana',
    category: 'Corporate Mega Event',
    event_date: '2027-02-12',
    slot_or_duration: 'Annual IT Excellence Awards (7:30 PM)',
    expected_guests: '3,500 Tech Professionals',
    budget: 'Corporate Headliner',
    message: 'Entity/Organization: HITEC City Tech Association\n\nCelebrity headliner musical night closing our 3-day tech convention at HITEX Exhibition Centre. Need energetic motivational anthems and chartbuster hits.',
    status: 'new',
    notes: 'Initial contact made; proposal review with CEO committee on Friday.',
    ip_address: '117.218.42.19',
    created_at: '2026-11-10 17:05:00',
  },
  {
    id: 110,
    source: 'Booking: Royal Milestones & VIP',
    name: 'Simran Kaur Sandhu',
    email: 'simran.sandhu@foresthillresort.com',
    phone: '+91 98888 77654',
    city: 'Chandigarh, Punjab',
    category: 'Royal Milestones & Luxury Weddings',
    event_date: '2026-12-18',
    slot_or_duration: 'Big Fat Punjabi Sangeet (9:00 PM - 12:00 AM)',
    expected_guests: '1,500 Guests',
    budget: 'VIP Destination Wedding Tier',
    message: 'Entity/Organization: Forest Hill Golf & Country Club Resort\n\nHigh voltage celebrity performance for destination wedding sangeet. Looking for Qazi Touqeer live singing with dhol players and DJ interaction.',
    status: 'closed',
    notes: 'Advance token cleared; green room hospitality and luxury transport locked.',
    ip_address: '106.215.89.44',
    created_at: '2026-11-09 20:30:00',
  },
];

export default function CRMPage() {
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Advanced CRM: View Mode, Sorting, Pagination, Quick Copy
  const [viewMode, setViewMode] = useState('compact'); // 'compact' | 'table'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'event_asc' | 'event_desc' | 'name_asc'
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [copiedKey, setCopiedKey] = useState(null);
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const h = window.location.hostname;
      setIsLocalhost(h === 'localhost' || h === '127.0.0.1' || h.startsWith('192.168.'));
    }
  }, []);

  // Selected lead for detail modal & admin internal notes
  const [activeLead, setActiveLead] = useState(null);
  const [leadNotes, setLeadNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesFeedback, setNotesFeedback] = useState('');

  // -------------------------------------------------------------
  // HERO SECTION LIVE EDITOR STATE & HANDLERS
  // -------------------------------------------------------------
  const [heroModalOpen, setHeroModalOpen] = useState(false);
  const [heroTab, setHeroTab] = useState('texts'); // 'texts' | 'slides'
  const [heroLoading, setHeroLoading] = useState(false);
  const [heroSaving, setHeroSaving] = useState(false);
  const [heroSaveSuccess, setHeroSaveSuccess] = useState('');
  const [heroError, setHeroError] = useState('');
  const [uploadingSlideIdx, setUploadingSlideIdx] = useState(null);

  const defaultHeroState = useMemo(() => ({
    texts: {
      celebrityBadge: 'FAME GURUKUL WINNER • BIGG BOSS PHENOMENON • AFGHAN JALEBI FAME',
      title: 'QAZI TOUQEER',
      rockstarSlogan: '“I am a Rockstar Baby Auuuuu….”',
      tagline: 'ACTOR • PERFORMER • SINGER',
      punchline: '“Awaaz Jo Dil Se Nikle, Stage Pe Aag Laga De”',
      bio: 'The iconic singer and powerhouse stage performer. From winning national hearts to lighting up the stage with Salman Khan, Qazi delivers an adrenaline-fueled arena experience for College Fests, Stadium Arenas, Royal Sangeets, and VIP Events.',
      ctaText: 'BOOK AN EVENT',
      ctaLink: '/book-me',
    },
    slides: [
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
    ],
  }), []);

  const [heroConfig, setHeroConfig] = useState(defaultHeroState);

  const fetchHeroConfig = async () => {
    setHeroLoading(true);
    setHeroError('');
    try {
      const res = await fetch('/api/inquiry.php?action=get_hero');
      const data = await res.json();
      if (data.success && data.data) {
        setHeroConfig({
          texts: { ...defaultHeroState.texts, ...(data.data.texts || {}) },
          slides: Array.isArray(data.data.slides) && data.data.slides.length > 0 ? data.data.slides : defaultHeroState.slides,
        });
      } else {
        const staticRes = await fetch('/data/hero_config.json');
        const staticData = await staticRes.json();
        if (staticData && staticData.texts) {
          setHeroConfig({
            texts: { ...defaultHeroState.texts, ...(staticData.texts || {}) },
            slides: Array.isArray(staticData.slides) && staticData.slides.length > 0 ? staticData.slides : defaultHeroState.slides,
          });
        }
      }
    } catch {
      // Keep current state
    } finally {
      setHeroLoading(false);
    }
  };

  const handleOpenHeroModal = () => {
    setHeroModalOpen(true);
    setHeroSaveSuccess('');
    setHeroError('');
    fetchHeroConfig();
  };

  const handleTextChange = (field, val) => {
    setHeroConfig((prev) => ({
      ...prev,
      texts: { ...prev.texts, [field]: val },
    }));
  };

  const handleSlideChange = (index, field, val) => {
    setHeroConfig((prev) => {
      const nextSlides = [...prev.slides];
      nextSlides[index] = { ...nextSlides[index], [field]: val };
      return { ...prev, slides: nextSlides };
    });
  };

  const handleAddSlide = () => {
    setHeroConfig((prev) => ({
      ...prev,
      slides: [
        {
          id: Date.now(),
          caption: '',
          image: '',
          accentColor: '#D8AE56',
          isNew: true,
        },
        ...prev.slides,
      ],
    }));
  };

  const handleRemoveSlide = (index) => {
    if (heroConfig.slides.length <= 1) {
      alert('At least 1 slide is required in the hero section.');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete Slide ${index + 1}?`)) return;
    setHeroConfig((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index),
    }));
  };

  const handleMoveSlide = (index, direction) => {
    setHeroConfig((prev) => {
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= prev.slides.length) return prev;
      const newSlides = [...prev.slides];
      const temp = newSlides[index];
      newSlides[index] = newSlides[nextIndex];
      newSlides[nextIndex] = temp;
      return { ...prev, slides: newSlides };
    });
  };

  const handleImageUpload = async (slideIndex, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSlideIdx(slideIndex);
    setHeroError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('pin', pin);
      const res = await fetch('/api/inquiry.php?action=upload_hero_image', {
        method: 'POST',
        headers: {
          'X-Admin-Pin': pin,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        handleSlideChange(slideIndex, 'image', data.url);
      } else {
        setHeroError(data.error || 'Failed to upload image');
      }
    } catch {
      setHeroError('Failed to upload image. Please check server connection.');
    } finally {
      setUploadingSlideIdx(null);
    }
  };

  const handleSaveHero = async () => {
    setHeroSaving(true);
    setHeroSaveSuccess('');
    setHeroError('');
    try {
      const res = await fetch(`/api/inquiry.php?action=update_hero&pin=${encodeURIComponent(pin)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Pin': pin,
        },
        body: JSON.stringify({
          action: 'update_hero',
          pin: pin,
          hero: heroConfig,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setHeroSaveSuccess('✓ Hero Section Updated Live!');
        setTimeout(() => setHeroSaveSuccess(''), 4000);
      } else {
        setHeroError(data.error || 'Failed to save changes');
      }
    } catch {
      setHeroError('Could not reach backend API.');
    } finally {
      setHeroSaving(false);
    }
  };

  // Check stored session pin
  useEffect(() => {
    const savedPin = typeof window !== 'undefined' ? sessionStorage.getItem('qazi_crm_pin') : null;
    if (savedPin) {
      setPin(savedPin);
      setAuthenticated(true);
      fetchInquiries(savedPin);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput.trim() === 'qazi2026') {
      const validPin = pinInput.trim();
      setPin(validPin);
      setAuthenticated(true);
      setPinError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('qazi_crm_pin', validPin);
      }
      fetchInquiries(validPin);
    } else {
      setPinError('Invalid Admin PIN. Please enter the correct authorization key.');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPin('');
    setPinInput('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('qazi_crm_pin');
    }
  };

  const fetchInquiries = async (authPin) => {
    setLoading(true);
    setErrorMsg('');

    // 1. Try relative inquiry.php
    try {
      const res = await fetch(`/api/inquiry.php?action=list&pin=${encodeURIComponent(authPin || pin)}`, {
        headers: { 'X-Admin-Pin': authPin || pin },
      });
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setInquiries(data.data);
          if (typeof window !== 'undefined') {
            localStorage.setItem('qazi_crm_leads', JSON.stringify(data.data));
          }
          setLastRefreshed(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Relative inquiry.php fetch failed', e);
    }

    // 2. Try localhost:8002 PHP server if running locally
    try {
      const resPhp = await fetch(`http://localhost:8002/api/inquiry.php?action=list&pin=${encodeURIComponent(authPin || pin)}`, {
        headers: { 'X-Admin-Pin': authPin || pin },
      });
      const dataPhp = await resPhp.json();
      if (dataPhp.success && Array.isArray(dataPhp.data) && dataPhp.data.length > 0) {
        setInquiries(dataPhp.data);
        if (typeof window !== 'undefined') {
          localStorage.setItem('qazi_crm_leads', JSON.stringify(dataPhp.data));
        }
        setLastRefreshed(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn('Port 8002 PHP fetch failed', e);
    }

    // 3. Try static fallback json file
    try {
      const resFallback = await fetch('/api/data/inquiries_fallback.json');
      const dataFallback = await resFallback.json();
      if (Array.isArray(dataFallback) && dataFallback.length > 0) {
        setInquiries(dataFallback);
        if (typeof window !== 'undefined') {
          localStorage.setItem('qazi_crm_leads', JSON.stringify(dataFallback));
        }
        setLastRefreshed(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn('Static fallback json fetch failed', e);
    }

    // 4. Try localStorage or use DEFAULT_DUMMY_LEADS (ONLY in local development environment)
    const isLocal =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.startsWith('192.168.'));

    if (isLocal) {
      let localData = null;
      try {
        const saved = typeof window !== 'undefined' ? localStorage.getItem('qazi_crm_leads') : null;
        if (saved) localData = JSON.parse(saved);
      } catch {}

      const finalList = localData && localData.length > 0 ? localData : DEFAULT_DUMMY_LEADS;
      setInquiries(finalList);
      if (typeof window !== 'undefined') {
        localStorage.setItem('qazi_crm_leads', JSON.stringify(finalList));
      }
    } else {
      // In production live: clean empty state, no dummy data
      setInquiries([]);
    }

    setLastRefreshed(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setLoading(false);
  };

  const handleLoadDemoData = () => {
    setInquiries(DEFAULT_DUMMY_LEADS);
    if (typeof window !== 'undefined') {
      localStorage.setItem('qazi_crm_leads', JSON.stringify(DEFAULT_DUMMY_LEADS));
    }
    setLastRefreshed(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setCurrentPage(1);
  };

  const handleStatusChange = async (id, newStatus, optionalNotes) => {
    const existing = inquiries.find((i) => i.id === id);
    const notesToSend = optionalNotes !== undefined ? optionalNotes : (existing?.notes || '');
    
    // Immediate state & localStorage update
    setInquiries((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, status: newStatus, notes: notesToSend } : item));
      if (typeof window !== 'undefined') {
        localStorage.setItem('qazi_crm_leads', JSON.stringify(updated));
      }
      return updated;
    });

    if (activeLead && activeLead.id === id) {
      setActiveLead((prev) => ({ ...prev, status: newStatus, notes: notesToSend }));
    }

    try {
      await fetch(`/api/inquiry.php?action=update_status&pin=${encodeURIComponent(pin)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Pin': pin,
        },
        body: JSON.stringify({
          action: 'update_status',
          pin: pin,
          id: id,
          status: newStatus,
          notes: notesToSend,
        }),
      });
    } catch (err) {
      console.warn('Backend status update silent error', err);
    }
  };

  const handleOpenLead = (lead) => {
    setActiveLead(lead);
    setLeadNotes(lead.notes || '');
    setNotesFeedback('');
  };

  const handleSaveNotes = async () => {
    if (!activeLead) return;
    setSavingNotes(true);
    setNotesFeedback('');

    // Immediate state & localStorage update
    setInquiries((prev) => {
      const updated = prev.map((i) => (i.id === activeLead.id ? { ...i, notes: leadNotes } : i));
      if (typeof window !== 'undefined') {
        localStorage.setItem('qazi_crm_leads', JSON.stringify(updated));
      }
      return updated;
    });
    setActiveLead((prev) => ({ ...prev, notes: leadNotes }));
    setNotesFeedback('Notes saved successfully!');
    setTimeout(() => setNotesFeedback(''), 3000);

    try {
      await fetch(`/api/inquiry.php?action=update_status&pin=${encodeURIComponent(pin)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Pin': pin,
        },
        body: JSON.stringify({
          action: 'update_status',
          pin: pin,
          id: activeLead.id,
          status: activeLead.status || 'new',
          notes: leadNotes,
        }),
      });
    } catch (err) {
      console.warn('Backend save notes silent error', err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleCopy = (key, text) => {
    if (!text) return;
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete inquiry #${id}?`)) return;

    // Immediate state & localStorage update
    setInquiries((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('qazi_crm_leads', JSON.stringify(updated));
      }
      return updated;
    });
    if (activeLead && activeLead.id === id) {
      setActiveLead(null);
    }

    try {
      await fetch(`/api/inquiry.php?action=delete&pin=${encodeURIComponent(pin)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Pin': pin,
        },
        body: JSON.stringify({
          action: 'delete',
          pin: pin,
          id: id,
        }),
      });
    } catch (err) {
      console.warn('Backend delete silent error', err);
    }
  };

  const filteredAndSortedInquiries = useMemo(() => {
    const list = inquiries.filter((item) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q));

      // Status
      let matchStatus = true;
      if (selectedStatus !== 'all') {
        const itemStatus = (item.status || 'new').toLowerCase();
        if (selectedStatus === 'in-progress') {
          matchStatus = itemStatus === 'in-progress' || itemStatus === 'in_progress' || itemStatus === 'contacted';
        } else {
          matchStatus = itemStatus === selectedStatus.toLowerCase();
        }
      }

      // Category
      const matchCat =
        selectedCategory === 'all' ||
        (item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        (selectedCategory === 'meet' && item.category && item.category.toLowerCase().includes('meet'));

      return matchSearch && matchStatus && matchCat;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
      if (sortBy === 'oldest') return (a.id || 0) - (b.id || 0);
      if (sortBy === 'event_asc') {
        const da = a.event_date ? new Date(a.event_date).getTime() : 9999999999999;
        const db = b.event_date ? new Date(b.event_date).getTime() : 9999999999999;
        return da - db;
      }
      if (sortBy === 'event_desc') {
        const da = a.event_date ? new Date(a.event_date).getTime() : 0;
        const db = b.event_date ? new Date(b.event_date).getTime() : 0;
        return db - da;
      }
      if (sortBy === 'name_asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      return 0;
    });
  }, [inquiries, searchQuery, selectedStatus, selectedCategory, sortBy]);

  // Reset to page 1 whenever search, status filter, category, sort or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedCategory, sortBy, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedInquiries.length / pageSize) || 1;
  const paginatedInquiries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedInquiries.slice(start, start + pageSize);
  }, [filteredAndSortedInquiries, currentPage, pageSize]);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter((i) => (i.status || 'new').toLowerCase() === 'new').length;
    const inProgressCount = inquiries.filter((i) => {
      const s = (i.status || '').toLowerCase();
      return s === 'in-progress' || s === 'in_progress' || s === 'contacted';
    }).length;
    const closedCount = inquiries.filter((i) => (i.status || '').toLowerCase() === 'closed').length;
    const meetCount = inquiries.filter((i) => (i.category || '').toLowerCase().includes('meet')).length;
    const contactCount = inquiries.filter((i) => (i.source || '').toLowerCase().includes('contact') || (i.source || '').toLowerCase().includes('footer')).length;
    return { total, newCount, inProgressCount, closedCount, meetCount, contactCount };
  }, [inquiries]);

  // Clean phone number for WhatsApp
  const getWhatsAppLink = (phone, name) => {
    if (!phone) return '#';
    let clean = phone.replace(/[^0-9]/g, '');
    if (clean.length === 10) clean = '91' + clean;
    const msg = encodeURIComponent(`Hello ${name || 'Sir/Ma\'am'}, thank you for contacting Qazi Touqeer Management. We received your inquiry regarding performance booking.`);
    return `https://wa.me/${clean}?text=${msg}`;
  };

  // -------------------------------------------------------------
  // AUTHENTICATION SCREEN
  // -------------------------------------------------------------
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0F0E0D] text-[#EAE5D9] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#181614] border-2 border-[#D8AE56]/40 rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D8AE56] to-[#9B7018] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[#141210] text-[36px]">shield_lock</span>
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#D8AE56] font-bold" style={{ fontFamily: 'Space Grotesk, monospace' }}>
              Restricted Desk
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: 'Bodoni Moda, serif' }}>
              QAZI CLUB CRM
            </h1>
            <p className="text-xs text-[#A8A29E]">
              Official Inquiries &amp; Talent Buyer Leads Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs uppercase font-bold text-[#D8AE56] tracking-wider mb-2" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                Enter Admin PIN Key
              </label>
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Authorization PIN..."
                className="w-full bg-[#221F1C] border-2 border-[#38332C] focus:border-[#D8AE56] text-white px-4 py-3.5 rounded-xl text-base tracking-widest outline-none transition-all placeholder:text-[#9A9284]/60 placeholder:font-normal"
              />
              {pinError && <p className="text-red-400 text-xs mt-2 font-medium">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] text-[#1A1203] font-black text-xs uppercase tracking-widest hover:brightness-105 transition-all shadow-[0_4px_20px_rgba(216,174,86,0.35)] cursor-pointer"
              style={{ fontFamily: 'Space Grotesk, monospace' }}
            >
              Unlock CRM Portal
            </button>
          </form>

          <div className="pt-2 border-t border-[#292520] text-center">
            <Link href="/" className="text-xs text-[#A8A29E] hover:text-[#D8AE56] transition-colors inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back to QaziClub.com</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // CRM MAIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0C0B0A] text-[#EAE5D9]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#141210]/95 backdrop-blur-md border-b border-[#292520] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D8AE56] to-[#9B7018] flex items-center justify-center text-[#141210]">
              <span className="material-symbols-outlined text-[22px]">hub</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white flex items-center gap-2" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                <span>QAZI CLUB CRM</span>
                <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-[10px] font-bold uppercase tracking-wider">
                  Live
                </span>
              </h1>
              <p className="text-[11px] text-[#A8A29E]">Artist Queries &amp; Booking Management Desk</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hero Section Live Editor Button */}
            <button
              onClick={handleOpenHeroModal}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] hover:opacity-95 text-xs font-black text-[#141210] uppercase tracking-wider transition-all shadow-[0_2px_12px_rgba(216,174,86,0.35)] cursor-pointer"
              style={{ fontFamily: 'Space Grotesk, monospace' }}
              title="Edit Hero Section Images & Texts"
            >
              <span className="material-symbols-outlined text-[17px]">tune</span>
              <span className="hidden sm:inline">Hero Section Editor</span>
              <span className="inline sm:hidden">Hero Editor</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => fetchInquiries(pin)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#221F1C] hover:bg-[#2B2723] text-xs font-bold text-[#EAE5D9] border border-[#38332C] transition-colors cursor-pointer"
            >
              <span className={`material-symbols-outlined text-[16px] text-[#D8AE56] ${loading ? 'animate-spin' : ''}`}>sync</span>
              <span className="hidden sm:inline">{loading ? 'Syncing...' : 'Refresh'}</span>
            </button>

            {/* Load 10 Demo Leads Button - Only visible in local environment */}
            {isLocalhost && (
              <button
                onClick={handleLoadDemoData}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#221F1C] hover:bg-[#2B2723] text-xs font-bold text-[#F3D084] border border-[#D8AE56]/40 transition-colors cursor-pointer"
                title="Populate 10 Realistic Dummy Leads for Testing (Local Only)"
              >
                <span className="material-symbols-outlined text-[16px] text-[#F3D084]">playlist_add</span>
                <span className="hidden sm:inline">Demo Leads (10)</span>
              </button>
            )}

            {/* Export CSV Button */}
            <a
              href={`/api/inquiry.php?action=export_csv&pin=${encodeURIComponent(pin)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D8AE56] hover:bg-[#F3D084] text-xs font-black text-[#141210] uppercase tracking-wider transition-colors shadow-sm"
              style={{ fontFamily: 'Space Grotesk, monospace' }}
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export CSV</span>
            </a>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#221F1C] hover:bg-red-950/40 text-xs font-bold text-red-400 border border-[#38332C] hover:border-red-900 transition-colors cursor-pointer"
              title="Lock CRM"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* KPI Stats Row - Compact Clickable Quick Filter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div
            onClick={() => setSelectedStatus('all')}
            className={`bg-[#141210] border-2 rounded-xl p-3 sm:p-3.5 cursor-pointer transition-all hover:scale-[1.01] ${
              selectedStatus === 'all'
                ? 'border-[#D8AE56] ring-1 ring-[#D8AE56]/40 shadow-[0_2px_15px_rgba(216,174,86,0.15)] bg-[#1A1713]'
                : 'border-[#292520] hover:border-[#38332C]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  Total Inquiries
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    {stats.total}
                  </span>
                  <span className="text-[10px] text-[#7A7366]">All leads</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#221F1C] border border-[#38332C] flex items-center justify-center text-[#D8AE56]">
                <span className="material-symbols-outlined text-[16px]">folder_open</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedStatus('new')}
            className={`bg-[#141210] border-2 rounded-xl p-3 sm:p-3.5 cursor-pointer transition-all hover:scale-[1.01] ${
              selectedStatus === 'new'
                ? 'border-emerald-400 ring-1 ring-emerald-500/40 shadow-[0_2px_15px_rgba(16,185,129,0.2)] bg-emerald-950/20'
                : 'border-emerald-500/30 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    New
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    {stats.newCount}
                  </span>
                  <span className="text-[10px] text-[#A8A29E]">Fresh leads</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <span className="material-symbols-outlined text-[16px]">mark_email_unread</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedStatus('in-progress')}
            className={`bg-[#141210] border-2 rounded-xl p-3 sm:p-3.5 cursor-pointer transition-all hover:scale-[1.01] ${
              selectedStatus === 'in-progress'
                ? 'border-amber-400 ring-1 ring-amber-500/40 shadow-[0_2px_15px_rgba(245,158,11,0.2)] bg-amber-950/20'
                : 'border-amber-500/30 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    In Progress
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-amber-400" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    {stats.inProgressCount}
                  </span>
                  <span className="text-[10px] text-[#A8A29E]">Follow-up</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <span className="material-symbols-outlined text-[16px]">pending_actions</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedStatus('closed')}
            className={`bg-[#141210] border-2 rounded-xl p-3 sm:p-3.5 cursor-pointer transition-all hover:scale-[1.01] ${
              selectedStatus === 'closed'
                ? 'border-rose-400 ring-1 ring-rose-500/40 shadow-[0_2px_15px_rgba(244,63,94,0.2)] bg-rose-950/20'
                : 'border-rose-500/30 hover:border-rose-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    Closed
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black text-rose-400" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    {stats.closedCount}
                  </span>
                  <span className="text-[10px] text-[#A8A29E]">Resolved</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters, Controls & Density Toolbar */}
        <div className="bg-[#141210] border border-[#292520] rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7366] text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search by client name, email, phone, city, or event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1C1A17] border border-[#332E27] focus:border-[#D8AE56] text-white pl-11 pr-4 py-3 rounded-xl text-sm outline-none placeholder:text-[#9A9284]/60 placeholder:font-normal"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7366] hover:text-white text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Status Filter Buttons with Color Tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {[
                { key: 'all', label: 'All Status' },
                { key: 'new', label: 'New', dot: 'bg-emerald-400', activeClass: 'bg-emerald-600 text-white border-emerald-500' },
                { key: 'in-progress', label: 'In Progress', dot: 'bg-amber-400', activeClass: 'bg-amber-600 text-white border-amber-500' },
                { key: 'closed', label: 'Closed', dot: 'bg-rose-400', activeClass: 'bg-rose-600 text-white border-rose-500' },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSelectedStatus(s.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
                    selectedStatus === s.key
                      ? s.activeClass || 'bg-[#D8AE56] text-[#141210] border-[#D8AE56]'
                      : 'bg-[#1C1A17] text-[#A8A29E] border-[#292520] hover:bg-[#26221E]'
                  }`}
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  {s.dot && <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sub-bar: Category Filters + Advanced Sort & View Switcher */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pt-3 border-t border-[#221F1C]">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[#7A7366] font-bold uppercase tracking-wider text-[11px]">Filter by:</span>
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'meet', label: 'Meet Qazi in Person' },
                { id: 'college', label: 'College Fest' },
                { id: 'concert', label: 'Live Concerts' },
                { id: 'wedding', label: 'Luxury Weddings' },
                { id: 'corporate', label: 'Corporate' },
                { id: 'contact', label: 'Direct Contact / Footer' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#D8AE56]/20 border border-[#D8AE56] text-[#F3D084]'
                      : 'bg-[#1C1A17] border border-[#292520] text-[#A8A29E] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sorting & Density View Mode */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-2 lg:pt-0">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#7A7366] font-medium hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#1C1A17] border border-[#332E27] text-white px-3 py-1.5 rounded-lg text-xs outline-none focus:border-[#D8AE56]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="event_asc">Event Date (Earliest)</option>
                  <option value="event_desc">Event Date (Latest)</option>
                  <option value="name_asc">Client Name (A–Z)</option>
                </select>
              </div>

              {/* View Mode Toggle: Compact Cards vs Table */}
              <div className="flex items-center bg-[#1C1A17] border border-[#292520] rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('compact')}
                  className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition-all ${
                    viewMode === 'compact'
                      ? 'bg-[#D8AE56] text-[#141210]'
                      : 'text-[#A8A29E] hover:text-white'
                  }`}
                  title="Compact Cards View"
                >
                  <span className="material-symbols-outlined text-[16px]">grid_view</span>
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition-all ${
                    viewMode === 'table'
                      ? 'bg-[#D8AE56] text-[#141210]'
                      : 'text-[#A8A29E] hover:text-white'
                  }`}
                  title="Dense Table List View"
                >
                  <span className="material-symbols-outlined text-[16px]">table_rows</span>
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error message banner */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/50 text-amber-200 text-xs flex items-center justify-between">
            <span>{errorMsg}</span>
            <button onClick={() => fetchInquiries(pin)} className="underline font-bold cursor-pointer">
              Try Again
            </button>
          </div>
        )}

        {/* Inquiries List View */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#D8AE56] flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, monospace' }}>
              <span>Queries &amp; Client Leads</span>
              <span className="px-2 py-0.5 rounded-full bg-[#D8AE56]/20 text-[#F3D084] text-xs font-black">
                {filteredAndSortedInquiries.length}
              </span>
            </h2>
            {lastRefreshed && (
              <span className="text-[11px] text-[#7A7366]">Last synced: {lastRefreshed}</span>
            )}
          </div>

          {filteredAndSortedInquiries.length === 0 ? (
            <div className="bg-[#141210] border border-[#292520] rounded-2xl p-12 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#7A7366]">inbox</span>
              <h3 className="text-base font-bold text-white">No inquiries found</h3>
              <p className="text-xs text-[#A8A29E] max-w-sm mx-auto">
                {inquiries.length === 0
                  ? 'There are currently no inquiries recorded in the CRM. Any form filled on the website will instantly appear here.'
                  : 'No inquiries match your current search or filter criteria.'}
              </p>
            </div>
          ) : viewMode === 'compact' ? (
            /* ======================================================== */
            /* 1. COMPACT LEADS CARDS (2-COL ELEGANT GRID)              */
            /* ======================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {paginatedInquiries.map((item) => {
                const isMeetQazi = (item.category || '').toLowerCase().includes('meet');
                const rawStatus = (item.status || 'new').toLowerCase();
                const isNew = rawStatus === 'new';
                const isInProgress = rawStatus === 'in-progress' || rawStatus === 'in_progress' || rawStatus === 'contacted';
                const isClosed = rawStatus === 'closed';

                return (
                  <div
                    key={item.id}
                    className={`bg-[#141210] border-2 rounded-2xl p-4 sm:p-5 transition-all space-y-3 relative flex flex-col justify-between hover:shadow-lg ${
                      isNew
                        ? 'border-emerald-500/50 bg-gradient-to-br from-emerald-950/15 via-[#141210] to-[#141210]'
                        : isInProgress
                        ? 'border-amber-500/50 bg-gradient-to-br from-amber-950/15 via-[#141210] to-[#141210]'
                        : 'border-rose-500/40 bg-gradient-to-br from-rose-950/15 via-[#141210] to-[#141210] opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div>
                      {/* Top Header Row: ID, Badges & Quick Status Select */}
                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#221F1C]">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider bg-[#221F1C] border border-[#332E27] text-[#D8AE56]" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                            #{item.id}
                          </span>

                          {isMeetQazi ? (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D8AE56] to-[#B68938] text-[#141210]">
                              Meet Qazi
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#1C1A17] border border-[#38332C] text-[#F3D084] truncate max-w-[150px]">
                              {item.category || 'General'}
                            </span>
                          )}

                          {isNew && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                              New
                            </span>
                          )}
                          {isInProgress && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/20 border border-amber-500/60 text-amber-300 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              In Progress
                            </span>
                          )}
                          {isClosed && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-950/40 border border-rose-500/50 text-rose-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                              Closed
                            </span>
                          )}
                        </div>

                        {/* Quick Status Select */}
                        <select
                          value={isInProgress ? 'in-progress' : isClosed ? 'closed' : 'new'}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border outline-none cursor-pointer uppercase tracking-wider transition-all ${
                            isNew
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                              : isInProgress
                              ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                              : 'bg-rose-950/60 border-rose-500 text-rose-300'
                          }`}
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          <option value="new" className="bg-[#1C1A17] text-emerald-400 font-bold">🟢 New</option>
                          <option value="in-progress" className="bg-[#1C1A17] text-amber-400 font-bold">🟡 In Progress</option>
                          <option value="closed" className="bg-[#1C1A17] text-rose-400 font-bold">🔴 Closed</option>
                        </select>
                      </div>

                      {/* Client Name & Key Metrics */}
                      <div className="pt-2">
                        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center justify-between">
                          <span className="truncate">{item.name || '(No Name Provided)'}</span>
                          <span className="text-[10px] font-normal text-[#7A7366] shrink-0 font-mono">
                            {item.created_at ? item.created_at.split(' ')[0] : ''}
                          </span>
                        </h3>

                        {/* Quick Contact & Event Grid */}
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                          {/* Phone & WhatsApp */}
                          <div className="bg-[#1C1A17] p-2 rounded-xl border border-[#292520] flex items-center justify-between gap-1">
                            <div className="truncate">
                              <span className="text-[9px] uppercase tracking-wider text-[#7A7366] block font-bold">Phone</span>
                              <span className="font-semibold text-white text-[11px] truncate block">{item.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {item.phone && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(`phone-${item.id}`, item.phone)}
                                  className="w-6 h-6 rounded bg-[#2A2621] hover:bg-[#D8AE56] text-[#A8A29E] hover:text-[#141210] flex items-center justify-center transition-colors"
                                  title="Copy Phone"
                                >
                                  <span className="material-symbols-outlined text-[13px]">
                                    {copiedKey === `phone-${item.id}` ? 'check' : 'content_copy'}
                                  </span>
                                </button>
                              )}
                              {item.phone && (
                                <a
                                  href={getWhatsAppLink(item.phone, item.name)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-6 h-6 rounded bg-[#25D366] hover:brightness-110 text-[#0C0B0A] font-black flex items-center justify-center"
                                  title="WhatsApp Chat"
                                >
                                  <span className="material-symbols-outlined text-[14px]">chat</span>
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Email */}
                          <div className="bg-[#1C1A17] p-2 rounded-xl border border-[#292520] flex items-center justify-between gap-1">
                            <div className="truncate">
                              <span className="text-[9px] uppercase tracking-wider text-[#7A7366] block font-bold">Email</span>
                              <span className="font-semibold text-[#D8AE56] text-[11px] truncate block">{item.email || 'N/A'}</span>
                            </div>
                            {item.email && (
                              <button
                                type="button"
                                onClick={() => handleCopy(`email-${item.id}`, item.email)}
                                className="w-6 h-6 rounded bg-[#2A2621] hover:bg-[#D8AE56] text-[#A8A29E] hover:text-[#141210] flex items-center justify-center transition-colors shrink-0"
                                title="Copy Email"
                              >
                                <span className="material-symbols-outlined text-[13px]">
                                  {copiedKey === `email-${item.id}` ? 'check' : 'content_copy'}
                                </span>
                              </button>
                            )}
                          </div>

                          {/* City / Venue */}
                          <div className="bg-[#1C1A17] p-2 rounded-xl border border-[#292520] flex items-center gap-1.5 truncate">
                            <span className="material-symbols-outlined text-[#7A7366] text-[14px] shrink-0">location_on</span>
                            <div className="truncate">
                              <span className="text-[9px] uppercase tracking-wider text-[#7A7366] block font-bold">City</span>
                              <span className="font-medium text-white text-[11px] truncate block">{item.city || 'Not specified'}</span>
                            </div>
                          </div>

                          {/* Target Date */}
                          <div className="bg-[#1C1A17] p-2 rounded-xl border border-[#292520] flex items-center gap-1.5 truncate">
                            <span className="material-symbols-outlined text-[#D8AE56] text-[14px] shrink-0">event</span>
                            <div className="truncate">
                              <span className="text-[9px] uppercase tracking-wider text-[#7A7366] block font-bold">Date</span>
                              <span className="font-bold text-[#F3D084] text-[11px] truncate block">{item.event_date || 'Flexible'}</span>
                            </div>
                          </div>
                        </div>

                        {/* One-Line Clean Message Preview */}
                        {item.message && (
                          <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-[#181614] border border-[#26221E] flex items-center gap-2 text-[11px] text-[#A8A29E]">
                            <span className="material-symbols-outlined text-[13px] text-[#D8AE56] shrink-0">format_quote</span>
                            <p className="truncate flex-1 font-normal italic">&ldquo;{item.message}&rdquo;</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-[#221F1C] text-xs">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-[#7A7366] hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/30 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                        title="Delete Lead"
                      >
                        <span className="material-symbols-outlined text-[15px]">delete</span>
                        <span>Delete</span>
                      </button>

                      <button
                        onClick={() => handleOpenLead(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] text-[#141210] font-black text-[11px] uppercase tracking-wider hover:opacity-95 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        <span>View Dossier</span>
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ======================================================== */
            /* 2. DENSE DATA TABLE VIEW                                 */
            /* ======================================================== */
            <div className="bg-[#141210] border border-[#292520] rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#191613] text-[#7A7366] uppercase text-[10px] tracking-wider border-b border-[#292520]" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      <th className="py-3 px-4 font-bold">#ID</th>
                      <th className="py-3 px-4 font-bold">Client Name</th>
                      <th className="py-3 px-4 font-bold">Category</th>
                      <th className="py-3 px-4 font-bold">Event Date</th>
                      <th className="py-3 px-4 font-bold">City</th>
                      <th className="py-3 px-4 font-bold">Phone / WA</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#221F1C]">
                    {paginatedInquiries.map((item) => {
                      const isMeetQazi = (item.category || '').toLowerCase().includes('meet');
                      const rawStatus = (item.status || 'new').toLowerCase();
                      const isNew = rawStatus === 'new';
                      const isInProgress = rawStatus === 'in-progress' || rawStatus === 'in_progress' || rawStatus === 'contacted';
                      const isClosed = rawStatus === 'closed';

                      return (
                        <tr
                          key={item.id}
                          onClick={() => handleOpenLead(item)}
                          className="hover:bg-[#1C1A17] transition-colors cursor-pointer group"
                        >
                          <td className="py-3 px-4 font-mono font-bold text-[#D8AE56]">#{item.id}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-white group-hover:text-[#F3D084] transition-colors">{item.name || '(N/A)'}</div>
                            <div className="text-[10px] text-[#7A7366]">{item.source || 'Website'}</div>
                          </td>
                          <td className="py-3 px-4">
                            {isMeetQazi ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D8AE56]/20 text-[#F3D084]">Meet Qazi</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1C1A17] border border-[#292520] text-[#EAE5D9]">
                                {item.category || 'General'}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-medium text-[#F3D084]">{item.event_date || 'Flexible'}</td>
                          <td className="py-3 px-4 text-[#A8A29E]">{item.city || 'N/A'}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <span className="font-mono text-white text-[11px]">{item.phone || 'N/A'}</span>
                              {item.phone && (
                                <a
                                  href={getWhatsAppLink(item.phone, item.name)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-5 h-5 rounded bg-[#25D366] text-[#0C0B0A] flex items-center justify-center font-black"
                                  title="WhatsApp"
                                >
                                  <span className="material-symbols-outlined text-[12px]">chat</span>
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={isInProgress ? 'in-progress' : isClosed ? 'closed' : 'new'}
                              onChange={(e) => handleStatusChange(item.id, e.target.value)}
                              className={`text-[10px] font-black px-2 py-1 rounded-lg border outline-none cursor-pointer uppercase ${
                                isNew
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                                  : isInProgress
                                  ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                                  : 'bg-rose-950/60 border-rose-500 text-rose-300'
                              }`}
                            >
                              <option value="new" className="bg-[#1C1A17] text-emerald-400 font-bold">New</option>
                              <option value="in-progress" className="bg-[#1C1A17] text-amber-400 font-bold">In Progress</option>
                              <option value="closed" className="bg-[#1C1A17] text-rose-400 font-bold">Closed</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleOpenLead(item)}
                              className="px-2.5 py-1 rounded-lg bg-[#221F1C] hover:bg-[#D8AE56] text-[#D8AE56] hover:text-[#141210] font-bold text-[10px] uppercase transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. ADVANCED PAGINATION BAR                               */}
          {/* ======================================================== */}
          {filteredAndSortedInquiries.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#141210] border border-[#292520] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3 text-xs text-[#A8A29E]">
                <span>
                  Showing <strong className="text-white">{(currentPage - 1) * pageSize + 1}</strong> to{' '}
                  <strong className="text-white">
                    {Math.min(currentPage * pageSize, filteredAndSortedInquiries.length)}
                  </strong>{' '}
                  of <strong className="text-[#D8AE56]">{filteredAndSortedInquiries.length}</strong> leads
                </span>

                <div className="flex items-center gap-1.5 pl-3 border-l border-[#292520]">
                  <span>Per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="bg-[#1C1A17] border border-[#332E27] text-white px-2 py-1 rounded-lg text-xs outline-none focus:border-[#D8AE56]"
                  >
                    <option value={5}>5 leads</option>
                    <option value={10}>10 leads</option>
                    <option value={20}>20 leads</option>
                    <option value={50}>50 leads</option>
                  </select>
                </div>
              </div>

              {/* Page Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg bg-[#1C1A17] border border-[#292520] text-xs font-bold text-[#D5CEBF] hover:bg-[#26221E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pg
                        ? 'bg-gradient-to-r from-[#D8AE56] to-[#B68938] text-[#141210] shadow-sm font-black'
                        : 'bg-[#1C1A17] border border-[#292520] text-[#A8A29E] hover:text-white hover:bg-[#26221E]'
                    }`}
                  >
                    {pg}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1.5 rounded-lg bg-[#1C1A17] border border-[#292520] text-xs font-bold text-[#D5CEBF] hover:bg-[#26221E] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Full Details Modal */}
      {activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#141210] border-2 border-[#D8AE56] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setActiveLead(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#221F1C] hover:bg-[#D8AE56] text-[#A8A29E] hover:text-[#141210] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="border-b border-[#292520] pb-4">
              <span className="text-xs uppercase tracking-widest text-[#D8AE56] font-bold" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                Inquiry Record #{activeLead.id}
              </span>
              <h2 className="text-2xl font-black text-white mt-1" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                {activeLead.name || 'Client Lead'}
              </h2>
              <p className="text-xs text-[#A8A29E] mt-1">Source: {activeLead.source} • Registered: {activeLead.created_at}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#1C1A17] border border-[#292520]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#7A7366] block font-bold text-[10px] uppercase">CLIENT PHONE</span>
                  {activeLead.phone && (
                    <button
                      type="button"
                      onClick={() => handleCopy(`modal-phone-${activeLead.id}`, activeLead.phone)}
                      className="text-[10px] font-bold text-[#D8AE56] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {copiedKey === `modal-phone-${activeLead.id}` ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedKey === `modal-phone-${activeLead.id}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
                <span className="font-semibold text-white text-sm">{activeLead.phone || 'N/A'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1C1A17] border border-[#292520]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#7A7366] block font-bold text-[10px] uppercase">EMAIL ADDRESS</span>
                  {activeLead.email && (
                    <button
                      type="button"
                      onClick={() => handleCopy(`modal-email-${activeLead.id}`, activeLead.email)}
                      className="text-[10px] font-bold text-[#D8AE56] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {copiedKey === `modal-email-${activeLead.id}` ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedKey === `modal-email-${activeLead.id}` ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
                <span className="font-semibold text-[#D8AE56] text-sm break-all">{activeLead.email || 'N/A'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1C1A17] border border-[#292520]">
                <span className="text-[#7A7366] block font-bold mb-1">CATEGORY</span>
                <span className="font-bold text-[#F3D084] text-sm">{activeLead.category || 'N/A'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1C1A17] border border-[#292520]">
                <span className="text-[#7A7366] block font-bold mb-1">CITY / VENUE</span>
                <span className="font-semibold text-white text-sm">{activeLead.city || 'N/A'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1C1A17] border border-[#292520]">
                <span className="text-[#7A7366] block font-bold mb-1">TARGET DATE</span>
                <span className="font-semibold text-white text-sm">{activeLead.event_date || 'Flexible'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1C1A17] border border-[#292520]">
                <span className="text-[#7A7366] block font-bold mb-1">DURATION / TIME SLOT</span>
                <span className="font-semibold text-[#F3D084] text-sm">{activeLead.slot_or_duration || 'Standard'}</span>
              </div>

              {activeLead.expected_guests && (
                <div className="p-3 rounded-xl bg-[#1C1A17] border border-[#292520]">
                  <span className="text-[#7A7366] block font-bold mb-1">EXPECTED ATTENDANCE</span>
                  <span className="font-semibold text-white text-sm">{activeLead.expected_guests}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-[#1C1A17] border border-[#292520]">
                <span className="text-[#7A7366] block font-bold mb-1">STATUS</span>
                <select
                  value={
                    (activeLead.status || '').toLowerCase() === 'closed'
                      ? 'closed'
                      : (activeLead.status || '').toLowerCase() === 'in-progress' || (activeLead.status || '').toLowerCase() === 'in_progress' || (activeLead.status || '').toLowerCase() === 'contacted'
                      ? 'in-progress'
                      : 'new'
                  }
                  onChange={(e) => handleStatusChange(activeLead.id, e.target.value)}
                  className={`text-xs font-black px-3 py-1.5 rounded-lg border-2 outline-none cursor-pointer uppercase tracking-wider ${
                    (activeLead.status || 'new').toLowerCase() === 'new'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : (activeLead.status || '').toLowerCase() === 'closed'
                      ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                      : 'bg-amber-950/60 border-amber-500 text-amber-300'
                  }`}
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  <option value="new" className="bg-[#1C1A17] text-emerald-400 font-bold">🟢 New</option>
                  <option value="in-progress" className="bg-[#1C1A17] text-amber-400 font-bold">🟡 In Progress</option>
                  <option value="closed" className="bg-[#1C1A17] text-rose-400 font-bold">🔴 Closed</option>
                </select>
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="space-y-2 p-4 rounded-xl bg-[#181614] border border-[#38332C]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-[#D8AE56] flex items-center gap-1.5" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  <span>Internal Staff / Follow-up Notes</span>
                </span>
                {notesFeedback && (
                  <span className={`text-xs font-bold ${notesFeedback.includes('success') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {notesFeedback}
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                value={leadNotes}
                onChange={(e) => setLeadNotes(e.target.value)}
                placeholder="Log internal follow-up remarks, quote discussed, manager updates..."
                className="w-full bg-[#121110] border border-[#2E2A24] focus:border-[#D8AE56] rounded-lg p-3 text-xs text-white placeholder-[#5A554D] outline-none transition-colors"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={savingNotes}
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-lg bg-[#D8AE56] hover:bg-[#F3D084] text-[#141210] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  <span className={`material-symbols-outlined text-[14px] ${savingNotes ? 'animate-spin' : ''}`}>
                    {savingNotes ? 'sync' : 'save'}
                  </span>
                  <span>{savingNotes ? 'Saving...' : 'Save Notes'}</span>
                </button>
              </div>
            </div>

            {activeLead.message && (
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-[#D8AE56]" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  Full Message / Notes
                </span>
                <div className="p-4 rounded-xl bg-[#1C1A17] border border-[#292520] text-xs text-[#EAE5D9] whitespace-pre-line leading-relaxed">
                  {activeLead.message}
                </div>
              </div>
            )}

            {/* Direct Connect Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {activeLead.phone && (
                <a
                  href={getWhatsAppLink(activeLead.phone, activeLead.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-xl bg-[#25D366] hover:brightness-105 text-[#0C0B0A] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Client</span>
                </a>
              )}

              {activeLead.phone && (
                <a
                  href={`tel:${activeLead.phone}`}
                  className="px-6 py-3 rounded-xl bg-[#221F1C] hover:bg-[#2C2723] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#38332C]"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Call</span>
                </a>
              )}

              {activeLead.email && (
                <a
                  href={`mailto:${activeLead.email}?subject=Qazi%20Touqeer%20Inquiry%20Response`}
                  className="px-6 py-3 rounded-xl bg-[#221F1C] hover:bg-[#2C2723] text-[#D8AE56] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#38332C]"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* HERO SECTION LIVE EDITOR MODAL                           */}
      {/* ======================================================== */}
      {heroModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#141210] border-2 border-[#D8AE56]/50 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Modal Top Header */}
            <div className="p-4 sm:p-6 border-b border-[#292520] flex items-center justify-between gap-4 bg-[#191613]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D8AE56] to-[#9B7018] flex items-center justify-center text-[#141210] shadow-md">
                  <span className="material-symbols-outlined text-[22px]">tune</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#D8AE56] font-extrabold" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Homepage Customizer
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-[9px] font-bold uppercase tracking-wider">
                      Live Sync
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    Hero Section Editor
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  target="_blank"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#221F1C] hover:bg-[#2B2723] text-xs font-bold text-[#D8AE56] border border-[#38332C] transition-colors"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  <span>View Live Site</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </Link>
                <button
                  onClick={() => setHeroModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#221F1C] hover:bg-[#2F2A25] text-white flex items-center justify-center cursor-pointer transition-colors border border-[#38332C]"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center border-b border-[#292520] bg-[#161412] px-4 sm:px-6">
              <button
                type="button"
                onClick={() => setHeroTab('texts')}
                className={`py-3 px-4 text-xs uppercase font-extrabold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  heroTab === 'texts'
                    ? 'border-[#D8AE56] text-[#D8AE56]'
                    : 'border-transparent text-[#A8A29E] hover:text-white'
                }`}
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>Texts &amp; Headlines</span>
              </button>

              <button
                type="button"
                onClick={() => setHeroTab('slides')}
                className={`py-3 px-4 text-xs uppercase font-extrabold tracking-wider border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  heroTab === 'slides'
                    ? 'border-[#D8AE56] text-[#D8AE56]'
                    : 'border-transparent text-[#A8A29E] hover:text-white'
                }`}
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                <span className="material-symbols-outlined text-[18px]">collections</span>
                <span>Slider Images &amp; Captions ({heroConfig.slides.length})</span>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-left">
              {heroLoading ? (
                <div className="py-20 text-center space-y-3">
                  <span className="material-symbols-outlined text-4xl text-[#D8AE56] animate-spin">sync</span>
                  <p className="text-xs text-[#A8A29E] uppercase tracking-widest font-bold">Loading Hero Configuration...</p>
                </div>
              ) : heroTab === 'texts' ? (
                /* TAB 1: TEXTS */
                <div className="space-y-5">
                  <div className="p-3.5 rounded-xl bg-[#1C1A17] border border-[#2B2723] text-xs text-[#C2BCB0] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#D8AE56] text-[20px] shrink-0">info</span>
                    <span>Yahan update kiya gaya text directly Homepage ke Hero section mein display hoga.</span>
                  </div>

                  {/* Celebrity Badge */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#D8AE56] tracking-wider mb-1.5" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Celebrity Status Badge / Accolades Strip
                    </label>
                    <input
                      type="text"
                      value={heroConfig.texts.celebrityBadge || ''}
                      onChange={(e) => handleTextChange('celebrityBadge', e.target.value)}
                      placeholder="e.g. FAME GURUKUL WINNER • BIGG BOSS PHENOMENON • AFGHAN JALEBI FAME"
                      className="w-full bg-[#1C1A17] border-2 border-[#2E2923] focus:border-[#D8AE56] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-[#9A9284]/50 placeholder:font-normal"
                    />
                    <span className="text-[11px] text-[#7A7366] mt-1 block">Desktop par golden badge aur mobile par continuous moving ticker mein yahi text show hota hai.</span>
                  </div>

                  {/* Main Title & Rockstar Slogan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-[#D8AE56] tracking-wider mb-1.5" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        Artist Main Title
                      </label>
                      <input
                        type="text"
                        value={heroConfig.texts.title || ''}
                        onChange={(e) => handleTextChange('title', e.target.value)}
                        placeholder="e.g. QAZI TOUQEER"
                        className="w-full bg-[#1C1A17] border-2 border-[#2E2923] focus:border-[#D8AE56] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-all font-bold placeholder:text-[#9A9284]/50 placeholder:font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#D8AE56] tracking-wider mb-1.5" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        Rockstar Slogan Pill (Red Badge)
                      </label>
                      <input
                        type="text"
                        value={heroConfig.texts.rockstarSlogan || ''}
                        onChange={(e) => handleTextChange('rockstarSlogan', e.target.value)}
                        placeholder='e.g. "I am a Rockstar Baby Auuuuu…."'
                        className="w-full bg-[#1C1A17] border-2 border-[#2E2923] focus:border-[#D8AE56] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-[#9A9284]/50 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Tagline & Hindi Punchline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-[#D8AE56] tracking-wider mb-1.5" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        Artist Tagline
                      </label>
                      <input
                        type="text"
                        value={heroConfig.texts.tagline || ''}
                        onChange={(e) => handleTextChange('tagline', e.target.value)}
                        placeholder="e.g. ACTOR • PERFORMER • SINGER"
                        className="w-full bg-[#1C1A17] border-2 border-[#2E2923] focus:border-[#D8AE56] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-[#9A9284]/50 placeholder:font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#D8AE56] tracking-wider mb-1.5" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        Hindi Iconic Punchline
                      </label>
                      <input
                        type="text"
                        value={heroConfig.texts.punchline || ''}
                        onChange={(e) => handleTextChange('punchline', e.target.value)}
                        placeholder='e.g. "Awaaz Jo Dil Se Nikle, Stage Pe Aag Laga De"'
                        className="w-full bg-[#1C1A17] border-2 border-[#2E2923] focus:border-[#D8AE56] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-all italic placeholder:text-[#9A9284]/50 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Bio Paragraph */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#D8AE56] tracking-wider mb-1.5" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Hero Bio Paragraph
                    </label>
                    <textarea
                      rows="3"
                      value={heroConfig.texts.bio || ''}
                      onChange={(e) => handleTextChange('bio', e.target.value)}
                      placeholder="Enter description paragraph..."
                      className="w-full bg-[#1C1A17] border-2 border-[#2E2923] focus:border-[#D8AE56] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-all leading-relaxed placeholder:text-[#9A9284]/50 placeholder:font-normal"
                    />
                  </div>

                  {/* CTA Button Text & Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-[#D8AE56] tracking-wider mb-1.5" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={heroConfig.texts.ctaText || ''}
                        onChange={(e) => handleTextChange('ctaText', e.target.value)}
                        placeholder="e.g. BOOK AN EVENT"
                        className="w-full bg-[#1C1A17] border-2 border-[#2E2923] focus:border-[#D8AE56] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-all font-bold placeholder:text-[#9A9284]/50 placeholder:font-normal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#D8AE56] tracking-wider mb-1.5" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                        CTA Button Link
                      </label>
                      <input
                        type="text"
                        value={heroConfig.texts.ctaLink || ''}
                        onChange={(e) => handleTextChange('ctaLink', e.target.value)}
                        placeholder="e.g. /book-me"
                        className="w-full bg-[#1C1A17] border-2 border-[#2E2923] focus:border-[#D8AE56] text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none transition-all placeholder:text-[#9A9284]/50 placeholder:font-normal"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* TAB 2: SLIDES & IMAGES */
                <div className="space-y-6">
                  <div className="p-3.5 rounded-xl bg-[#1C1A17] border border-[#2B2723] text-xs text-[#C2BCB0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#D8AE56] text-[20px] shrink-0">photo_library</span>
                      <span>Hero section image slider ({heroConfig.slides.length} slides active)</span>
                    </div>

                    {/* Top Add New Slide Button */}
                    <button
                      type="button"
                      onClick={handleAddSlide}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D8AE56] to-[#B68938] hover:brightness-110 text-[#141210] font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span className="material-symbols-outlined text-[18px]">add_circle</span>
                      <span>+ Add New Slide</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {heroConfig.slides.map((slide, sIdx) => (
                      <div
                        key={slide.id || sIdx}
                        className="bg-[#1A1815] border-2 border-[#2F2A23] hover:border-[#D8AE56]/60 rounded-2xl p-4 sm:p-5 transition-all space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#2A251E] border border-[#D8AE56]/40 text-[#D8AE56] text-xs font-black flex items-center justify-center">
                              0{sIdx + 1}
                            </span>
                            <span className="text-sm font-bold text-white flex items-center gap-2" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                              <span>Slide {sIdx + 1}</span>
                              {slide.isNew && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[9px] font-bold uppercase tracking-wider">
                                  New
                                </span>
                              )}
                            </span>

                            {/* Move Up / Down Buttons */}
                            <div className="flex items-center gap-1 ml-2">
                              <button
                                type="button"
                                disabled={sIdx === 0}
                                onClick={() => handleMoveSlide(sIdx, 'up')}
                                className="w-7 h-7 rounded-lg bg-[#221F1C] hover:bg-[#2C2723] text-[#A8A29E] hover:text-white flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-[#38332C]"
                                title="Move slide up"
                              >
                                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                              </button>
                              <button
                                type="button"
                                disabled={sIdx === heroConfig.slides.length - 1}
                                onClick={() => handleMoveSlide(sIdx, 'down')}
                                className="w-7 h-7 rounded-lg bg-[#221F1C] hover:bg-[#2C2723] text-[#A8A29E] hover:text-white flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed border border-[#38332C]"
                                title="Move slide down"
                              >
                                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Accent Glow Color */}
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] uppercase font-bold text-[#A8A29E]" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                                Glow:
                              </span>
                              <div className="flex items-center gap-1.5">
                                {['#D8AE56', '#F59E0B', '#E63946', '#C49742', '#10B981'].map((c) => (
                                  <button
                                    key={c}
                                    type="button"
                                    onClick={() => handleSlideChange(sIdx, 'accentColor', c)}
                                    className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                                      slide.accentColor === c ? 'scale-125 border-white shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                    style={{ backgroundColor: c }}
                                    title={`Select color ${c}`}
                                  />
                                ))}
                                <input
                                  type="color"
                                  value={slide.accentColor || '#D8AE56'}
                                  onChange={(e) => handleSlideChange(sIdx, 'accentColor', e.target.value)}
                                  className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                                  title="Custom Hex Color"
                                />
                              </div>
                            </div>

                            {/* Delete Slide Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveSlide(sIdx)}
                              className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                              title="Delete this slide"
                            >
                              <span className="material-symbols-outlined text-[15px]">delete</span>
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Live Thumbnail Preview */}
                          <div className="md:col-span-3">
                            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#0A090E] border-2 border-[#38332C] shadow-md group flex items-center justify-center">
                              {slide.image ? (
                                <>
                                  <img
                                    src={slide.image}
                                    alt={slide.caption || 'Slide'}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                  <div
                                    className="absolute bottom-0 inset-x-0 h-1.5"
                                    style={{ backgroundColor: slide.accentColor || '#D8AE56' }}
                                  />
                                </>
                              ) : (
                                <div className="flex flex-col items-center justify-center p-3 text-center space-y-1.5">
                                  <span className="material-symbols-outlined text-[#D8AE56] text-3xl">add_photo_alternate</span>
                                  <span className="text-[11px] font-bold text-white uppercase tracking-wider block">No Photo</span>
                                  <span className="text-[9px] text-[#A8A29E] block">Upload photo below</span>
                                  <div
                                    className="absolute bottom-0 inset-x-0 h-1.5"
                                    style={{ backgroundColor: slide.accentColor || '#D8AE56' }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Inputs & Upload Control */}
                          <div className="md:col-span-9 space-y-3">
                            {/* Slide Caption */}
                            <div>
                              <label className="block text-[11px] uppercase font-bold text-[#D8AE56] tracking-wider mb-1" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                                Slide Caption
                              </label>
                              <input
                                type="text"
                                value={slide.caption || ''}
                                onChange={(e) => handleSlideChange(sIdx, 'caption', e.target.value)}
                                placeholder="Enter slide caption (e.g. Moments of Glory with Salman Khan)..."
                                className="w-full bg-[#221F1C] border border-[#38332C] focus:border-[#D8AE56] text-white px-3.5 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all font-medium placeholder:text-[#9A9284]/50 placeholder:font-normal"
                              />
                            </div>

                            {/* Image Path / URL & Upload */}
                            <div>
                              <label className="block text-[11px] uppercase font-bold text-[#D8AE56] tracking-wider mb-1" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                                Image Path or URL
                              </label>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                  type="text"
                                  value={slide.image || ''}
                                  onChange={(e) => handleSlideChange(sIdx, 'image', e.target.value)}
                                  placeholder="Upload photo using button or enter path / URL..."
                                  className="flex-1 bg-[#221F1C] border border-[#38332C] focus:border-[#D8AE56] text-white px-3.5 py-2.5 rounded-xl text-xs outline-none transition-all font-mono placeholder:text-[#9A9284]/50 placeholder:font-normal"
                                />

                                {/* Upload Button */}
                                <label className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#2E2820] hover:bg-[#D8AE56] text-[#D8AE56] hover:text-[#141210] font-bold text-xs uppercase tracking-wider transition-all border border-[#D8AE56]/40 cursor-pointer shrink-0">
                                  <span className={`material-symbols-outlined text-[16px] ${uploadingSlideIdx === sIdx ? 'animate-spin' : ''}`}>
                                    {uploadingSlideIdx === sIdx ? 'sync' : 'upload_file'}
                                  </span>
                                  <span>{uploadingSlideIdx === sIdx ? 'Uploading...' : 'Upload Photo'}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={uploadingSlideIdx !== null}
                                    onChange={(e) => handleImageUpload(sIdx, e)}
                                  />
                                </label>
                              </div>
                            </div>

                            {/* Quick Preset Selector */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[10px] uppercase font-bold text-[#7A7366]">Quick Presets:</span>
                              {[
                                { label: 'Salman Hug', path: '/images/hero/qazi-salman-hug.jpg' },
                                { label: 'Rockstar Mic', path: '/images/hero/qazi-mic-black.jpg' },
                                { label: 'Bigg Boss', path: '/images/hero/qazi-salman-biggboss.jpg' },
                                { label: 'Brown Jacket', path: '/images/hero/qazi-brown-jacket.jpg' },
                                { label: 'White Shirt', path: '/images/hero/qazi-white-shirt.jpg' },
                              ].map((preset) => (
                                <button
                                  key={preset.path}
                                  type="button"
                                  onClick={() => handleSlideChange(sIdx, 'image', preset.path)}
                                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer border ${
                                    slide.image === preset.path
                                      ? 'bg-[#D8AE56] text-[#141210] border-[#D8AE56]'
                                      : 'bg-[#221F1C] text-[#A8A29E] border-[#38332C] hover:text-white'
                                  }`}
                                >
                                  {preset.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Big Add Slide Card Button */}
                    <button
                      type="button"
                      onClick={handleAddSlide}
                      className="w-full py-4 border-2 border-dashed border-[#D8AE56]/40 hover:border-[#D8AE56] rounded-2xl bg-[#161412] hover:bg-[#1E1B17] text-[#D8AE56] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-sm"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-125">add_circle</span>
                      <span>+ Add Another Slide</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer / Action Bar */}
            <div className="p-4 sm:p-6 border-t border-[#292520] bg-[#191613] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {heroSaveSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-500/40 px-3 py-1.5 rounded-xl">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>{heroSaveSuccess}</span>
                  </span>
                )}
                {heroError && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-950/50 border border-rose-500/40 px-3 py-1.5 rounded-xl">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    <span>{heroError}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setHeroConfig(defaultHeroState)}
                  className="px-4 py-2.5 rounded-xl bg-[#221F1C] hover:bg-[#2C2723] text-xs font-bold text-[#A8A29E] hover:text-white border border-[#38332C] transition-colors cursor-pointer"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Reset Defaults
                </button>

                <button
                  type="button"
                  onClick={() => setHeroModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#221F1C] hover:bg-[#2C2723] text-xs font-bold text-white border border-[#38332C] transition-colors cursor-pointer"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={heroSaving}
                  onClick={handleSaveHero}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] hover:brightness-105 text-[#1A1203] text-xs uppercase font-black tracking-wider transition-all shadow-[0_4px_16px_rgba(216,174,86,0.35)] cursor-pointer disabled:opacity-50"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  <span className={`material-symbols-outlined text-[18px] ${heroSaving ? 'animate-spin' : ''}`}>
                    {heroSaving ? 'sync' : 'save'}
                  </span>
                  <span>{heroSaving ? 'Saving Changes...' : 'Save & Publish Live'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

