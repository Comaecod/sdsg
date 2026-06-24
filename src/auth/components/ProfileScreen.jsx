import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
  const { userProfile, user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
            {(userProfile?.displayName || user?.email || 'U')[0].toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile?.displayName || 'User'}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
          {userProfile?.role && <span className="mt-2 inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium capitalize">{userProfile.role}</span>}
        </div>
        <div className="space-y-3">
          <div className="flex justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5"><span className="text-gray-500 dark:text-gray-400 text-sm">Name</span><span className="text-gray-900 dark:text-white text-sm font-medium">{userProfile?.displayName || '—'}</span></div>
          <div className="flex justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5"><span className="text-gray-500 dark:text-gray-400 text-sm">Email</span><span className="text-gray-900 dark:text-white text-sm font-medium">{user?.email || '—'}</span></div>
          <div className="flex justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5"><span className="text-gray-500 dark:text-gray-400 text-sm">Phone</span><span className="text-gray-900 dark:text-white text-sm font-medium">{userProfile?.phone || '—'}</span></div>
        </div>
        <div className="mt-6 flex gap-3">
          <Link to="/" className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/20 transition-all text-center">Home</Link>
          <button onClick={logout} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
