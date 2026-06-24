import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BETA_BANNER_KEY = 'sdsg_beta_dismissed';

const BetaBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(BETA_BANNER_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(BETA_BANNER_KEY, 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3">
            <span className="text-white text-sm font-medium">
              🚀 This app is in <span className="font-bold">Beta</span> - Help us improve!
            </span>
            <button
              onClick={handleDismiss}
              className="absolute right-4 text-white/80 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BetaBanner;
