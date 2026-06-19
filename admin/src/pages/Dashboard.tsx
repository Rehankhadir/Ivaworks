import { useState, useEffect, useCallback, type FormEvent } from 'react';
import QuillEditor from '../components/QuillEditor';
import ApplicationsTab from '../components/ApplicationsTab';
import InquiriesTab from '../components/InquiriesTab';
import { useJobs, useBlogs, useAdminAuth, useDashboardStats } from '../hooks/useDataStore';
import { JobListing, BlogPost } from '../types';
import {
  Briefcase,
  FileText,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  Search,
  X,
  Save,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  LayoutDashboard,
  Users,
  Calendar,
  MapPin,
  Eye,
  Sparkles,
  Tag,
  ChevronDown,
  Mail,
  UserCheck,
} from 'lucide-react';

type Tab = 'overview' | 'jobs' | 'blogs' | 'applications' | 'inquiries';

export default function Dashboard() {
  const { logout } = useAdminAuth();
  const { jobs, addJob, updateJob, deleteJob, publishJob, unpublishJob, refetch: refetchJobs, loading: jobsLoading } = useJobs();
  const { blogs, addBlog, updateBlog, deleteBlog, publishBlog, unpublishBlog, refetch: refetchBlogs, loading: blogsLoading } = useBlogs();
  const { stats, loading: statsLoading, refetch: refetchStats } = useDashboardStats();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ type: 'job' | 'blog'; id: string; title: string } | null>(null);

  // Job filters
  const [jobFilterRole, setJobFilterRole] = useState('');
  const [jobFilterLocation, setJobFilterLocation] = useState('');
  const [jobFilterExperience, setJobFilterExperience] = useState('');
  const [jobFilterType, setJobFilterType] = useState('');

  // Job modal
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);

  // Blog modal
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    if (activeTab === 'overview' || activeTab === 'applications' || activeTab === 'inquiries') {
      refetchStats();
    }
  }, [activeTab, refetchStats]);

  const handleLogout = () => {
    logout();
  };

  const handleSaveJob = async (job: Omit<JobListing, 'id'>) => {
    try {
      if (editingJob) {
        await updateJob(editingJob.id, { ...job, status: editingJob.status });
        showToast('Job listing updated successfully!');
      } else {
        await addJob(job);
        showToast('New job posted successfully!');
      }
      await refetchStats();
      setShowJobModal(false);
      setEditingJob(null);
    } catch {
      showToast('Failed to save job. Please try again.', 'error');
    }
  };

  const handleSaveBlog = async (blog: Omit<BlogPost, 'id'>) => {
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, { ...blog, status: editingBlog.status });
        showToast('Blog post updated successfully!');
      } else {
        await addBlog(blog);
        showToast('New blog published successfully!');
      }
      await refetchStats();
      setShowBlogModal(false);
      setEditingBlog(null);
    } catch {
      showToast('Failed to save blog. Please try again.', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    try {
      if (confirmDelete.type === 'job') {
        await deleteJob(confirmDelete.id);
        showToast('Job listing deleted.');
      } else {
        await deleteBlog(confirmDelete.id);
        showToast('Blog post deleted.');
      }
      await refetchStats();
    } catch {
      showToast('Failed to delete. Please try again.', 'error');
    }
    setConfirmDelete(null);
  };

  const uniqueJobRoles = Array.from(new Set(jobs.map(j => j.title)));
  const uniqueJobLocations = Array.from(new Set(jobs.map(j => j.location)));
  const uniqueJobExperience = Array.from(new Set(jobs.map(j => j.experience)));
  const uniqueJobTypes = Array.from(new Set(jobs.map(j => j.type)));

  const filteredJobs = jobs.filter((j) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q) || j.category.toLowerCase().includes(q);
    const matchesRole = !jobFilterRole || j.title === jobFilterRole;
    const matchesLocation = !jobFilterLocation || j.location === jobFilterLocation;
    const matchesExperience = !jobFilterExperience || j.experience === jobFilterExperience;
    const matchesType = !jobFilterType || j.type === jobFilterType;
    return matchesSearch && matchesRole && matchesLocation && matchesExperience && matchesType;
  });

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Subtle bg accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-[#5EE3B7]/10 blur-[120px]"></div>
        <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-[#00BFEF]/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {/* <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                  <LayoutDashboard className="h-5 w-5 text-[#00BFEF]" />
                </div>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                Admin Active
              </span>
            </div> */}
            <h1 className="text-3xl font-extrabold text-slate-950">
              Admin <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">Manage job listings and blog posts published on the website.</p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-1">
          {([
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="h-4 w-4" /> },
            { id: 'jobs', label: 'Job Listings', icon: <Briefcase className="h-4 w-4" /> },
            { id: 'blogs', label: 'Blog Posts', icon: <FileText className="h-4 w-4" /> },
            { id: 'applications', label: 'Applications', icon: <UserCheck className="h-4 w-4" /> },
            { id: 'inquiries', label: 'Inquiries', icon: <Mail className="h-4 w-4" /> },
          ] as { id: Tab; label: string; icon: React.ReactNode }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
              className={`flex items-center gap-2 rounded-t-xl px-5 py-3 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[#00BFEF] border border-slate-200 border-b-white -mb-px'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.id === 'jobs' && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${activeTab === tab.id ? 'bg-[#5EE3B7]/10 text-[#00BFEF]' : 'bg-slate-200 text-slate-600'}`}>{jobs.length}</span>
              )}
              {tab.id === 'blogs' && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${activeTab === tab.id ? 'bg-[#5EE3B7]/10 text-[#00BFEF]' : 'bg-slate-200 text-slate-600'}`}>{blogs.length}</span>
              )}
              {tab.id === 'applications' && stats && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${activeTab === tab.id ? 'bg-[#5EE3B7]/10 text-[#00BFEF]' : 'bg-slate-200 text-slate-600'}`}>{stats.summary.totalApplications}</span>
              )}
              {tab.id === 'inquiries' && stats && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${activeTab === tab.id ? 'bg-[#5EE3B7]/10 text-[#00BFEF]' : 'bg-slate-200 text-slate-600'}`}>{stats.summary.totalInquiries}</span>
              )}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Total Jobs" value={stats?.summary.totalJobs ?? 0} icon={<Briefcase className="h-5 w-5" />} color="teal" loading={statsLoading} />
              <StatCard label="Total Blogs" value={stats?.summary.totalBlogs ?? 0} icon={<FileText className="h-5 w-5" />} color="cyan" loading={statsLoading} />
              <StatCard label="Total Applications" value={stats?.summary.totalApplications ?? 0} icon={<UserCheck className="h-5 w-5" />} color="emerald" loading={statsLoading} />
              <StatCard label="New Inquiries" value={stats?.summary.newInquiries ?? 0} icon={<Mail className="h-5 w-5" />} color="blue" loading={statsLoading} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickActionCard
                icon={<Plus className="h-5 w-5" />}
                title="Post a New Job"
                desc="Add a new opening visible immediately on the Careers page."
                cta="Create Job Listing"
                onClick={() => { setActiveTab('jobs'); setEditingJob(null); setShowJobModal(true); }}
              />
              <QuickActionCard
                icon={<Plus className="h-5 w-5" />}
                title="Publish a New Blog"
                desc="Share insights with your audience on the Blog page instantly."
                cta="Create Blog Post"
                onClick={() => { setActiveTab('blogs'); setEditingBlog(null); setShowBlogModal(true); }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentList
                title="Recent Jobs"
                emptyMsg="No jobs yet — create one to get started."
                icon={<Briefcase className="h-4 w-4" />}
                items={jobs.slice(0, 4).map((j) => ({ id: j.id, title: j.title, subtitle: `${j.category} · ${j.location}` }))}
                onView={() => setActiveTab('jobs')}
              />
              <RecentList
                title="Recent Blogs"
                emptyMsg="No blogs yet — publish your first post."
                icon={<FileText className="h-4 w-4" />}
                items={blogs.slice(0, 4).map((b) => ({ id: b.id, title: b.title, subtitle: `${b.category} · ${b.date}` }))}
                onView={() => setActiveTab('blogs')}
              />
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <ToolBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search jobs by title, location, category..."
              onAdd={() => { setEditingJob(null); setShowJobModal(true); }}
              addLabel="Post New Job"
              onReset={() => { refetchJobs(); showToast('Jobs refreshed.'); }}
            />

            {/* Job Filters */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Role', value: jobFilterRole, setter: setJobFilterRole, options: uniqueJobRoles },
                { label: 'Location', value: jobFilterLocation, setter: setJobFilterLocation, options: uniqueJobLocations },
                { label: 'Experience', value: jobFilterExperience, setter: setJobFilterExperience, options: uniqueJobExperience },
                { label: 'Type', value: jobFilterType, setter: setJobFilterType, options: uniqueJobTypes },
              ].map(({ label, value, setter, options }) => (
                <div key={label} className="relative">
                  <select
                    value={value}
                    onChange={e => setter(e.target.value)}
                    className="appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-8 py-2.5 text-xs text-slate-700 outline-none focus:border-[#5EE3B7] focus:ring-4 focus:ring-[#5EE3B7]/10 transition-all cursor-pointer"
                  >
                    <option value="">All {label}s</option>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                </div>
              ))}
              {(jobFilterRole || jobFilterLocation || jobFilterExperience || jobFilterType) && (
                <button
                  onClick={() => { setJobFilterRole(''); setJobFilterLocation(''); setJobFilterExperience(''); setJobFilterType(''); }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {jobsLoading ? (
              <EmptyState icon={<Briefcase className="h-10 w-10" />} title="Loading jobs..." desc="Fetching listings from the API." />
            ) : filteredJobs.length === 0 ? (
              <EmptyState icon={<Briefcase className="h-10 w-10" />} title="No jobs found" desc={searchTerm ? 'Try a different search term.' : 'Click "Post New Job" to add one.'} />
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-[#5EE3B7]/30 hover:shadow-md">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-3 flex-grow">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold uppercase text-slate-700">{job.category}</span>
                          <span className="rounded-full bg-[#5EE3B7]/10 px-2.5 py-1 text-[10px] font-extrabold uppercase text-[#00BFEF]">{job.type}</span>
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${job.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                            {job.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-950">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Exp: {job.experience}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">{job.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.skills.slice(0, 5).map((s, i) => (
                            <span key={i} className="rounded bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">{s}</span>
                          ))}
                          {job.skills.length > 5 && <span className="text-[10px] text-slate-400">+{job.skills.length - 5} more</span>}
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2 self-start">
                        <button
                          onClick={async () => {
                            try {
                              if (job.status === 'published') {
                                await unpublishJob(job.id);
                                showToast('Job unpublished.');
                              } else {
                                await publishJob(job.id);
                                showToast('Job published.');
                              }
                              await refetchStats();
                            } catch {
                              showToast('Failed to update job status.', 'error');
                            }
                          }}
                          className="flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 text-[10px] font-bold text-slate-600 transition-all hover:border-[#5EE3B7] hover:bg-[#5EE3B7]/10 hover:text-[#00BFEF]"
                          title={job.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {job.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => { setEditingJob(job); setShowJobModal(true); }}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:border-[#00BFEF] hover:bg-[#00BFEF]/10 hover:text-[#00BFEF]"
                          title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete({ type: 'job', id: job.id, title: job.title })}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BLOGS TAB */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <ToolBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              placeholder="Search blogs by title, author, category..."
              onAdd={() => { setEditingBlog(null); setShowBlogModal(true); }}
              addLabel="Publish New Blog"
              onReset={() => { refetchBlogs(); showToast('Blogs refreshed.'); }}
            />

            {blogsLoading ? (
              <EmptyState icon={<FileText className="h-10 w-10" />} title="Loading blogs..." desc="Fetching posts from the API." />
            ) : filteredBlogs.length === 0 ? (
              <EmptyState icon={<FileText className="h-10 w-10" />} title="No blog posts found" desc={searchTerm ? 'Try a different search term.' : 'Click "Publish New Blog" to add one.'} />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredBlogs.map((blog) => (
                  <div key={blog.id} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:border-[#00BFEF]/30 hover:shadow-md">
                    <div className="relative h-40 bg-slate-100 overflow-hidden">
                      <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-extrabold uppercase text-slate-700">{blog.category}</span>
                      <span className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${blog.status === 'published' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                        {blog.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="flex flex-grow flex-col p-5">
                      <div className="flex items-center gap-3 text-[10px] font-semibold uppercase text-slate-400 mb-2">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{blog.date}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{blog.author.split(',')[0]}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-950 leading-snug">{blog.title}</h3>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2 flex-grow">{blog.summary}</p>
                      <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                        <button
                          onClick={async () => {
                            try {
                              if (blog.status === 'published') {
                                await unpublishBlog(blog.id);
                                showToast('Blog unpublished.');
                              } else {
                                await publishBlog(blog.id);
                                showToast('Blog published.');
                              }
                              await refetchStats();
                            } catch {
                              showToast('Failed to update blog status.', 'error');
                            }
                          }}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[10px] font-bold text-slate-600 transition-all hover:border-[#5EE3B7] hover:bg-[#5EE3B7]/10 hover:text-[#00BFEF]"
                        >
                          {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => { setEditingBlog(blog); setShowBlogModal(true); }}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[10px] font-bold text-slate-600 transition-all hover:border-[#00BFEF] hover:bg-[#00BFEF]/10 hover:text-[#00BFEF]"
                        >
                          <Edit3 className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={() => setConfirmDelete({ type: 'blog', id: blog.id, title: blog.title })}
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[10px] font-bold text-slate-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <ApplicationsTab onToast={showToast} onDataChange={refetchStats} />
        )}

        {/* INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <InquiriesTab onToast={showToast} onDataChange={refetchStats} />
        )}
      </div>

      {/* Job Modal */}
      {showJobModal && (
        <JobFormModal
          initial={editingJob}
          onClose={() => { setShowJobModal(false); setEditingJob(null); }}
          onSave={handleSaveJob}
        />
      )}

      {/* Blog Modal */}
      {showBlogModal && (
        <BlogFormModal
          initial={editingBlog}
          onClose={() => { setShowBlogModal(false); setEditingBlog(null); }}
          onSave={handleSaveBlog}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 shrink-0">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-extrabold text-slate-950">Confirm Delete</h3>
                <p className="mt-1 text-xs text-slate-600">
                  Are you sure you want to delete <strong>"{confirmDelete.title}"</strong>? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-xs font-bold text-white transition-all hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
          <div className={`flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-lg ${
            toast.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}>
            {toast.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
            <span className="text-xs font-bold">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub Components ───────────────────────────────────

function StatCard({ label, value, icon, color, loading = false }: { label: string; value: number; icon: React.ReactNode; color: 'teal' | 'cyan' | 'emerald' | 'blue'; loading?: boolean }) {
  const colors = {
    teal: 'from-[#5EE3B7]/10 to-[#5EE3B7]/5 text-[#5EE3B7] border-[#5EE3B7]/20',
    cyan: 'from-[#00BFEF]/10 to-[#00BFEF]/5 text-[#00BFEF] border-[#00BFEF]/20',
    emerald: 'from-emerald-500/10 to-emerald-500/5 text-emerald-500 border-emerald-200',
    blue: 'from-blue-500/10 to-blue-500/5 text-blue-500 border-blue-200',
  };
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg border bg-gradient-to-br ${colors[color]}`}>
          {icon}
        </div>
      </div>
      <span className="block text-3xl font-extrabold text-slate-950 tabular-nums">{loading ? '—' : value}</span>
    </div>
  );
}

function QuickActionCard({ icon, title, desc, cta, onClick }: { icon: React.ReactNode; title: string; desc: string; cta: string; onClick: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/20 text-[#00BFEF]">
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="text-base font-bold text-slate-950">{title}</h3>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">{desc}</p>
          <button
            onClick={onClick}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
          >
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
}

function RecentList({ title, items, icon, onView, emptyMsg }: { title: string; items: { id: string; title: string; subtitle: string }[]; icon: React.ReactNode; onView: () => void; emptyMsg: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">{icon}{title}</h3>
        <button onClick={onView} className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#00BFEF] hover:text-slate-900">
          <Eye className="h-3 w-3" />View All
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-slate-400 py-8 text-center">{emptyMsg}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it.id} className="border-b border-slate-50 pb-2 last:border-0">
              <p className="text-xs font-bold text-slate-800 line-clamp-1">{it.title}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{it.subtitle}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ToolBar({ searchTerm, setSearchTerm, placeholder, onAdd, addLabel, onReset }: {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  placeholder: string;
  onAdd: () => void;
  addLabel: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-grow max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#5EE3B7] focus:ring-4 focus:ring-[#5EE3B7]/10"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 transition-all hover:bg-slate-50"
          title="Refresh from API"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" /> {addLabel}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
        {icon}
      </div>
      <h4 className="mt-4 text-base font-bold text-slate-700">{title}</h4>
      <p className="mt-1 text-xs text-slate-500">{desc}</p>
    </div>
  );
}

// ─── Job Form Modal ───────────────────────────────────

function JobFormModal({ initial, onClose, onSave }: { initial: JobListing | null; onClose: () => void; onSave: (job: Omit<JobListing, 'id'>) => void }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [category, setCategory] = useState<JobListing['category']>(initial?.category || 'Technology');
  const [type, setType] = useState<JobListing['type']>(initial?.type || 'Full-time');
  const [location, setLocation] = useState(initial?.location || '');
  const [experience, setExperience] = useState(initial?.experience || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [responsibilitiesInput, setResponsibilitiesInput] = useState(initial?.responsibilities.join('\n') || '');
  const [requirementsInput, setRequirementsInput] = useState(initial?.requirements.join('\n') || '');
  const OFFER_OPTIONS = [
    { title: 'Competitive Salary', desc: 'Market-competitive pay with performance bonuses.' },
    { title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision coverage.' },
    { title: 'Work-Life Balance', desc: 'Flexible work hours and hybrid work environment.' },
    { title: 'Learning & Growth', desc: 'Access to training programs, certifications, and workshops.' },
    { title: 'Collaborative Culture', desc: 'Work with talented professionals in a supportive environment.' },
    { title: 'Additional Benefits', desc: '401(k) matching, paid time off, and more.' },
  ];
  const [selectedOffers, setSelectedOffers] = useState<Set<string>>(
    new Set((initial?.whatWeOffer || []).map((o) => o.title))
  );
  const toggleOffer = (title: string) =>
    setSelectedOffers((prev) => { const next = new Set(prev); next.has(title) ? next.delete(title) : next.add(title); return next; });
  const [skillsInput, setSkillsInput] = useState(initial?.skills.join(', ') || '');
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [k: string]: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!location.trim()) newErrors.location = 'Location is required';
    if (!experience.trim()) newErrors.experience = 'Experience is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!skillsInput.trim()) newErrors.skills = 'At least one skill is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      title: title.trim(),
      category,
      type,
      location: location.trim(),
      experience: experience.trim(),
      description: description.trim(),
      skills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      responsibilities: responsibilitiesInput.split('\n').map((s) => s.trim()).filter(Boolean),
      requirements: requirementsInput.split('\n').map((s) => s.trim()).filter(Boolean),
      whatWeOffer: OFFER_OPTIONS.filter((o) => selectedOffers.has(o.title)),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-100 bg-white shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/20 text-[#00BFEF]">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">{initial ? 'Edit Job Listing' : 'Post New Job'}</h2>
              <p className="text-[10px] text-slate-500">Fill in the details and save to publish.</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <FormField label="Job Title *" error={errors.title}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Senior React Developer" className={inputCls(!!errors.title)} />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category *">
              <select value={category} onChange={(e) => setCategory(e.target.value as JobListing['category'])} className={inputCls(false)}>
                <option value="Consulting">Consulting</option>
                <option value="Staffing">Staffing</option>
                <option value="Technology">Technology</option>
              </select>
            </FormField>
            <FormField label="Employment Type *">
              <select value={type} onChange={(e) => setType(e.target.value as JobListing['type'])} className={inputCls(false)}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Location *" error={errors.location}>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. New York, NY (Hybrid)" className={inputCls(!!errors.location)} />
            </FormField>
            <FormField label="Experience *" error={errors.experience}>
              <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 3+ Years" className={inputCls(!!errors.experience)} />
            </FormField>
          </div>

          <FormField label="Description *" error={errors.description}>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the role, responsibilities, and what makes a great candidate..." className={inputCls(!!errors.description)} />
          </FormField>

          <FormField label="Key Responsibilities" hint="Enter one responsibility per line — shown as a checklist on the job detail page.">
            <textarea rows={5} value={responsibilitiesInput} onChange={(e) => setResponsibilitiesInput(e.target.value)} placeholder={"Analyze current business processes and workflows.\nDesign KPI tracking metrics and dashboards.\nCollaborate with cross-functional teams."} className={inputCls(false)} />
          </FormField>

          <FormField label="Requirements" hint="Enter one requirement per line — shown as a checklist on the job detail page.">
            <textarea rows={5} value={requirementsInput} onChange={(e) => setRequirementsInput(e.target.value)} placeholder={"4+ years of professional experience.\nStrong proficiency in TypeScript.\nBachelor's degree or equivalent."} className={inputCls(false)} />
          </FormField>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">What We Offer</label>
            <span className="block text-[10px] text-slate-400">Select the benefits to display on the job detail page.</span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {OFFER_OPTIONS.map((offer) => {
                const selected = selectedOffers.has(offer.title);
                return (
                  <button
                    key={offer.title}
                    type="button"
                    onClick={() => toggleOffer(offer.title)}
                    className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                      selected
                        ? 'border-[#5EE3B7] bg-[#5EE3B7]/5 ring-2 ring-[#5EE3B7]/20'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border-2 transition-all ${
                      selected ? 'border-[#5EE3B7] bg-[#5EE3B7]' : 'border-slate-300 bg-white'
                    }`}>
                      {selected && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{offer.title}</p>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{offer.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <FormField label="Skills (comma separated) *" error={errors.skills} hint="e.g. React.js, TypeScript, Tailwind, Node.js">
            <input type="text" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} placeholder="React, TypeScript, Tailwind, Node.js" className={inputCls(!!errors.skills)} />
          </FormField>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] py-3 text-xs font-extrabold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg">
              <Save className="h-4 w-4" /> {initial ? 'Update Job' : 'Publish Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Blog Form Modal ───────────────────────────────────

function BlogFormModal({ initial, onClose, onSave }: { initial: BlogPost | null; onClose: () => void; onSave: (b: Omit<BlogPost, 'id'>) => void }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [category, setCategory] = useState<BlogPost['category']>(initial?.category || 'Insights');
  const [date, setDate] = useState(initial?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  const [author, setAuthor] = useState(initial?.author || '');
  const [readTime, setReadTime] = useState(initial?.readTime || '5 min read');
  const [summary, setSummary] = useState(initial?.summary || '');
  const [content, setContent] = useState(initial?.content || '');
  const [image, setImage] = useState(initial?.image || 'https://images.pexels.com/photos/7993898/pexels-photo-7993898.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=800');
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [k: string]: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    if (!summary.trim()) newErrors.summary = 'Summary is required';
    if (!content.replace(/<(.|\n)*?>/g, '').trim()) newErrors.content = 'Content is required';
    if (!image.trim()) newErrors.image = 'Image URL is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      title: title.trim(),
      category,
      date: date.trim(),
      author: author.trim(),
      readTime: readTime.trim(),
      summary: summary.trim(),
      content,
      image: image.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-100 bg-white shadow-2xl my-8">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#5EE3B7]/10 to-[#00BFEF]/10 border border-[#5EE3B7]/20 text-[#00BFEF]">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-950">{initial ? 'Edit Blog Post' : 'Publish New Blog'}</h2>
              <p className="text-[10px] text-slate-500">Share insights with your audience.</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <FormField label="Blog Title *" error={errors.title}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Future of AI in Recruitment" className={inputCls(!!errors.title)} />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="Category *">
              <select value={category} onChange={(e) => setCategory(e.target.value as BlogPost['category'])} className={inputCls(false)}>
                <option value="Consulting">Consulting</option>
                <option value="Staffing">Staffing</option>
                <option value="Technology">Technology</option>
                <option value="Insights">Insights</option>
              </select>
            </FormField>
            <FormField label="Date *">
              <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. March 15, 2026" className={inputCls(false)} />
            </FormField>
            <FormField label="Read Time">
              <input type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="e.g. 5 min read" className={inputCls(false)} />
            </FormField>
          </div>

          <FormField label="Author *" error={errors.author}>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. John Smith, Lead Consultant" className={inputCls(!!errors.author)} />
          </FormField>

          <FormField label="Cover Image URL *" error={errors.image} hint="Use a high-quality image URL (Pexels, Unsplash, etc.)">
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." className={inputCls(!!errors.image)} />
            {image && (
              <div className="mt-2 h-24 w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                <img src={image} alt="preview" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
          </FormField>

          <FormField label="Summary *" error={errors.summary} hint="Short description shown in the blog grid (1-2 lines)">
            <textarea rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="A brief summary of the blog post..." className={inputCls(!!errors.summary)} />
          </FormField>

          <FormField label="Content *" error={errors.content} hint="Use the toolbar to format headings, bold, lists, links, and more.">
            <QuillEditor
              value={content}
              onChange={setContent}
              placeholder="Write your blog content here..."
              hasError={!!errors.content}
            />
          </FormField>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] py-3 text-xs font-extrabold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg">
              <Save className="h-4 w-4" /> {initial ? 'Update Blog' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Form Helpers ───────────────────────────────────

function FormField({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">{label}</label>
      {children}
      {hint && !error && <span className="text-[10px] text-slate-400">{hint}</span>}
      {error && <span className="block text-[10px] font-medium text-red-500">{error}</span>}
    </div>
  );
}

function inputCls(hasError: boolean): string {
  return `w-full rounded-xl border bg-slate-50 px-4 py-3 text-xs text-slate-800 outline-none transition-all placeholder:text-slate-400 ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50'
      : 'border-slate-200 focus:border-[#5EE3B7] focus:bg-white focus:ring-4 focus:ring-[#5EE3B7]/10'
  }`;
}
