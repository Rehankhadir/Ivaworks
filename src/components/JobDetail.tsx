import { useState } from 'react';
import { type JobListing } from '../types';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Heart,
  Scale,
  GraduationCap,
  Users,
  Gift,
} from 'lucide-react';
import ApplyModal from './ApplyModal';

const OFFER_ICONS = [TrendingUp, Heart, Scale, GraduationCap, Users, Gift];

interface Props {
  job: JobListing;
  onBack: () => void;
}

export default function JobDetail({ job, onBack }: Props) {
  const [showApply, setShowApply] = useState(false);
  return (
    <div className="relative">
      {/* Back */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </button>

      {/* Header card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8 mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold uppercase text-slate-700">{job.category}</span>
            <span className="rounded-full bg-[#5EE3B7]/10 px-2.5 py-1 text-[10px] font-extrabold uppercase text-[#00BFEF]">{job.type}</span>
          </div>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-slate-950 sm:text-3xl">{job.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#5EE3B7]" />{job.location}</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-[#5EE3B7]" />Exp: {job.experience}</span>
          <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-[#5EE3B7]" />{job.category}</span>
        </div>

        <p className="mt-5 border-t border-slate-50 pt-5 text-sm leading-relaxed text-slate-600">{job.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.skills.map((skill, i) => (
            <span key={i} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">{skill}</span>
          ))}
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-lg font-extrabold text-slate-950 mb-3">Job Description</h2>
        <p className="text-sm leading-relaxed text-slate-600">{job.description}</p>
      </div>

      {/* Key Responsibilities */}
      <div className="mb-6">
        <h2 className="text-lg font-extrabold text-slate-950 mb-4">Key Responsibilities</h2>
        <ul className="space-y-2.5">
          {job.responsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5EE3B7]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="text-lg font-extrabold text-slate-950 mb-4">Requirements</h2>
        <ul className="space-y-2.5">
          {job.requirements.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00BFEF]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* What We Offer */}
      <div className="pb-6">
        <h2 className="text-lg font-extrabold text-slate-950 mb-6">What We Offer</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {job.whatWeOffer.map((offer, i) => {
            const Icon = OFFER_ICONS[i % OFFER_ICONS.length];
            return (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#5EE3B7]/20 bg-[#5EE3B7]/10">
                  <Icon className="h-5 w-5 text-[#00BFEF]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{offer.title}</h4>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{offer.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
          <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{job.type}</span>
        </div>
        <button
          onClick={() => setShowApply(true)}
          className="flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-xs font-extrabold text-white transition-all hover:bg-slate-800"
        >
          Apply Now
          <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
        </button>
      </div>

      {showApply && <ApplyModal job={job} onClose={() => setShowApply(false)} />}
    </div>
  );
}
