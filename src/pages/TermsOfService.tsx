import { useState, useEffect } from 'react';
import { Page } from '../types';

interface Props {
  setCurrentPage: (page: Page) => void;
}

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'services', title: 'Services' },
  { id: 'eligibility', title: 'Eligibility' },
  { id: 'user-responsibilities', title: 'User Responsibilities' },
  { id: 'intellectual-property', title: 'Intellectual Property Rights' },
  { id: 'recruitment-disclaimer', title: 'Recruitment Disclaimer' },
  { id: 'third-party', title: 'Third-Party Services' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'privacy-changes', title: 'Privacy & Changes of Terms' },
  { id: 'force-majeure', title: 'Force Majeure' },
  { id: 'governing-law', title: 'Governing Law' },
];

export default function TermsOfService({ setCurrentPage }: Props) {
  const [activeSection, setActiveSection] = useState('acceptance');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
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
            Terms and Services
          </h1>
          <p className="mt-4 text-sm text-slate-500">Effective Date: June 2026 &nbsp;·&nbsp; IVA Work Solutions</p>
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
                <span className="font-bold text-slate-950">Summary:</span> These Terms and Services govern the use of the IVA Work Solutions website and services. By accessing the website or using our services, you agree to be bound by these Terms. Please read them carefully before using any of our services.
              </p>
            </div>

            <Section id="acceptance" title="Acceptance of Terms">
              <p>By accessing, browsing, or using the IVA Work Solutions website and related services ("Website"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as any applicable laws and regulations.</p>
              <p className="mt-3">These Terms apply to all visitors, users, clients, job applicants, business partners, and any other individuals who access or use the Website. If you do not agree with any part of these Terms, you should discontinue use of the Website immediately.</p>
            </Section>

            <Section id="services" title="Services">
              <p>IVA Work Solutions provides a range of professional consulting, staffing &amp; recruitment, and technology services designed to support organizations in achieving their business objectives. Our services may include, but are not limited to:</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Staffing and permanent recruitment solutions</li>
                <li>Contract and temporary workforce placement</li>
                <li>Workforce management and HR consulting</li>
                <li>Business strategy and process improvement consulting</li>
                <li>Technology and IT consulting services</li>
                <li>Related professional and business services</li>
              </ul>
            </Section>

            <Section id="eligibility" title="Eligibility">
              <p>Access to and use of the IVA Work Solutions website and services are available only to individuals and entities that meet the applicable eligibility requirements. By accessing the website, submitting information, applying for opportunities, or engaging our services, you represent and warrant that:</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>You must be at least 18 years of age</li>
                <li>You must be legally capable of entering into binding agreements</li>
                <li>Your use must comply with all applicable local, national, and international laws</li>
              </ul>
            </Section>

            <Section id="user-responsibilities" title="User Responsibilities">
              <p>By using our website and services, you agree to:</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Provide accurate, current, and complete information at all times</li>
                <li>Not misuse the website or attempt unauthorised access</li>
                <li>Not distribute malware, viruses, or harmful software</li>
                <li>Not engage in any activity that disrupts or interferes with our services</li>
                <li>Not use our platform for unlawful or fraudulent purposes</li>
              </ul>
            </Section>

            <Section id="intellectual-property" title="Intellectual Property Rights">
              <p>All content, materials, and intellectual property displayed on or made available through the IVA Work Solutions website, including but not limited to text, graphics, logos, trademarks, service marks, trade names, designs, images, icons, audio, video, software, and other digital content, are owned by or licensed to IVA Work Solutions and are protected by applicable copyright, trademark, intellectual property, and other proprietary rights laws.</p>
              <p className="mt-4">The IVA Work Solutions name, logo, branding elements, trademarks, service marks, and related intellectual property are the exclusive property of IVA Work Solutions. Nothing contained on this website shall be construed as granting, whether by implication, estoppel, or otherwise, any license or right to use any intellectual property, trademark, service mark, logo, or trade name without the prior written consent of IVA Work Solutions.</p>
              <p className="mt-4">Any unauthorized use, reproduction, distribution, modification, or exploitation of the intellectual property contained on this website is strictly prohibited and may result in legal action and other remedies available under applicable law.</p>
            </Section>

            <Section id="recruitment-disclaimer" title="Recruitment Disclaimer">
              <p>We act as a staffing &amp; recruitment, and consulting intermediary between job candidates and client organizations. The submission of a job application, resume, curriculum vitae (CV), profile, or expression of interest through our website, platform, or directly to our team does not create an employment relationship, contractual obligation, or guarantee of engagement between IVA Work Solutions and the applicant.</p>
              <p className="mt-4">Submission of job applications, resumes, or expressions of interest does not guarantee:</p>
              <ol className="mt-4 space-y-2 text-sm text-slate-600 list-decimal list-inside">
                <li>An interview invitation or screening call</li>
                <li>Placement with a client or employer</li>
                <li>Employment, compensation, or any contractual obligation</li>
                <li>A specific timeline for processing your application</li>
              </ol>
              <p className="mt-4 italic text-slate-700 font-medium">"Final hiring decisions remain solely with our clients and employers."</p>
            </Section>

            <Section id="third-party" title="Third-Party Services">
              <p>Our website may contain links to third-party websites, tools, or services. IVA Work Solutions is not responsible for the content, privacy practices, or accuracy of any third-party platforms. Accessing third-party links is at your own risk and subject to their respective terms and policies.</p>
            </Section>

            <Section id="liability" title="Limitation of Liability">
              <p>To the maximum extent permitted by applicable law, IVA Work Solutions shall not be liable for any indirect, incidental, consequential, special, punitive, or exemplary damages — including but not limited to loss of profits, revenue, data, business opportunities, contracts, or goodwill — arising out of or in connection with your access to, use of, or inability to use the website or services.</p>
              <p className="mt-4">IVA Work Solutions makes no warranties or guarantees regarding the availability, accuracy, reliability, or suitability of the website, services, job opportunities, or information provided through the platform.</p>
            </Section>

            <Section id="privacy-changes" title="Privacy & Changes of Terms">
              <p>Your use of this Website is also governed by our{' '}
                <button onClick={() => setCurrentPage('privacy-policy')} className="font-semibold text-[#00BFEF] underline underline-offset-2 hover:text-[#5EE3B7] transition-colors">
                  Privacy Policy
                </button>, which is incorporated into these Terms by reference. By using the Website, you consent to the data practices described in the Privacy Policy.
              </p>
              <p className="mt-4">IVA Work Solutions reserves the right to modify, update, or replace these Terms and Services at any time. Changes will be effective upon posting on this page with an updated "Effective Date". Continued use of our services after such changes constitutes your acceptance of the revised Terms.</p>
            </Section>

            <Section id="force-majeure" title="Force Majeure">
              <p>We shall not be liable for any delay, interruption, or failure to perform its obligations under these Terms and Conditions where such delay or failure results from events beyond its reasonable control, including but not limited to natural disasters, pandemics, government actions, labor disputes, power outages, cyberattacks, telecommunications failures, or failures of third-party service providers.</p>
            </Section>

            <Section id="governing-law" title="Governing Law">
              <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.</p>
              <p className="mt-4">Any dispute arising or related to Terms, the website, or the services provided by IVA Work Solutions shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.</p>
              <p className="mt-4">If any provision of these Terms is determined to be invalid, unlawful or unenforceable, the remaining provisions shall continue in full force and effect.</p>
            </Section>

            {/* Contact CTA */}
            <div className="rounded-2xl bg-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Need clarification on our Terms?</h4>
                <p className="text-xs text-slate-400 mt-1">Get in touch — our team is happy to help.</p>
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
