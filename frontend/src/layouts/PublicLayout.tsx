import { useState, useEffect, type ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import type { Page } from '../types';
import { ArrowUp, Sparkles, X, ChevronRight } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

interface PublicLayoutProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  setCurrentPage: (page: Page) => void;
  onNavigateToService: (categoryId: 'consulting' | 'staffing' | 'technology', serviceId: string) => void;
  onNavigateToServiceCategory: (categoryId: 'consulting' | 'staffing' | 'technology') => void;
  children: ReactNode;
}

export default function PublicLayout({
  currentPage,
  navigateTo,
  setCurrentPage,
  onNavigateToService,
  onNavigateToServiceCategory,
  children,
}: PublicLayoutProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-[#5EE3B7]/25">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        onNavigateToService={onNavigateToService}
        onNavigateToServiceCategory={onNavigateToServiceCategory}
      />

      {showNotification && (
        <div className="fixed bottom-6 left-6 z-40 max-w-sm bg-slate-950 text-white rounded-2xl p-4 shadow-2xl border border-slate-800 animate-fade-in hidden sm:flex items-center space-x-4">
          <div className="h-10 w-10 rounded-xl bg-[#5EE3B7]/10 flex items-center justify-center text-[#5EE3B7] shrink-0">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold">New Careers Openings!</h4>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">We are actively sourcing Senior Analysts & cloud developers. Apply today.</p>
            <button
              onClick={() => { setCurrentPage('careers'); setShowNotification(false); }}
              className="text-[10px] font-bold text-[#00BFEF] flex items-center mt-1 group"
            >
              <span>Explore Roles</span>
              <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="text-slate-500 hover:text-white p-1 rounded-full shrink-0 self-start"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>

      <Footer setCurrentPage={navigateTo} />
      <CookieConsent setCurrentPage={navigateTo} />

      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 items-end">
        <a
          href="https://wa.me/917075550125"
          target="_blank"
          rel="noreferrer"
          className="h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105"
          title="Chat with an Advisory Agent on WhatsApp"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-12 w-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 border border-slate-800"
            title="Scroll to Top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 p-3 grid grid-cols-2 gap-3 shadow-2xl">
        <a
          href="tel:+1234567890"
          className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-3 px-4 rounded-xl text-xs text-center block"
        >
          Call Advisor
        </a>
        <button
          onClick={() => setCurrentPage('contact')}
          className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs text-center block shadow"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
}
