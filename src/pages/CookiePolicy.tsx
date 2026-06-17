import { useState, useEffect } from 'react';
import { Page } from '../types';

interface Props {
  setCurrentPage: (page: Page) => void;
}

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'what-are-cookies', title: 'What Are Cookies?' },
  { id: 'how-we-use', title: 'How We Use Cookies' },
  { id: 'third-party', title: 'Third-Party Cookies' },
  { id: 'managing-cookies', title: 'Managing Your Cookies' },
  { id: 'strictly-necessary', title: 'Strictly Necessary Cookies' },
  { id: 'analytics', title: 'Analytics Cookies' },
  { id: 'performance-functional', title: 'Performance & Functional Cookies' },
  { id: 'advertising-social', title: 'Advertising & Social Media Cookies' },
];

export default function CookiePolicy({ setCurrentPage }: Props) {
  const [activeSection, setActiveSection] = useState('introduction');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-24 pb-12">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5EE3B7]/10 via-transparent to-[#00BFEF]/10"></div>
          <div className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full bg-white blur-[80px]"></div>
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[#00BFEF]/15 blur-[150px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full border border-[#5EE3B7]/30 bg-[#5EE3B7]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-700">
            Legal
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-slate-500">Effective Date: June 2025 &nbsp;·&nbsp; IVA Work Solutions</p>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex gap-8 items-start">

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block w-60 shrink-0 sticky top-24">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Contents</p>
              <nav className="space-y-1">
                {sections.map(({ id, title }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all font-medium ${
                      activeSection === id
                        ? 'bg-[#5EE3B7]/10 text-[#00BFEF] font-bold'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 rounded-3xl border border-slate-100 bg-white p-8 sm:p-10 shadow-sm space-y-10">

            {/* Summary */}
            <div className="rounded-2xl border border-[#5EE3B7]/30 bg-[#5EE3B7]/5 p-6">
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-bold text-slate-950">Summary:</span> This Cookie Policy explains how IVA Work Solutions uses cookies and similar technologies when you visit our website at <span className="font-semibold">ivaworksolutions.com</span>. By using our website, you agree to the use of cookies in accordance with this policy unless you disable them through your browser settings or cookie preferences.
              </p>
            </div>

            <Section id="introduction" title="Introduction">
              <p>
                This Cookie Policy explains how IVA Work Solutions ("IVA Work Solutions," "we," "our," or "us") uses cookies and similar technologies when you visit our website.
              </p>
              <p className="mt-3">
                By using our website, you agree to the use of cookies in accordance with this Cookie Policy unless you disable them through your browser settings or cookie preferences.
              </p>
            </Section>

            <Section id="what-are-cookies" title="What Are Cookies?">
              <p>
                Cookies are small text files placed on your device when you visit a website. They help websites function efficiently, remember your preferences, improve user experience, and provide analytics about website usage.
              </p>
            </Section>

            <Section id="how-we-use" title="How We Use Cookies">
              <p>IVA Work Solutions uses cookies for the following purposes:</p>
              <ol className="mt-4 space-y-3 text-sm text-slate-600 list-decimal list-inside">
                <li>
                  <span className="font-semibold text-slate-800">Essential Cookies:</span> These cookies are necessary for the website to function properly and cannot be disabled.
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Performance &amp; Analytics Cookies:</span> These cookies help us understand how visitors interact with our website.
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Functional Cookies:</span> These cookies remember your preferences and settings.
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Marketing &amp; Advertising Cookies:</span> Where applicable, these cookies may be used to measure the effectiveness of marketing campaigns and provide relevant content.
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Managing Cookies:</span> Most web browsers allow you to control cookies through browser settings.
                </li>
              </ol>
            </Section>

            <Section id="third-party" title="Third-Party Cookies">
              <p>
                Some cookies, web beacons and other tracking and storage technologies that we use are from third party companies (third party cookies), such as Facebook, Microsoft, YouTube, Google, and LinkedIn Analytics to provide us with web analytics and intelligence about our sites which may also be used to provide measurement services and target ads. These companies use programming code to collect information about your interaction with our sites, such as the pages you visit, the links you click on and how long you are on our sites. This code is only active while you are on an IVA Work Solutions website.
              </p>
              <p className="mt-4">
                If you have provided consent, your interactions may be tracked across multiple devices and platforms. For instance, this may occur through services like Google Analytics, when you are logged into your Google account on multiple devices. For more information on how these companies collect and use information on our behalf, please refer to their privacy policies:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 list-disc list-inside">
                <li>
                  Facebook —{' '}
                  <a href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0" target="_blank" rel="noreferrer" className="text-[#00BFEF] hover:underline font-medium">
                    Facebook Data Policy
                  </a>
                </li>
                <li>
                  Google (including YouTube) —{' '}
                  <a href="https://policies.google.com/?hl=en" target="_blank" rel="noreferrer" className="text-[#00BFEF] hover:underline font-medium">
                    Google Privacy &amp; Terms
                  </a>
                  {' '}and Google Account Data &amp; Privacy Options
                </li>
                <li>
                  Microsoft —{' '}
                  <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noreferrer" className="text-[#00BFEF] hover:underline font-medium">
                    Microsoft Privacy Statement
                  </a>
                </li>
                <li>
                  LinkedIn —{' '}
                  <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noreferrer" className="text-[#00BFEF] hover:underline font-medium">
                    LinkedIn Privacy Policy
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                We may share your cookie and browsing data with the third-party service providers and partners mentioned above for purposes such as analytics, advertising, and social media integration. These third parties may use this data to improve their services and deliver more relevant content in accordance with their respective privacy statements, mentioned above.
              </p>
            </Section>

            <Section id="managing-cookies" title="Managing Your Cookies">
              <p>
                You can adjust your cookie settings through our cookie consent manager. If you want to remove existing cookies from your device, you can do this using your browser options. If you want to block future cookies being placed on your device you can use our cookie consent manager.
              </p>
              <p className="mt-4">
                Please bear in mind that deleting and blocking cookies may have an impact on your user experience.
              </p>
              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <h3 className="text-sm font-bold text-slate-800 mb-2">Privacy Preference Center</h3>
                <p className="text-sm text-slate-600">
                  Any website that you visit may store or retrieve personal information, mostly through the use of cookies. The stored or retrieved information might be about you, your preferences or your device and is used for the purposes specified per cookies category below. The data controller of your data processed through our cookies is IVA Work Solutions.
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  In addition, some cookies we use are from (and controlled by) third-party companies, such as Facebook, Microsoft, Google and LinkedIn Analytics to provide us with web analytics and intelligence about our sites. You can accept the cookies as per your preferences by activating the sliders per cookies category. By accepting cookies, the functionalities described per cookies category will be activated and by not accepting cookies, such functionalities will not be activated.
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Because we respect your right to privacy, you can choose not to allow some types of cookies, and you have the right to withdraw your consent by adapting your preferences in our cookie consent manager. Click on the different category headings to find out more and change our default settings.
                </p>
              </div>
            </Section>

            <Section id="strictly-necessary" title="Strictly Necessary Cookies">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">
                Always Active
              </div>
              <p>
                These cookies are essential in order to enable you to move around the site and use its features, such as accessing secure areas of the site. Without these cookies, services you have asked for cannot be provided.
              </p>
            </Section>

            <Section id="analytics" title="Analytics Cookies">
              <p>
                These cookies enable us to employ data analytics so we can measure and improve the performance of our site and to personalize and enhance your profile-based experience on our site. They help us test and deliver content that is more relevant to you by analyzing how you interact with our site, including generating insights about how different audiences engage with our content.
              </p>
              <p className="mt-4">
                They may collect information associated with devices, identifiers or interactions that are not intended to directly identify you as an individual but can be considered personal data under applicable privacy laws. Such data may be used in aggregate for audience-level insights, including region-based or organizational-level insights where applicable.
              </p>
              <p className="mt-4">
                Such data is processed by service providers acting on our behalf, including Adobe Analytics, Adobe Target (including using AI for website performance improvement), Audience Manager, Google Analytics, Leadfeeder, Contentsquare and Demandbase to provide us with analytics and insights about the use of our website and the audiences interacting with it.
              </p>
            </Section>

            <Section id="performance-functional" title="Performance & Functional Cookies">
              <p>
                Performance cookies are generally third-party cookies from vendors we work with or who work on our behalf that collect information about your visit and use of the IVA Work Solutions website, for instance which pages you visit the most often, and if you get error messages from web pages. These cookies don't collect information that identifies a visitor. All information these cookies collect is anonymous and is only used to improve how the website works. Third party vendors may have access to this data and may use it to improve their overall services and offerings.
              </p>
              <p className="mt-4">
                Functionality cookies allow a site to remember choices you make (such as your username, language or the region you are in) and provide more enhanced, personal features. These cookies cannot track your browsing activity on other websites. They don't gather any information about you that could be used for advertising or remembering where you've been on the Internet outside our site.
              </p>
            </Section>

            <Section id="advertising-social" title="Advertising & Social Media Cookies">
              <p>
                Advertising and social media cookies (including web beacons and other tracking and storage technologies) are used to (1) deliver advertisements more relevant to you and your interests; (2) limit the number of times you see an advertisement; (3) help measure the effectiveness of the advertising campaign; (4) retargeting to IVA Work Solutions websites/information and (5) understand people's behavior after they view an advertisement.
              </p>
              <p className="mt-4">
                They are usually placed on behalf of advertising networks with the site operator's permission. They remember that you have visited a site and quite often they will be linked to site functionality provided by the other organization. This may impact the content and messages you see on other websites you visit. If you do not allow these cookies you may not be able to use or see these sharing tools or play certain videos on our site.
              </p>
            </Section>

            {/* Related Policies */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <h4 className="text-sm font-bold text-slate-800 mb-3">Related Policies</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <button onClick={() => setCurrentPage('privacy-policy')} className="font-semibold text-[#00BFEF] underline underline-offset-2 hover:text-[#5EE3B7] transition-colors">
                  Privacy Policy
                </button>
                <button onClick={() => setCurrentPage('terms-of-service')} className="font-semibold text-[#00BFEF] underline underline-offset-2 hover:text-[#5EE3B7] transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="rounded-2xl bg-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Questions about cookies?</h4>
                <p className="text-xs text-slate-400 mt-1">Our team is ready to assist with any cookie-related queries.</p>
              </div>
              <button
                onClick={() => setCurrentPage('contact')}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] px-5 py-3 text-xs font-extrabold text-slate-950 transition-all hover:scale-[1.02]"
              >
                Contact Us →
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="space-y-2 scroll-mt-28">
      <h2 className="text-lg font-extrabold text-[#00BFEF]">{title}</h2>
      <div className="text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}
