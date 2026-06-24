import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { resetPassword, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); clearError();
    try { await resetPassword(email); setSent(true); } catch {}
  };

  if (sent) return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md"><div className="glass-card p-8 animate-slideUp text-center"><div className="text-5xl mb-4">✉️</div><h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check Your Email</h1><p className="text-gray-500 dark:text-gray-400 mb-6">Reset link sent to <strong>{email}</strong></p><Link to="/login" className="text-sm text-primary dark:text-primary-light hover:underline">← Back to login</Link></div></div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md"><div className="glass-card p-8 animate-slideUp"><div className="text-center mb-8"><div className="text-5xl mb-4">🔑</div><h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h1><p className="text-gray-500 dark:text-gray-400">Enter your email to receive a reset link</p></div>
        {error && <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20"><p className="text-red-600 dark:text-red-400 text-sm">{error}</p></div>}
        <form onSubmit={handleSubmit} className="space-y-4"><div><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-primary/50 transition-all" required /></div>
          <button type="submit" className="w-full px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all">Send Reset Link</button></form>
        <p className="mt-6 text-center"><Link to="/login" className="text-sm text-primary dark:text-primary-light hover:underline">← Back to login</Link></p>
      </div></div>
    </div>
  );
}
