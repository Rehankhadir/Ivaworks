import { useEffect, useState } from 'react';
import type { Page } from '../types';
import { getInitialPage, validPages } from './pages';

export function useHashRouter() {
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);

  useEffect(() => {
    const handleNavigationEvent = (e: Event) => {
      const customPage = (e as CustomEvent).detail as Page;
      if (customPage && validPages.includes(customPage)) {
        setCurrentPage(customPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('navigate', handleNavigationEvent);
    return () => window.removeEventListener('navigate', handleNavigationEvent);
  }, []);

  useEffect(() => {
    if (window.location.hash.replace('#', '') !== currentPage) {
      window.location.hash = currentPage;
    }
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      const page = validPages.includes(hash) ? hash : 'home';
      setCurrentPage((prev) => (prev !== page ? page : prev));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { currentPage, setCurrentPage, navigateTo };
}
