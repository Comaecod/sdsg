import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validCode, setValidCode] = useState(false);

  useEffect(() => {
    const code = searchParams.get('oobCode');
    if (code) { authService.verifyResetCode(code).then(() => setValidCode(true)).catch(() => setError('Invalid or expired reset link.')); }
    else setError('No reset code found.');
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    try { await authService.confirmPasswordReset(searchParams.get('oobCode'), password); setSuccess(true); }
    catch (err) { setError(err.message); }
  };

  if (success) return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md"><div className="glass-card p-8 animate-slideUp text-center"><div className="text-5xl mb-4">✅</div><h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Password Reset</h1><p className="text-gray-500 dark:text-gray-400 mb-6">Your password has been reset successfully</p><Link to="/login" className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all inline-block">Sign In</Link></div></div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md"><div className="glass-card p-8 animate-slideUp"><div className="text-center mb-8"><div className="text-5xl mb-4">🔐</div><h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">New Password</h1></div>
        {error && <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20"><p className="text-red-600 dark:text-red-400 text-sm">{error}</p></div>}
        {validCode && <form onSubmit={handleSubmit} className="space-y-4">
          <div><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-primary/50 transition-all" required /></div>
          <div><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-primary/50 transition-all" required /></div>
          <button type="submit" className="w-full px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all">Reset Password</button>
        </form>}
      </div></div>
    </div>
  );
}
