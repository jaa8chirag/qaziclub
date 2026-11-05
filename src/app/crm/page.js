'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

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

  // Selected lead for detail modal
  const [activeLead, setActiveLead] = useState(null);

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
    try {
      const res = await fetch(`/api/inquiry.php?action=list&pin=${encodeURIComponent(authPin || pin)}`, {
        headers: {
          'X-Admin-Pin': authPin || pin,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setInquiries(data.data);
        setLastRefreshed(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        // If API returned error or unauthorized
        if (data.error && data.error.includes('Unauthorized')) {
          setAuthenticated(false);
          setPinError('PIN session expired. Please enter again.');
        } else {
          setErrorMsg(data.error || 'No inquiries could be loaded.');
        }
      }
    } catch {
      setErrorMsg('Could not reach backend API. If you are on localhost, this will connect automatically once deployed to cPanel.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch('/api/inquiry.php', {
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
        }),
      });
      const resData = await res.json();
      if (resData.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (activeLead && activeLead.id === id) {
          setActiveLead((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete inquiry #${id}?`)) return;
    try {
      const res = await fetch('/api/inquiry.php', {
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
      const resData = await res.json();
      if (resData.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (activeLead && activeLead.id === id) {
          setActiveLead(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete inquiry', err);
    }
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q));

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
  }, [inquiries, searchQuery, selectedStatus, selectedCategory]);

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
                className="w-full bg-[#221F1C] border-2 border-[#38332C] focus:border-[#D8AE56] text-white px-4 py-3.5 rounded-xl text-base tracking-widest outline-none transition-all placeholder:text-[#6E675C]"
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
            {/* Refresh Button */}
            <button
              onClick={() => fetchInquiries(pin)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#221F1C] hover:bg-[#2B2723] text-xs font-bold text-[#EAE5D9] border border-[#38332C] transition-colors cursor-pointer"
            >
              <span className={`material-symbols-outlined text-[16px] text-[#D8AE56] ${loading ? 'animate-spin' : ''}`}>sync</span>
              <span className="hidden sm:inline">{loading ? 'Syncing...' : 'Refresh'}</span>
            </button>

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
        {/* KPI Stats Row with Requested Color Coding */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#141210] border border-[#292520] rounded-2xl p-4 sm:p-5">
            <span className="text-[11px] font-bold text-[#A8A29E] uppercase tracking-wider block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
              Total Inquiries
            </span>
            <div className="text-2xl sm:text-4xl font-black text-white mt-1" style={{ fontFamily: 'Bodoni Moda, serif' }}>
              {stats.total}
            </div>
            <span className="text-[11px] text-[#7A7366] mt-1 block">All registered leads</span>
          </div>

          <div className="bg-[#141210] border-2 border-emerald-500/40 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                New (Green)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-emerald-400 mt-1" style={{ fontFamily: 'Bodoni Moda, serif' }}>
              {stats.newCount}
            </div>
            <span className="text-[11px] text-[#A8A29E] mt-1 block">Fresh inquiries</span>
          </div>

          <div className="bg-[#141210] border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                In Progress (Amber)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-amber-400 mt-1" style={{ fontFamily: 'Bodoni Moda, serif' }}>
              {stats.inProgressCount}
            </div>
            <span className="text-[11px] text-[#A8A29E] mt-1 block">Follow-up underway</span>
          </div>

          <div className="bg-[#141210] border-2 border-rose-500/40 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-rose-400 uppercase tracking-wider block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                Closed (Red)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-rose-400 mt-1" style={{ fontFamily: 'Bodoni Moda, serif' }}>
              {stats.closedCount}
            </div>
            <span className="text-[11px] text-[#A8A29E] mt-1 block">Resolved / Completed</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-[#141210] border border-[#292520] rounded-2xl p-4 sm:p-6 space-y-4">
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
                className="w-full bg-[#1C1A17] border border-[#332E27] focus:border-[#D8AE56] text-white pl-11 pr-4 py-3 rounded-xl text-sm outline-none placeholder:text-[#6E675C]"
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

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap text-xs pt-1 border-t border-[#221F1C]">
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
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#D8AE56]" style={{ fontFamily: 'Space Grotesk, monospace' }}>
              Queries &amp; Client Leads ({filteredInquiries.length})
            </h2>
            {lastRefreshed && (
              <span className="text-[11px] text-[#7A7366]">Last synced: {lastRefreshed}</span>
            )}
          </div>

          {filteredInquiries.length === 0 ? (
            <div className="bg-[#141210] border border-[#292520] rounded-2xl p-12 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#7A7366]">inbox</span>
              <h3 className="text-base font-bold text-white">No inquiries found</h3>
              <p className="text-xs text-[#A8A29E] max-w-sm mx-auto">
                {inquiries.length === 0
                  ? 'There are currently no inquiries recorded in the CRM. Any form filled on the website will instantly appear here.'
                  : 'No inquiries match your current search or filter criteria.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredInquiries.map((item) => {
                const isMeetQazi = (item.category || '').toLowerCase().includes('meet');
                const rawStatus = (item.status || 'new').toLowerCase();
                const isNew = rawStatus === 'new';
                const isInProgress = rawStatus === 'in-progress' || rawStatus === 'in_progress' || rawStatus === 'contacted';
                const isClosed = rawStatus === 'closed';

                return (
                  <div
                    key={item.id}
                    className={`bg-[#141210] border-2 rounded-2xl p-5 sm:p-6 transition-all space-y-4 ${
                      isNew
                        ? 'border-emerald-500/50 shadow-[0_4px_25px_rgba(16,185,129,0.15)] bg-gradient-to-r from-emerald-950/10 via-[#141210] to-[#141210]'
                        : isInProgress
                        ? 'border-amber-500/50 shadow-[0_4px_25px_rgba(245,158,11,0.15)] bg-gradient-to-r from-amber-950/10 via-[#141210] to-[#141210]'
                        : 'border-rose-500/40 opacity-80 hover:opacity-100 bg-gradient-to-r from-rose-950/10 via-[#141210] to-[#141210]'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#221F1C]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#221F1C] border border-[#332E27] text-[#D8AE56]" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                            #{item.id}
                          </span>

                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#221F1C] text-[#A8A29E]">
                            {item.source || 'Website'}
                          </span>

                          {isMeetQazi ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D8AE56] to-[#B68938] text-[#141210]">
                              Meet Qazi in Person
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1C1A17] border border-[#38332C] text-[#F3D084]">
                              {item.category || 'General'}
                            </span>
                          )}

                          {/* Status Indicator Badges: New = Green, In Progress = Amber, Closed = Red */}
                          {isNew && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white animate-pulse flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                              New
                            </span>
                          )}
                          {isInProgress && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 border border-amber-500/60 text-amber-300 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              In Progress
                            </span>
                          )}
                          {isClosed && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-950/40 border border-rose-500/50 text-rose-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                              Closed
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white pt-1">
                          {item.name || '(No Name Provided)'}
                        </h3>
                      </div>

                      {/* Status Selector & Actions with explicit Color Coding */}
                      <div className="flex items-center gap-2">
                        <select
                          value={isInProgress ? 'in-progress' : isClosed ? 'closed' : 'new'}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-xs font-black px-3.5 py-2 rounded-xl border-2 outline-none cursor-pointer uppercase tracking-wider transition-all shadow-sm ${
                            isNew
                              ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 hover:bg-emerald-950/80 focus:ring-2 focus:ring-emerald-500/40'
                              : isInProgress
                              ? 'bg-amber-950/50 border-amber-500 text-amber-300 hover:bg-amber-950/80 focus:ring-2 focus:ring-amber-500/40'
                              : 'bg-rose-950/50 border-rose-500 text-rose-300 hover:bg-rose-950/80 focus:ring-2 focus:ring-rose-500/40'
                          }`}
                          style={{ fontFamily: 'Space Grotesk, monospace' }}
                        >
                          <option value="new" className="bg-[#1C1A17] text-emerald-400 font-bold">🟢 New</option>
                          <option value="in-progress" className="bg-[#1C1A17] text-amber-400 font-bold">🟡 In Progress</option>
                          <option value="closed" className="bg-[#1C1A17] text-rose-400 font-bold">🔴 Closed</option>
                        </select>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-8 h-8 rounded-lg bg-[#1C1A17] hover:bg-red-950/50 text-[#7A7366] hover:text-red-400 border border-[#292520] hover:border-red-900 flex items-center justify-center transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Middle Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      {/* Phone & Direct WhatsApp */}
                      <div className="space-y-1">
                        <span className="text-[#7A7366] uppercase tracking-wider font-bold text-[10px] block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                          Phone / WhatsApp
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">{item.phone || 'N/A'}</span>
                          {item.phone && (
                            <a
                              href={getWhatsAppLink(item.phone, item.name)}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-0.5 rounded-md bg-[#25D366] text-[#0C0B0A] font-black text-[10px] hover:brightness-110 flex items-center gap-1"
                              title="Chat on WhatsApp"
                            >
                              <span>WA</span>
                              <span className="material-symbols-outlined text-[12px]">chat</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <span className="text-[#7A7366] uppercase tracking-wider font-bold text-[10px] block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                          Email Address
                        </span>
                        <div>
                          {item.email ? (
                            <a
                              href={`mailto:${item.email}?subject=Qazi%20Touqeer%20Inquiry%20Response`}
                              className="font-semibold text-[#D8AE56] hover:underline break-all"
                            >
                              {item.email}
                            </a>
                          ) : (
                            <span className="text-[#7A7366]">N/A</span>
                          )}
                        </div>
                      </div>

                      {/* City / Location */}
                      <div className="space-y-1">
                        <span className="text-[#7A7366] uppercase tracking-wider font-bold text-[10px] block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                          City / Venue
                        </span>
                        <span className="font-semibold text-white">{item.city || 'Not specified'}</span>
                      </div>

                      {/* Target Date & Slot / Duration */}
                      <div className="space-y-1">
                        <span className="text-[#7A7366] uppercase tracking-wider font-bold text-[10px] block" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                          {isMeetQazi ? 'Meeting Date & Duration' : 'Event Date & Slot'}
                        </span>
                        <div className="font-semibold text-[#F3D084]">
                          {item.event_date ? item.event_date : 'Flexible'}
                          {item.slot_or_duration && ` • ${item.slot_or_duration}`}
                        </div>
                      </div>
                    </div>

                    {/* Message / Requirements Section */}
                    {item.message && (
                      <div className="p-3.5 rounded-xl bg-[#1C1A17] border border-[#26221E] text-xs text-[#D5CEBF] leading-relaxed">
                        <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider font-bold block mb-1" style={{ fontFamily: 'Space Grotesk, monospace' }}>
                          Inquiry Message / Requirement:
                        </span>
                        <p className="whitespace-pre-line">{item.message}</p>
                      </div>
                    )}

                    {/* Timestamp & IP Footer */}
                    <div className="flex items-center justify-between text-[11px] text-[#7A7366] pt-1">
                      <span>Received: {item.created_at || 'Just now'}</span>
                      <button
                        onClick={() => setActiveLead(item)}
                        className="text-[#D8AE56] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Full Details</span>
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </button>
                    </div>
                  </div>
                );
              })}
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
                <span className="text-[#7A7366] block font-bold mb-1">CLIENT PHONE</span>
                <span className="font-semibold text-white text-sm">{activeLead.phone || 'N/A'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#1C1A17] border border-[#292520]">
                <span className="text-[#7A7366] block font-bold mb-1">EMAIL ADDRESS</span>
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
    </div>
  );
}

