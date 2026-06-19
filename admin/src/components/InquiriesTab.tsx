import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
  fetchContactInquiries,
  updateInquiryStatus,
  deleteInquiry,
  type ContactInquiry,
} from '../services/content.api';
import { Building2, Trash2, RefreshCw, Mail, Phone, MapPin, Users, Briefcase } from 'lucide-react';

const STATUS_OPTIONS: ContactInquiry['status'][] = ['new', 'reviewed', 'contacted', 'closed'];

const STATUS_STYLES: Record<ContactInquiry['status'], string> = {
  new: 'bg-emerald-50 text-emerald-700',
  reviewed: 'bg-blue-50 text-blue-700',
  contacted: 'bg-amber-50 text-amber-700',
  closed: 'bg-slate-100 text-slate-600',
};

interface Props {
  onToast: (message: string, type?: 'success' | 'error') => void;
  onDataChange?: () => void;
}

function DetailItem({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5 ${className}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="mt-1 text-xs font-medium leading-relaxed text-slate-800 break-words">{children}</div>
    </div>
  );
}

function display(value: string | null | undefined, fallback = '—') {
  return value?.trim() ? value : fallback;
}

export default function InquiriesTab({ onToast, onDataChange }: Props) {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchContactInquiries();
      setInquiries(Array.isArray(data) ? data : []);
    } catch {
      onToast('Failed to load inquiries', 'error');
    } finally {
      setLoading(false);
    }
  }, [onToast]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = inquiries.filter((i) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return [i.companyName, i.contactPerson, i.email, i.phone, i.industry, i.location]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(q));
  });

  const handleStatusChange = async (id: number, status: ContactInquiry['status']) => {
    try {
      const updated = await updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
      onToast('Inquiry status updated');
      onDataChange?.();
    } catch {
      onToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      onToast('Inquiry deleted');
      onDataChange?.();
    } catch {
      onToast('Failed to delete inquiry', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-950">
            {loading ? 'Loading inquiries…' : `${inquiries.length} total inquir${inquiries.length === 1 ? 'y' : 'ies'}`}
          </p>
          <p className="text-xs text-slate-500">Employer and corporate staffing requests from the contact form</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, contact, email, industry…"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs outline-none focus:border-[#5EE3B7] focus:ring-4 focus:ring-[#5EE3B7]/10 sm:min-w-[260px]"
          />
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-bold uppercase text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-100 bg-white py-16 text-center shadow-sm">
          <p className="text-sm text-slate-500">Loading inquiries…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white py-16 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">No inquiries found</p>
          <p className="mt-1 text-xs text-slate-500">
            {search ? 'Try a different search term.' : 'Employer submissions from the website will appear here.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((inquiry) => (
            <article key={inquiry.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#00BFEF]/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[#00BFEF]">
                      Employer Inquiry
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-700">
                      {display(inquiry.industry)}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase capitalize ${STATUS_STYLES[inquiry.status]}`}>
                      {inquiry.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00BFEF]/10 text-[#00BFEF]">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-slate-950">{display(inquiry.companyName)}</h3>
                      <p className="text-xs text-slate-500">
                        Received {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <DetailItem label="Contact Person">{display(inquiry.contactPerson)}</DetailItem>
                    <DetailItem label="Email">
                      {inquiry.email ? (
                        <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-1.5 text-[#00BFEF] hover:underline">
                          <Mail className="h-3.5 w-3.5 shrink-0" />
                          {inquiry.email}
                        </a>
                      ) : (
                        '—'
                      )}
                    </DetailItem>
                    <DetailItem label="Phone">
                      {inquiry.phone ? (
                        <a href={`tel:${inquiry.phone}`} className="inline-flex items-center gap-1.5 text-[#00BFEF] hover:underline">
                          <Phone className="h-3.5 w-3.5 shrink-0" />
                          {inquiry.phone}
                        </a>
                      ) : (
                        '—'
                      )}
                    </DetailItem>
                    <DetailItem label="Industry">{display(inquiry.industry)}</DetailItem>
                    <DetailItem label="Company Size">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        {display(inquiry.numEmployees)}
                      </span>
                    </DetailItem>
                    <DetailItem label="Location">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                        {display(inquiry.location)}
                      </span>
                    </DetailItem>
                  </div>

                  <DetailItem label="Staffing Requirements / Job Description" className="bg-white">
                    <div className="mt-1 flex items-start gap-2">
                      <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                      <p className="whitespace-pre-wrap text-xs leading-relaxed text-slate-700">
                        {display(inquiry.jobDescription, 'No description provided')}
                      </p>
                    </div>
                  </DetailItem>
                </div>

                <div className="flex w-full shrink-0 flex-col gap-2 border-t border-slate-100 pt-4 xl:w-48 xl:border-l xl:border-t-0 xl:pl-4 xl:pt-0">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</label>
                  <select
                    value={inquiry.status}
                    onChange={(e) => handleStatusChange(inquiry.id, e.target.value as ContactInquiry['status'])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold capitalize"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {inquiry.email && (
                    <a
                      href={`mailto:${inquiry.email}?subject=Re: Staffing inquiry from ${encodeURIComponent(inquiry.companyName)}`}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-[10px] font-bold text-slate-700 hover:bg-slate-50"
                    >
                      <Mail className="h-3.5 w-3.5" /> Reply via Email
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(inquiry.id)}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2.5 text-[10px] font-bold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
