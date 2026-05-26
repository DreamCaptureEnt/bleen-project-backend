import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight, Building2, Search, X, ChevronDown, LayoutGrid, List, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../api';

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(value));
}

const ACCENTS = [
  {
    bar: 'bg-gradient-to-r from-teal-400 to-teal-600',
    icon: 'bg-teal-50 text-teal-600',
    badge: 'bg-teal-50 text-teal-700 border-teal-200',
    btn: 'bg-teal-600 hover:bg-teal-700 shadow-teal-200',
    glow: 'hover:shadow-teal-100',
    num: 'text-teal-100',
  },
  {
    bar: 'bg-gradient-to-r from-blue-400 to-blue-600',
    icon: 'bg-blue-50 text-blue-600',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    btn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200',
    glow: 'hover:shadow-blue-100',
    num: 'text-blue-100',
  },
  {
    bar: 'bg-gradient-to-r from-violet-400 to-violet-600',
    icon: 'bg-violet-50 text-violet-600',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    btn: 'bg-violet-600 hover:bg-violet-700 shadow-violet-200',
    glow: 'hover:shadow-violet-100',
    num: 'text-violet-100',
  },
  {
    bar: 'bg-gradient-to-r from-amber-400 to-amber-600',
    icon: 'bg-amber-50 text-amber-600',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    btn: 'bg-amber-600 hover:bg-amber-700 shadow-amber-200',
    glow: 'hover:shadow-amber-100',
    num: 'text-amber-100',
  },
  {
    bar: 'bg-gradient-to-r from-rose-400 to-rose-600',
    icon: 'bg-rose-50 text-rose-600',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    btn: 'bg-rose-600 hover:bg-rose-700 shadow-rose-200',
    glow: 'hover:shadow-rose-100',
    num: 'text-rose-100',
  },
  {
    bar: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    icon: 'bg-emerald-50 text-emerald-600',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    btn: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200',
    glow: 'hover:shadow-emerald-100',
    num: 'text-emerald-100',
  },
];

/* Staggered fade-up animation via inline style */
function AnimatedCard({ children, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(t);
  }, [index]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
      }}
    >
      {children}
    </div>
  );
}

function DivisionCard({ division, index, view }) {
  const a = ACCENTS[index % ACCENTS.length];
  const [hovered, setHovered] = useState(false);

  if (view === 'list') {
    return (
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${a.glow}`}
      >
        {/* Coloured left border accent */}
        <div className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${a.bar}`} style={{ position: 'static', width: 4, borderRadius: 99, flexShrink: 0, alignSelf: 'stretch' }} />
        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl ${a.icon} transition-transform duration-300 ${hovered ? 'scale-110' : ''}`}>
          <Building2 size={26} />
        </div>
        <div className="min-w-0 flex-1">
          <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${a.badge}`}>
            Division
          </span>
          <h2 className="mt-1 truncate text-xl font-black text-slate-900">{division.name}</h2>
          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Calendar size={11} />
            Added {formatDate(division.created_at)}
          </div>
        </div>
        <Link
          to={`/products?division=${division.id}`}
          className={`shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:gap-3 ${a.btn}`}
        >
          Products <ArrowRight size={14} />
        </Link>
      </article>
    );
  }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${a.glow}`}
    >
      {/* Top colour bar */}
      <div className={`h-1.5 w-full ${a.bar}`} />

      {/* Large faded number watermark */}
      <span
        className={`pointer-events-none absolute right-4 top-3 select-none text-6xl font-black ${a.num} transition-all duration-300 ${hovered ? 'opacity-100 scale-110' : 'opacity-40'}`}
        style={{ lineHeight: 1 }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="p-7">
        {/* Icon */}
        <div className={`inline-grid h-14 w-14 place-items-center rounded-2xl ${a.icon} transition-transform duration-300 ${hovered ? 'scale-110 rotate-3' : ''}`}>
          <Building2 size={26} />
        </div>

        {/* Badge */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${a.badge}`}>
            Division
          </span>
        </div>

        {/* Name */}
        <h2 className="mt-2 text-2xl font-black leading-tight text-slate-900 transition-colors duration-200 group-hover:text-slate-700">
          {division.name}
        </h2>

        {/* Meta */}
        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <Calendar size={11} />
          Added {formatDate(division.created_at)}
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gradient-to-r from-slate-100 via-slate-200 to-transparent" />

        {/* CTA */}
        <Link
          to={`/products?division=${division.id}`}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:gap-3 hover:shadow-xl ${a.btn}`}
        >
          View Products <ArrowRight size={14} />
        </Link>
      </div>

      {/* Bottom shimmer line on hover */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 ${a.bar} transition-all duration-500 ${hovered ? 'w-full' : 'w-0'}`}
      />
    </article>
  );
}

