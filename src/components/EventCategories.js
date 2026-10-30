'use client';

import { 
  GraduationCap, 
  Mic2, 
  PartyPopper, 
  Disc3, 
  Video, 
  Users, 
  ArrowRight, 
  Sparkles,
  MapPin,
  Calendar,
  Globe
} from 'lucide-react';

export const EVENT_CATEGORIES = [
  {
    id: 'college-fest',
    title: 'College Fest / University Event',
    tag: 'Youth Favorite',
    icon: GraduationCap,
    desc: 'Electrifying star night concerts, cultural festivals, celebrity judging, and high-energy interactive student performances.',
    capacity: '1,000 - 25,000+ Students',
    venueType: 'College Grounds, Stadiums, Auditoriums',
    highlights: ['Live Singing Concert', 'Stage Interaction', 'Crowd Hype & Anthems'],
    color: '#F3CA65',
  },
  {
    id: 'live-concert',
    title: 'City Tours & Live Concerts',
    tag: 'Arena Scale',
    icon: Mic2,
    desc: 'Grand public ticketed concerts, multi-city tour dates, and arena music festivals with live band backing and visual production.',
    capacity: '2,500 - 50,000+ Fans',
    venueType: 'Open Exhibition Grounds, Arenas, Amphitheaters',
    highlights: ['Full Band Experience', 'Pyro & Visuals', 'Massive Fan Anthems'],
    color: '#FFEAA7',
  },
  {
    id: 'custom-event',
    title: 'Custom & Anniversary Events',
    tag: 'Private Luxury',
    icon: PartyPopper,
    desc: 'Milestone wedding anniversaries, elite high-profile weddings, exclusive birthdays, and bespoke private gala celebrations.',
    capacity: '100 - 2,000+ Guests',
    venueType: 'Luxury Hotel Banquets, Palaces, Private Lawns',
    highlights: ['Personalized Dedications', 'Exclusive Photo Ops', 'Bespoke Song Sets'],
    color: '#E5B438',
  },
  {
    id: 'club-event',
    title: 'Club & Nightlife Events',
    tag: 'Electric Energy',
    icon: Disc3,
    desc: 'VIP nightclub appearances, high-tempo DJ & mic sets, celebrity hosting, champagne shows, and glamorous afterparties.',
    capacity: '300 - 2,500+ Partygoers',
    venueType: 'Top Nightclubs, Rooftop Lounges, Beach Clubs',
    highlights: ['Club Mic Control', 'VIP Table Host', 'Midnight Special Set'],
    color: '#FAD36E',
  },
  {
    id: 'digital-collab',
    title: 'Digital Collabs & Brand Campaigns',
    tag: 'Social Reach',
    icon: Video,
    desc: 'Strategic brand ambassadorships, viral reel campaigns, celebrity product launches, digital shoots, and high-impact promotions.',
    capacity: 'Pan-India & Global Digital Reach',
    venueType: 'Commercial Sets, Media Studios, Brand Shoots',
    highlights: ['Celebrity Endorsements', 'Viral Video Campaigns', 'Exclusive Brand Tagging'],
    color: '#D49D24',
  },
  {
    id: 'meet-qazi',
    title: 'Meet Qazi in Person',
    tag: 'VIP Experience',
    icon: Users,
    desc: 'Intimate fan interactions, VIP meet-and-greets, autographed merchandise, exclusive backstage passes, and masterclasses.',
    capacity: 'Exclusive 1-on-1 or Private Groups',
    venueType: 'VIP Lounges, Private Suites, Studio Meets',
    highlights: ['Personal Conversation', 'Professional Photos', 'Signed Keepsakes'],
    color: '#FFE29F',
  },
];

export default function EventCategories({ selectedCategory, onSelectCategory, onOutsideIndiaClick }) {
  return (
    <section
      id="events"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: '#07070a',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px auto' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <Sparkles size={14} />
            <span>6 Versatile Booking Formats</span>
          </div>
          <h2
            className="font-display gold-text"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 800,
              letterSpacing: '1px',
              marginBottom: '16px',
            }}
          >
            Choose Your Event Type
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: 1.7 }}>
            Whether you are an <strong style={{ color: '#fff' }}>Event Management Agency</strong>,{' '}
            <strong style={{ color: '#fff' }}>College Council</strong>, or booking for a{' '}
            <strong style={{ color: '#fff' }}>Personal Milestone</strong> — select a category below to instantly configure your booking request.
          </p>

          {/* Quick Outside India link */}
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={onOutsideIndiaClick}
              className="btn-gold-outline"
              style={{
                fontSize: '14px',
                padding: '10px 22px',
                borderRadius: '30px',
              }}
            >
              <Globe size={16} />
              <span>For booking outside India please click here</span>
            </button>
          </div>
        </div>

        {/* 6 Category Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px',
          }}
        >
          {EVENT_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.title;

            return (
              <div
                key={cat.id}
                className="gold-card"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: isSelected
                    ? '2px solid var(--gold-primary)'
                    : '1px solid rgba(243, 202, 101, 0.2)',
                  boxShadow: isSelected
                    ? '0 0 30px rgba(243, 202, 101, 0.35)'
                    : '0 10px 30px rgba(0, 0, 0, 0.5)',
                  background: isSelected
                    ? 'linear-gradient(145deg, rgba(30, 26, 18, 0.95) 0%, rgba(14, 14, 18, 0.95) 100%)'
                    : 'var(--bg-card-glass)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Number Watermark */}
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '20px',
                    fontSize: '64px',
                    fontWeight: 900,
                    fontFamily: 'var(--font-headline)',
                    color: 'rgba(243, 202, 101, 0.05)',
                    pointerEvents: 'none',
                    lineHeight: 1,
                  }}
                >
                  0{idx + 1}
                </span>

                <div>
                  {/* Top Badge & Icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(243, 202, 101, 0.2) 0%, rgba(20, 20, 26, 0.8) 100%)',
                        border: '1px solid rgba(243, 202, 101, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: cat.color,
                      }}
                    >
                      <Icon size={26} />
                    </div>

                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: 'rgba(243, 202, 101, 0.1)',
                        color: cat.color,
                        border: '1px solid rgba(243, 202, 101, 0.25)',
                      }}
                    >
                      {cat.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="font-headline"
                    style={{
                      fontSize: '22px',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      marginBottom: '12px',
                      lineHeight: 1.3,
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14.5px',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                    }}
                  >
                    {cat.desc}
                  </p>

                  {/* Quick specs */}
                  <div
                    style={{
                      background: 'rgba(10, 10, 14, 0.6)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      marginBottom: '22px',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      fontSize: '13px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4D4E0' }}>
                      <Users size={14} color="var(--gold-primary)" />
                      <span>{cat.capacity}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4D4E0' }}>
                      <MapPin size={14} color="var(--gold-primary)" />
                      <span style={{ fontSize: '12.5px' }}>{cat.venueType}</span>
                    </div>
                  </div>
                </div>

                {/* Select & Book Button */}
                <button
                  onClick={() => onSelectCategory(cat.title)}
                  className={isSelected ? 'btn-gold' : 'btn-gold-outline'}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '13px 20px',
                    fontSize: '14.5px',
                    borderRadius: '10px',
                  }}
                >
                  <span>{isSelected ? '✓ Selected — Fill Form' : 'Select & Book This Event'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
