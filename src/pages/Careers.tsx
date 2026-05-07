import { useState, type FormEvent } from 'react';
import { useJobs } from '../hooks/useDataStore';
import { type JobListing } from '../types';
import {
  Briefcase,
  MapPin,
  Calendar,
  Heart,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Sparkles,
  Zap,
  GraduationCap,
  Clock
} from 'lucide-react';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [resume, setResume] = useState<File | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = ['All', 'Consulting', 'Staffing', 'Technology'];
  const { jobs } = useJobs();

  const filteredJobs = filterCategory === 'All'
    ? jobs
    : jobs.filter(j => j.category === filterCategory);

  const handleApplyClick = (job: JobListing) => {
    setSelectedJob(job);
    const formSection = document.getElementById('apply-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const fieldClass = (hasError?: boolean) =>
    `w-full rounded-xl border bg-slate-50 px-4 py-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50'
        : 'border-slate-200 focus:border-[#5EE3B7] focus:bg-white focus:ring-4 focus:ring-[#5EE3B7]/10'
    }`;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid Email is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!qualification) newErrors.qualification = 'Please select your highest qualification';
    if (!experience) newErrors.experience = 'Please select your years of experience';
    if (!skills.trim()) newErrors.skills = 'Please enter key professional skills';
    if (!resume) newErrors.resume = 'Resume upload is required';

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
    setFullName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setQualification('');
    setExperience('');
    setSkills('');
    setResume(null);
    setIsSuccess(false);
    setSelectedJob(null);
  };

  return (
    <div className="pb-20">

      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-24 pb-16">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-[#5EE3B7]/10 via-transparent to-[#00BFEF]/10"></div>
          <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-[#5EE3B7]/20 blur-[120px]"></div>
          <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-[#00BFEF]/15 blur-[150px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-[#00BFEF]/20 bg-[#00BFEF]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#00BFEF]">
            Join Our Global Team
          </span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Build the Future of{' '}
            <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">
              Consulting & Technology
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            At IVA Work Solutions, we nurture creativity, celebrate diverse talent, and provide a platform where your work delivers direct value to modern global enterprises. Explore active openings or apply directly below.
          </p>
        </div>
      </section>

      {/* Openings + Benefits */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#00BFEF]">Open Positions</span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950">Explore Opportunities</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                  filterCategory === cat
                    ? 'border-slate-950 bg-slate-950 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Job Cards */}
          <div className="space-y-5 lg:col-span-2">
            {filteredJobs.length === 0 ? (
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-12 text-center">
                <Briefcase className="mx-auto h-10 w-10 text-slate-400" />
                <h4 className="mt-3 font-bold text-slate-700">No Open Positions</h4>
                <p className="mt-1 text-xs text-slate-500">We don't have any openings in this category right now. Check back soon!</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`rounded-2xl border bg-white p-6 transition-all duration-300 sm:p-8 ${
                    selectedJob?.id === job.id
                      ? 'border-[#5EE3B7]/40 shadow-md shadow-[#5EE3B7]/10'
                      : 'border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold uppercase text-slate-700">{job.category}</span>
                        <span className="rounded-full bg-[#5EE3B7]/10 px-2.5 py-1 text-[10px] font-extrabold uppercase text-[#00BFEF]">{job.type}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-950">{job.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Exp: {job.experience}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="shrink-0 self-start rounded-xl bg-slate-950 px-5 py-3 text-xs font-bold text-white transition-all hover:bg-slate-800 flex items-center gap-1"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="mt-4 border-t border-slate-50 pt-4 text-xs leading-relaxed text-slate-600">
                    {job.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="rounded bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00BFEF]">Perks & Growth</span>
              <h3 className="mt-2 text-xl font-extrabold text-slate-950">Employee Benefits</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                We believe in creating a supportive work environment that encourages work-life harmony and continuous professional enrichment.
              </p>

              <ul className="mt-6 space-y-4">
                {[
                  { icon: <Heart className="h-4 w-4 text-[#5EE3B7]" />, title: 'Healthcare Benefits', desc: 'Comprehensive medical insurance coverages for you and your direct family members.' },
                  { icon: <Award className="h-4 w-4 text-[#00BFEF]" />, title: 'Continuous Upskilling', desc: 'Access global training databases and get cert-reimbursement stipends.' },
                  { icon: <Sparkles className="h-4 w-4 text-[#5EE3B7]" />, title: 'Workplace Flexibility', desc: 'Enjoy seamless hybrid or remote-first workflows designed to fit your timezone.' },
                ].map((b) => (
                  <li key={b.title} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{b.title}</h4>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="text-center">
                <span className="block bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-xl font-extrabold text-transparent">5</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Openings</span>
              </div>
              <div className="text-center">
                <span className="block bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-xl font-extrabold text-transparent">3</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Teams</span>
              </div>
              <div className="text-center">
                <span className="block bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-xl font-extrabold text-transparent">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Remote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form-section" className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF]"></div>

          {isSuccess ? (
            <div className="space-y-6 py-12 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-500">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-slate-950">Application Submitted!</h3>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
                  Thank you for applying to IVA Work Solutions. Our talent acquisition specialist will review your profile and reach out within 3-5 business days.
                </p>
              </div>
              <button
                onClick={resetForm}
                className="rounded-xl bg-slate-950 px-6 py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="border-b border-slate-100 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#5EE3B7]">Talent Intake Form</span>
                <h3 className="mt-1 text-2xl font-extrabold text-slate-950">
                  {selectedJob ? `Apply for ${selectedJob.title}` : 'Submit Your Profile / General Application'}
                </h3>
                <p className="mt-1 text-xs text-slate-500">Complete the required details and upload your latest curriculum vitae.</p>
              </div>

              {errors.form && (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-600">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full legal name" className={fieldClass(!!errors.fullName)} />
                  {errors.fullName && <span className="block text-[10px] font-medium text-red-500">{errors.fullName}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Email Address *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@domain.com" className={fieldClass(!!errors.email)} />
                  {errors.email && <span className="block text-[10px] font-medium text-red-500">{errors.email}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Phone Number *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className={fieldClass(!!errors.phone)} />
                  {errors.phone && <span className="block text-[10px] font-medium text-red-500">{errors.phone}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Address *</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="City, State, Zip Code" className={fieldClass(!!errors.address)} />
                  {errors.address && <span className="block text-[10px] font-medium text-red-500">{errors.address}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Highest Qualification *</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <select value={qualification} onChange={(e) => setQualification(e.target.value)} className={`${fieldClass(!!errors.qualification)} pl-10`}>
                      <option value="">Select Qualification</option>
                      <option value="Associate's Degree">Associate's Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="High School Diploma">High School Diploma</option>
                    </select>
                  </div>
                  {errors.qualification && <span className="block text-[10px] font-medium text-red-500">{errors.qualification}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Professional Experience *</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <select value={experience} onChange={(e) => setExperience(e.target.value)} className={`${fieldClass(!!errors.experience)} pl-10`}>
                      <option value="">Select Experience Level</option>
                      <option value="Fresh / Entry-level">Fresh / Entry-level</option>
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>
                  {errors.experience && <span className="block text-[10px] font-medium text-red-500">{errors.experience}</span>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Professional Skills (Comma Separated) *</label>
                <div className="relative">
                  <Zap className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <textarea rows={3} value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. React.js, Excel Strategy Modeling, Lean Process Mapping, Agile, Salesforce" className={`${fieldClass(!!errors.skills)} pl-10`} />
                </div>
                {errors.skills && <span className="block text-[10px] font-medium text-red-500">{errors.skills}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Upload Resume (PDF, DOCX) *</label>
                <div className={`rounded-2xl border-2 border-dashed p-6 text-center transition-all ${errors.resume ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-slate-50 hover:border-[#5EE3B7]'}`}>
                  <input type="file" id="resume-file" accept=".pdf,.docx,.doc" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="resume-file" className="block cursor-pointer space-y-2">
                    <FileText className="mx-auto h-8 w-8 text-slate-400" />
                    <span className="block text-xs font-bold text-slate-700">{resume ? resume.name : 'Click to Upload Resume'}</span>
                    <span className="block text-[10px] text-slate-400">PDF, DOCX max 10MB</span>
                  </label>
                </div>
                {errors.resume && <span className="block text-[10px] font-medium text-red-500">{errors.resume}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] py-4 text-xs font-extrabold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div><span>Processing Submission...</span></>
                ) : (
                  <><Send className="h-4 w-4" /><span>Submit Application Dossier</span></>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
