import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/contexts/AuthContext';

const SchoolRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const target = 'https://skksv.vercel.app';
    if (isAuthenticated) {
      // TODO: pass auth token to skksv.vercel.app
    }
    window.open(target, '_blank');
    navigate(-1);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">Redirecting to SKKSV School Website...</p>
      </div>
    </div>
  );
};

export default SchoolRedirect;
