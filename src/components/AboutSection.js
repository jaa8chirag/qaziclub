'use client';

import { Sparkles, Trophy, Tv, Radio, Flame, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(6,6,8,0) 0%, rgba(14,14,18,0.7) 50%, rgba(6,6,8,0) 100%)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
          <div className="badge-gold" style={{ marginBottom: '14px' }}>
            <Sparkles size={14} />
            <span>About The Artist</span>
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
            Meet Qazi — The Maverick of Indian Entertainment
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '17px', lineHeight: 1.7 }}>
            Contestant in Bigg Boss, dynamic playback artist, electrifying stage performer, and youth sensation.
            Qazi commands every stage with pure charisma, high-voltage crowd hype, and raw vocal adrenaline.
          </p>
        </div>

        {/* Big Highlight: The Bigg Boss Stage with Salman Khan */}
        <div
          className="gold-card"
          style={{
            padding: '36px',
            marginBottom: '60px',
            background: 'linear-gradient(135deg, rgba(22, 22, 30, 0.9) 0%, rgba(12, 12, 16, 0.95) 100%)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Stage Photo */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(243, 202, 101, 0.35)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8)',
                aspectRatio: '16/11',
              }}
            >
              <img
                src="/images/qazi-salman-biggboss.jpg"
                alt="Qazi with Salman Khan on Bigg Boss stage"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(6, 6, 8, 0.85)',
                  border: '1px solid var(--gold-primary)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Tv size={14} color="var(--gold-primary)" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                  Bigg Boss Spotlight
                </span>
              </div>
            </div>

            {/* Stage Info & Milestones */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--gold-primary)',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                <Flame size={16} />
                <span>National Phenomenon</span>
              </div>
              <h3
                className="font-headline"
                style={{
                  fontSize: '28px',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  marginBottom: '16px',
                  lineHeight: 1.3,
                }}
              >
                Standing Tall on India&apos;s Biggest Stage Alongside Salman Khan
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15.5px', lineHeight: 1.7, marginBottom: '20px' }}>
                Winning hearts nationwide through sheer authenticity, stage showmanship, and magnetic presence.
                From television screens to packed stadium grounds, Qazi turns every event into a roaring celebration.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" />
                  <span style={{ fontSize: '14px', color: '#E0E0EC' }}>Live Stage Rocker</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" />
                  <span style={{ fontSize: '14px', color: '#E0E0EC' }}>Viral Social Presence</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" />
                  <span style={{ fontSize: '14px', color: '#E0E0EC' }}>College Fest Sensation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" />
                  <span style={{ fontSize: '14px', color: '#E0E0EC' }}>Intimate VIP Meets</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery / Persona Triple Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Card 1: Live Rocker */}
          <div className="gold-card" style={{ padding: '24px', overflow: 'hidden' }}>
            <div
              style={{
                height: '240px',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '18px',
                position: 'relative',
              }}
            >
              <img
                src="/images/qazi-mic-black.jpg"
                alt="Qazi with mic"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h4 className="font-headline" style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '8px' }}>
              The Power Performer
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Known for spontaneous crowd engagement, electrifying stage walks, and anthems that get tens of thousands of fans singing along.
            </p>
          </div>

          {/* Card 2: Fashion & High Profile Icon */}
          <div className="gold-card" style={{ padding: '24px', overflow: 'hidden' }}>
            <div
              style={{
                height: '240px',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '18px',
                position: 'relative',
              }}
            >
              <img
                src="/images/qazi-white-shirt.jpg"
                alt="Qazi white shirt fashion"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h4 className="font-headline" style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '8px' }}>
              The Youth Icon
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              A signature style icon blending street chic, retro sunglasses, and rockstar aesthetics that resonate deeply with gen-z and millennials.
            </p>
          </div>

          {/* Card 3: The Storyteller & Host */}
          <div className="gold-card" style={{ padding: '24px', overflow: 'hidden' }}>
            <div
              style={{
                height: '240px',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '18px',
                position: 'relative',
              }}
            >
              <img
                src="/images/qazi-brown-jacket.jpg"
                alt="Qazi brown jacket photoshoot"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h4 className="font-headline" style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '8px' }}>
              The Crowd Controller
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Unrivaled stage mastery, transforming massive stadium audiences and college fest grounds into unforgettable unified sing-alongs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
