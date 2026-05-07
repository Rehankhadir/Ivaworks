import { useEffect, useRef } from 'react';
import { SERVICES_DATA } from '../data';
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
      <section className="relative overflow-hidden bg-white pt-24 pb-20">
        {/* Background — same as Home hero */}
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

          {/* Category Anchors */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {SERVICES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFocusedCategoryId(cat.id);
                  setFocusedServiceId(null);
                }}
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

      {/* ─── CATEGORIES ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-16">
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="space-y-12 scroll-mt-24"
          >
            {/* Category Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-100 pb-8">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/20 flex items-center justify-center">
                    {getCategoryIcon(category.id)}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">Service Category</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-950">{category.title}</h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{category.description}</p>
              </div>

              <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl shrink-0">
                <div className="h-9 w-9 rounded-lg bg-[#5EE3B7]/10 flex items-center justify-center text-[#5EE3B7]">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Performance Guarantee</span>
                  <span className="text-xs font-bold text-slate-800 block">100% SLA Aligned Delivery</span>
                </div>
              </div>
            </div>

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

                        {/* Left — Description + What We Provide */}
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
                            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">What We Provide</h4>
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

                        {/* Right — Key Benefits */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                          <div className="bg-slate-50 border border-slate-100 p-5 sm:p-6 rounded-2xl space-y-4">
                            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5EE3B7]">Key Benefits</h4>
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

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Approach Stepper */}
            <div className="bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-2xl">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">Execution Methodology</span>
                <h3 className="text-xl font-bold text-slate-900">{category.approachTitle}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                {category.approachSteps.map((step, idx) => (
                  <div key={idx} className="relative text-center md:text-left">
                    {/* Connector line */}
                    {idx < 4 && (
                      <div className="hidden md:block absolute top-5 left-[60%] right-[-40%] h-px bg-slate-200 z-0"></div>
                    )}

                    <div className="relative z-10 flex flex-col items-center md:items-start space-y-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] text-white font-black text-sm flex items-center justify-center shadow-sm">
                        {idx + 1}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{step.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
