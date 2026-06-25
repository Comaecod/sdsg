import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/contexts/AuthContext';

const GeneralHostel = () => {
  const { userProfile, isAuthenticated } = useAuth();
  const residence = userProfile?.dayScholarOrHostel;
  const hasAccess = isAuthenticated && residence === '3';

  if (isAuthenticated && residence === '1') return <Navigate to="/" replace />;

  return (
    <div className="w-full min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/90 via-blue-800/80 to-indigo-900/90" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="text-6xl mb-4">👥</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Guru Priya Vidyarthi<br />Vasati Gruham</h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-4">General Hostel — Comfortable accommodation for students with dining, recreation, and study facilities</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About the Hostel</h2>
          {hasAccess ? (
            <div className="space-y-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <p>The General Hostel provides comfortable residential accommodation for students of Sri Kanchi Kamakoti Sankara Vidyalaya. With modern amenities and a conducive environment for studies, the hostel ensures that students feel at home while pursuing their education.</p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3"><span className="text-primary shrink-0">✦</span> Well-furnished rooms with study areas</li>
                <li className="flex items-start gap-3"><span className="text-primary shrink-0">✦</span> Kitchen and dining facility with nutritious meals</li>
                <li className="flex items-start gap-3"><span className="text-primary shrink-0">✦</span> Indoor games and recreation room</li>
                <li className="flex items-start gap-3"><span className="text-primary shrink-0">✦</span> 24×7 security and warden supervision</li>
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

export default GeneralHostel;
