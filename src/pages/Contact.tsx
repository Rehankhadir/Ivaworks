import { useState, type FormEvent } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Building2,
  User,
  BriefcaseBusiness,
  Users,
  FileText,
  MapPinned,
  ChevronRight
} from 'lucide-react';

export default function Contact() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('');
  const [numEmployees, setNumEmployees] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fieldClass = (hasError?: boolean) =>
    `w-full rounded-xl border bg-slate-50 px-4 py-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50'
        : 'border-slate-200 focus:border-[#5EE3B7] focus:bg-white focus:ring-4 focus:ring-[#5EE3B7]/10'
    }`;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!companyName.trim()) newErrors.companyName = 'Company Name is required';
    if (!contactPerson.trim()) newErrors.contactPerson = 'Contact Person name is required';
    if (!phone.trim()) newErrors.phone = 'Contact Phone Number is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid corporate email is required';
    if (!industry.trim()) newErrors.industry = 'Industry segment is required';
    if (!numEmployees) newErrors.numEmployees = 'Please specify number of employees needed';
    if (!jobDescription.trim()) newErrors.jobDescription = 'Please describe the position or needs';
    if (!location.trim()) newErrors.location = 'Job location or HQ is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setCompanyName('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setIndustry('');
    setNumEmployees('');
    setJobDescription('');
    setLocation('');
    setIsSuccess(false);
  };

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-white pt-24 pb-16">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-[#5EE3B7]/10 via-transparent to-[#00BFEF]/10"></div>
          <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-[#5EE3B7]/20 blur-[120px]"></div>
          <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-[#00BFEF]/15 blur-[150px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-[#00BFEF]/20 bg-[#00BFEF]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00BFEF]">
            Get in Touch
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Let's Collaborate for <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">Strategic Growth</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Whether you want to recruit senior leadership talent, migrate operational workloads to the cloud, or consult with strategy experts, we are here to support you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-8 text-left lg:col-span-5">
            <div className="space-y-4">
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#00BFEF]">Corporate Offices</span>
              <h2 className="text-3xl font-extrabold text-slate-950">Reach Us Directly</h2>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600">
                Our support lines and inquiry agents are active 24/7. Connect with us using the standard coordinates or launch a direct WhatsApp chat below.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <MapPin className="h-5 w-5 text-[#5EE3B7]" />, title: 'Corporate Headquarters', content: <>IVA Work Solutions Corporate HQ<br />120 Broadway, Suite 3200<br />New York, NY 10271</> },
                { icon: <Phone className="h-5 w-5 text-[#00BFEF]" />, title: 'Direct Support Phone', content: <><a href="tel:+1234567890" className="font-semibold text-slate-700 hover:text-slate-950">+1 (212) 555-0199</a><br />Available Mon-Fri, 9:00 AM - 6:00 PM EST</> },
                { icon: <Mail className="h-5 w-5 text-[#5EE3B7]" />, title: 'Direct Coordinator Email', content: <><a href="mailto:info@ivaworksolutions.com" className="font-semibold text-slate-700 hover:text-slate-950">info@ivaworksolutions.com</a><br />Inquiries reviewed within 1 business day</> }
              ].map((item) => (
                <div key={item.title} className="flex items-start space-x-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-[#5EE3B7]/30 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#5EE3B7]/20 bg-gradient-to-br from-[#5EE3B7]/10 to-[#00BFEF]/10">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-center"><span className="block bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-xl font-extrabold text-transparent">24/7</span><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Inquiry</span></div>
              <div className="text-center"><span className="block bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-xl font-extrabold text-transparent">1 Day</span><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Review</span></div>
              <div className="text-center"><span className="block bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-xl font-extrabold text-transparent">3-in-1</span><span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Support</span></div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-3 rounded-xl border border-emerald-200 bg-white px-6 py-4 text-sm font-extrabold text-emerald-600 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md">
                <MessageSquare className="h-5 w-5" />
                <span>Chat via WhatsApp Live</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF]"></div>

              {isSuccess ? (
                <div className="space-y-6 py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-500"><CheckCircle2 className="h-8 w-8" /></div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-slate-950">Inquiry Received!</h3>
                    <p className="mx-auto max-w-md text-xs leading-relaxed text-slate-600">Thank you for submitting your corporate requirements. An executive consulting partner will call you shortly to align on your workflow details.</p>
                  </div>
                  <button onClick={resetForm} className="rounded-xl bg-slate-950 px-6 py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800">Submit Another Inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="border-b border-slate-100 pb-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#00BFEF]">Employer Intake Module</span>
                    <h3 className="mt-1 text-2xl font-extrabold text-slate-950">Employer Inquiry Form</h3>
                    <p className="mt-1 text-xs text-slate-500">Provide your firm requirements so we can tailor the talent search and IT proposals.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Company Name *</label><div className="relative"><Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" /><input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Zenith Global Ltd." className={`${fieldClass(!!errors.companyName)} pl-10`} /></div>{errors.companyName && <span className="block text-[10px] font-medium text-red-500">{errors.companyName}</span>}</div>
                    <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Contact Person *</label><div className="relative"><User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" /><input type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="Full Name" className={`${fieldClass(!!errors.contactPerson)} pl-10`} /></div>{errors.contactPerson && <span className="block text-[10px] font-medium text-red-500">{errors.contactPerson}</span>}</div>
                    <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Phone Number *</label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className={fieldClass(!!errors.phone)} />{errors.phone && <span className="block text-[10px] font-medium text-red-500">{errors.phone}</span>}</div>
                    <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Corporate Email *</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hiring@company.com" className={fieldClass(!!errors.email)} />{errors.email && <span className="block text-[10px] font-medium text-red-500">{errors.email}</span>}</div>
                    <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Industry Segment *</label><div className="relative"><BriefcaseBusiness className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" /><input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="e.g. Healthcare, IT, Logistics" className={`${fieldClass(!!errors.industry)} pl-10`} /></div>{errors.industry && <span className="block text-[10px] font-medium text-red-500">{errors.industry}</span>}</div>
                    <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Employees Required *</label><div className="relative"><Users className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" /><select value={numEmployees} onChange={(e) => setNumEmployees(e.target.value)} className={`${fieldClass(!!errors.numEmployees)} pl-10`}><option value="">Select Demand</option><option value="1-5 Employees">1-5 Employees</option><option value="6-20 Employees">6-20 Employees</option><option value="21-50 Employees">21-50 Employees</option><option value="50+ Employees">50+ Employees</option></select></div>{errors.numEmployees && <span className="block text-[10px] font-medium text-red-500">{errors.numEmployees}</span>}</div>
                  </div>

                  <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Work Location / Site *</label><div className="relative"><MapPinned className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" /><input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Remote, Chicago HQ, hybrid" className={`${fieldClass(!!errors.location)} pl-10`} /></div>{errors.location && <span className="block text-[10px] font-medium text-red-500">{errors.location}</span>}</div>
                  <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Job Requirements / Scope *</label><div className="relative"><FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" /><textarea rows={4} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="e.g. We require 4 Senior Full-Stack Developers on a 12-month contract basis to assist with database virtualization." className={`${fieldClass(!!errors.jobDescription)} pl-10`} /></div>{errors.jobDescription && <span className="block text-[10px] font-medium text-red-500">{errors.jobDescription}</span>}</div>

                  <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] py-3.5 text-xs font-extrabold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div><span>Submitting Requirements...</span></> : <><Send className="h-4 w-4" /><span>Send Corporate Inquiry Dossier</span></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#5EE3B7]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#5EE3B7]">Location</span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950">Visit Our Corporate Office</h2>
          </div>
          <a href="https://www.google.com/maps/search/?api=1&query=120+Broadway+New+York+NY+10271" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 text-xs font-bold text-[#00BFEF] hover:text-slate-950">
            <span>Open in Google Maps</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-3xl border border-slate-100 shadow-sm aspect-[21/9]">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.4170889241513!2d-74.0112443!3d40.707787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1768436b7b%3A0xe5a36371752b0f3e!2s120%20Broadway%2C%20New%20York%2C%20NY%2010271!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="IVA Work Solutions Corporate Headquarters Location"></iframe>
        </div>
      </section>
    </div>
  );
}