export default function Divisions() {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [view, setView] = useState('grid');
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    api.divisions({ page_size: 100 })
      .then((data) => { setDivisions(data.results); setError(''); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...divisions];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((d) => d.name.toLowerCase().includes(q));
    }
    list.sort(sort === 'name'
      ? (a, b) => a.name.localeCompare(b.name)
      : (a, b) => new Date(b.created_at) - new Date(a.created_at));
    return list;
  }, [divisions, search, sort]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-navy to-teal px-4 py-24 text-white sm:px-6">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-teal/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-56 w-56 rounded-full bg-blue-400/15 blur-2xl" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-white/5 blur-xl" />

        <div
          className="relative mx-auto max-w-6xl"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-teal-300" />
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/60">Our Divisions</p>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
            Business<br />
            <span className="text-teal-300">Divisions</span>
          </h1>
          <p
            className="mt-5 max-w-xl text-base leading-7 text-white/70"
            style={{ transitionDelay: '0.1s', opacity: heroVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.15s' }}
          >
            Every division is managed from the backend and rendered here in real time.
            Click any division to browse its full product catalogue.
          </p>

          {/* Stats row */}
          <div
            className="mt-8 flex flex-wrap gap-4"
            style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}
          >
            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3.5 backdrop-blur-sm">
              <Building2 size={20} className="text-teal-300" />
              <div>
                <p className="text-2xl font-black leading-none">{divisions.length}</p>
                <p className="mt-0.5 text-xs font-semibold text-white/60">Active Divisions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky filter bar ── */}
      <section className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
          <div className="relative min-w-[180px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search divisions…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-8 text-sm font-semibold text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="relative">
            <ChevronDown size={13} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-8 text-sm font-semibold text-slate-700 outline-none focus:border-teal-400"
            >
              <option value="name">A – Z</option>
              <option value="date">Newest First</option>
            </select>
          </div>
          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-2.5 transition ${view === 'grid' ? 'bg-teal text-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-2.5 transition ${view === 'list' ? 'bg-teal text-white' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <List size={15} />
            </button>
          </div>
          <span className="ml-auto text-sm font-semibold text-slate-400">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* ── Cards grid ── */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
        )}

        {loading ? (
          <div className={`grid gap-6 ${view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl bg-white" />
            ))}
          </div>
        ) : filtered.length ? (
          <div className={`grid gap-5 ${view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
            {filtered.map((d, i) => (
              <AnimatedCard key={d.id} index={i}>
                <DivisionCard division={d} index={divisions.indexOf(d)} view={view} />
              </AnimatedCard>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
            <Building2 size={40} className="mx-auto text-slate-300" />
            <h2 className="mt-4 text-xl font-bold text-slate-800">No divisions found</h2>
            <p className="mt-2 text-sm text-slate-400">Try a different search term.</p>
            <button
              onClick={() => setSearch('')}
              className="mt-5 rounded-full bg-teal px-6 py-3 text-sm font-bold text-white"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </div>
  );
}