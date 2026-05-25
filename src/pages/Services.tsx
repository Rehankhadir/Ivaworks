import { useEffect, useRef } from 'react';
import { SERVICES_DATA } from '../data';
import techHero from '../assets/tech-hero.png';
import { Check, Zap, Target, Users, Cpu, Layers, HelpCircle, Code, Cloud, ShieldAlert, ChevronRight } from 'lucide-react';

interface ServicesProps {
  focusedCategoryId: 'consulting' | 'staffing' | 'technology' | null;
  focusedServiceId: string | null;
  setFocusedCategoryId: (cat: 'consulting' | 'staffing' | 'technology' | null) => void;
  setFocusedServiceId: (id: string | null) => void;
}

export default function Services({
  focusedCategoryId,
  focusedServiceId,
  setFocusedCategoryId,
  setFocusedServiceId
}: ServicesProps) {

  const elementRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (focusedServiceId && elementRefs.current[focusedServiceId]) {
      setTimeout(() => {
        elementRefs.current[focusedServiceId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [focusedServiceId, focusedCategoryId]);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'consulting': return <Layers className="h-5 w-5 text-[#5EE3B7]" />;
      case 'staffing':   return <Users  className="h-5 w-5 text-[#00BFEF]" />;
      case 'technology': return <Cpu    className="h-5 w-5 text-[#5EE3B7]" />;
      default:           return <Zap    className="h-5 w-5 text-slate-500" />;
    }
  };

  const getSubServiceIcon = (id: string) => {
    if (id.includes('strategy') || id.includes('planning'))                      return <Target     className="h-5 w-5 text-[#5EE3B7]" />;
    if (id.includes('improvement') || id.includes('automation'))                 return <Zap        className="h-5 w-5 text-[#00BFEF]" />;
    if (id.includes('vendor') || id.includes('contract') || id.includes('permanent')) return <Users className="h-5 w-5 text-[#5EE3B7]" />;
    if (id.includes('web') || id.includes('it-'))                                return <Code       className="h-5 w-5 text-[#00BFEF]" />;
    if (id.includes('cloud'))                                                    return <Cloud      className="h-5 w-5 text-[#5EE3B7]" />;
    if (id.includes('security'))                                                 return <ShieldAlert className="h-5 w-5 text-[#00BFEF]" />;
    return <HelpCircle className="h-5 w-5 text-slate-400" />;
  };

  const visibleCategories = focusedCategoryId
    ? SERVICES_DATA.filter((category) => category.id === focusedCategoryId)
    : SERVICES_DATA;

  return (
    <div>

      {/* ─── HERO ─── */}
      {(() => {
        const heroImages: Record<string, string> = {
          consulting: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=560',
          staffing:   'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=560',
          technology: techHero,
        };
        const heroSubtitles: Record<string, string> = {
          consulting: 'Strategy. Efficiency. Growth.',
          staffing:   'Build High-Performing Teams with the Right Talent.',
          technology: 'Transform Ideas into Scalable Digital Solutions.',
        };
        const activeCategory = focusedCategoryId
          ? SERVICES_DATA.find((c) => c.id === focusedCategoryId)
          : null;

        if (activeCategory) {
          // Split hero — text left, image right
          return (
            <section className="relative overflow-hidden bg-white pt-24 pb-0">
              <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5EE3B7]/10 via-transparent to-[#00BFEF]/10"></div>
                {/* <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#5EE3B7]/20 blur-[120px] animate-pulse"></div> */}
                <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[#00BFEF]/15 blur-[150px] animate-pulse delay-700"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 min-h-[420px]">
                  {/* Left — text */}
                  <div className="space-y-6 py-12">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#5EE3B7]/20 to-[#00BFEF]/20 border border-[#5EE3B7]/30 flex items-center justify-center">
                        {getCategoryIcon(activeCategory.id)}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">Our Service</span>
                    </div>

                    <div className="space-y-2">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                        {activeCategory.title}
                      </h1>
                      <p className="text-base font-semibold text-[#00BFEF]">
                        {heroSubtitles[activeCategory.id]}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {activeCategory.heroParagraphs.map((para, i) => (
                        <p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
                          {para}
                        </p>
                      ))}
                    </div>

                    <div className="flex items-center space-x-3 bg-white/80 border border-slate-100 px-4 py-3 rounded-2xl shadow-sm w-fit">
                      <div className="h-8 w-8 rounded-lg bg-[#5EE3B7]/10 flex items-center justify-center text-[#5EE3B7]">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Performance Guarantee</span>
                        <span className="text-xs font-bold text-slate-800">100% SLA Aligned Delivery</span>
                      </div>
                    </div>

                    {/* Category tabs */}
                    {/* <div className="flex flex-wrap gap-3 pt-2">
                      {SERVICES_DATA.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => { setFocusedCategoryId(cat.id); setFocusedServiceId(null); }}
                          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 flex items-center space-x-2 border ${
                            focusedCategoryId === cat.id
                              ? 'bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] text-white border-[#5EE3B7]/50 shadow-md'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                          }`}
                        >
                          {getCategoryIcon(cat.id)}
                          <span>{cat.title}</span>
                        </button>
                      ))}
                    </div> */}
                  </div>

                  {/* Right — image */}
                  <div className="relative hidden lg:flex items-center justify-end h-full">
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none" />
                    <img
                      src={heroImages[activeCategory.id]}
                      alt={activeCategory.title}
                      className="w-full object-cover rounded-tl-3xl"
                      style={{ maxHeight: '420px' }}
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Generic centered hero — no category selected
        return (
          <section className="relative overflow-hidden bg-white pt-24 pb-20">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5EE3B7]/10 via-transparent to-[#00BFEF]/10"></div>
              <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#5EE3B7]/20 blur-[120px] animate-pulse"></div>
              <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[#00BFEF]/15 blur-[150px] animate-pulse delay-700"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00BFEF] bg-[#00BFEF]/10 border border-[#00BFEF]/20 px-4 py-2 rounded-full inline-block">
                End-to-End Strategic Partnerships
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-slate-950">
                Comprehensive Corporate Consulting, Staffing &{' '}
                <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">Technology Services</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto">
                We partner with startups, growing businesses, and enterprises to deliver high-value practical consulting, scalable workforce placement, and robust IT transformations designed to scale and succeed.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {SERVICES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setFocusedCategoryId(cat.id); setFocusedServiceId(null); }}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center space-x-2 border ${
                      focusedCategoryId === cat.id
                        ? 'bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] text-white border-[#5EE3B7]/50 shadow-md'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                    }`}
                  >
                    {getCategoryIcon(cat.id)}
                    <span>{cat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ─── CATEGORIES ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-16">
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="space-y-12 scroll-mt-24"
          >
            {/* Sub-Services */}
            <div className="grid grid-cols-1 gap-8">
              {category.items.map((sub) => {
                const isFocused = focusedServiceId === sub.id;
                return (
                  <div
                    key={sub.id}
                    ref={(el) => { elementRefs.current[sub.id] = el; }}
                    className={`scroll-mt-32 rounded-2xl border transition-all duration-300 ${
                      isFocused
                        ? 'border-[#5EE3B7]/40 shadow-lg shadow-[#5EE3B7]/10 bg-white'
                        : 'border-slate-100 bg-white hover:shadow-md'
                    }`}
                  >
                    {/* Thin accent top bar for focused */}
                    {isFocused && (
                      <div className="h-1 w-full bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] rounded-t-2xl"></div>
                    )}

                    <div className="p-6 sm:p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Left — Description + provide list */}
                        <div className="lg:col-span-7 space-y-5">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/20 flex items-center justify-center">
                              {getSubServiceIcon(sub.id)}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-950">{sub.title}</h3>
                          </div>

                          <p className="text-sm leading-relaxed text-slate-600">
                            {sub.description}
                          </p>

                          <div className="space-y-3">
                            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">
                              {sub.provideLabel}
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                              {sub.provide.map((prov, i) => (
                                <li key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                                  <Check className="h-3.5 w-3.5 text-[#5EE3B7] shrink-0 mt-0.5" />
                                  <span>{prov}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Right — benefits */}
                        {sub.benefits && sub.benefits.length > 0 && (
                          <div className="lg:col-span-5 flex flex-col justify-center">
                            <div className="bg-slate-50 border border-slate-100 p-5 sm:p-6 rounded-2xl space-y-4">
                              <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5EE3B7]">
                                {sub.benefitsLabel}
                              </h4>
                              <div className="space-y-3">
                                {sub.benefits.map((benefit, i) => (
                                  <div key={i} className="flex items-start space-x-3 text-xs">
                                    <div className="h-5 w-5 rounded-full bg-[#5EE3B7]/10 flex items-center justify-center text-[#5EE3B7] shrink-0 mt-0.5">
                                      <Check className="h-3 w-3" />
                                    </div>
                                    <span className="text-slate-700 font-medium">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

         

            {/* ─── CONSULTING EXTRA CONTENT ─── */}
            {category.id === 'consulting' && (
              <div className="space-y-12">

                {/* Why Partner with IVA */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 to-slate-800 p-8 sm:p-12">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-[#5EE3B7]/10 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#00BFEF]/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="mb-8 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5EE3B7]">Our Edge</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Why Partner with IVA Work Solutions?</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { title: 'Reliable Delivery Partner',          desc: 'We prioritize consistency, transparency, and quality in every engagement.' },
                        { title: 'Flexible Collaboration Models',       desc: 'Customized engagement structures designed to fit your operational requirements.' },
                        { title: 'Strong Communication & Governance',   desc: 'Clear reporting, proactive communication, and streamlined coordination.' },
                        { title: 'Scalable Support',                    desc: 'Rapidly scale teams and delivery capacity as business demands evolve.' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start space-x-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#5EE3B7] to-[#00BFEF] flex items-center justify-center shrink-0">
                            <Check className="h-4 w-4 text-slate-950" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Governance & Compliance — full width */}
                <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-6 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">Trust & Standards</span>
                    <h3 className="text-xl font-extrabold text-slate-950">Governance & Compliance</h3>
                    <p className="text-sm text-slate-500 leading-relaxed pt-1">IVA Work Solutions follows structured governance and compliance practices to ensure secure and reliable delivery.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {[
                      'SLA Management',
                      'Delivery Tracking',
                      'Data Security',
                      'Communication Protocols',
                      'Reporting Standards',
                      'Resource Accountability',
                    ].map((area, i) => (
                      <div key={i} className="flex items-center space-x-2.5 py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-sm text-slate-700 font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vendor Partnership Workflow — full width horizontal */}
                <div className="bg-gradient-to-br from-[#5EE3B7]/5 to-[#00BFEF]/5 border border-[#5EE3B7]/20 rounded-3xl p-8">
                  <div className="mb-8 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5EE3B7]">How We Engage</span>
                    <h3 className="text-xl font-extrabold text-slate-950">Vendor Partnership Workflow</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-8">
                    {[
                      { step: 'Requirement & Scope Analysis', desc: 'Define objectives, deliverables, and engagement boundaries.' },
                      { step: 'Partnership Planning',         desc: 'Align teams, timelines, tools, and governance frameworks.' },
                      { step: 'Resource Allocation',          desc: 'Assign the right consultants and specialists to your engagement.' },
                      { step: 'Delivery Execution',           desc: 'Structured delivery with milestone tracking and quality gates.' },
                      { step: 'Governance & Reporting',       desc: 'Regular status updates, KPI reviews, and stakeholder reporting.' },
                      { step: 'Performance Monitoring',       desc: 'Continuous evaluation against SLAs and agreed benchmarks.' },
                      { step: 'Continuous Support & Scaling', desc: 'Ongoing optimization and capacity scaling as needs evolve.' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center text-center group px-1">
                        <div className="relative flex justify-center w-full mb-4">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] text-slate-950 font-black text-xs flex items-center justify-center shadow-md ring-4 ring-[#5EE3B7]/10 group-hover:scale-110 transition-transform relative z-10">
                            {i + 1}
                          </div>
                          {i % 7 !== 6 && (
                            <div className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-[#5EE3B7]/60 to-[#00BFEF]/30 hidden lg:block" />
                          )}
                        </div>
                        <h4 className="text-[10px] font-bold text-slate-900 mb-1 group-hover:text-[#00BFEF] transition-colors leading-snug">{item.step}</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ─── STAFFING EXTRA CONTENT ─── */}
            {category.id === 'staffing' && (
              <div className="space-y-12">

                {/* Why Choose IVA */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 to-slate-800 p-8 sm:p-12">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-[#5EE3B7]/10 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#00BFEF]/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="mb-8 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5EE3B7]">Our Edge</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Why Choose IVA Work Solutions?</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { title: 'Access to Pre-Screened IT Talent', desc: 'We connect organizations with highly qualified professionals ready to contribute from day one.' },
                        { title: 'Faster Hiring Turnaround', desc: 'Our agile recruitment process reduces hiring delays and minimizes project downtime.' },
                        { title: 'Flexible Hiring Models', desc: 'Contract, permanent, remote, offshore, or project-based hiring models.' },
                        { title: 'Industry-Focused Recruitment', desc: 'Our team understands modern technology stacks, hiring trends, and workforce demands.' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start space-x-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#5EE3B7] to-[#00BFEF] flex items-center justify-center shrink-0">
                            <Check className="h-4 w-4 text-slate-950" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Industries We Support */}
                <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-6 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">Sector Coverage</span>
                    <h3 className="text-xl font-extrabold text-slate-950">Industries We Support</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Information Technology',
                      'Healthcare',
                      'Finance & Banking',
                      'E-Commerce',
                      'Logistics & Supply Chain',
                      'Manufacturing',
                      'Telecommunications',
                      'Education Technology',
                      'SaaS & Product Companies',
                    ].map((industry, i) => (
                      <div key={i} className="flex items-center space-x-2.5 py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-sm text-slate-700 font-medium">{industry}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Approach — full width */}
                <div className="bg-gradient-to-br from-[#5EE3B7]/5 to-[#00BFEF]/5 border border-[#5EE3B7]/20 rounded-3xl p-8">
                  <div className="mb-8 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5EE3B7]">How We Work</span>
                    <h3 className="text-xl font-extrabold text-slate-950">Delivery Approach</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8">
                    {[
                      { step: 'Requirement Analysis',        desc: 'Deep-dive into role requirements, team structure, and timelines.' },
                      { step: 'Talent Sourcing & Screening', desc: 'Active and passive candidate sourcing across curated networks.' },
                      { step: 'Technical Evaluation',        desc: 'Skills assessments, portfolio reviews, and domain-fit checks.' },
                      { step: 'Interview Coordination',      desc: 'End-to-end scheduling, briefings, and feedback loops.' },
                      { step: 'Resource Deployment',         desc: 'Seamless onboarding with compliance and handover support.' },
                      { step: 'Ongoing Support',             desc: 'Continuous check-ins, performance tracking, and retention guidance.' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center text-center group px-2">
                        {/* Circle centered, connector absolutely positioned so it doesn't shift the circle */}
                        <div className="relative flex justify-center w-full mb-4">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] text-slate-950 font-black text-xs flex items-center justify-center shadow-md ring-4 ring-[#5EE3B7]/10 group-hover:scale-110 transition-transform relative z-10">
                            {i + 1}
                          </div>
                          {i % 6 !== 5 && (
                            <div className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-[#5EE3B7]/60 to-[#00BFEF]/30 hidden lg:block" />
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mb-1 group-hover:text-[#00BFEF] transition-colors leading-snug">{item.step}</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── TECHNOLOGY EXTRA CONTENT ─── */}
            {category.id === 'technology' && (
              <div className="space-y-12">

                {/* Why Businesses Choose Us */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 to-slate-800 p-8 sm:p-12">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-[#5EE3B7]/10 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#00BFEF]/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="mb-8 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5EE3B7]">Our Edge</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Why Businesses Choose Us</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { title: 'Engineering Excellence',        desc: 'We combine technical expertise with practical business understanding to deliver solutions that truly work.' },
                        { title: 'Scalable Delivery Models',      desc: 'From startups to enterprise engagements, we scale according to project demands and timelines.' },
                        { title: 'Agile & Transparent Execution', desc: 'Continuous collaboration, faster iterations, and clear communication throughout the project lifecycle.' },
                        { title: 'Quality-Driven Development',    desc: 'We focus on performance, security, maintainability, and long-term scalability in every build.' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start space-x-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#5EE3B7] to-[#00BFEF] flex items-center justify-center shrink-0">
                            <Check className="h-4 w-4 text-slate-950" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technologies & Platforms */}
                <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                  <div className="mb-8 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">Tech Stack</span>
                    <h3 className="text-xl font-extrabold text-slate-950">Technologies & Platforms</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[
                      {
                        label: 'Frontend',
                        color: 'from-[#5EE3B7] to-[#00BFEF]',
                        bg: 'bg-[#5EE3B7]/8',
                        border: 'border-[#5EE3B7]/20',
                        items: ['React.js', 'Angular', 'Vue.js', 'Next.js'],
                      },
                      {
                        label: 'Backend',
                        color: 'from-[#00BFEF] to-[#5EE3B7]',
                        bg: 'bg-[#00BFEF]/8',
                        border: 'border-[#00BFEF]/20',
                        items: ['Node.js', 'Java', 'Python', '.NET', 'PHP'],
                      },
                      {
                        label: 'Cloud',
                        color: 'from-[#5EE3B7] to-teal-400',
                        bg: 'bg-teal-50',
                        border: 'border-teal-100',
                        items: ['AWS', 'Azure', 'Google Cloud', 'Salesforce'],
                      },
                      {
                        label: 'Database',
                        color: 'from-[#00BFEF] to-cyan-400',
                        bg: 'bg-cyan-50',
                        border: 'border-cyan-100',
                        items: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server'],
                      },
                      {
                        label: 'DevOps',
                        color: 'from-[#5EE3B7] to-[#00BFEF]',
                        bg: 'bg-slate-50',
                        border: 'border-slate-100',
                        items: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform'],
                      },
                    ].map((group, gi) => (
                      <div key={gi} className={`rounded-2xl border ${group.border} ${group.bg} p-5 space-y-3`}>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${group.color} text-slate-950 text-[10px] font-extrabold uppercase tracking-wider`}>
                          {group.label}
                        </div>
                        <ul className="space-y-1.5">
                          {group.items.map((tech, ti) => (
                            <li key={ti} className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                              <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${group.color} shrink-0`} />
                              <span>{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Process — 7-step horizontal stepper */}
                <div className="bg-gradient-to-br from-[#5EE3B7]/5 to-[#00BFEF]/5 border border-[#5EE3B7]/20 rounded-3xl p-8">
                  <div className="mb-8 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5EE3B7]">How We Deliver</span>
                    <h3 className="text-xl font-extrabold text-slate-950">Delivery Process</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-8">
                    {[
                      { step: 'Discovery & Requirement Analysis', desc: 'Understand goals, scope, and technical constraints.' },
                      { step: 'Architecture Planning',            desc: 'Design system architecture and technology stack.' },
                      { step: 'UI/UX Design',                    desc: 'Wireframes, prototypes, and user experience design.' },
                      { step: 'Agile Development',               desc: 'Sprint-based delivery with continuous feedback loops.' },
                      { step: 'Testing & QA',                    desc: 'Functional, performance, and security testing.' },
                      { step: 'Deployment & Monitoring',         desc: 'Production deployment with real-time observability.' },
                      { step: 'Ongoing Support',                 desc: 'Post-launch optimization, updates, and maintenance.' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center text-center group px-1">
                        <div className="relative flex justify-center w-full mb-4">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] text-slate-950 font-black text-xs flex items-center justify-center shadow-md ring-4 ring-[#5EE3B7]/10 group-hover:scale-110 transition-transform relative z-10">
                            {i + 1}
                          </div>
                          {i % 7 !== 6 && (
                            <div className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-[#5EE3B7]/60 to-[#00BFEF]/30 hidden lg:block" />
                          )}
                        </div>
                        <h4 className="text-[10px] font-bold text-slate-900 mb-1 group-hover:text-[#00BFEF] transition-colors leading-snug">{item.step}</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        ))}
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #f0fdfb 0%, #e8f8ff 50%, #edfcf9 100%)' }}
        />
        <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#5EE3B7]/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-[#00BFEF]/15 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Ready to Optimize Your Systems and Workforce?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Work with senior strategic consultants and software deployment engineers who build compliant, secure, and highly cost-effective operating pipelines.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                const event = new CustomEvent('navigate', { detail: 'contact' });
                window.dispatchEvent(event);
              }}
              className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all inline-flex items-center space-x-2"
            >
              <span>Request Free Consultation Proposal</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
