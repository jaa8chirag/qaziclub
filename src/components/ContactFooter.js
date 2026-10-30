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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-9 shadow-2xl border-2 border-[#D8AE56] max-h-[88vh] overflow-y-auto text-left">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-[#FAF6EE] hover:bg-[#D8AE56] text-[#141312] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Terms Modal"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Header */}
            <div className="text-center pb-5 border-b border-[#E6DFD1]">
              <span className="text-xs uppercase tracking-[0.2em] text-[#9B7018] font-extrabold block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                Artist Booking – Qazi Touqeer Management
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-[#141312] mt-1.5" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                Terms &amp; Conditions
              </h3>
              <p className="text-xs sm:text-sm text-[#554E43] mt-3 max-w-2xl mx-auto leading-relaxed">
                These Terms &amp; Conditions govern all bookings, appearances, live performances, concerts, corporate events, private functions, promotional activities, and other engagements involving <strong className="text-[#111111]">Qazi Touqeer (&ldquo;Artist&rdquo;)</strong>. By confirming a booking or making a payment, the client, event organiser, or authorised representative (&ldquo;Client&rdquo;) agrees to the following terms.
              </p>
            </div>

            {/* Content Clauses */}
            <div className="py-6 space-y-6 text-xs sm:text-sm text-[#38342D] leading-relaxed">
              {/* Clause 1 */}
              <div className="bg-[#FAF7F1] p-4 sm:p-5 rounded-2xl border border-[#E8DEC9]">
                <h4 className="font-extrabold text-[#111111] text-sm sm:text-base mb-2.5 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  <span className="w-6 h-6 rounded-full bg-[#D8AE56] text-[#1A1203] text-xs font-black flex items-center justify-center shrink-0">1</span>
                  <span>Booking Confirmation &amp; Advance Payment</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-[#443E35]">
                  <li>A booking may be confirmed by paying <strong className="text-[#111111]">25% of the total mutually agreed artist fee</strong>.</li>
                  <li>The booking shall be considered confirmed only upon receipt of the advance payment in the officially designated bank account and written confirmation from the authorised management team.</li>
                  <li>The remaining 75% of the agreed artist fee shall be paid according to the payment schedule mutually agreed upon in writing before the event.</li>
                  <li>A tentative discussion, quotation, or verbal commitment does not constitute a confirmed booking.</li>
                  <li>Artist availability is subject to confirmation by the management team.</li>
                </ul>
              </div>

              {/* Clause 2 */}
              <div className="bg-[#FAF7F1] p-4 sm:p-5 rounded-2xl border border-[#E8DEC9]">
                <h4 className="font-extrabold text-[#111111] text-sm sm:text-base mb-2.5 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  <span className="w-6 h-6 rounded-full bg-[#D8AE56] text-[#1A1203] text-xs font-black flex items-center justify-center shrink-0">2</span>
                  <span>Non-Refundable Booking Amount</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-[#443E35]">
                  <li>The 25% advance booking amount is <strong className="text-[#9B7018]">strictly non-refundable</strong>, as it secures the Artist&apos;s availability for the agreed date and represents a commitment of professional time and scheduling.</li>
                  <li>Once the booking is confirmed, the Client acknowledges and accepts this non-refundable condition.</li>
                  <li>Any exception, including a refund or adjustment in the event of cancellation or rescheduling, shall be at the sole discretion of the management and must be agreed upon in writing.</li>
                  <li>Any applicable rights or remedies under mandatory law shall remain unaffected.</li>
                </ul>
              </div>

              {/* Clause 3 */}
              <div className="bg-[#FAF7F1] p-4 sm:p-5 rounded-2xl border border-[#E8DEC9]">
                <h4 className="font-extrabold text-[#111111] text-sm sm:text-base mb-2.5 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  <span className="w-6 h-6 rounded-full bg-[#D8AE56] text-[#1A1203] text-xs font-black flex items-center justify-center shrink-0">3</span>
                  <span>Artist Fee &amp; Scope of Services</span>
                </h4>
                <p className="mb-2 text-[#443E35]">
                  The fee quoted by Qazi Touqeer Management covers <strong className="text-[#111111]">only the Artist&apos;s performance or appearance fee</strong>, as specifically agreed in writing.
                </p>
                <p className="font-semibold text-[#111111] mb-1">Unless expressly included in the written quotation, the fee does not cover:</p>
                <ul className="list-disc pl-5 space-y-1 text-[#443E35]">
                  <li>Live band, musicians, backing vocalists, or additional performers.</li>
                  <li>Stage construction, stage design, sound systems, lighting, LED screens, or technical equipment.</li>
                  <li>Event production, set design, special effects, or event management.</li>
                  <li>Travel, accommodation, local transportation, meals, or hospitality.</li>
                  <li>Security arrangements, venue permissions, licences, or statutory charges.</li>
                  <li>Taxes, bank charges, or other applicable expenses.</li>
                </ul>
                <p className="mt-2.5 text-[#443E35]">
                  Any additional requirements must be discussed and approved by both parties in writing. The associated costs shall be borne by the Client unless otherwise agreed.
                </p>
              </div>

              {/* Clause 4 */}
              <div className="bg-[#FAF7F1] p-4 sm:p-5 rounded-2xl border border-[#E8DEC9]">
                <h4 className="font-extrabold text-[#111111] text-sm sm:text-base mb-2.5 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  <span className="w-6 h-6 rounded-full bg-[#D8AE56] text-[#1A1203] text-xs font-black flex items-center justify-center shrink-0">4</span>
                  <span>Artist Fee Determination</span>
                </h4>
                <p className="mb-2 text-[#443E35]">The final artist fee will be determined by Qazi Touqeer Management based on factors including:</p>
                <ul className="list-disc pl-5 space-y-1 text-[#443E35]">
                  <li>Type and nature of the event.</li>
                  <li>Event location and travel requirements.</li>
                  <li>Date, duration, and format of the engagement.</li>
                  <li>Public, private, corporate, ticketed, or promotional nature of the event.</li>
                  <li>Performance requirements, scheduling, and other logistical considerations.</li>
                </ul>
                <p className="mt-2.5 text-[#443E35]">
                  All quotations are subject to the Artist&apos;s availability and written approval by the authorised management. The final agreed fee and scope of engagement shall be documented in writing before confirmation.
                </p>
              </div>

              {/* Clause 5 */}
              <div className="bg-[#FAF7F1] p-4 sm:p-5 rounded-2xl border border-[#E8DEC9]">
                <h4 className="font-extrabold text-[#111111] text-sm sm:text-base mb-2.5 flex items-center gap-2" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                  <span className="w-6 h-6 rounded-full bg-[#D8AE56] text-[#1A1203] text-xs font-black flex items-center justify-center shrink-0">5</span>
                  <span>Official Payment Details &amp; Transaction Security</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-[#443E35]">
                  <li>All official booking discussions and payment instructions must be verified through <a href="mailto:info@qaziclub.com" className="text-[#9B7018] font-bold underline hover:text-[#B68938]">info@qaziclub.com</a>.</li>
                  <li>Payments must be made only to the bank account or payment details formally communicated through the official email address after discussion and mutual acceptance by both parties.</li>
                  <li>Clients are strongly advised to verify the beneficiary name, account details, amount, and payment terms before initiating a transaction.</li>
                  <li>Qazi Touqeer Management shall not be responsible for payments made to unauthorised individuals, personal accounts, unverified payment links, or third-party accounts not formally approved in writing by the authorised management.</li>
                  <li>A transaction shall be considered valid only upon official written acknowledgement from Qazi Touqeer Management.</li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-3 text-center">
                <button
                  type="button"
                  onClick={() => setShowTermsModal(false)}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D8AE56] to-[#B68938] text-[#1A1203] font-black uppercase tracking-wider text-xs shadow-md hover:scale-105 transition-transform cursor-pointer"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
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
