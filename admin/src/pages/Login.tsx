import { useState, type FormEvent } from 'react';
import { useAdminAuth } from '../hooks/useDataStore';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    const ok = await login(username, password);
    setIsLoggingIn(false);

    if (ok) {
      onLoginSuccess();
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white pt-12 pb-20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-[#5EE3B7]/10 via-transparent to-[#00BFEF]/10"></div>
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-[#5EE3B7]/20 blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-[#00BFEF]/15 blur-[150px] animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center justify-center px-4 sm:px-6">
        <div className="mb-8 text-center">
          {/* <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#5EE3B7] to-[#00BFEF] p-[2px] shadow-2xl shadow-[#00BFEF]/30 mb-4">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white">
              <ShieldCheck className="h-7 w-7 text-[#00BFEF]" />
            </div>
          </div> */}
          <span className="inline-block rounded-full border border-[#00BFEF]/20 bg-[#00BFEF]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00BFEF]">
            Restricted Access
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Admin <span className="bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] bg-clip-text text-transparent">Control Panel</span>
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to manage jobs, blogs, applications, and inquiries.
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF]"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">Welcome Back</h2>
              <p className="mt-1 text-xs text-slate-500">Enter your administrator credentials.</p>
            </div>

            {error && (
              <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  autoComplete="username"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#5EE3B7] focus:bg-white focus:ring-4 focus:ring-[#5EE3B7]/10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-11 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#5EE3B7] focus:bg-white focus:ring-4 focus:ring-[#5EE3B7]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE3B7] to-[#00BFEF] py-3.5 text-sm font-extrabold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoggingIn ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
