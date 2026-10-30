'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactFooter() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setShowContactModal(false);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    }, 2500);
  };

  return (
    <footer className="w-full bg-[#F4EFE6] text-[#524E46] border-t border-[#DDD5C5]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-14 pb-10">
        
        {/* ======================================================== */}
        {/* 1. CENTERED QAZI CLUB LOGO & BRAND DESCRIPTION          */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-3 pb-8">
          <Link href="/" className="inline-flex items-center justify-center group py-1">
            <img
              src="/images/logos/qazi-club-header-light.png"
              alt="QAZI CLUB — Actor • Performer • Singer"
              className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>
          <p className="text-xs sm:text-sm text-[#524E46] leading-relaxed max-w-lg mx-auto">
            Pioneering high-echelon theatrical performance and cinematic live curation for premier festivals, arenas, and confidential ultra-private galas worldwide.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. ONLY 3 TABS: CONTACT US, LOCATIONS & TERMS            */}
        {/* ======================================================== */}
        <div className="py-6 border-y border-[#DDD5C5] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          
          {/* TAB 1: Contact Us (Opens Modal Form) */}
          <button
            type="button"
            onClick={() => setShowContactModal(true)}
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#141312] hover:text-[#9B7018] transition-colors cursor-pointer"
            style={{ fontFamily: 'Space Grotesk, monospace' }}
          >
            <span className="material-symbols-outlined text-[#9B7018] text-[20px] group-hover:scale-110 transition-transform">mail</span>
            <span className="underline underline-offset-4 decoration-[#D8AE56]">Contact Us</span>
          </button>

          {/* TAB 2: Locations with Flags */}
          <div
            className="inline-flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm font-bold text-[#141312]"
            style={{ fontFamily: 'Space Grotesk, monospace' }}
          >
            <span className="text-[#9B7018] uppercase tracking-wider font-extrabold flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span>Location:</span>
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#DDD5C5] shadow-xs">NOIDA 🇮🇳</span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#DDD5C5] shadow-xs">MUMBAI 🇮🇳</span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#DDD5C5] shadow-xs">LONDON 🇬🇧</span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#DDD5C5] shadow-xs">DUBAI 🇦🇪</span>
          </div>

          {/* TAB 3: Terms and Conditions (Opens Modal) */}
          <button
            type="button"
            onClick={() => setShowTermsModal(true)}
            className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#141312] hover:text-[#9B7018] transition-colors cursor-pointer"
            style={{ fontFamily: 'Space Grotesk, monospace' }}
          >
            <span className="material-symbols-outlined text-[#9B7018] text-[20px] group-hover:scale-110 transition-transform">gavel</span>
            <span className="underline underline-offset-4 decoration-[#D8AE56]">Terms and Conditions</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* 3. CENTERED COPYRIGHT BOTTOM BAR                         */}
        {/* ======================================================== */}
        <div className="pt-6 text-center text-xs text-[#7A7469] space-y-1">
          <p>© 2026 QAZI Live Worldwide. All performance rights reserved.</p>
          <p className="text-[11px] text-[#9C9487]">Official Portal for Qazi Touqeer — Global Artist Management</p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL 1: CONTACT US INQUIRY FORM MODAL                   */}
      {/* ======================================================== */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#D8AE56] max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF6EE] hover:bg-[#D8AE56] text-[#141312] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Header */}
            <div className="text-center pb-4 border-b border-[#E6DFD1]">
              <span className="text-xs uppercase tracking-widest text-[#9B7018] font-bold block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                Direct Artist Desk
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#141312] mt-1" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                Contact Qazi Management
              </h3>
              <p className="text-xs text-[#524E46] mt-1 flex items-center justify-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[15px] text-[#9B7018]">mail</span>
                <a href="mailto:info@qaziclub.com" className="text-[#9B7018] hover:underline font-bold">info@qaziclub.com</a>
              </p>
            </div>

            {/* Form */}
            {contactSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="material-symbols-outlined text-[#10B981] text-5xl">check_circle</span>
                <h4 className="text-xl font-bold text-[#141312]">Inquiry Dispatched!</h4>
                <p className="text-sm text-[#524E46]">Thank you! Qazi&apos;s management team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 pt-5">
                <div>
                  <label className="block text-xs font-bold text-[#141312] uppercase tracking-wider mb-1" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    Full Name <span className="text-[#9B7018]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#DDD5C5] focus:border-[#9B7018] text-sm text-[#141312] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#141312] uppercase tracking-wider mb-1" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Email <span className="text-[#9B7018]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@gmail.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#DDD5C5] focus:border-[#9B7018] text-sm text-[#141312] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#141312] uppercase tracking-wider mb-1" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                      Phone / WhatsApp <span className="text-[#9B7018]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#DDD5C5] focus:border-[#9B7018] text-sm text-[#141312] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141312] uppercase tracking-wider mb-1" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                    Message / Event Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Please specify your event date, city, and requirements..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#DDD5C5] focus:border-[#9B7018] text-sm text-[#141312] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D8AE56] to-[#B68938] text-[#1A1203] text-sm uppercase font-extrabold tracking-wider hover:opacity-95 shadow-md cursor-pointer transition-transform active:scale-[0.99]"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Send Inquiry Now
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: TERMS AND CONDITIONS MODAL                      */}
      {/* ======================================================== */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#D8AE56] max-h-[85vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF6EE] hover:bg-[#D8AE56] text-[#141312] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Header */}
            <div className="text-center pb-4 border-b border-[#E6DFD1]">
              <span className="text-xs uppercase tracking-widest text-[#9B7018] font-bold block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                Legal &amp; Performance Protocol
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#141312] mt-1" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                Terms and Conditions
              </h3>
            </div>

            {/* Content */}
            <div className="py-4 space-y-4 text-xs sm:text-sm text-[#443E35] leading-relaxed">
              <div>
                <h4 className="font-bold text-[#141312] text-sm mb-1">1. Date Hold &amp; Escrow Confirmation</h4>
                <p>Performance dates are strictly non-exclusive until formal artist clearance and contractual advance escrow deposit are received through official management channels.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#141312] text-sm mb-1">2. Technical &amp; Hospitality Rider</h4>
                <p>Organizer agrees to adhere strictly to Qazi Touqeer&apos;s audio-visual rider specifications (L-Acoustics / d&amp;b systems, Shure Axient microphones) and green room hospitality directives.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#141312] text-sm mb-1">3. Force Majeure &amp; Rescheduling</h4>
                <p>In cases of certified national emergencies, natural acts, or official travel restrictions, engagements may be mutually rescheduled to alternate tour dates without penalty.</p>
              </div>

              <div>
                <h4 className="font-bold text-[#141312] text-sm mb-1">4. Recording &amp; Commercial Broadcasting</h4>
                <p>Live concert audio and video remain exclusive intellectual property of QAZI Live Worldwide. Commercial TV broadcast or OTT streaming requires advance written sync clearance.</p>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowTermsModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#D8AE56] text-[#1A1203] font-bold uppercase tracking-wider text-xs"
                >
                  I Understand &amp; Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
