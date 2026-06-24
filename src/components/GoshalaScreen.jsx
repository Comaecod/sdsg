import { motion } from 'framer-motion';

const GoshalaScreen = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-800/80 to-teal-900/90" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="text-6xl mb-4">🐄</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">SDSG Goshala</h1>
            <p className="text-lg text-green-200 max-w-2xl mx-auto">A full-fledged Goshala for breeding and rearing rare Indian cows — protecting and preserving indigenous breeds on campus</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About the Goshala</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">The SDSG Goshala is home to several indigenous cow breeds with emphasis on breeding and rearing <strong>rare INDIAN COWS</strong>. Cows are venerated in Sanatana Dharma as sacred animals, and the goshala provides them with loving care, shelter, and nourishment. Special attention is given to the protection and safety of aged cows.</p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">The milk and products from the goshala are used for temple rituals and the well-being of the campus residents.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-3"><span className="text-green-500 shrink-0">✦</span> Breed and preserve rare indigenous cow breeds</li>
            <li className="flex items-start gap-3"><span className="text-green-500 shrink-0">✦</span> Provide a healthy, loving environment for all cows including the aged</li>
            <li className="flex items-start gap-3"><span className="text-green-500 shrink-0">✦</span> Produce organic milk and dairy products for temple rituals</li>
            <li className="flex items-start gap-3"><span className="text-green-500 shrink-0">✦</span> Educate visitors about the importance of cow protection in Sanatana Dharma</li>
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔥</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Yagasala</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Adjacent to the Goshala is the Yagasala — a dedicated facility for training and conducting various Homas and Yagas as per Vedic traditions. The Yagasala serves as a sacred space for Vedic rituals, fire ceremonies, and spiritual practices that are an integral part of campus life.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default GoshalaScreen;
