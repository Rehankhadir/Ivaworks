import { Page } from '../types';

interface Props {
  setCurrentPage: (page: Page) => void;
}

export default function PrivacyPolicy({ setCurrentPage }: Props) {
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
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full border border-[#5EE3B7]/30 bg-[#5EE3B7]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-700">
            Legal
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-slate-500">Effective Date: June 2025 &nbsp;·&nbsp; IVA Work Solutions</p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 sm:p-12 shadow-sm space-y-10">

          {/* Summary */}
          <div className="rounded-2xl border border-[#5EE3B7]/30 bg-[#5EE3B7]/5 p-6">
            <p className="text-sm leading-relaxed text-slate-700">
              <span className="font-bold text-slate-950">Summary:</span> We collect only the information you voluntarily provide through our website, recruitment activities, staffing services, consulting services, and related business operations. We use it solely to respond to your enquiry. We do not sell, rent, or share your personal data with advertisers or data brokers.
            </p>
          </div>

          <Section title="Who We Are">
            <p>IVA Work Solutions ("we", "our") is a service-based company headquartered in Hyderabad, India. This Privacy Policy applies to our marketing website at <span className="font-semibold text-slate-800">ivaworksolutions.com</span>.</p>
            <p className="mt-3">For privacy enquiries, contact us at <a href="mailto:info@ivaworksolutions.com" className="text-[#00BFEF] hover:underline font-medium">info@ivaworksolutions.com</a>.</p>
          </Section>

          <Section title="Information We Collect">
            <p>We collect a range of personal and professional information to deliver our services effectively.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><span className="font-semibold text-slate-800">Personal details</span> — name, address, date of birth, and government-issued ID information</li>
              <li><span className="font-semibold text-slate-800">Contact information</span> — email address, phone number, and postal address</li>
              <li><span className="font-semibold text-slate-800">Employment history</span> — previous employers, roles, duration, and references</li>
              <li>Resumes / CVs, educational records, and professional certifications</li>
              <li>Job preferences, career goals, and salary expectations</li>
              <li>Information submitted through online forms and applications</li>
              <li><span className="font-semibold text-slate-800">Technical data</span> — IP addresses, browser type, device identifiers, cookies, and analytics data</li>
            </ul>
          </Section>

          <Section title="How We Use Information">
            <p>The information we collect is used solely to provide, maintain, and improve our services. Primarily, it enables us to deliver staffing and recruitment services by matching qualified candidates with suitable job opportunities across our client network. It also supports our consulting and workforce management engagements, allowing us to tailor solutions to each client's specific requirements. We use your information to manage client relationships, respond to customer enquiries, and provide ongoing support throughout the recruitment lifecycle.</p>
            <p className="mt-4">Internally, the data helps us administer our website, monitor platform security, and identify potentially fraudulent activity. We are also required to process certain information to fulfil legal and regulatory compliance obligations. From time to time, we may use contact details to send relevant updates, application status notifications, or company announcements — you may opt out of marketing communications at any time by contacting us directly.</p>
          </Section>

          <Section title="Legal Basis for Processing">
            <p>IVA Work Solutions processes personal data in strict accordance with applicable data protection legislation. Our legal basis for processing varies depending on the nature of the activity:</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><span className="font-semibold text-slate-800">Consent</span> — where you have explicitly agreed to our processing activities</li>
              <li><span className="font-semibold text-slate-800">Contractual Necessity</span> — to fulfil a contract or pre-contractual obligations</li>
              <li><span className="font-semibold text-slate-800">Legitimate Interests</span> — for our internal business operations and service delivery</li>
              <li><span className="font-semibold text-slate-800">Legal Obligation</span> — to comply with applicable laws and regulations</li>
            </ul>
          </Section>

          <Section title="Recruitment and Candidate Information">
            <p>Candidate profiles, resumes, and employment-related information may be reviewed, verified, and shared with prospective employers and clients solely for recruitment and placement purposes. We ensure that any sharing is done with appropriate confidentiality and data protection measures in place.</p>
          </Section>

          <Section title="Information Sharing">
            <p>We do not sell your personal information to third parties. Information may be shared only with:</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Client companies for recruitment and placement purposes</li>
              <li>Authorized recruitment partners and staffing agencies</li>
              <li>Technology vendors and service providers supporting our operations</li>
              <li>Legal authorities when required by law or court order</li>
            </ul>
          </Section>

          <Section title="Cookies and Analytics">
            <p>Our website uses cookies and similar analytics technologies to improve functionality, monitor performance, and enhance the user experience. You may adjust cookie preferences through your browser settings. Disabling cookies may affect certain website features. By continuing to use our website without changing your cookie settings, you consent to our use of cookies in accordance with this Privacy Policy.</p>
          </Section>

          <Section title="Data Security Measures">
            <p>We are committed to protecting the security and confidentiality of your personal information. We implement appropriate technical, administrative, and organisational safeguards designed to protect personal data against unauthorised access, disclosure, alteration, misuse, loss, or destruction.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>Encryption of data during transmission and, where applicable, at rest.</li>
              <li>Role-based access controls to ensure that only authorised personnel can access personal information.</li>
              <li>Secure hosting environments and network security protections.</li>
              <li>Regular monitoring, security assessments, and system maintenance.</li>
              <li>Employee training and awareness programs on data protection and information security responsibilities.</li>
            </ul>
          </Section>

          <Section title="Data Retention">
            <p>We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. When data is no longer required, it is securely deleted or anonymized in accordance with our data retention schedule.</p>
          </Section>

          <Section title="Your Privacy Rights">
            <p>Depending on your location and applicable data protection laws, you may have certain rights regarding the personal information we collect and process. These rights may include:</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><span className="font-semibold text-slate-800">Right of Access</span> – Request access to the personal information we hold about you and obtain a copy of that information.</li>
              <li><span className="font-semibold text-slate-800">Right to Rectification</span> – Request correction of any inaccurate, incomplete, or outdated personal data.</li>
              <li><span className="font-semibold text-slate-800">Right to Erasure</span> – Request the deletion of your personal information in certain circumstances, commonly referred to as the "right to be forgotten."</li>
              <li><span className="font-semibold text-slate-800">Right to Restrict Processing</span> – Request that we limit the processing of your personal information under specific conditions.</li>
              <li><span className="font-semibold text-slate-800">Right to Object</span> – Object to the processing of your personal information where such processing is based on our legitimate interests or for direct marketing purposes.</li>
              <li><span className="font-semibold text-slate-800">Right to Data Portability</span> – Request to receive your personal information in a structured, commonly used, and machine-readable format, and where technically feasible, request its transfer to another service provider.</li>
            </ul>
          </Section>

          <Section title="Children's Privacy">
            <p>IVA Work Solutions' services and website are intended for business professionals, job applicants, clients, and individuals who are at least 18 years of age. We do not knowingly collect, use, or process personal information from children under the age of 18. If you believe we have inadvertently collected information from a minor, please contact us and we will delete it promptly.</p>
          </Section>

          <Section title="Policy Updates">
            <p>We may update or revise this Privacy Policy periodically to reflect changes in our practices, legal requirements, or service offerings. When we make material changes, the updated policy will be posted on this page with a revised effective date. We encourage you to review this page regularly to stay informed about how we protect your information. Your continued use of our website or services following the publication of changes constitutes your acceptance of the updated Privacy Policy.</p>
          </Section>

          {/* Contact CTA */}
          <div className="rounded-2xl bg-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Questions about your privacy?</h4>
              <p className="text-xs text-slate-400 mt-1">Our team is ready to assist with any privacy-related queries.</p>
            </div>
            <button
              onClick={() => setCurrentPage('contact')}
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] px-5 py-3 text-xs font-extrabold text-slate-950 transition-all hover:scale-[1.02]"
            >
              Contact Us →
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-extrabold text-[#00BFEF]">{title}</h2>
      <div className="text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}
