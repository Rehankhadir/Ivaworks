import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Page } from '../types';

const CONSENT_STORAGE_KEY = 'iva-cookie-consent';

export interface CookiePreferences {
  analytics: boolean;
  performanceFunctional: boolean;
  advertising: boolean;
  choice: 'accepted-all' | 'rejected' | 'custom';
}

const defaultPreferences: CookiePreferences = {
  analytics: false,
  performanceFunctional: false,
  advertising: false,
  choice: 'rejected',
};

interface Props {
  setCurrentPage: (page: Page) => void;
}

function Toggle({ enabled, onChange, disabled }: { enabled: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        disabled ? 'bg-slate-200 cursor-not-allowed' : enabled ? 'bg-[#00BFEF]' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function CookieConsent({ setCurrentPage }: Props) {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [openSections, setOpenSections] = useState({
    strictlyNecessary: true,
    analytics: false,
    performanceFunctional: false,
    advertising: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        setVisible(true);
        return;
      }
      setPreferences(JSON.parse(stored) as CookiePreferences);
    } catch {
      setVisible(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      analytics: true,
      performanceFunctional: true,
      advertising: true,
      choice: 'accepted-all',
    });
  };

  const handleReject = () => {
    savePreferences({ ...defaultPreferences, choice: 'rejected' });
  };

  const handleConfirmChoices = () => {
    savePreferences({ ...preferences, choice: 'custom' });
  };

  const navigateTo = (page: Page) => {
    setShowSettings(false);
    setCurrentPage(page);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!visible && !showSettings) return null;

  const policyLinks = (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
      <button onClick={() => navigateTo('cookie-policy')} className="font-semibold text-[#00BFEF] hover:underline">
        Cookie Policy
      </button>
      <button onClick={() => navigateTo('privacy-policy')} className="font-semibold text-[#00BFEF] hover:underline">
        Privacy Policy
      </button>
      <button onClick={() => navigateTo('terms-of-service')} className="font-semibold text-[#00BFEF] hover:underline">
        Terms of Service
      </button>
    </div>
  );

  return (
    <>
      {/* Footer Cookie Banner */}
      {visible && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 pb-[4.5rem] sm:pb-4">
          <div className="mx-auto max-w-6xl rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-2xl">
            <div className="flex flex-col gap-4 p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-3 min-w-0">
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5EE3B7]/10 text-[#5EE3B7]">
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="min-w-0 space-y-2">
                  <p className="text-sm leading-relaxed text-slate-200">
                    Welcome to <span className="font-semibold text-white">ivaworksolutions.com</span>! In order to provide a more relevant experience for you, we use cookies and similar technologies to improve website functionality, analyze traffic, enhance user experience, and support our recruitment and technology services.
                  </p>
                  <p className="text-xs text-slate-400">
                    By clicking &quot;Accept All&quot;, you agree to our use of cookies as described in our Cookie Policy.
                  </p>
                  {policyLinks}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <button
                  onClick={handleReject}
                  className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
                >
                  Reject
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
                >
                  Cookies Setting
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] px-4 py-2.5 text-xs font-extrabold text-slate-950 transition-all hover:scale-[1.02]"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowSettings(false)} />

          <div className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-950">Privacy Preference Center</h2>
                <p className="text-xs text-slate-500 mt-0.5">Manage Consent Preferences</p>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 py-5 sm:px-6 space-y-5">
              <p className="text-sm leading-relaxed text-slate-600">
                Any web site that you visit may store or retrieve personal information, mostly through the use of
                cookies. The stored or retrieved information might be about you, your preferences or your device
                and is used for the purposes specified per cookies category below. The data controller of your
                data processed through our cookies is IVA Work Solutions. In addition, some cookies we use are
                from (and controlled by) third-party companies, such as, Facebook, Microsoft, Google and
                LinkedIn Analytics to provide us with web analytics and intelligence about our sites. You can
                accept the cookies as per your preferences by activating the sliders per cookies category. By
                accepting cookies, the functionalities described per cookies category will be activated and by
                not accepting cookies, such functionalities will not be activated. Because we respect your right
                to privacy, you can choose not to allow some types of cookies, and you have the right to
                withdraw your consent by adapting your preferences in our cookie consent manager. Click on
                the different category headings to find out more and change our default settings. Please read
                our{' '}
                <button onClick={() => navigateTo('cookie-policy')} className="font-semibold text-[#00BFEF] hover:underline">
                  Cookies Policy
                </button>{' '}
                for more information.
              </p>
              <div>
                <button
                  onClick={handleAcceptAll}
                  className="rounded-xl border border-[#00BFEF]/30 bg-[#00BFEF]/10 px-4 py-2.5 text-xs font-bold text-[#00BFEF] transition-colors hover:bg-[#00BFEF]/20"
                >
                  Allow All
                </button>
              </div>

              {/* Strictly Necessary */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSection('strictlyNecessary')}
                      className="text-slate-700 text-lg leading-none font-bold"
                      aria-label="Toggle Strictly Necessary Cookies"
                    >
                      {openSections.strictlyNecessary ? '-' : '+'}
                    </button>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Strictly Necessary Cookies</h3>
                      <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-widest text-[#00BFEF]">Always Active</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Toggle enabled={true} onChange={() => {}} disabled />
                  </div>
                </div>
                {openSections.strictlyNecessary && (
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    These cookies are essential in order to enable you to move around the site and use its
                    features, such as accessing secure areas of the site. Without these cookies, services
                    you have asked for cannot be provided.{' '}
                    <button onClick={() => navigateTo('cookie-policy')} className="font-semibold text-[#00BFEF] hover:underline">
                      Cookies Policy
                    </button>
                  </p>
                )}
              </div>

              {/* Analytics */}
              <div className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSection('analytics')}
                      className="text-slate-700 text-lg leading-none font-bold"
                      aria-label="Toggle Analytics Cookies"
                    >
                      {openSections.analytics ? '-' : '+'}
                    </button>
                    <h3 className="text-sm font-bold text-slate-900">Analytics Cookies</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Toggle
                      enabled={preferences.analytics}
                      onChange={(v) => setPreferences((p) => ({ ...p, analytics: v }))}
                    />
                  </div>
                </div>
                {openSections.analytics && (
                  <>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      These cookies enable us to employ data analytics so we can measure and improve the
                      performance of our site and to personalize and enhance your profile-based experience
                      on our site. They help us test and deliver content that is more relevant to you by
                      analyzing how you interact with our site, including generating insights about how
                      different audiences engage with our content.
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      They may collect information associated with devices, identifiers or interactions that are
                      not intended to directly identify you as an individual but can be considered personal
                      data under applicable privacy laws. Such data may be used in aggregate for audience-level
                      insights, including region-based or organizational-level insights where applicable.
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      Such data is processed by service providers acting on our behalf, including Adobe
                      Analytics, Adobe Target (including using AI for website performance improvement),
                      Audience Manager, Google Analytics, Leadfeeder, Contentsquare and Demandbase to
                      provide us with analytics and insights about the use of our website and the audiences
                      interacting with it.{' '}
                      <button onClick={() => navigateTo('cookie-policy')} className="font-semibold text-[#00BFEF] hover:underline">
                        Cookies Policy
                      </button>
                    </p>
                  </>
                )}
              </div>

              {/* Performance & Functional */}
              <div className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSection('performanceFunctional')}
                      className="text-slate-700 text-lg leading-none font-bold"
                      aria-label="Toggle Performance and Functional Cookies"
                    >
                      {openSections.performanceFunctional ? '-' : '+'}
                    </button>
                    <h3 className="text-sm font-bold text-slate-900">Performance &amp; Functional Cookies</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Toggle
                      enabled={preferences.performanceFunctional}
                      onChange={(v) => setPreferences((p) => ({ ...p, performanceFunctional: v }))}
                    />
                  </div>
                </div>
                {openSections.performanceFunctional && (
                  <>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Performance cookies are generally third-party cookies from vendors we work with or
                      who work on our behalf that collect information about your visit and use of the
                      IVA Work Solutions website, for instance which pages you visit the most often, and if
                      you get error messages from web pages. These cookies do not collect information that
                      identifies a visitor. All information these cookies collect is anonymous and is only used
                      to improve how the website works. Third party vendors may have access to this data and
                      may use it to improve their overall services and offerings.
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      Functionality cookies allow a site to remember choices you make (such as your
                      username, language or the region you are in) and provide more enhanced, personal
                      features. These cookies cannot track your browsing activity on other websites. They do
                      not gather any information about you that could be used for advertising or remembering
                      where you have been on the Internet outside our site.{' '}
                      <button onClick={() => navigateTo('cookie-policy')} className="font-semibold text-[#00BFEF] hover:underline">
                        Cookies Policy
                      </button>
                    </p>
                  </>
                )}
              </div>

              {/* Advertising & Social Media */}
              <div className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSection('advertising')}
                      className="text-slate-700 text-lg leading-none font-bold"
                      aria-label="Toggle Advertising and Social Media Cookies"
                    >
                      {openSections.advertising ? '-' : '+'}
                    </button>
                    <h3 className="text-sm font-bold text-slate-900">Advertising &amp; Social Media Cookies</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Toggle
                      enabled={preferences.advertising}
                      onChange={(v) => setPreferences((p) => ({ ...p, advertising: v }))}
                    />
                  </div>
                </div>
                {openSections.advertising && (
                  <>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                      Advertising and social media cookies (including web beacons and other tracking and
                      storage technologies) are used to (1) deliver advertisements more relevant to you and
                      your interests; (2) limit the number of times you see an advertisement; (3) help measure
                      the effectiveness of the advertising campaign; (4) retargeting to IVA Work Solutions
                      websites/information and (5) understand people's behavior after they view an
                      advertisement.
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      They are usually placed on behalf of advertising networks with the site operator's
                      permission. They remember that you have visited a site and quite often they will be linked
                      to site functionality provided by another organization. This may impact the content and
                      messages you see on other websites you visit. If you do not allow these cookies you may
                      not be able to use or see these sharing tools or play certain videos on our site.{' '}
                      <button onClick={() => navigateTo('cookie-policy')} className="font-semibold text-[#00BFEF] hover:underline">
                        Cookies Policy
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 flex flex-col sm:flex-row gap-2 border-t border-slate-100 bg-white px-5 py-4 sm:px-6">
              <button
                onClick={handleReject}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Reject All
              </button>
              <button
                onClick={handleConfirmChoices}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] px-4 py-2.5 text-xs font-extrabold text-slate-950 transition-all hover:scale-[1.02]"
              >
                Confirm My Choices
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
