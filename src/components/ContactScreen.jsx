import { motion } from 'framer-motion';

const ContactScreen = () => {
  return (
    <div className="w-full flex items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">📞</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400">Sanatana Dharma Seva Gramam</p>
        </div>
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📍 Address</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Sanatana Dharma Seva Gramam, Podili, Prakasam District, Andhra Pradesh - 523240</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📧 Email</h3>
              <a href="mailto:contact@sdsg.org" className="text-primary text-sm hover:underline">contact@sdsg.org</a>
            </div>
            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📱 Phone</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">+91 XXXXX XXXXX</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🏫 School (SKKSV)</h3>
            <a href="https://skksv.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">skksv.vercel.app →</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactScreen;
