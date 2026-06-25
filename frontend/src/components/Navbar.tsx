import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Briefcase, Cpu, Layers } from 'lucide-react';
import { Page } from '../types';
import { ADVISOR_PHONE_TEL } from '../constants/contact';
import logo from '../assets/logo.png';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onNavigateToService: (categoryId: 'consulting' | 'staffing' | 'technology', serviceId: string) => void;
  onNavigateToServiceCategory: (categoryId: 'consulting' | 'staffing' | 'technology') => void;
}

export default function Navbar({ currentPage, setCurrentPage, onNavigateToService, onNavigateToServiceCategory }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isServicesPage = ['services', 'consulting-services', 'staffing-solutions', 'technology-services'].includes(currentPage);

  // Handle scroll detection for sticky glassmorphism look + close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    setIsScrolled(false);
  }, [currentPage]);

  const dropdownMenu = {
    consulting: {
      title: 'Consulting Services',
      items: [
        { id: 'business-strategy', label: 'Managed Vendor Support' },
        { id: 'process-improvement', label: 'Offshore Delivery Partnership' },
        { id: 'vendor-management', label: 'White-Label IT Services' },
        { id: 'growth-planning', label: 'Project-Based Engagements' }
      ]
    },
    staffing: {
      title: 'Staffing Solutions',
      items: [
        { id: 'permanent-hiring', label: 'IT Contract & Permanent Staffing' },
        { id: 'contract-staffing', label: 'Dedicated Development Teams' },
        { id: 'executive-search', label: 'Recruitment Process Outsourcing (RPO)' },
      ]
    },
    technology: {
      title: 'Technology Services',
      items: [
        { id: 'it-consulting', label: 'Custom Software Development' },
        { id: 'web-development', label: 'Cloud & DevOps Solutions' },
        { id: 'cloud-solutions', label: 'QA & Testing Services' },
        { id: 'automation', label: 'Data & Analytics Solutions' },
        { id: 'cybersecurity', label: 'Application Modernization' }
      ]
    }
  };

  const handleSubServiceClick = (category: 'consulting' | 'staffing' | 'technology', serviceId: string) => {
    onNavigateToService(category, serviceId);
    setIsOpen(false);
  };

  // Drawer top offset matches nav height: py-3 (scrolled ~64px) vs py-5 (not scrolled ~80px)
  const drawerTop = isScrolled ? 'top-[64px]' : 'top-[80px]';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100/50 py-3'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo / Branding */}
            <div
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="h-10 w-15 rounded-xl from-[#5EE3B7] to-[#00BFEF] p-[2px] transition-transform duration-300 group-hover:scale-105">
                <img src={logo} alt="IVA Work Solutions Logo" className="object-contain" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 'home' ? 'text-[#00BFEF] bg-slate-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setCurrentPage('about')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 'about' ? 'text-[#00BFEF] bg-slate-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                About Us
              </button>

              {/* Premium Mega-Menu / Services Dropdown */}
              <div className="relative group">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1 cursor-default ${
                    isServicesPage ? 'text-[#00BFEF] bg-slate-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                {/* Mega-menu dropdown — transparent outer div is flush to button (no gap) so cursor stays inside group */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[820px] pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-6">

                  {/* Consulting Services column */}
                  <div className="space-y-4">
                    <button
                      onClick={() => onNavigateToServiceCategory('consulting')}
                      className="flex items-center space-x-2 border-b border-gray-100 pb-2 w-full text-left group/title"
                    >
                      <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center">
                        <Layers className="h-4 w-4 text-[#5EE3B7]" />
                      </div>
                      <span className="text-sm font-bold text-slate-800 uppercase tracking-wider group-hover/title:text-[#5EE3B7] transition-colors">Consulting</span>
                    </button>
                    <ul className="space-y-2">
                      {dropdownMenu.consulting.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => handleSubServiceClick('consulting', item.id)}
                            className="w-full text-left text-sm text-slate-600 hover:text-[#5EE3B7] hover:pl-2 transition-all duration-200 flex items-center justify-between group/sub"
                          >
                            <span>{item.label}</span>
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Staffing Solutions column */}
                  <div className="space-y-4">
                    <button
                      onClick={() => onNavigateToServiceCategory('staffing')}
                      className="flex items-center space-x-2 border-b border-gray-100 pb-2 w-full text-left group/title"
                    >
                      <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-[#00BFEF]" />
                      </div>
                      <span className="text-sm font-bold text-slate-800 uppercase tracking-wider group-hover/title:text-[#00BFEF] transition-colors">Staffing</span>
                    </button>
                    <ul className="space-y-2">
                      {dropdownMenu.staffing.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => handleSubServiceClick('staffing', item.id)}
                            className="w-full text-left text-sm text-slate-600 hover:text-[#00BFEF] hover:pl-2 transition-all duration-200 flex items-center justify-between group/sub"
                          >
                            <span>{item.label}</span>
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Services column */}
                  <div className="space-y-4">
                    <button
                      onClick={() => onNavigateToServiceCategory('technology')}
                      className="flex items-center space-x-2 border-b border-gray-100 pb-2 w-full text-left group/title"
                    >
                      <div className="h-8 w-8 rounded-lg bg-[#5EE3B7]/10 flex items-center justify-center">
                        <Cpu className="h-4 w-4 text-[#5EE3B7]" />
                      </div>
                      <span className="text-sm font-bold text-slate-800 uppercase tracking-wider group-hover/title:text-[#00BFEF] transition-colors">Technology</span>
                    </button>
                    <ul className="space-y-2">
                      {dropdownMenu.technology.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => handleSubServiceClick('technology', item.id)}
                            className="w-full text-left text-sm text-slate-600 hover:text-[#00BFEF] hover:pl-2 transition-all duration-200 flex items-center justify-between group/sub"
                          >
                            <span>{item.label}</span>
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('careers')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 'careers' ? 'text-[#00BFEF] bg-slate-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Careers
              </button>

              <button
                onClick={() => setCurrentPage('blog')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 'blog' ? 'text-[#00BFEF] bg-slate-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Blog
              </button>

              <button
                onClick={() => setCurrentPage('contact')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 'contact' ? 'text-[#00BFEF] bg-slate-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Contact Us
              </button>

              {/* CTA */}
              <div className="ml-4 pl-4 border-l border-gray-200">
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] hover:from-[#4dd1a4] hover:to-[#00abd4] text-white font-bold px-4 py-2 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                >
                  Inquire Now
                </button>
              </div>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex lg:hidden items-center space-x-3">
              <a
                href={`tel:${ADVISOR_PHONE_TEL}`}
                className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-full"
              >
                Call
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 text-slate-700 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 transition-all"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer — outside <nav> so the nav (z-50) always sits above it, keeping the toggle button clickable */}
      {isOpen && (
        <div className={`lg:hidden fixed ${drawerTop} left-0 right-0 bottom-0 bg-white z-40 overflow-y-auto px-4 py-6 pb-24 border-t border-gray-100 flex flex-col justify-between`}>
          <div className="space-y-4">
            <button
              onClick={() => { setCurrentPage('home'); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 text-lg font-bold text-slate-800 hover:bg-slate-50 rounded-xl block"
            >
              Home
            </button>

            <button
              onClick={() => { setCurrentPage('about'); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 text-lg font-bold text-slate-800 hover:bg-slate-50 rounded-xl block"
            >
              About Us
            </button>

            {/* Mobile Services Sections */}
            <div className="border-t border-b border-gray-100 py-3 my-2">
              <span className="px-4 text-xs font-bold text-[#00BFEF] uppercase tracking-wider block mb-2">Services Categories</span>

              {/* Consulting Sub-Menu */}
              <div className="mb-4">
                <span className="px-4 text-sm font-bold text-slate-800 block mb-1">Consulting Services</span>
                <div className="pl-4 grid grid-cols-1 gap-1">
                  {dropdownMenu.consulting.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSubServiceClick('consulting', item.id)}
                      className="text-left py-2 px-4 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Staffing Sub-Menu */}
              <div className="mb-4">
                <span className="px-4 text-sm font-bold text-slate-800 block mb-1">Staffing Solutions</span>
                <div className="pl-4 grid grid-cols-1 gap-1">
                  {dropdownMenu.staffing.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSubServiceClick('staffing', item.id)}
                      className="text-left py-2 px-4 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tech Sub-Menu */}
              <div>
                <span className="px-4 text-sm font-bold text-slate-800 block mb-1">Technology Services</span>
                <div className="pl-4 grid grid-cols-1 gap-1">
                  {dropdownMenu.technology.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleSubServiceClick('technology', item.id)}
                      className="text-left py-2 px-4 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => { setCurrentPage('careers'); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 text-lg font-bold text-slate-800 hover:bg-slate-50 rounded-xl block"
            >
              Careers
            </button>

            <button
              onClick={() => { setCurrentPage('blog'); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 text-lg font-bold text-slate-800 hover:bg-slate-50 rounded-xl block"
            >
              Blog
            </button>

            <button
              onClick={() => { setCurrentPage('contact'); setIsOpen(false); }}
              className="w-full text-left px-4 py-3 text-lg font-bold text-slate-800 hover:bg-slate-50 rounded-xl block"
            >
              Contact Us
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <button
              onClick={() => { setCurrentPage('contact'); setIsOpen(false); }}
              className="w-full text-center bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] text-white font-bold py-3.5 rounded-xl shadow-md"
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
