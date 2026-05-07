import { useEffect, useState } from 'react';
import { Page } from '../types';
import { TESTIMONIALS } from '../data';
import { ChevronRight, ChevronLeft, Quote, Target, Users, ShieldCheck, Star, ArrowUpRight, Zap } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  const goToPrev = () =>
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const goToNext = () =>
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);

  return (
    <div className="space-y-24">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden bg-white text-slate-900">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5EE3B7]/10 via-transparent to-[#00BFEF]/10"></div>
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#5EE3B7]/30 blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-[#00BFEF]/20 blur-[150px] animate-pulse delay-700"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/30 px-4 py-2 rounded-full text-xs font-bold text-teal-800 shadow-sm">
                <Zap className="h-3 w-3 animate-bounce text-[#00BFEF]" />
                <span>For Job Seekers & Employers</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-slate-950">
                IVA Work Solutions –<br />
                <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">
                  Jobs, Staffing & Technology
                </span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                IVA Work Solutions connects skilled job seekers with the right career opportunities and helps employers find dependable talent for permanent, contract, executive, and technology hiring needs. Employees can submit their profile and upload a resume, while employers can share workforce requirements and connect with our experts for the next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setCurrentPage('careers')} className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base group">
                  <span>Apply for Jobs</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => setCurrentPage('contact')} className="bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-4 rounded-xl border border-slate-200 hover:border-slate-300 shadow-sm transition-all text-sm sm:text-base flex items-center justify-center space-x-2">
                  <span>Hire Talent</span>
                </button>
              </div>
              <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-6">
                <div>
                  <span className="block text-3xl font-extrabold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">5000+</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Workers Deployed</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">200+</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Clients</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">10+</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Industries Served</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-12 lg:mt-0">
              <div className="relative mx-auto w-full max-w-[420px] aspect-square rounded-3xl bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] p-[2px] shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/7993898/pexels-photo-7993898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800"
                  alt="IVA Work Solutions Team"
                  className="h-full w-full object-cover rounded-3xl"
                />
                <div className="absolute -bottom-6 -left-4 sm:-left-10 bg-white border border-slate-100 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce-slow z-20">
                  <div className="h-10 w-10 rounded-xl bg-[#5EE3B7]/10 flex items-center justify-center text-[#5EE3B7]">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Job Seekers</span>
                    <span className="text-sm font-bold text-slate-900">Resume Intake</span>
                  </div>
                </div>
                <div className="absolute -top-6 -right-4 sm:-right-10 bg-white border border-slate-100 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce-slow delay-500 z-20">
                  <div className="h-10 w-10 rounded-xl bg-[#00BFEF]/10 flex items-center justify-center text-[#00BFEF]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-semibold">Employers</span>
                    <span className="text-sm font-bold text-slate-900">Hiring Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUDIENCE PATHWAYS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-5">
              <div className="h-12 w-12 rounded-xl bg-[#5EE3B7]/10 border border-[#5EE3B7]/20 flex items-center justify-center text-[#5EE3B7] shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">For Job Seekers</span>
                  <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Find the right opportunity and submit your resume</h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  Explore open roles, share your qualification, experience, skills, and upload your latest resume so our recruitment team can match you with suitable opportunities.
                </p>
                <button onClick={() => setCurrentPage('careers')} className="inline-flex items-center gap-2 text-sm font-bold text-[#00BFEF] hover:text-slate-950 transition-colors">
                  <span>View jobs and apply</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-5">
              <div className="h-12 w-12 rounded-xl bg-[#00BFEF]/10 border border-[#00BFEF]/20 flex items-center justify-center text-[#00BFEF] shrink-0">
                <Target className="h-5 w-5" />
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5EE3B7]">For Employers</span>
                  <h2 className="mt-2 text-2xl font-extrabold text-slate-950">Share your hiring needs and connect with experts</h2>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  Submit company details, required roles, employee count, location, and job description so our team can contact you with staffing and workforce solutions.
                </p>
                <button onClick={() => setCurrentPage('contact')} className="inline-flex items-center gap-2 text-sm font-bold text-[#00BFEF] hover:text-slate-950 transition-colors">
                  <span>Submit employer inquiry</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00BFEF] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">Our Services</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Smart Solutions That Drive Success</h2>
          <p className="text-slate-600">Whether you want to build a powerful technology foundation, acquire market-leading talent, or re-engineer your core operational processes, we provide the blueprints and hands-on execution.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-[#5EE3B7]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-[#5EE3B7]/10 flex items-center justify-center text-[#5EE3B7] font-bold text-2xl group-hover:scale-110 transition-transform">01</div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Consulting Services</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Helping businesses improve strategy, efficiency, growth, and decision-making. We lay down custom operational architectures and roadmaps designed to perform.</p>
              </div>
            </div>
            <button onClick={() => setCurrentPage('services')} className="mt-8 text-sm font-bold text-[#5EE3B7] flex items-center space-x-2 group-hover:text-slate-900 transition-colors">
              <span>Explore Consulting</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-[#00BFEF]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-[#00BFEF]/10 flex items-center justify-center text-[#00BFEF] font-bold text-2xl group-hover:scale-110 transition-transform">02</div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Staffing Solutions</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Providing skilled talent for permanent, contract, and remote workforce needs. We leverage high-performance databases and passive networks to deploy experts.</p>
              </div>
            </div>
            <button onClick={() => setCurrentPage('services')} className="mt-8 text-sm font-bold text-[#00BFEF] flex items-center space-x-2 group-hover:text-slate-900 transition-colors">
              <span>Explore Staffing</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-emerald-500/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold text-2xl group-hover:scale-110 transition-transform">03</div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Technology Services</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Modern IT solutions including development, automation, cloud, and support. We secure and accelerate databases and processes with future-ready integrations.</p>
              </div>
            </div>
            <button onClick={() => setCurrentPage('services')} className="mt-8 text-sm font-bold text-emerald-500 flex items-center space-x-2 group-hover:text-slate-900 transition-colors">
              <span>Explore Tech Services</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#5EE3B7] bg-teal-50 px-3.5 py-1.5 rounded-full inline-block">The IVA Edge</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Why Businesses Choose IVA Work Solutions</h2>
                <p className="text-slate-600 leading-relaxed">We stand out by merging consulting excellence, talent search, and robust technology engineering under a single unified corporate umbrella. Here is why enterprise partners trust us:</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Tailored Business Solutions', desc: 'We reject cookie-cutter models and build custom strategies for your exact targets.' },
                  { title: 'Expert Consulting Team', desc: 'Senior consultants bring decades of real-world operational execution expertise.' },
                  { title: 'Reliable Talent Acquisition', desc: 'Rigorous vetting pipeline decreases bad hires and accelerates time-to-market.' },
                  { title: 'Scalable Technology Services', desc: 'Deploy modern AWS, Azure, custom web applications and AI tools ready to scale.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-[#5EE3B7]/20 flex items-center justify-center text-[#5EE3B7] mt-0.5 shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setCurrentPage('about')} className="bg-slate-950 hover:bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm flex items-center space-x-2">
                <span>Discover Our Values</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white p-2 bg-gradient-to-tr from-[#5EE3B7]/20 to-[#00BFEF]/20">
                <img src="https://images.pexels.com/photos/7792835/pexels-photo-7792835.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800" alt="IVA Corporate Strategy Session" className="rounded-2xl object-cover h-[380px] w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHO WE ARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] rounded-3xl transform rotate-3 scale-95 opacity-20 -z-10"></div>
              <img src="https://images.pexels.com/photos/8127807/pexels-photo-8127807.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=500" alt="Technology Consulting Group" className="rounded-3xl shadow-xl w-full max-h-[480px] object-cover border border-slate-100" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00BFEF] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">Who We Are</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Your Trusted Growth Partner</h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>IVA Work Solutions is a trusted IT consulting & Technology company dedicated to helping businesses navigate today's fast-changing digital world with confidence. We provide innovative technology solutions, strategic guidance, and expert support that enable organizations to improve efficiency, streamline operations, and accelerate growth.</p>
              <p>As a modern consulting partner, we specialize in understanding business challenges and transforming them into scalable technology opportunities. From IT strategy and digital transformation to cloud solutions, system optimization, and workforce support, we deliver customized services designed to meet the unique goals of every client.</p>
              <p>At IVA Work Solutions, we believe technology should empower businesses, not complicate them. Our team combines industry expertise, practical insights, and a results-driven approach to create solutions that deliver measurable value. We are more than consultants — we are your technology growth partners.</p>
            </div>
            <div className="pt-4">
              <button onClick={() => setCurrentPage('about')} className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] text-slate-900 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg">
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS – Light theme with decorative shapes */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f0fdfb 0%, #e8f8ff 45%, #f5fffe 75%, #edfcf9 100%)' }}
      >
        {/* ── Decorative background layer ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

          {/* Soft radial blobs */}
          <div className="absolute -top-28 -left-28 w-[480px] h-[480px] rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, #5EE3B7 0%, transparent 70%)' }} />
          <div className="absolute -bottom-36 -right-36 w-[520px] h-[520px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #00BFEF 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #5EE3B7 0%, #00BFEF 100%)' }} />

          {/* Concentric dashed circles – top right */}
          <svg className="absolute top-6 right-10 opacity-[0.12]" width="200" height="200" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="96" stroke="#00BFEF" strokeWidth="2.5" strokeDasharray="14 8" />
            <circle cx="100" cy="100" r="68" stroke="#5EE3B7" strokeWidth="2"   strokeDasharray="10 6" />
            <circle cx="100" cy="100" r="40" stroke="#00BFEF" strokeWidth="1.5" strokeDasharray="6 5" />
            <circle cx="100" cy="100" r="14" fill="#5EE3B7" opacity="0.3" />
          </svg>

          {/* Nested squares – bottom left */}
          <svg className="absolute bottom-8 left-12 opacity-[0.11]" width="160" height="160" viewBox="0 0 160 160" fill="none">
            <rect x="4"  y="4"  width="152" height="152" rx="28" stroke="#5EE3B7" strokeWidth="2.5" strokeDasharray="12 7" />
            <rect x="24" y="24" width="112" height="112" rx="20" stroke="#00BFEF" strokeWidth="2"   strokeDasharray="8 5" />
            <rect x="46" y="46" width="68"  height="68"  rx="12" stroke="#5EE3B7" strokeWidth="1.5" />
            <rect x="64" y="64" width="32"  height="32"  rx="6"  fill="#00BFEF"  opacity="0.2" />
          </svg>

          {/* Triangle – left mid */}
          <svg className="absolute top-1/3 left-[6%] opacity-[0.09]" width="90" height="90" viewBox="0 0 90 90" fill="none">
            <polygon points="45,5 85,75 5,75" stroke="#00BFEF" strokeWidth="3" fill="none" />
            <polygon points="45,20 72,68 18,68" stroke="#5EE3B7" strokeWidth="2" fill="none" />
          </svg>

          {/* Hexagon – right mid */}
          <svg className="absolute bottom-16 right-[10%] opacity-[0.10]" width="110" height="110" viewBox="0 0 110 110" fill="none">
            <polygon points="55,5 100,30 100,80 55,105 10,80 10,30" stroke="#5EE3B7" strokeWidth="2.5" fill="none" />
            <polygon points="55,20 88,38 88,72 55,90 22,72 22,38" stroke="#00BFEF" strokeWidth="1.5" fill="none" />
          </svg>

          {/* Wavy lines – top center */}
          <svg className="absolute top-16 left-1/2 -translate-x-1/2 opacity-[0.07]" width="560" height="70" viewBox="0 0 560 70" fill="none">
            <path d="M0 35 Q140 5 280 35 Q420 65 560 35"  stroke="#00BFEF" strokeWidth="2"   fill="none" />
            <path d="M0 48 Q140 18 280 48 Q420 78 560 48" stroke="#5EE3B7" strokeWidth="1.5" fill="none" />
            <path d="M0 22 Q140 52 280 22 Q420 -8 560 22"  stroke="#00BFEF" strokeWidth="1"   fill="none" />
          </svg>

          {/* Dot-grid overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tdots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="#00BFEF" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tdots)" />
          </svg>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00BFEF] bg-[#00BFEF]/10 border border-[#00BFEF]/20 px-3.5 py-1.5 rounded-full inline-block">
                Client Success
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">What Our Clients Say</h2>
              <p className="text-slate-500 leading-relaxed">
                Discover how businesses scale, automate, and hire confidently with our unified expertise through our premium client success stories.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 tracking-[0.18em] uppercase">
                {String(activeTestimonial + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={goToPrev} aria-label="Previous" className="h-11 w-11 rounded-full border border-[#5EE3B7]/40 bg-white hover:bg-[#5EE3B7]/10 shadow-sm transition-all flex items-center justify-center text-slate-600">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={goToNext} aria-label="Next" className="h-11 w-11 rounded-full border border-[#00BFEF]/40 bg-white hover:bg-[#00BFEF]/10 shadow-sm transition-all flex items-center justify-center text-slate-600">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel track */}
          <div className="overflow-hidden rounded-[32px] border border-[#5EE3B7]/20 bg-white/70 backdrop-blur-md shadow-2xl shadow-[#5EE3B7]/10">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} className="min-w-full p-4 sm:p-6 lg:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

                    {/* Quote card */}
                    <div className="lg:col-span-8 rounded-[28px] border border-[#5EE3B7]/20 bg-gradient-to-br from-white via-[#f0fdfb] to-[#e8f8ff] p-8 sm:p-10 relative overflow-hidden shadow-md">
                      <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-[#5EE3B7]/15 blur-2xl" />
                      <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#00BFEF]/10 blur-2xl" />
                      {/* Giant decorative quote mark */}
                      <span className="absolute top-4 right-6 text-[130px] leading-none font-black text-[#5EE3B7]/10 select-none pointer-events-none">"</span>

                      <div className="relative z-10 space-y-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex space-x-1 text-amber-400">
                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                          </div>
                          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#5EE3B7] to-[#00BFEF] flex items-center justify-center text-white shadow-md">
                            <Quote className="h-6 w-6" />
                          </div>
                        </div>

                        <p className="text-lg sm:text-xl leading-relaxed font-semibold text-slate-800 max-w-3xl">
                          "{testimonial.quote}"
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                          {[
                            { label: 'Service Impact',     value: 'Strategy + Delivery Excellence' },
                            { label: 'Engagement Type',    value: 'Consulting, Staffing & Tech' },
                            { label: 'Client Satisfaction', value: 'Trusted Long-Term Partner', gradient: true },
                          ].map((card) => (
                            <div key={card.label} className="rounded-2xl border border-[#5EE3B7]/20 bg-white/80 p-4 shadow-sm">
                              <span className="block text-[10px] uppercase tracking-widest text-[#00BFEF] font-bold">{card.label}</span>
                              {card.gradient
                                ? <span className="mt-2 block text-sm font-bold bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">{card.value}</span>
                                : <span className="mt-2 block text-sm font-bold text-slate-800">{card.value}</span>
                              }
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Author card */}
                    <div className="lg:col-span-4 rounded-[28px] border border-[#00BFEF]/20 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-md">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="p-[2px] rounded-2xl bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] shadow-md shrink-0">
                            <img src={testimonial.image} alt={testimonial.author} className="h-16 w-16 rounded-[14px] object-cover" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-slate-900">{testimonial.author}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed">{testimonial.role}</p>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-r from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/20 p-4">
                          <span className="text-[11px] uppercase tracking-widest text-[#00BFEF] font-bold block">Verified Client Feedback</span>
                          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                            Real outcomes from clients who trusted IVA Work Solutions to accelerate performance, hiring, and digital execution.
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-100 mt-6">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                          <span className="font-medium">Auto-playing continuously</span>
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                            <span className="font-bold text-emerald-600">Live</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {TESTIMONIALS.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => setActiveTestimonial(dotIdx)}
                              className={`h-2.5 rounded-full transition-all duration-300 ${
                                activeTestimonial === dotIdx
                                  ? 'w-10 bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] shadow-sm'
                                  : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                              }`}
                              aria-label={`Go to testimonial ${dotIdx + 1}`}
                            />
                          ))}
                        </div>
                        {/* Progress bar */}
                        <div className="mt-4 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            key={activeTestimonial}
                            className="h-full bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] rounded-full"
                            style={{ animation: 'progressBar 3s linear forwards' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`text-left rounded-2xl p-4 border transition-all duration-300 ${
                  activeTestimonial === idx
                    ? 'border-[#00BFEF]/50 bg-white shadow-md shadow-[#00BFEF]/10'
                    : 'border-slate-200/70 bg-white/60 hover:bg-white hover:border-[#5EE3B7]/30 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={testimonial.image} alt={testimonial.author} className="h-12 w-12 rounded-xl object-cover border border-[#5EE3B7]/20 shadow-sm" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{testimonial.author}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
