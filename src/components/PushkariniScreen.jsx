import { motion } from 'framer-motion';

const PushkariniScreen = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-800/80 to-cyan-900/90" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="text-6xl mb-4">🌊</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Pushkarini</h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">The sacred temple pond for ritual purification, meditation, and the adjoining Nakshatra Vanam</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About the Pushkarini</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">The Pushkarini (temple tank) is a sacred water body on the SDSG campus. In traditional Hindu temple architecture, pushkarinis are used for ritual bathing (snana) before worship, for various ceremonies, and as a source of sacred water for temple rituals. The pushkarini adds to the spiritual ambiance of the campus and serves as a place for meditation and reflection.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌿</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pushpa Vatika — Nakshatra Vanam</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">Surrounding the Pushkarini is the Pushpa Vatika (flower garden), featuring a Nakshatra Vanam — a unique garden with plants and trees corresponding to each of the 27 Nakshatras (stars) from Ashwini to Revathi.</p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">This sacred grove allows visitors to connect with their birth star through its associated plant, offering a living bridge between Vedic astrology and the natural world. The garden serves as a space for contemplation, education, and spiritual connection with nature.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PushkariniScreen;
