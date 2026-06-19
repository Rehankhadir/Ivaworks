import { useState, useEffect } from 'react';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import { useHashRouter } from './routes/useHashRouter';
import { categoryToPageMap, isServicePage } from './routes/pages';
import type { Page } from './types';

export default function App() {
  const { currentPage, setCurrentPage, navigateTo } = useHashRouter();

  const [focusedCategoryId, setFocusedCategoryId] = useState<'consulting' | 'staffing' | 'technology' | null>(null);
  const [focusedServiceId, setFocusedServiceId] = useState<string | null>(null);
  const [careersKey, setCareersKey] = useState(0);
  const [blogKey, setBlogKey] = useState(0);

  const handleNavigate = (page: Page) => {
    navigateTo(page);
    if (page === 'careers') setCareersKey((k) => k + 1);
    if (page === 'blog') setBlogKey((k) => k + 1);
  };

  const handleNavigateToService = (categoryId: 'consulting' | 'staffing' | 'technology', serviceId: string) => {
    setFocusedCategoryId(categoryId);
    setFocusedServiceId(serviceId);
    setCurrentPage(categoryToPageMap[categoryId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToServiceCategory = (categoryId: 'consulting' | 'staffing' | 'technology') => {
    setFocusedCategoryId(categoryId);
    setFocusedServiceId(null);
    setCurrentPage(categoryToPageMap[categoryId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isServicePage(currentPage)) {
      setFocusedCategoryId(null);
      setFocusedServiceId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'services':
      case 'consulting-services':
      case 'staffing-solutions':
      case 'technology-services':
        return (
          <Services
            focusedCategoryId={focusedCategoryId}
            focusedServiceId={focusedServiceId}
            setFocusedCategoryId={setFocusedCategoryId}
            setFocusedServiceId={setFocusedServiceId}
          />
        );
      case 'careers':
        return <Careers key={careersKey} />;
      case 'blog':
        return <Blog key={blogKey} />;
      case 'contact':
        return <Contact />;
      case 'privacy-policy':
        return <PrivacyPolicy setCurrentPage={handleNavigate} />;
      case 'terms-of-service':
        return <TermsOfService setCurrentPage={handleNavigate} />;
      case 'cookie-policy':
        return <CookiePolicy setCurrentPage={handleNavigate} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <PublicLayout
      currentPage={currentPage}
      navigateTo={handleNavigate}
      setCurrentPage={setCurrentPage}
      onNavigateToService={handleNavigateToService}
      onNavigateToServiceCategory={handleNavigateToServiceCategory}
    >
      {renderActivePage()}
    </PublicLayout>
  );
}
