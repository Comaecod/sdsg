import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROLES } from '../types/roles';

const Dashboard = () => {
  const { userProfile, user } = useAuth();
  const role = userProfile?.role;

  const links = role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN ? [
    { to: '/dashboard/images', icon: '🖼️', label: 'Images', desc: 'Manage carousel & gallery images' },
    { to: '/dashboard/images/upload', icon: '📤', label: 'Upload', desc: 'Upload new images' },
    { to: '/dashboard/feedback', icon: '💬', label: 'Feedback', desc: 'View feedback reports' },
  ] : [];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1><p className="text-gray-500 dark:text-gray-400 text-sm">Welcome, {userProfile?.displayName || user?.email}</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map(link => (
          <Link key={link.to} to={link.to} className="glass-card p-5 hover:scale-[1.02] transition-transform">
            <div className="text-3xl mb-3">{link.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{link.label}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
