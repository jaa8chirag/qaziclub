'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContactFooter from '@/components/ContactFooter';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion states
  const [openFaqs, setOpenFaqs] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
    faq4: false,
  });

  const toggleFaq = (key) => {
    setOpenFaqs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface text-on-surface">
      <Navbar />

      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        {/* Top Background Ambient Atmosphere */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-b from-primary/10 via-primary-container/5 to-transparent blur-[120px] pointer-events-none"></div>
          <div className="absolute top-48 right-12 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

          {/* Hero Header */}
          <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-10 pb-16 relative z-10">
            <div className="flex flex-col items-start max-w-4xl space-y-4">
              {/* Tagline Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high shadow-sm border border-outline-variant/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span
                  className="font-label-sm text-[11px] uppercase tracking-widest text-primary font-semibold"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Direct Single-Window Artist Management
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-headline-lg text-4xl md:text-6xl text-on-surface tracking-tight"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Connect Directly with <span className="text-primary italic font-headline-lg">QAZI</span> Management
              </h1>

              {/* Subtitle */}
              <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Eliminate middlemen and unauthorized agencies. Direct routing guarantees instant calendar lock, authentic rider execution, and contractual transparency worldwide.
              </p>

              {/* Live Status Metric Strip */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-on-surface">
                <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-xl shadow-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                  <span
                    className="font-label-sm text-[11px] text-secondary uppercase tracking-wider font-semibold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Official Representation Only
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-xl shadow-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                  <span
                    className="font-label-sm text-[11px] text-secondary uppercase tracking-wider font-semibold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Avg. Response: &lt; 120 Mins
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-xl shadow-sm border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[18px]">encrypted</span>
                  <span
                    className="font-label-sm text-[11px] text-secondary uppercase tracking-wider font-semibold"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    256-Bit Escrow Protocol
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Form & Key Locations (Side-by-Side Grid) */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(20,19,18,0.08)] relative overflow-hidden border-2 border-[#D7CEBE]">
              <div className="flex items-center justify-between pb-5 border-b border-[#E6DFD1]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9B7018]"></span>
                    <span
                      className="text-xs uppercase tracking-widest text-[#9B7018] font-extrabold"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Quick Contact
                    </span>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl text-[#111111] font-bold"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    Send Us a Message
                  </h2>
                </div>
                <span
                  className="text-xs text-[#524E46] uppercase tracking-wider hidden sm:block font-bold"
                  style={{ fontFamily: 'Space Grotesk, monospace' }}
                >
                  Direct Management
                </span>
              </div>

              <form className="space-y-5 pt-6" onSubmit={handleTransmit}>
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-[#141210] uppercase tracking-wider"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Your Name <span className="text-[#9B7018] font-black">*</span>
                    </label>
                    <input
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                      placeholder="e.g. Rahul Sharma"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-[#141210] uppercase tracking-wider"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Email Address <span className="text-[#9B7018] font-black">*</span>
                    </label>
                    <input
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                      placeholder="e.g. rahul@example.com"
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Phone & Address/City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-[#141210] uppercase tracking-wider"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Phone / WhatsApp Number <span className="text-[#9B7018] font-black">*</span>
                    </label>
                    <input
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                      placeholder="e.g. +91 98200 00000"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-bold text-[#141210] uppercase tracking-wider"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      City / Address <span className="text-[#9B7018] font-black">*</span>
                    </label>
                    <input
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                      placeholder="e.g. Mumbai, Maharashtra"
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                {/* Manual Subject / Inquiry Input */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-bold text-[#141210] uppercase tracking-wider"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Subject / Purpose of Contact <span className="text-[#9B7018] font-black">*</span>
                  </label>
                  <input
                    className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
                    placeholder="e.g. Brand Partnership, Media Interview, Special Request, or General Query"
                    required
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    className="block text-sm font-bold text-[#141210] uppercase tracking-wider"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Your Message <span className="text-[#9B7018] font-black">*</span>
                  </label>
                  <textarea
                    className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-medium text-base placeholder:text-[#7A7366] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none resize-none"
                    placeholder="Write your message or inquiry here..."
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                {/* Success Alert */}
                {submitted && (
                  <div className="p-4 rounded-xl bg-[#FAF5EC] text-[#9B7018] flex items-center gap-3 shadow-md border-2 border-[#D8AE56]/50">
                    <span className="material-symbols-outlined text-[28px]">verified</span>
                    <div className="space-y-0.5">
                      <p
                        className="text-sm uppercase font-bold"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Message Sent Successfully!
                      </p>
                      <p className="text-sm text-[#38342D] font-medium">
                        Thank you for reaching out. Qazi Management will get back to you shortly.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                {!submitted && (
                  <div className="pt-2 space-y-3">
                    <button
                      className="w-full py-4.5 px-6 rounded-xl bg-gradient-to-r from-[#D8AE56] via-[#F3D084] to-[#B68938] hover:opacity-95 text-[#1A1203] text-base uppercase font-black tracking-widest transition-all duration-300 shadow-[0_8px_30px_rgba(216,174,86,0.45)] hover:shadow-[0_12px_40px_rgba(216,174,86,0.65)] flex items-center justify-center gap-2.5 cursor-pointer group border-none hover:scale-[1.01]"
                      disabled={submitting}
                      type="submit"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      {submitting ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[22px]">sync</span>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[22px] transition-transform duration-300 group-hover:scale-110">send</span>
                          <span>SEND MESSAGE</span>
                        </>
                      )}
                    </button>

                    <div
                      className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#443E35] text-xs uppercase tracking-wider font-bold text-center pt-2"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#9B7018] text-[18px]">verified</span>
                        <span>Direct Management Liaison</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#9B7018] text-[18px]">lock</span>
                        <span>100% Confidential &amp; Encrypted</span>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Key Locations Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(20,19,18,0.08)] border-2 border-[#D7CEBE] space-y-6">
                <div className="border-b border-[#E6DFD1] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9B7018]"></span>
                    <span
                      className="text-xs uppercase tracking-widest text-[#9B7018] font-extrabold"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Official Hubs
                    </span>
                  </div>
                  <h3
                    className="text-2xl text-[#111111] font-bold mt-1"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    Key Locations
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {/* Primary Official Email Desk */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D8AE56]/15 via-white to-transparent border-2 border-[#D8AE56] shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-[#9B7018] text-[20px]">verified</span>
                      <h4
                        className="text-base font-bold text-[#111111] uppercase tracking-wider"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Official Artist Desk
                      </h4>
                    </div>
                    <a
                      href="mailto:info@qaziclub.com"
                      className="inline-flex items-center gap-2 text-sm font-black text-[#9B7018] hover:underline transition-colors"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span className="material-symbols-outlined text-[18px]">mail</span>
                      <span>info@qaziclub.com</span>
                    </a>
                  </div>

                  {/* Mumbai */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD1] hover:border-[#D8AE56] transition-all duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-5 rounded overflow-hidden shadow-sm shrink-0 border border-black/10">
                        <svg className="w-full h-full object-cover" viewBox="0 0 640 480">
                          <path fill="#f93" d="M0 0h640v160H0z"/>
                          <path fill="#fff" d="M0 160h640v160H0z"/>
                          <path fill="#128807" d="M0 320h640v160H0z"/>
                          <circle cx="320" cy="240" r="40" fill="none" stroke="#008" strokeWidth="8"/>
                          <circle cx="320" cy="240" r="8" fill="#008"/>
                        </svg>
                      </div>
                      <h4
                        className="text-lg font-bold text-[#111111] tracking-wide"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Mumbai
                      </h4>
                    </div>
                    <a
                      href="mailto:mumbai@qaziclub.com"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#87672D] hover:text-[#B68938] transition-colors"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#9B7018]">mail</span>
                      <span>mumbai@qaziclub.com</span>
                    </a>
                  </div>

                  {/* Greater Noida */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD1] hover:border-[#D8AE56] transition-all duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-5 rounded overflow-hidden shadow-sm shrink-0 border border-black/10">
                        <svg className="w-full h-full object-cover" viewBox="0 0 640 480">
                          <path fill="#f93" d="M0 0h640v160H0z"/>
                          <path fill="#fff" d="M0 160h640v160H0z"/>
                          <path fill="#128807" d="M0 320h640v160H0z"/>
                          <circle cx="320" cy="240" r="40" fill="none" stroke="#008" strokeWidth="8"/>
                          <circle cx="320" cy="240" r="8" fill="#008"/>
                        </svg>
                      </div>
                      <h4
                        className="text-lg font-bold text-[#111111] tracking-wide"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Greater Noida
                      </h4>
                    </div>
                    <a
                      href="mailto:noida@qaziclub.com"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#87672D] hover:text-[#B68938] transition-colors"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#9B7018]">mail</span>
                      <span>noida@qaziclub.com</span>
                    </a>
                  </div>

                  {/* London */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD1] hover:border-[#D8AE56] transition-all duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-5 rounded overflow-hidden shadow-sm shrink-0 border border-black/10">
                        <svg className="w-full h-full object-cover" viewBox="0 0 640 480">
                          <path fill="#012169" d="M0 0h640v480H0z"/>
                          <path fill="#fff" d="m75 0 245 180L565 0h75v50L440 240l200 150v90h-75L320 300 75 480H0v-50l200-150L0 90V0h75z"/>
                          <path fill="#c8102e" d="m424 281 216 159v40h-20L380 300h44zm-208-82L0 40V0h20l240 180h-44zm374-199v30L430 160h50L640 40V0h-50zM0 440v40h50L210 320h-50L0 440z"/>
                          <path fill="#fff" d="M240 0h160v480H240zM0 160h640v160H0z"/>
                          <path fill="#c8102e" d="M280 0h80v480h-80zM0 200h640v80H0z"/>
                        </svg>
                      </div>
                      <h4
                        className="text-lg font-bold text-[#111111] tracking-wide"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        London
                      </h4>
                    </div>
                    <a
                      href="mailto:london@qaziclub.com"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#87672D] hover:text-[#B68938] transition-colors"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#9B7018]">mail</span>
                      <span>london@qaziclub.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Performance Visual Anchor Banner */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-16 w-full">
          <div
            className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl flex items-end p-8 md:p-12 border border-outline-variant/30 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGjmYiOqH5EBOkh2mJ1r5PDUUKkli_B_pBhsyF94nqdxvmdhsRh_ao7V3KLqLZC-2l2Icm7sHWexJq9tqgJ-9u3ewFSk2xeiMH8kgX1dDaCmwGVyhfn-F5mojBJCqqRE-2DIgfaeEuWEVRHUP9wzDFKe_c3FLCORUFbDFuyPY3g3K0slDxKm_swE8CXknYNQHUFrIZpyKSpsvorHIAA3ugWClhMgxSrONDahRo5EoplrN-nA1ZoHow')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
            <div className="relative z-10 max-w-2xl space-y-2">
              <span
                className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-semibold block"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                Uncompromising Theatrical Grandeur
              </span>
              <h3
                className="font-headline-md text-2xl md:text-3xl text-on-surface font-semibold"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Pioneering Live Sonic Experiences Worldwide
              </h3>
              <p className="text-xs md:text-sm text-on-surface-variant">
                Over 140 arena spectacles across 22 countries. Curated with proprietary quad-sound design and custom pyrotechnic choreography.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion for Organizers & Promoters */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pb-16 w-full">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span
                className="font-label-sm text-[10px] uppercase text-secondary tracking-widest font-semibold block"
                style={{ fontFamily: 'Space Grotesk, monospace' }}
              >
                Organizer Knowledge Base
              </span>
              <h2
                className="font-headline-md text-2xl md:text-3xl text-on-surface"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Tour Promoter & Event FAQ
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant max-w-xl mx-auto">
                Essential protocols for verified talent buyers, arena operators, and enterprise coordinators.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {/* FAQ 1 */}
              <div className="bg-surface-container-low rounded-xl shadow-md overflow-hidden border border-outline-variant/30">
                <button
                  type="button"
                  className="w-full text-left p-5 flex items-center justify-between text-on-surface hover:text-primary transition-colors focus:outline-none cursor-pointer"
                  onClick={() => toggleFaq('faq1')}
                >
                  <span className="font-title-lg text-sm md:text-base font-semibold" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    What is the standard booking confirmation turnaround time?
                  </span>
                  <span className={`material-symbols-outlined text-primary text-[24px] transform transition-transform duration-300 ${openFaqs.faq1 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openFaqs.faq1 && (
                  <div className="px-5 pb-5 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">
                    For authenticated promoters and verified enterprise accounts, the direct calendar clearance turnaround is guaranteed under 4 hours. Once the date hold is granted, the rider acknowledgment and standard contract execution take 24–48 hours via our secure legal portal.
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="bg-surface-container-low rounded-xl shadow-md overflow-hidden border border-outline-variant/30">
                <button
                  type="button"
                  className="w-full text-left p-5 flex items-center justify-between text-on-surface hover:text-primary transition-colors focus:outline-none cursor-pointer"
                  onClick={() => toggleFaq('faq2')}
                >
                  <span className="font-title-lg text-sm md:text-base font-semibold" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    How does QAZI handle international visas, customs, and carnets?
                  </span>
                  <span className={`material-symbols-outlined text-primary text-[24px] transform transition-transform duration-300 ${openFaqs.faq2 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openFaqs.faq2 && (
                  <div className="px-5 pb-5 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">
                    Our in-house logistics cell maintains expedited standing P-1/O-1 artist visas for the United States, multi-entry European Schengen work permits, and UAE golden artist visas. All technical backline flies under global ATA Carnet with dedicated tour cargo handlers, minimizing logistical friction at customs checkpoints.
                  </div>
                )}
              </div>

              {/* FAQ 3 */}
              <div className="bg-surface-container-low rounded-xl shadow-md overflow-hidden border border-outline-variant/30">
                <button
                  type="button"
                  className="w-full text-left p-5 flex items-center justify-between text-on-surface hover:text-primary transition-colors focus:outline-none cursor-pointer"
                  onClick={() => toggleFaq('faq3')}
                >
                  <span className="font-title-lg text-sm md:text-base font-semibold" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    What sound and technical specifications are strictly non-negotiable?
                  </span>
                  <span className={`material-symbols-outlined text-primary text-[24px] transform transition-transform duration-300 ${openFaqs.faq3 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openFaqs.faq3 && (
                  <div className="px-5 pb-5 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">
                    To preserve the trademark QAZI cinematic sonic fidelity, headline productions require L-Acoustics (K1 / K2 series) or d&b audiotechnik (GSL / KSL series) systems calibrated by our touring system engineer. Shure Axient Digital wireless microphones and DiGiCo Quantum series consoles are mandatory on all riders without substitution.
                  </div>
                )}
              </div>

              {/* FAQ 4 */}
              <div className="bg-surface-container-low rounded-xl shadow-md overflow-hidden border border-outline-variant/30">
                <button
                  type="button"
                  className="w-full text-left p-5 flex items-center justify-between text-on-surface hover:text-primary transition-colors focus:outline-none cursor-pointer"
                  onClick={() => toggleFaq('faq4')}
                >
                  <span className="font-title-lg text-sm md:text-base font-semibold" style={{ fontFamily: 'Bodoni Moda, serif' }}>
                    What are the protocols for private VIP or ultra-exclusive events?
                  </span>
                  <span className={`material-symbols-outlined text-primary text-[24px] transform transition-transform duration-300 ${openFaqs.faq4 ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                {openFaqs.faq4 && (
                  <div className="px-5 pb-5 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">
                    Private performances require a mutual Non-Disclosure Agreement (NDA) executed prior to rider dispatch. For private estate or island locations, the promoter provides dedicated executive ground transport or private air logistics in line with our tier-1 security directive.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactFooter />
    </div>
  );
}
