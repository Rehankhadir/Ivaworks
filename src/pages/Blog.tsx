import { useState } from 'react';
import { useBlogs } from '../hooks/useDataStore';
import { BlogPost } from '../types';
import { Calendar, User, Clock, ChevronLeft, ArrowRight } from 'lucide-react';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { blogs } = useBlogs();

  const categories = ['All', 'Consulting', 'Staffing', 'Technology', 'Insights'];

  const filteredPosts = activeCategory === 'All'
    ? blogs
    : blogs.filter(post => post.category === activeCategory);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-20">

      {/* ─── HERO (Light Theme) ─── */}
      {!selectedPost && (
        <section className="relative overflow-hidden bg-white pt-24 pb-16">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5EE3B7]/10 via-transparent to-[#00BFEF]/10"></div>
            <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-[#5EE3B7]/20 blur-[120px]"></div>
            <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[#00BFEF]/15 blur-[150px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00BFEF] bg-[#00BFEF]/10 border border-[#00BFEF]/20 px-4 py-2 rounded-full inline-block">
              Corporate Intelligence & Insights
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950">
              The IVA Work Solutions Blog
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Stay ahead with practical business advice, technical breakdowns, staffing intelligence, and growth framework updates curated by our senior consultants.
            </p>
          </div>
        </section>
      )}

      {/* ─── CONTENT AREA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">

        {selectedPost ? (
          /* ─── SINGLE POST READER ─── */
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">

            {/* Back */}
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 text-xs font-bold bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Insights</span>
            </button>

            {/* Header */}
            <div className="space-y-5">
              <span className="bg-[#5EE3B7]/10 text-[#5EE3B7] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full inline-block">
                {selectedPost.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-500 text-xs border-b border-slate-100 pb-5">
                <span className="flex items-center space-x-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span className="font-medium text-slate-700">{selectedPost.author}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{selectedPost.date}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{selectedPost.readTime}</span>
                </span>
              </div>
            </div>

            {/* Cover Image */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body */}
            <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
              {selectedPost.content}
            </div>

            {/* Author Footer */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 flex items-start space-x-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] p-[2px] shrink-0">
                <div className="h-full w-full bg-white rounded-xl flex items-center justify-center text-xs font-black text-slate-900">
                  IVA
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{selectedPost.author}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Senior advisory and subject matter specialist at IVA Work Solutions. Providing actionable modern roadmaps for global enterprise clients.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ─── BLOG LISTING ─── */
          <div className="space-y-12">

            {/* Category Filters — Clean & Minimal */}
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Blog Grid — Clean Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-50">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-white/60 text-slate-600">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 text-[10px] text-slate-400 font-semibold uppercase mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-950 leading-snug mb-3 group-hover:text-[#00BFEF] transition-colors cursor-pointer" onClick={() => handlePostClick(post)}>
                      {post.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-grow">
                      {post.summary}
                    </p>

                    <div className="pt-5 mt-auto border-t border-slate-100">
                      <button
                        onClick={() => handlePostClick(post)}
                        className="text-xs font-bold text-[#00BFEF] hover:text-slate-950 flex items-center space-x-1 group-hover:gap-1.5 transition-all"
                      >
                        <span>Read Full Insight</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
