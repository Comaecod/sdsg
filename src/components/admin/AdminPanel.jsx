import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/AuthContext';

const DASHBOARD_CARDS = [
  { to: '/dashboard/feedback', icon: '💬', title: 'Feedback Reports', desc: 'Review and resolve user feedback and complaints', color: 'from-purple-500 to-violet-600' },
  { to: '/dashboard/images', icon: '🖼️', title: 'Image Gallery', desc: 'Manage uploaded images for carousel and gallery', color: 'from-cyan-500 to-teal-600' },
  { to: '/dashboard/images/upload', icon: '➕', title: 'Upload Image', desc: 'Upload new images to Cloudinary', color: 'from-green-500 to-emerald-600' },
];

const SUPER_ADMIN_CARDS = [
  { to: '/dashboard/users', icon: '👥', title: 'User Management', desc: 'Create and manage user accounts, assign roles', color: 'from-blue-500 to-blue-600' },
  { to: '/dashboard/students', icon: '🎓', title: 'Students', desc: 'Manage student profiles', color: 'from-indigo-500 to-purple-600' },
  { to: '/dashboard/audit', icon: '📋', title: 'Audit Logs', desc: 'View system activity and change logs', color: 'from-slate-500 to-slate-600' },
];

const AdminPanel = () => {
  const { userProfile } = useAuth();
  const isSuperAdmin = userProfile?.role === 'super_admin';
  const allCards = isSuperAdmin ? [...SUPER_ADMIN_CARDS, ...DASHBOARD_CARDS] : DASHBOARD_CARDS;

  return (
    <div className="animate-slideUp">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage the SDSG campus platform</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {allCards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group glass-card p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} text-white text-2xl mb-4 shadow-lg`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {card.desc}
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary dark:text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Open</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
