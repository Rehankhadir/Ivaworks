import { useEffect, useRef, useState } from 'react';
import { CORE_VALUES } from '../data';
import { Award, Eye, Navigation, Handshake, Calendar, ArrowRight, Sparkles, Users, Target, Heart, Rocket, Zap } from 'lucide-react';

export default function About() {
  const valueIcons = [
    <Award className="h-6 w-6 text-[#5EE3B7]" />,
    <Eye className="h-6 w-6 text-[#00BFEF]" />,
    <Navigation className="h-6 w-6 text-emerald-500" />,
    <Handshake className="h-6 w-6 text-blue-500" />
  ];

  // ── Scroll-pinning logic for "What Drives Us" section ──
  const valuesSectionRef = useRef<HTMLElement>(null);
  const valuesViewportRef = useRef<HTMLDivElement>(null);
  const valuesInnerRef = useRef<HTMLDivElement>(null);
  const [valuesTranslateY, setValuesTranslateY] = useState(0);
  const [valuesProgress, setValuesProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const section = valuesSectionRef.current;
      const viewport = valuesViewportRef.current;
      const inner = valuesInnerRef.current;
      if (!section || !viewport || !inner) return;

      // Disable on tablet/mobile — let the page scroll normally
      if (window.innerWidth < 1024) {
        setValuesTranslateY(0);
        setValuesProgress(0);
        return;
      }

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const stickyAreaHeight = sectionHeight - window.innerHeight;
      const scrollY = window.scrollY;

      let progress = (scrollY - sectionTop) / Math.max(1, stickyAreaHeight);
      progress = Math.max(0, Math.min(1, progress));

      const innerHeight = inner.scrollHeight;
      const viewportHeight = viewport.clientHeight;
      const maxTranslate = Math.max(0, innerHeight - viewportHeight);

      setValuesProgress(progress);
      setValuesTranslateY(progress * maxTranslate);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    update();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Reusable decorative background shapes (light theme)
  const DecorativeShapes = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Soft radial blobs */}
      {/* <div className="absolute -top-28 -left-28 w-[480px] h-[480px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, #5EE3B7 0%, transparent 70%)' }} /> */}
      <div className="absolute -bottom-36 -right-36 w-[520px] h-[520px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #00BFEF 0%, transparent 70%)' }} />

      {/* Concentric dashed circles */}
      <svg className="absolute top-6 right-10 opacity-[0.10]" width="200" height="200" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="96" stroke="#00BFEF" strokeWidth="2.5" strokeDasharray="14 8" />
        <circle cx="100" cy="100" r="68" stroke="#5EE3B7" strokeWidth="2"   strokeDasharray="10 6" />
        <circle cx="100" cy="100" r="40" stroke="#00BFEF" strokeWidth="1.5" strokeDasharray="6 5" />
      </svg>

      {/* Nested rounded squares */}
      <svg className="absolute bottom-8 left-12 opacity-[0.10]" width="160" height="160" viewBox="0 0 160 160" fill="none">
        <rect x="4"  y="4"  width="152" height="152" rx="28" stroke="#5EE3B7" strokeWidth="2.5" strokeDasharray="12 7" />
        <rect x="24" y="24" width="112" height="112" rx="20" stroke="#00BFEF" strokeWidth="2"   strokeDasharray="8 5" />
        <rect x="46" y="46" width="68"  height="68"  rx="12" stroke="#5EE3B7" strokeWidth="1.5" />
      </svg>

      {/* Hexagon */}
      <svg className="absolute top-1/3 right-[8%] opacity-[0.09]" width="110" height="110" viewBox="0 0 110 110" fill="none">
        <polygon points="55,5 100,30 100,80 55,105 10,80 10,30" stroke="#5EE3B7" strokeWidth="2.5" fill="none" />
        <polygon points="55,20 88,38 88,72 55,90 22,72 22,38" stroke="#00BFEF" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Triangle */}
      <svg className="absolute bottom-20 left-[10%] opacity-[0.08]" width="90" height="90" viewBox="0 0 90 90" fill="none">
        <polygon points="45,5 85,75 5,75" stroke="#00BFEF" strokeWidth="3" fill="none" />
      </svg>

      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="aboutdots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#00BFEF" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aboutdots)" />
      </svg>
    </div>
  );

  return (
    <div className="space-y-24">

      {/* ───────────────────────────────────────────────
          1. HERO – Our Story (Light Theme)
      ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white text-slate-900 pt-24 pb-20">
        <DecorativeShapes />

        {/* Home-aligned hero background starts behind the transparent header */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5EE3B7]/10 via-transparent to-[#00BFEF]/10"></div>
          <div className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full bg-white blur-[80px]"></div>
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-[#00BFEF]/15 blur-[150px] animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Story Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/30 px-4 py-2 rounded-full text-xs font-bold text-teal-800 shadow-sm">
                <Sparkles className="h-3 w-3 text-[#00BFEF]" />
                <span>Our Heritage & Foundation</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-slate-950">
               
                <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">
                  IVA Work Solutions
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-semibold text-slate-700 leading-relaxed border-l-4 border-[#5EE3B7] pl-4 italic">
                "One Stop Solution for All Your Business Needs."
              </p>

              <div className="text-slate-600 text-base sm:text-lg leading-relaxed space-y-4">
                <p>
                  IVA Work Solutions was created with a vision to bridge the gap between business challenges and smart solutions. We recognized that many organizations struggle to find the right balance of skilled talent, operational efficiency, and technology expertise needed to grow in a competitive market.
                </p>
                <p>
                  Driven by this need, we built IVA Work Solutions as a one-stop partner for consulting, staffing, and technology services. Our goal is to simplify complex business needs by delivering practical strategies, reliable workforce solutions, and innovative support tailored to each client.
                </p>
                <p>
                  From startups to growing enterprises, we are committed to helping businesses adapt, scale, and succeed with confidence. Our story is built on trust, innovation, and the passion to create lasting value for every client we serve.
                </p>
              </div>

              {/* Quick stats — match Home counters */}
              <div className="pt-8 border-t border-slate-200/70 grid grid-cols-3 gap-6">
                <div>
                  <span className="block text-3xl font-extrabold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">2026</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Founded</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">3-in-1</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Service Pillars</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">100%</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Client Focused</span>
                </div>
              </div>
            </div>

            {/* Premium Photo Frame with floating cards */}
            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative mx-auto w-full max-w-[420px] aspect-square rounded-3xl bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] p-[2px] shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/5313161/pexels-photo-5313161.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800"
                  alt="IVA Work Solutions Story"
                  className="h-full w-full object-cover rounded-3xl"
                />

                {/* Floating card 1 */}
                <div className="absolute -bottom-6 -left-4 sm:-left-10 bg-white border border-slate-100 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce-slow z-20">
                  <div className="h-10 w-10 rounded-xl bg-[#5EE3B7]/10 flex items-center justify-center text-[#5EE3B7]">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Built on Trust</span>
                    <span className="text-sm font-bold text-slate-900">Lasting Partnerships</span>
                  </div>
                </div>

                {/* Floating card 2 */}
                <div className="absolute -top-6 -right-4 sm:-right-10 bg-white border border-slate-100 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce-slow delay-500 z-20">
                  <div className="h-10 w-10 rounded-xl bg-[#00BFEF]/10 flex items-center justify-center text-[#00BFEF]">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Founded</span>
                    <span className="text-sm font-bold text-slate-900">May 2026</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          2. CORE VALUES — Scroll-Pinned (Right column scrolls cards while page is pinned)
      ─────────────────────────────────────────────── */}
      <section
        ref={valuesSectionRef}
        className="relative lg:h-[340vh]"
      >
        {/* Sticky inner — pins the section while user scrolls */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center relative overflow-hidden py-20 lg:py-0">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f4fffc] to-[#effaff]"></div>
          <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-[#5EE3B7]/20 blur-[120px]"></div>
          <div className="absolute bottom-0 -left-32 h-[420px] w-[420px] rounded-full bg-[#00BFEF]/15 blur-[120px]"></div>
          <svg className="absolute top-12 left-1/2 -translate-x-1/2 opacity-[0.06]" width="620" height="110" viewBox="0 0 620 110" fill="none">
            <path d="M0 70 C120 10 230 10 350 70 C455 122 530 92 620 34" stroke="#00BFEF" strokeWidth="2" />
            <path d="M0 86 C130 28 240 30 360 86 C470 135 535 106 620 52" stroke="#5EE3B7" strokeWidth="1.5" />
          </svg>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

              {/* LEFT — Fixed pinned headline & stats */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-white/80 border border-[#00BFEF]/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#00BFEF] shadow-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>What Drives Us</span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 leading-tight">
                    A Values System Built for <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">Modern Growth</span>
                  </h2>
                  <p className="text-slate-600 leading-relaxed max-w-xl">
                    Our values are not statements on a wall. They are operating principles used in every strategy session, hiring mandate, and technology delivery engagement.
                  </p>
                </div>

                <div className="relative rounded-[28px] border border-[#5EE3B7]/20 bg-white/70 backdrop-blur-md p-6 shadow-xl shadow-[#00BFEF]/10 overflow-hidden">
                  <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#5EE3B7]/20 to-[#00BFEF]/20"></div>
                  <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="block text-2xl font-extrabold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">04</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Values</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-extrabold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">01</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Standard</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-extrabold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">100%</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Aligned</span>
                    </div>
                  </div>
                </div>

                {/* Scroll progress bar — visible only on lg */}
                <div className="hidden lg:block pt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    <span>Values Progress</span>
                    <span>{Math.round(valuesProgress * 100)}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] rounded-full transition-[width] duration-150"
                      style={{ width: `${valuesProgress * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* RIGHT — Scroll-jacked viewport that translates the cards inside */}
              <div
                ref={valuesViewportRef}
                className="lg:col-span-7 relative lg:h-[calc(100vh-8rem)] lg:overflow-hidden"
              >
                {/* Top fade */}
                <div className="hidden lg:block absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none"></div>
                {/* Bottom fade */}
                <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>

                <div
                  ref={valuesInnerRef}
                  className="space-y-5 lg:will-change-transform"
                  style={{ transform: `translateY(-${valuesTranslateY}px)` }}
                >
                  {CORE_VALUES.map((val, idx) => (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-[28px] border border-slate-100 bg-white/90 backdrop-blur-md p-5 sm:p-6 shadow-sm hover:shadow-2xl hover:shadow-[#00BFEF]/10 transition-all duration-300"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#5EE3B7] to-[#00BFEF]"></div>
                      <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-gradient-to-br from-[#5EE3B7]/10 to-[#00BFEF]/10 group-hover:scale-150 transition-transform duration-500"></div>

                      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-5 items-start">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/20 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                          {valueIcons[idx]}
                        </div>

                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#00BFEF]">Principle 0{idx + 1}</span>
                            <h3 className="mt-1 text-xl font-extrabold text-slate-950">{val.title}</h3>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div className="rounded-2xl bg-slate-50/80 border border-slate-100 p-3">
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">How it shows up</span>
                              <span className="mt-1 block text-xs font-semibold text-slate-700">
                                {idx === 0 && 'Outcome-led consulting and measurable delivery plans'}
                                {idx === 1 && 'Future-ready decisions with scalable technology choices'}
                                {idx === 2 && 'Practical execution with clear ownership and timelines'}
                                {idx === 3 && 'Reliable support, transparent updates, and long-term care'}
                              </span>
                            </div>
                            <div className="rounded-2xl bg-gradient-to-r from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/20 p-3">
                              <span className="block text-[10px] font-bold uppercase tracking-widest text-[#00BFEF]">Client outcome</span>
                              <span className="mt-1 block text-xs font-semibold text-slate-700">
                                {idx === 0 && 'Growth, efficiency, and long-term success'}
                                {idx === 1 && 'Confidence in transformation and expansion'}
                                {idx === 2 && 'Customized solutions without unnecessary complexity'}
                                {idx === 3 && 'Quality, reliability, and measurable results'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="hidden sm:flex h-12 w-12 rounded-full bg-slate-50 border border-slate-100 items-center justify-center text-sm font-black text-slate-300 group-hover:text-[#00BFEF] transition-colors">
                          0{idx + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          3. MISSION HIGHLIGHT (NEW – matches Home theme)
      ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 border-y border-slate-100 relative overflow-hidden">
        {/* Light decorative shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 right-0 w-[400px] h-[400px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #5EE3B7 0%, transparent 70%)' }} />
          <div className="absolute -bottom-32 left-0 w-[400px] h-[400px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, #00BFEF 0%, transparent 70%)' }} />

          <svg className="absolute top-10 left-10 opacity-[0.08]" width="140" height="140" viewBox="0 0 140 140" fill="none">
            <circle cx="70" cy="70" r="68" stroke="#00BFEF" strokeWidth="2" strokeDasharray="10 6" />
            <circle cx="70" cy="70" r="44" stroke="#5EE3B7" strokeWidth="1.5" strokeDasharray="6 5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left content */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#5EE3B7] bg-teal-50 px-3.5 py-1.5 rounded-full inline-block">The IVA Promise</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
                  Built to Empower{' '}
                  <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">Modern Businesses</span>
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Every initiative we launch, every consultant we deploy, and every line of code we ship is designed to drive measurable outcomes for your business.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Target className="h-4 w-4" />, title: 'Clarity-Driven', desc: 'Strategy and execution aligned to clear KPIs and outcomes.' },
                  { icon: <Users className="h-4 w-4" />,  title: 'People-First',   desc: 'Talent and culture-fit prioritized in every staffing engagement.' },
                  { icon: <Zap className="h-4 w-4" />,    title: 'Future-Ready',   desc: 'Cloud, automation, and AI woven into every solution we build.' },
                  { icon: <Heart className="h-4 w-4" />,  title: 'Long-Term',      desc: 'We measure success in lasting partnerships, not short-term wins.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5EE3B7]/20 to-[#00BFEF]/20 border border-[#5EE3B7]/30 flex items-center justify-center text-[#00BFEF] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right photo card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white p-2 bg-gradient-to-tr from-[#5EE3B7]/20 to-[#00BFEF]/20">
                <img
                  src="https://images.pexels.com/photos/8636591/pexels-photo-8636591.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800"
                  alt="IVA team strategy session"
                  className="rounded-2xl object-cover h-[380px] w-full"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────
          4. TIMELINE (Light Theme with shapes)
      ─────────────────────────────────────────────── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0fdfb 0%, #e8f8ff 50%, #edfcf9 100%)' }}
      >
        <DecorativeShapes />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00BFEF] bg-[#00BFEF]/10 border border-[#00BFEF]/20 px-3.5 py-1.5 rounded-full inline-block">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
              Building <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">Success</span>, One Milestone at a Time
            </h2>
            <p className="text-slate-600 leading-relaxed">Trace our historical steps and strategic milestones as we scale our impact.</p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-2xl mx-auto">
            {/* Center line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#5EE3B7] via-[#00BFEF] to-slate-200/50"></div>

            {[
              {
                year: '2020',
                title: 'Foundation',
                tag: 'The Beginning',
                tagDesc: 'A bold idea to bridge talent and opportunity through structured learning.',
                desc: 'Started with a vision to transform careers through vendor management education.',
              },
              {
                year: '2022',
                title: 'Expansion',
                tag: 'Scaling Programs',
                tagDesc: 'Broadened our portfolio to address rapidly evolving industry skill demands.',
                desc: 'Added technology learning programs and expanded course offerings.',
              },
              {
                year: '2024',
                title: 'Innovation',
                tag: 'AI-Powered Era',
                tagDesc: 'Embraced intelligent automation to personalize learning and hiring at scale.',
                desc: 'Launched AI-powered learning tools and career matching platform.',
              },
              {
                year: '2026',
                title: 'Growth',
                tag: 'Trusted Globally',
                tagDesc: 'Recognized for measurable career outcomes across global enterprise clients.',
                desc: 'Serving 500+ professionals with 95% success rate in career advancement.',
              },
            ].map((node) => (
              <div
                key={node.year}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-12 last:mb-0"
              >
                <div className="hidden md:block w-5/12 text-right pr-8">
                  <span className="text-xs font-bold text-[#00BFEF] uppercase tracking-widest">{node.tag}</span>
                  <p className="text-xs text-slate-500 mt-1">{node.tagDesc}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white border-4 border-[#5EE3B7] flex items-center justify-center text-white z-10 shadow-lg shadow-[#5EE3B7]/30">
                  <Calendar className="h-4 w-4 text-[#5EE3B7]" />
                </div>

                <div className="w-full md:w-5/12 pl-16 md:pl-8 text-left">
                  <div className="bg-white p-6 rounded-2xl border border-[#5EE3B7]/20 shadow-lg shadow-[#5EE3B7]/10 hover:shadow-2xl hover:shadow-[#5EE3B7]/20 transition-all relative">
                    <div className="absolute -left-3 top-7 w-6 h-6 bg-white border-l border-t border-[#5EE3B7]/20 rotate-45 hidden md:block"></div>
                    <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/30 px-3 py-1 rounded-full text-xs font-extrabold text-[#00BFEF] mb-3">
                      <Sparkles className="h-3 w-3" />
                      <span>{node.year}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-950 mb-2">{node.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{node.desc}</p>
                  </div>
                </div>

                {/* Mobile: alternate left/right tag visible only on desktop is omitted on mobile */}
              </div>
            ))}

            {/* Subtle "what's next" cap */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between opacity-90 mt-2">
              <div className="hidden md:block w-5/12 text-right pr-8"></div>

              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white border-4 border-dashed border-[#00BFEF]/40 flex items-center justify-center text-[#00BFEF] z-10 shadow">
                <ArrowRight className="h-4 w-4" />
              </div>

              <div className="w-full md:w-5/12 pl-16 md:pl-8 text-left">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-dashed border-[#00BFEF]/30">
                  <span className="text-xs font-bold text-[#00BFEF] uppercase tracking-widest block mb-1">What's Next</span>
                  <h4 className="text-base font-bold text-slate-800">The Journey Continues</h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1">
                    New chapters are being written every day as we expand our impact across staffing, consulting, and technology partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
