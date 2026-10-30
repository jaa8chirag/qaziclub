'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Lock, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Globe, 
  AlertCircle, 
  MessageSquare,
  ArrowRight,
  Briefcase,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';

export const ISD_CODES = [
  { code: '+971', country: 'United Arab Emirates (UAE)' },
  { code: '+1', country: 'United States / Canada' },
  { code: '+44', country: 'United Kingdom (UK)' },
  { code: '+61', country: 'Australia' },
  { code: '+65', country: 'Singapore' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+974', country: 'Qatar' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+91', country: 'India' },
];

export const INDIAN_STATES = [
  'Maharashtra', 'Delhi NCR', 'Punjab', 'Karnataka', 'Telangana', 'West Bengal',
  'Uttar Pradesh', 'Gujarat', 'Tamil Nadu', 'Rajasthan', 'Haryana', 'Madhya Pradesh',
  'Jammu & Kashmir', 'Goa', 'Chandigarh', 'Kerala', 'Bihar', 'Odisha', 'Assam', 'Other'
];

export default function BookingSection({ 
  selectedCategory, 
  setSelectedCategory,
  isInternational,
  setIsInternational
}) {
  const [bookingType, setBookingType] = useState('personal');

  const [formData, setFormData] = useState({
    name: '',
    agencyName: '',
    agentName: '',
    clientName: '',
    eventName: '',
    venueOrCollege: '',
    state: 'Maharashtra',
    city: '',
    date: '',
    landType: 'Open Ground / Stadium (Mass Festival)',
    expectedPeople: '1,500 – 5,000 Attendees',
    phone: '',
    email: '',
    notes: '',
  });

  const [intlFormData, setIntlFormData] = useState({
    name: '',
    country: 'United Arab Emirates (UAE)',
    cityVenue: '',
    eventType: selectedCategory || 'Arena Concerts & Public Tours',
    date: '',
    email: '',
    isdCode: '+971',
    mobileNumber: '',
    expectedPeople: '1,000 – 3,000 Attendees',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [bookingRef, setBookingRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedCategory) {
      setIntlFormData((prev) => ({ ...prev, eventType: selectedCategory }));
    }
  }, [selectedCategory]);

  const handleDomesticChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIntlChange = (e) => {
    const { name, value } = e.target;
    setIntlFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDomesticSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please specify Contact / Booker Name');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Phone Number is Mandatory');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Email ID is Mandatory');
      return;
    }
    if (!formData.venueOrCollege.trim()) {
      setErrorMsg('Please specify Venue or College Name');
      return;
    }
    if (!formData.date) {
      setErrorMsg('Please select the Event Date');
      return;
    }

    const ref = 'QAZI-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmittedData({
      ...formData,
      isInternational: false,
      category: selectedCategory,
      bookingPersona: bookingType,
    });
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#A88135', '#CBA55D', '#121215']
      });
    } catch (err) {
      // ignore
    }
  };

  const handleIntlSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!intlFormData.name.trim()) {
      setErrorMsg('Please specify Contact / Organizer Name');
      return;
    }
    if (!intlFormData.email.trim()) {
      setErrorMsg('Email ID is Mandatory');
      return;
    }
    if (!intlFormData.mobileNumber.trim()) {
      setErrorMsg('Mobile Number is Mandatory');
      return;
    }
    if (!intlFormData.date) {
      setErrorMsg('Please select the Event Date');
      return;
    }

    const ref = 'QAZI-INTL-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmittedData({
      ...intlFormData,
      isInternational: true,
      category: intlFormData.eventType,
    });
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#A88135', '#CBA55D', '#121215']
      });
    } catch (err) {
      // ignore
    }
  };

  const handleCopyRef = () => {
    if (bookingRef) {
      navigator.clipboard.writeText(bookingRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setSubmittedData(null);
    setErrorMsg('');
  };

  return (
    <section style={{ padding: '20px 0 90px 0', position: 'relative' }}>
      <div className="container">
        {/* Minimal Luxury Domestic vs International Switch */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '16px 24px',
            background: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={16} color="var(--gold-champagne)" />
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {isInternational
                ? 'International tour rider active (Outside India representation)'
                : 'Need to organize an engagement outside India? (USA, UK, UAE, Canada)'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsInternational(!isInternational);
              setErrorMsg('');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--gold-champagne)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid var(--gold-champagne)',
              paddingBottom: '2px',
            }}
          >
            {isInternational ? '← Switch to Domestic India Booking' : 'Switch to International Rider →'}
          </button>
        </div>

        {/* Confirmation Screen */}
        {submitted && submittedData ? (
          <div
            className="lux-card"
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              padding: '48px 36px',
              textAlign: 'center',
              background: '#FFFFFF',
              border: '1px solid var(--gold-champagne)',
              boxShadow: '0 20px 50px rgba(168, 129, 53, 0.12)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(168, 129, 53, 0.1)',
                border: '1px solid var(--gold-champagne)',
                color: 'var(--gold-champagne)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
              }}
            >
              <Check size={26} />
            </div>

            <div className="lux-tag-center">
              Reservation Transmitted
            </div>

            <h3 className="font-serif text-gold-gradient" style={{ fontSize: '32px', fontWeight: 600, marginBottom: '10px', letterSpacing: '0.04em' }}>
              Inquiry Registered
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: 1.7, fontWeight: 300 }}>
              Your date inquiry has been logged on Qazi&apos;s executive tour calendar under management reference:
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: '#FAF7F2',
                border: '1px solid var(--gold-champagne)',
                padding: '10px 24px',
                borderRadius: '6px',
                marginBottom: '32px',
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--text-primary)' }}>
                {bookingRef}
              </span>
              <button
                onClick={handleCopyRef}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--gold-champagne)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                <Copy size={13} />
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/919876543210?text=Hello%20Qazi%20Talent%20Desk,%20inquiry%20reference%20${bookingRef}%20for%20${encodeURIComponent(submittedData.category)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-lux-primary"
              >
                <MessageSquare size={14} />
                <span>VIP WhatsApp Concierge</span>
              </a>

              <button onClick={resetForm} className="btn-lux-outline">
                Submit Another Date
              </button>
            </div>
          </div>
        ) : (
          /* Two Column Architecture: Form Left, Reservation Pass Right */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '40px',
              alignItems: 'start',
            }}
          >
            {/* Left: Form */}
            <div
              className="lux-card"
              style={{
                padding: '36px 30px',
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.08)',
              }}
            >
              {errorMsg && (
                <div
                  style={{
                    background: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '6px',
                    padding: '12px 16px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#B91C1C',
                    fontSize: '13px',
                  }}
                >
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {!isInternational ? (
                /* Domestic Form */
                <form onSubmit={handleDomesticSubmit}>
                  {/* Persona Switch: Two Architectural Minimal Tabs */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '10px' }}>
                      Booking Entity Category
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        background: '#F3EFEA',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        borderRadius: '6px',
                        padding: '4px',
                        gap: '4px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setBookingType('personal')}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '11.5px',
                          fontWeight: bookingType === 'personal' ? 600 : 500,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          transition: 'all 0.25s',
                          background: bookingType === 'personal' ? '#FFFFFF' : 'transparent',
                          color: bookingType === 'personal' ? 'var(--gold-champagne)' : 'var(--text-secondary)',
                          boxShadow: bookingType === 'personal' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <User size={13} />
                        <span>01 • Direct / Host</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingType('agency')}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '11.5px',
                          fontWeight: bookingType === 'agency' ? 600 : 500,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          transition: 'all 0.25s',
                          background: bookingType === 'agency' ? '#FFFFFF' : 'transparent',
                          color: bookingType === 'agency' ? 'var(--gold-champagne)' : 'var(--text-secondary)',
                          boxShadow: bookingType === 'agency' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <Briefcase size={13} />
                        <span>02 • Agency / Buyer</span>
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '26px' }}>
                    {bookingType === 'personal' ? (
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                          Host / Booker Name <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleDomesticChange}
                          placeholder="e.g. Aryan Malhotra"
                          className="lux-input"
                          required
                        />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                            Agency / Event Management Firm Name <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="agencyName"
                            value={formData.agencyName}
                            onChange={handleDomesticChange}
                            placeholder="e.g. Apex Entertainment & Media Pvt Ltd"
                            className="lux-input"
                            required
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                              Agent Name <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleDomesticChange}
                              placeholder="e.g. Rohit Verma"
                              className="lux-input"
                              required
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                              End Client / College
                            </label>
                            <input
                              type="text"
                              name="clientName"
                              value={formData.clientName}
                              onChange={handleDomesticChange}
                              placeholder="e.g. Student Council / Brand"
                              className="lux-input"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Event Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Event Name / Occasion
                      </label>
                      <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleDomesticChange}
                        placeholder="e.g. Annual Cultural Fest 2026 / 25th Silver Jubilee"
                        className="lux-input"
                      />
                    </div>

                    {/* College Name or Venue */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        College Name or Venue <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="venueOrCollege"
                        value={formData.venueOrCollege}
                        onChange={handleDomesticChange}
                        placeholder="e.g. IIT Bombay Grounds / Taj Palace Ballroom"
                        className="lux-input"
                        required
                      />
                    </div>

                    {/* State & City */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                          State
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleDomesticChange}
                          className="lux-select"
                        >
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                          City <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleDomesticChange}
                          placeholder="e.g. Mumbai"
                          className="lux-input"
                          required
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Date of Event <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleDomesticChange}
                        className="lux-input"
                        required
                      />
                    </div>

                    {/* Event Type - Greyed out & locked as requested */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                          Event Format <span style={{ color: 'var(--gold-champagne)', fontSize: '10px' }}>(Pre-Configured)</span>
                        </label>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                          Click cards above to switch
                        </span>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          readOnly
                          value={selectedCategory}
                          className="lux-input lux-input-locked"
                          style={{ paddingRight: '36px' }}
                        />
                        <Lock size={14} color="var(--gold-champagne)" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                      </div>
                    </div>

                    {/* Land / Venue Scale */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Land / Venue Scale
                      </label>
                      <select
                        name="landType"
                        value={formData.landType}
                        onChange={handleDomesticChange}
                        className="lux-select"
                      >
                        <option value="Open Ground / Stadium (Mass Festival)">Open Ground / Stadium (Mass Festival)</option>
                        <option value="Indoor Auditorium / Theater">Indoor Auditorium / Theater</option>
                        <option value="Luxury Hotel Banquet / Ballroom">Luxury Hotel Banquet / Ballroom</option>
                        <option value="Nightclub Floor / Rooftop Lounge">Nightclub Floor / Rooftop Lounge</option>
                        <option value="Private Farmhouse / Estate Lawn">Private Farmhouse / Estate Lawn</option>
                      </select>
                    </div>

                    {/* Expected People */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Expected People (Approx)
                      </label>
                      <select
                        name="expectedPeople"
                        value={formData.expectedPeople}
                        onChange={handleDomesticChange}
                        className="lux-select"
                      >
                        <option value="Under 500 Guests">Under 500 Guests (Exclusive/Private)</option>
                        <option value="500 – 1,500 Attendees">500 – 1,500 Attendees (Club / Banquet)</option>
                        <option value="1,500 – 5,000 Attendees">1,500 – 5,000 Attendees (College Fest)</option>
                        <option value="5,000 – 20,000+ Attendees">5,000 – 20,000+ Attendees (Concert Arena)</option>
                      </select>
                    </div>

                    {/* Phone (Mandatory) */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Phone Number <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-champagne)', fontSize: '13px', fontWeight: 700 }}>
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleDomesticChange}
                          placeholder="98765 43210"
                          style={{ paddingLeft: '50px' }}
                          className="lux-input"
                          required
                        />
                      </div>
                    </div>

                    {/* Email ID (Mandatory) */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Email Address <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleDomesticChange}
                        placeholder="official@company.com"
                        className="lux-input"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-lux-primary"
                    style={{ width: '100%', padding: '15px', fontSize: '12.5px' }}
                  >
                    <span>Transmit Provisional Inquiry</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              ) : (
                /* International Form */
                <form onSubmit={handleIntlSubmit}>
                  <div className="lux-tag" style={{ marginBottom: '20px' }}>
                    Global Tour Rider
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '26px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Organizer / Promoter Full Name <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={intlFormData.name}
                        onChange={handleIntlChange}
                        placeholder="e.g. Tariq Al-Mansoor"
                        className="lux-input"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Host Country <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <select
                        name="country"
                        value={intlFormData.country}
                        onChange={handleIntlChange}
                        className="lux-select"
                      >
                        {ISD_CODES.map((item) => (
                          <option key={item.country} value={item.country}>
                            {item.country} ({item.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        City & Venue Location <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="cityVenue"
                        value={intlFormData.cityVenue}
                        onChange={handleIntlChange}
                        placeholder="e.g. Coca-Cola Arena, Dubai"
                        className="lux-input"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Event Date <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={intlFormData.date}
                        onChange={handleIntlChange}
                        className="lux-input"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Official Email <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={intlFormData.email}
                        onChange={handleIntlChange}
                        placeholder="promoter@agency.ae"
                        className="lux-input"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                        Mobile Number with ISD Code <span style={{ color: 'var(--gold-champagne)' }}>*</span>
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '8px' }}>
                        <select
                          name="isdCode"
                          value={intlFormData.isdCode}
                          onChange={handleIntlChange}
                          className="lux-select"
                        >
                          {ISD_CODES.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={intlFormData.mobileNumber}
                          onChange={handleIntlChange}
                          placeholder="50 123 4567"
                          className="lux-input"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-lux-primary"
                    style={{ width: '100%', padding: '15px', fontSize: '12.5px' }}
                  >
                    <span>Transmit International Inquiry</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* Right: Architectural VIP Reservation Pass */}
            <div
              className="lux-card"
              style={{
                padding: '36px 30px',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
                border: '1.5px solid var(--gold-hairline)',
                boxShadow: '0 20px 45px rgba(168, 129, 53, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
                <span className="font-serif text-gold-gradient" style={{ fontSize: '24px', letterSpacing: '0.15em', fontWeight: 700 }}>
                  QAZI
                </span>
                <span
                  style={{
                    fontSize: '9.5px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-champagne)',
                    border: '1px solid var(--gold-hairline)',
                    background: '#FAF7F2',
                    padding: '3px 8px',
                    borderRadius: '3px',
                    fontWeight: 600,
                  }}
                >
                  {bookingType === 'agency' ? 'Agency Buyer' : 'Direct Host'}
                </span>
              </div>

              <div style={{ height: '1px', background: 'rgba(0, 0, 0, 0.08)', marginBottom: '24px' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '13px' }}>
                <div>
                  <div style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>
                    Engagement Discipline
                  </div>
                  <div className="font-serif" style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {selectedCategory}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>
                    Client / Host
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {formData.name || '(Pending Input)'}
                    {bookingType === 'agency' && formData.agencyName && ` • ${formData.agencyName}`}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>
                      Target Date
                    </div>
                    <div style={{ color: 'var(--gold-champagne)', fontWeight: 600 }}>
                      {formData.date || 'Pending'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>
                      Location
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      {formData.city ? `${formData.city}, ${formData.state}` : 'Pending'}
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>
                    Venue & Capacity
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {formData.venueOrCollege || 'Venue Specified Above'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--gold-champagne)', marginTop: '2px', fontWeight: 600 }}>
                    {formData.expectedPeople}
                  </div>
                </div>
              </div>

              <div style={{ height: '1px', background: 'rgba(0, 0, 0, 0.08)', margin: '24px 0' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                <ShieldCheck size={14} color="var(--gold-champagne)" />
                <span>Premier Celebrity Talent Network • Verified Rider Protocol</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
