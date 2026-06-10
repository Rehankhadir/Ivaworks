import { useState, type FormEvent } from 'react';
import { type JobListing } from '../types';
import {
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Zap,
  GraduationCap,
  Clock,
} from 'lucide-react';

interface Props {
  job: JobListing;
  onClose: () => void;
}

export default function ApplyModal({ job, onClose }: Props) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [declaration, setDeclaration] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fieldClass = (hasError?: boolean) =>
    `w-full rounded-xl border bg-slate-50 px-4 py-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50'
        : 'border-slate-200 focus:border-[#5EE3B7] focus:bg-white focus:ring-4 focus:ring-[#5EE3B7]/10'
    }`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid Email is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!qualification) newErrors.qualification = 'Please select your highest qualification';
    if (!experience) newErrors.experience = 'Please select your years of experience';
    if (!skills.trim()) newErrors.skills = 'Please enter key professional skills';
    if (!panNumber.trim()) newErrors.panNumber = 'PAN Number is required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber.toUpperCase())) newErrors.panNumber = 'Enter a valid PAN number (e.g. ABCDE1234F)';
    if (!resume) newErrors.resume = 'Resume upload is required';
    if (!declaration) newErrors.declaration = 'You must agree to the declaration before submitting';

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-100 bg-white shadow-2xl">
        {/* Top accent */}
        <div className="absolute left-0 top-0 h-1 w-full rounded-t-3xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="space-y-6 py-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-500">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-950">Application Submitted!</h3>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
                  Thank you for applying to <span className="font-semibold">{job.title}</span>. Our team will review your profile and reach out within 3–5 business days.
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl bg-slate-950 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-4 pr-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#5EE3B7]">Talent Intake Form</span>
                <h3 className="mt-1 text-xl font-extrabold text-slate-950">Apply for {job.title}</h3>
                <p className="mt-1 text-xs text-slate-500">Complete the required details and upload your latest CV.</p>
              </div>

              {errors.form && (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-600">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Applying For</label>
                  <input type="text" value={job.title} readOnly className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-700 outline-none cursor-default" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full legal name" className={fieldClass(!!errors.fullName)} />
                  {errors.fullName && <span className="block text-[10px] font-medium text-red-500">{errors.fullName}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Email Address *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="yourname@domain.com" className={fieldClass(!!errors.email)} />
                  {errors.email && <span className="block text-[10px] font-medium text-red-500">{errors.email}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Phone Number *</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className={fieldClass(!!errors.phone)} />
                  {errors.phone && <span className="block text-[10px] font-medium text-red-500">{errors.phone}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">PAN Number *</label>
                  <input type="text" value={panNumber} onChange={e => setPanNumber(e.target.value.toUpperCase())} placeholder="e.g. ABCDE1234F" maxLength={10} className={fieldClass(!!errors.panNumber)} />
                  {errors.panNumber && <span className="block text-[10px] font-medium text-red-500">{errors.panNumber}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Address *</label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="City, State, Zip Code" className={fieldClass(!!errors.address)} />
                  {errors.address && <span className="block text-[10px] font-medium text-red-500">{errors.address}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Highest Qualification *</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <select value={qualification} onChange={e => setQualification(e.target.value)} className={`${fieldClass(!!errors.qualification)} pl-10`}>
                      <option value="">Select Qualification</option>
                      <option>Associate's Degree</option>
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>Doctorate</option>
                      <option>High School Diploma</option>
                    </select>
                  </div>
                  {errors.qualification && <span className="block text-[10px] font-medium text-red-500">{errors.qualification}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Professional Experience *</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <select value={experience} onChange={e => setExperience(e.target.value)} className={`${fieldClass(!!errors.experience)} pl-10`}>
                      <option value="">Select Experience Level</option>
                      <option>Fresh / Entry-level</option>
                      <option>1-2 Years</option>
                      <option>3-5 Years</option>
                      <option>5+ Years</option>
                    </select>
                  </div>
                  {errors.experience && <span className="block text-[10px] font-medium text-red-500">{errors.experience}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Notice Period</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <select value={noticePeriod} onChange={e => setNoticePeriod(e.target.value)} className={`${fieldClass()} pl-10`}>
                      <option value="">Select Notice Period</option>
                      <option>Immediately Available</option>
                      <option>1 Week</option>
                      <option>2 Weeks</option>
                      <option>1 Month</option>
                      <option>2 Months</option>
                      <option>3 Months</option>
                      <option>More than 3 Months</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">LinkedIn Profile URL</label>
                <input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/yourprofile" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#5EE3B7] focus:bg-white focus:ring-4 focus:ring-[#5EE3B7]/10" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Upload Resume (PDF, DOCX) *</label>
                <div className={`rounded-2xl border-2 border-dashed p-5 text-center transition-all ${errors.resume ? 'border-red-300 bg-red-50/50' : 'border-slate-200 bg-slate-50 hover:border-[#5EE3B7]'}`}>
                  <input type="file" id="modal-resume-file" accept=".pdf,.docx,.doc" onChange={e => { if (e.target.files?.[0]) setResume(e.target.files[0]); }} className="hidden" />
                  <label htmlFor="modal-resume-file" className="block cursor-pointer space-y-1.5">
                    <FileText className="mx-auto h-7 w-7 text-slate-400" />
                    <span className="block text-xs font-bold text-slate-700">{resume ? resume.name : 'Click to Upload Resume'}</span>
                    <span className="block text-[10px] text-slate-400">PDF, DOCX — max 10MB</span>
                  </label>
                </div>
                {errors.resume && <span className="block text-[10px] font-medium text-red-500">{errors.resume}</span>}
              </div>

              {/* Declaration */}
              <div className="space-y-1.5">
                <label className={`flex items-start gap-3 cursor-pointer ${errors.declaration ? 'text-red-500' : 'text-slate-600'}`}>
                  <input
                    type="checkbox"
                    checked={declaration}
                    onChange={e => setDeclaration(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#5EE3B7] cursor-pointer"
                  />
                  <span className="text-xs leading-relaxed">
                    I agree to the processing of my personal data for the purpose of this application.{' '}
                    <a href="/privacy-policy" className="font-semibold text-[#00BFEF] underline underline-offset-2 hover:text-[#5EE3B7] transition-colors">
                      View Our Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.declaration && <span className="block text-[10px] font-medium text-red-500">{errors.declaration}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] py-4 text-xs font-extrabold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /><span>Processing...</span></>
                ) : (
                  <><Send className="h-4 w-4" /><span>Submit Application</span></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
