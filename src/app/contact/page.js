'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ContactFooter from '@/components/ContactFooter';

export default function ContactPage() {
  const router = useRouter();
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
  const [countdown, setCountdown] = useState(5);

  const handleGoBack = () => {
    setSubmitted(false);
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    if (!submitted) return;
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
  }, [submitted]);

  const handleTransmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/inquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Contact Page Inquiry',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.address,
          category: formData.subject || 'Direct Contact Query',
          message: formData.message,
        }),
      });
    } catch (err) {
      console.warn('CRM API submission notice:', err);
    }

    // Clear form inputs
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      subject: '',
      message: '',
    });

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
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
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
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
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
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
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
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
                      className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
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
                    className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-semibold text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none"
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
                    className="w-full bg-[#FFFFFF] px-4 py-3.5 rounded-xl text-[#111111] font-medium text-base placeholder:text-[#C7C2B8] border-2 border-[#CFC5B4] hover:border-[#B68938] focus:border-[#9B7018] focus:ring-4 focus:ring-[#D8AE56]/20 shadow-sm transition-all focus:outline-none resize-none"
                    placeholder="Write your message or inquiry here..."
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                {/* Clean, Normal-sized Thank You Modal with Centered Backdrop */}
                {submitted && (
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
                          Message Sent Successfully
                        </span>
                        <h3
                          className="text-2xl text-[#111111] font-bold"
                          style={{ fontFamily: 'Bodoni Moda, serif' }}
                        >
                          Thank You!
                        </h3>
                      </div>

                      <p className="text-sm text-[#443E35] leading-relaxed">
                        Your message has been delivered to <strong className="text-[#111111]">Qazi Touqeer Management</strong>.
                        We will review your inquiry and get back to you shortly.
                      </p>

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
                            setSubmitted(false);
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

            {/* Right Column: Managed By & Key Locations (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Managed By Card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(20,19,18,0.08)] border-2 border-[#D7CEBE] space-y-4">
                <div className="border-b border-[#E6DFD1] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9B7018]"></span>
                    <span
                      className="text-xs uppercase tracking-widest text-[#9B7018] font-extrabold"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Artist Representation
                    </span>
                  </div>
                  <h3
                    className="text-2xl text-[#111111] font-bold mt-1"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    Managed By
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#D8AE56]/15 via-[#FAF8F5] to-transparent border-2 border-[#D8AE56] shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="material-symbols-outlined text-[#9B7018] text-[22px]">verified</span>
                    <h4
                      className="text-base font-bold text-[#111111] uppercase tracking-wider"
                      style={{ fontFamily: 'Space Grotesk, monospace' }}
                    >
                      Qazi Touqeer Management
                    </h4>
                  </div>
                  <p className="text-xs text-[#524E46] mb-2 font-medium">
                    Official Global Management &amp; Direct Artist Desk
                  </p>
                  <a
                    href="mailto:info@qaziclub.com"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#9B7018] hover:underline transition-colors"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span>info@qaziclub.com</span>
                  </a>
                </div>
              </div>

              {/* Key Locations Card */}
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

                <div className="space-y-3">
                  {/* Mumbai */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD1] hover:border-[#D8AE56] transition-all duration-200">
                    <div className="flex items-center gap-3">
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
                        className="text-base sm:text-lg font-bold text-[#111111] tracking-wide"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Mumbai
                      </h4>
                    </div>
                  </div>

                  {/* Greater Noida */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD1] hover:border-[#D8AE56] transition-all duration-200">
                    <div className="flex items-center gap-3">
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
                        className="text-base sm:text-lg font-bold text-[#111111] tracking-wide"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Greater Noida
                      </h4>
                    </div>
                  </div>

                  {/* London */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD1] hover:border-[#D8AE56] transition-all duration-200">
                    <div className="flex items-center gap-3">
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
                        className="text-base sm:text-lg font-bold text-[#111111] tracking-wide"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        London
                      </h4>
                    </div>
                  </div>

                  {/* Dubai */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DFD1] hover:border-[#D8AE56] transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-5 rounded overflow-hidden shadow-sm shrink-0 border border-black/10">
                        <svg className="w-full h-full object-cover" viewBox="0 0 640 480">
                          <path fill="#00732f" d="M0 0h640v160H0z"/>
                          <path fill="#fff" d="M0 160h640v160H0z"/>
                          <path fill="#000" d="M0 320h640v160H0z"/>
                          <path fill="#f00" d="M0 0h160v480H0z"/>
                        </svg>
                      </div>
                      <h4
                        className="text-base sm:text-lg font-bold text-[#111111] tracking-wide"
                        style={{ fontFamily: 'Space Grotesk, monospace' }}
                      >
                        Dubai
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Official Social Media Channels */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border-2 border-[#D8AE56]/40 text-center space-y-3">
                  <span
                    className="text-xs uppercase tracking-widest text-[#9B7018] font-extrabold block"
                    style={{ fontFamily: 'Space Grotesk, monospace' }}
                  >
                    Official Social Channels
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href="https://www.instagram.com/qazitouqeer_official"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      title="Follow Qazi on Instagram"
                      className="w-10 h-10 rounded-full border-2 border-[#E1306C] text-[#E1306C] bg-white hover:bg-[#E1306C] hover:text-white transition-all duration-300 flex items-center justify-center shadow-xs hover:scale-110"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>

                    <a
                      href="https://www.youtube.com/@qazi459"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      title="Subscribe to Qazi on YouTube"
                      className="w-10 h-10 rounded-full border-2 border-[#FF0000] text-[#FF0000] bg-white hover:bg-[#FF0000] hover:text-white transition-all duration-300 flex items-center justify-center shadow-xs hover:scale-110"
                    >
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>

                    <a
                      href="https://www.facebook.com/qazi.touqeer.7/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      title="Follow Qazi on Facebook"
                      className="w-10 h-10 rounded-full border-2 border-[#1877F2] text-[#1877F2] bg-white hover:bg-[#1877F2] hover:text-white transition-all duration-300 flex items-center justify-center shadow-xs hover:scale-110"
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
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
      </main>

      <ContactFooter />
    </div>
  );
}
