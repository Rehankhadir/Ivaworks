import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
  fetchApplications,
  updateApplicationStatus,
  deleteApplication,
  type JobApplication,
} from '../services/content.api';
import { resolveAssetUrl } from '../services/api';
import { Download, RefreshCw, Trash2, User } from 'lucide-react';

const STATUS_OPTIONS: JobApplication['status'][] = ['new', 'reviewed', 'shortlisted', 'rejected'];

const STATUS_STYLES: Record<JobApplication['status'], string> = {
  new: 'bg-emerald-50 text-emerald-700',
  reviewed: 'bg-blue-50 text-blue-700',
  shortlisted: 'bg-amber-50 text-amber-700',
  rejected: 'bg-red-50 text-red-700',
};

interface Props {
  onToast: (message: string, type?: 'success' | 'error') => void;
  onDataChange?: () => void;
}

function DetailItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="mt-1 text-xs font-medium leading-relaxed text-slate-800 break-words">{children}</div>
    </div>
  );
}

function display(value: string | null | undefined, fallback = '—') {
  return value?.trim() ? value : fallback;
}

export default function ApplicationsTab({ onToast, onDataChange }: Props) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchApplications();
      setApplications(Array.isArray(data) ? data : []);
    } catch {
      onToast('Failed to load applications', 'error');
    } finally {
      setLoading(false);
    }
  }, [onToast]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = applications.filter((a) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return [a.fullName, a.email, a.phone, a.applyingFor]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(q));
  });

  const handleStatusChange = async (id: number, status: JobApplication['status']) => {
    try {
      const updated = await updateApplicationStatus(id, status);
      setApplications((prev) => prev.map((a) => (a.id === id ? updated : a)));
      onToast('Application status updated');
      onDataChange?.();
    } catch {
      onToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this application?')) return;
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
      onToast('Application deleted');
      onDataChange?.();
    } catch {
      onToast('Failed to delete application', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-950">
            {loading ? 'Loading applications…' : `${applications.length} total application${applications.length === 1 ? '' : 's'}`}
          </p>
          <p className="text-xs text-slate-500">Review job apply and general talent intake submissions</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone, role…"
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
          <p className="text-sm text-slate-500">Loading applications…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white py-16 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-700">No applications found</p>
          <p className="mt-1 text-xs text-slate-500">
            {search ? 'Try a different search term.' : 'Submissions from the website will appear here.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((app) => (
            <article key={app.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-700">
                      {app.applicationType === 'job' ? 'Job Apply' : 'General Application'}
                    </span>
                    <span className="rounded-full bg-[#5EE3B7]/10 px-2.5 py-1 text-[10px] font-bold uppercase text-[#00BFEF]">
                      {display(app.applyingFor)}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase capitalize ${STATUS_STYLES[app.status]}`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5EE3B7]/10 text-[#00BFEF]">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-slate-950">{display(app.fullName)}</h3>
                      <p className="text-xs text-slate-500">
                        Submitted {app.createdAt ? new Date(app.createdAt).toLocaleString() : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <DetailItem label="Email">
                      {app.email ? (
                        <a href={`mailto:${app.email}`} className="text-[#00BFEF] hover:underline">
                          {app.email}
                        </a>
                      ) : (
                        '—'
                      )}
                    </DetailItem>
                    <DetailItem label="Phone">{display(app.phone)}</DetailItem>
                    <DetailItem label="PAN Number">{display(app.panNumber)}</DetailItem>
                    <DetailItem label="Address">{display(app.address)}</DetailItem>
                    <DetailItem label="Qualification">{display(app.qualification)}</DetailItem>
                    <DetailItem label="Experience">{display(app.experience)}</DetailItem>
                    <DetailItem label="Notice Period">{display(app.noticePeriod, 'Not specified')}</DetailItem>
                    <DetailItem label="LinkedIn">
                      {app.linkedin ? (
                        <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#00BFEF] hover:underline break-all">
                          {app.linkedin}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </DetailItem>
                    <DetailItem label="Resume">{display(app.resumeOriginalName)}</DetailItem>
                    <DetailItem label="Skills">
                      <span className="whitespace-pre-wrap">{display(app.skills)}</span>
                    </DetailItem>
                  </div>
                </div>

                <div className="flex w-full shrink-0 flex-col gap-2 border-t border-slate-100 pt-4 xl:w-48 xl:border-t-0 xl:pt-0 xl:pl-4 xl:border-l">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</label>
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value as JobApplication['status'])}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold capitalize"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <a
                    href={resolveAssetUrl(app.resumePath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-[10px] font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Resume
                  </a>
                  <button
                    type="button"
                    onClick={() => handleDelete(app.id)}
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
