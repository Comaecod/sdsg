import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/contexts/AuthContext';

const VedaHostel = () => {
  const { userProfile, isAuthenticated } = useAuth();
  const residence = userProfile?.dayScholarOrHostel;
  const hasAccess = isAuthenticated && residence === '2';

  if (isAuthenticated && residence === '1') return <Navigate to="/" replace />;

  return (
    <div className="w-full min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/90 via-red-800/80 to-amber-900/90" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="text-6xl mb-4">📿</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Sri Sankara Hostel</h1>
            <p className="text-lg text-orange-200 max-w-2xl mx-auto mb-4">Sri Kanchi Kamakoti Triveni Vidyarthi Vasati Gruham — A residential space for Vedic scholars</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About the Hostel</h2>
          {hasAccess ? (
            <div className="space-y-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <p>The Sri Sankara Hostel is a full-fledged residential facility for Vedic students, with accommodation for Adhyapakas (teachers) as well. The hostel features a kitchen and dining facility as per Vedic standards combined with modern cooking utilities.</p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3"><span className="text-primary shrink-0">✦</span> Capacity for more than 100 students</li>
                <li className="flex items-start gap-3"><span className="text-primary shrink-0">✦</span> Each room accommodates three students</li>
                <li className="flex items-start gap-3"><span className="text-primary shrink-0">✦</span> Classrooms for Vedic teaching, each named after the Sapta Rishis</li>
                <li className="flex items-start gap-3"><span className="text-primary shrink-0">✦</span> Halls, auditoriums and exam rooms named after great saints of India</li>
                <li className="flex items-start gap-3"><span className="text-primary shrink-0">✦</span> Full-fledged guest house for visiting Vedic scholars and faculty</li>
              </ul>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Access Restricted</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">You are not authorized to view this content.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VedaHostel;
