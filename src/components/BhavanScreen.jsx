import { motion } from 'framer-motion';

const BhavanScreen = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-orange-800/80 to-yellow-900/90" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Bhavan</h1>
            <p className="text-lg text-amber-200 max-w-2xl mx-auto">Campus guest house for visiting Vedic scholars, faculty, and guests of the gramam</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About the Bhavan</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">The Bhavan is the guest house facility on the SDSG campus. It provides comfortable accommodation for visiting Vedic scholars, faculty members, devotees, and family members of students. Staying at the Bhavan offers a unique opportunity to experience campus life, participate in daily rituals, and enjoy the serene surroundings of the gramam.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🏥</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sri Jayendra Saraswathi Health Centre</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">The campus also features the Sri Jayendra Saraswathi Health Centre, providing out-patient services to the local population and healthcare for students studying in the project complex. The centre ensures that the health and well-being of the campus community and surrounding villagers are well taken care of.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default BhavanScreen;
