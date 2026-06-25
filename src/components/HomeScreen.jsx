import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getImages } from '../services/imageService';
import { useAuth } from '../auth/contexts/AuthContext';
import { ROLES } from '../auth/types/roles';
import ImageModal from './ImageModal';
import PanchangamMarquee from './PanchangamMarquee';

const StatItem = ({ icon, value, label }) => (
  <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2">
    <span className="text-lg">{icon}</span>
    <div>
      <div className="text-gray-900 dark:text-white font-semibold text-sm">{value}</div>
      <div className="text-gray-500 dark:text-gray-400 text-xs">{label}</div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description, to }) => {
  const content = (
    <motion.div whileHover={{ y: -5 }} className="glass-card p-4 sm:p-5 flex items-start gap-4 cursor-pointer">
      <div className="text-2xl sm:text-3xl shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{description}</p>
      </div>
    </motion.div>
  );
  if (to) return <Link to={to}>{content}</Link>;
  return content;
};

const PillarSection = ({ title, subtitle, icon, gradient, items }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6 sm:p-8">
    <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r ${gradient} text-white text-sm font-medium mb-6`}>
      <span className="text-xl">{icon}</span>
      <span>{title}</span>
    </div>
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{subtitle}</p>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm">
          <span className="text-primary mt-0.5 shrink-0">✦</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ImageCarousel = ({ images, onImageClick }) => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => { setCurrent(prev => (prev + 1) % images.length); }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0) return;
    const nextIndex = (current + 1) % images.length;
    const prevIndex = (current - 1 + images.length) % images.length;
    [nextIndex, prevIndex].forEach(index => {
      if (index >= 0 && index < images.length && !loaded[index]) {
        const img = new Image();
        img.src = images[index].url;
        img.onload = () => setLoaded(prev => ({ ...prev, [index]: true }));
      }
    });
  }, [current, images, loaded]);

  if (images.length === 0) {
    return (
      <div className="w-full h-64 sm:h-80 lg:h-96 bg-[#282843] rounded-2xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-gray-400 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  const img = images[current];

  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-8 group cursor-pointer" onClick={() => onImageClick(img)}>
      <AnimatePresence mode="wait">
        <motion.img key={current} src={img.url} alt={img.title || `SDSG image ${current + 1}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-full object-cover" />
      </AnimatePresence>
      {(img.title || img.description) && (
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none">
          {img.title && <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg drop-shadow-md">{img.title}</h3>}
          {img.description && <p className="text-white/80 text-xs sm:text-sm mt-1 line-clamp-3 drop-shadow-md max-w-xl">{img.description}</p>}
        </div>
      )}
      {images.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
            {images.map((_, index) => (
              <button key={index} onClick={(e) => { e.stopPropagation(); setCurrent(index); }} className={`pointer-events-auto w-2 h-2 rounded-full transition-all ${index === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>
          <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev - 1 + images.length) % images.length); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all" aria-label="Previous image">‹</button>
          <button onClick={(e) => { e.stopPropagation(); setCurrent(prev => (prev + 1) % images.length); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all" aria-label="Next image">›</button>
        </>
      )}
    </div>
  );
};

const HomeScreen = () => {
  const { isAuthenticated, userProfile, loading } = useAuth();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getImages().then(items => { setImages(items); }).catch(err => console.error('Carousel fetch error:', err));
  }, []);

  const features = [
    { icon: '🏫', title: 'SKKSV School', description: 'Sri Kanchi Kamakoti Sankara Vidyalaya — CBSE school on campus', to: '/school' },
    { icon: '🐄', title: 'Goshala', description: 'Sacred cow shelter preserving indigenous breeds', to: '/goshala' },
    { icon: '🌊', title: 'Pushkarini', description: 'Temple pond with Nakshatra Vanam', to: '/pushkarini' },
    { icon: '🏠', title: 'Bhavan', description: 'Campus guest house for visitors and devotees', to: '/bhavan' },
    { icon: '📿', title: 'Veda Hostel', description: 'Sri Kanchi Kamakoti Triveni Vidyarthi Vasati Gruham', to: '/hostel/veda-hostel' },
    { icon: '👥', title: 'General Hostel', description: 'Guru Priya Vidyarthi Vasati Gruham', to: '/hostel/general' },
    { icon: '🌳', title: 'Green Campus', description: '34-acre campus with gardens and sacred groves' },
    { icon: '🛕', title: 'Spiritual Living', description: 'Daily rituals, Vedic studies & spiritual practices' },
  ];

  return (
    <div className="w-full min-h-screen">
      <PanchangamMarquee />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isAuthenticated && !loading && (
          <div className="mb-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                {(userProfile?.displayName || userProfile?.email || 'U')[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Welcome back, {userProfile?.displayName || 'User'}!</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {userProfile?.role === ROLES.SUPER_ADMIN && 'You have full access to manage the platform.'}
                  {userProfile?.role === ROLES.ADMIN && 'You can manage users and content.'}
                  {userProfile?.role === ROLES.STUDENT && 'Explore the campus and resources.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 sm:mt-8">
          <ImageCarousel images={images} onImageClick={setSelectedImage} />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mt-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2">Sanatana Dharma</h1>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-5 pb-1 leading-[1.3]">Seva Gramam</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base italic mb-1">A Self-Sustainable Heritage Village at Podili</p>
          <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mb-5">near Ongole, Prakasam District, Andhra Pradesh</p>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
            {['Dharma', 'Seva', 'Jnana'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs sm:text-sm font-medium border border-primary/30">{tag}</span>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-left space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            <p>
              Revival and propagation of the Sanatana Dharma among youth and upcoming generations has become a dire need of the hour. It is extremely important that right channels of participation and opportunities are developed and made available to youngsters, to be able to involve them and provide them a conducive environment to stay connected and rooted to our culture.
            </p>
            <p>
              With this intention of sowing the seeds of Sanatana Dharmic way of life among youth of the modern age and children right from a tender age, <strong>Sri Kanchi Kamakoti Peetadhipati Jagadguru Sri Sankara Vijayendra Saraswati Swami</strong> has launched this noble and unique service initiative titled as the <strong>"Sanatana Dharma Seva Gramam"</strong>.
            </p>
            <p>
              Podili — originally known as Prudulapuri ("Headquarters of the Universe") with puranic references to Prudhu Chakravarthi and famous for a hill known as Podili Konda — is located 50 KMs to the west of Ongole, on the Srisailam route. It is well connected through public transportation by Rail and Road.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap justify-center gap-3 mt-6 mb-8 sm:mb-10">
          <StatItem icon="📍" value="Podili, AP" label="50 KM W of Ongole" />
          <StatItem icon="🌳" value="34 Acres" label="Campus" />
          <StatItem icon="🏛️" value="SKKSV" label="School" />
          <StatItem icon="🚆" value="Rail & Road" label="Well Connected" />
          <StatItem icon="🐄" value="Goshala" label="Cow Shelter" />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-6 sm:p-8 mb-10 sm:mb-14 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h2>
          <p className="text-primary font-medium text-sm sm:text-base mb-2">A platform for Dharma Samrakshana</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
            To strengthen the local community, a school for children from 6th to 12th standard will be opened; a Skill Development Center is planned to train locals in Shilpa Kala, Nadaswaram, Certificate courses in Goshala, Temple management, Charitable organization management, agriculture etc. It will have a Public Health Center to address the locals' healthcare needs. It will also have a Sports Center where all local people can train and achieve excellence in Sports arena. In a scenic landscape sprawling over 34 acres, this project envisages to create an institution that serves the local community in several ways.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">The Story of Sriram</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-8 max-w-2xl mx-auto">A glimpse into why SDSG exists</p>
          <div className="glass-card p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                <p>Sriram lives in a hamlet near Podili with his parents and sister. They live off a very small farm in their backyard.</p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-200 text-sm italic">Their choices: Sriram's family must uproot themselves and move to an urban center and start a brutal life from zero — or stay where they are and compromise on their quality of life.</p>
                </div>
                <p>There are very limited opportunities for Sriram to grow, learn, and thrive in his village.</p>
                <p>There are <strong>100 children like Sriram</strong> in a cluster of villages near Podili who need to be empowered with education, cultural best practices, and health — to become productive and giving citizens, living in harmony with nature and society, and helping build and grow sustainable local economies.</p>
              </div>
              <div className="bg-primary/5 dark:bg-white/5 rounded-xl p-6 border border-primary/10">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">How do we help Sriram?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 bg-white dark:bg-white/5 rounded-lg">
                    <div className="text-3xl mb-2">🏫</div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">School</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-white/5 rounded-lg">
                    <div className="text-3xl mb-2">🏥</div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">Clinic</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-white/5 rounded-lg">
                    <div className="text-3xl mb-2">🏠</div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">Accommodation</div>
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                  <p className="italic text-center">"It takes a village to raise a happy child, and a good citizen…"</p>
                  <p>An ecosystem to foster values, health, knowledge, and local economies. Developing social and human capital at the grass-roots, locally, leading towards self-sustainable rural economies.</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10 text-center">
                  <p className="text-sm font-medium text-primary">And that is what we shall do — Build, Develop and Facilitate a village, an ecosystem, a Gramam.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">Sports Center</span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">Skill Development</span>
                  <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium">Essential Amenities</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Proposed Plan</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-8 max-w-2xl mx-auto">A beautifully integrated platform of education, imparting modern education coupled with the study of Vedas, Shastras and other Dharmic subject areas.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PillarSection
              title="LEARNING"
              subtitle="Education & Knowledge"
              icon="📖"
              gradient="from-blue-600 to-indigo-700"
              items={[
                'Sri Kanchi Kamakoti Sankara Vidyalaya — enrolling students from 6th to 12th standard with appropriate CBSE/State syllabus',
                'Sri Kamakshi Skill Development Center to train locals in Shilpa Kala, Pottery, Horticulture, Agriculture, Tailoring, Electrical, Plumbing, Carpentry, Arts & Crafts, Driving etc.',
                'Sri Chandrasekharendra Saraswathi Institute for Sanskrit and Vedic Studies to propagate Vedic studies with focus on Sanskrit and Sanatana Dharma',
                'Sri Sankara Advaita Research Center for research on Vedas, Vedangas and Upanishads along with extensive library',
              ]}
            />
            <PillarSection
              title="LIVING"
              subtitle="Residential & Community"
              icon="🏘️"
              gradient="from-amber-600 to-orange-700"
              items={[
                'Sri Sankara Hostel for Vedic students with capacity for 100+ students — each room accommodates three students',
                'Accommodation for Adhyapakas with kitchen and dining as per Vedic standards combined with modern cooking utilities',
                'Classrooms for Vedic teaching named after the Sapta Rishis; halls and auditoriums named after great saints of India',
                'Guest house for visiting Vedic scholars and faculty',
                'Sri Jayendra Saraswathi Health Centre providing out-patient services and healthcare for students',
              ]}
            />
            <PillarSection
              title="CULTURAL INFRASTRUCTURE"
              subtitle="Spirituality & Heritage"
              icon="🛕"
              gradient="from-emerald-600 to-teal-700"
              items={[
                'A full-fledged Goshala with emphasis on breeding and rearing rare INDIAN COWS and protection of aged cows',
                'Yagasala for training and conducting various Homas and Yagas',
                'Vyayamashala to be named as Hanuman Sports Complex',
                'Pushpa Vatika with Nakshatra Vanam — plants for each of the 27 stars from Ashwini to Revathi',
                'Art and photo gallery and exhibition of Vedic texts and scriptures',
                'Yoga center and indoor sports room for indoor games',
              ]}
            />
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">What is Sanatana Dharma Seva Gramam?</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-8 max-w-3xl mx-auto">A self-sustainable community, integrating culture, wellness and education for peaceful and happy living, designed to preserve, protect, and propagate Sanatana Dharma through generations.</p>
          <div className="glass-card p-6 sm:p-8 mb-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">The project is spread across a sprawling area of <strong>34 acres</strong> in Obulakkapalli, Podili village, near Ongole in Andhra Pradesh. It houses an Integrated Residential Learning Center, Public Health Center, Skill Development Center, Cow Shelter and Sports Complex.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className="glass-card p-6 border-t-4 border-blue-500">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-medium mb-4">
                <span className="text-xl">📖</span>
                <span>Education</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">To ensure self-employment, sustainable economies, green way of living and good citizenry</p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-blue-500 shrink-0">✦</span> Modern School: 6th to 12th standard, CBSE syllabus, Open for public</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 shrink-0">✦</span> Skill Development Center: Certificate courses — Shilpa Kala, Pottery, Horticulture & Agriculture, Tailoring, Electrical, Plumbing, Carpentry, Arts & Crafts, Driving</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 shrink-0">✦</span> Traditional School: Propagate Vedic studies with focus on Sanskrit and Sanatana Dharma</li>
                <li className="flex items-start gap-2"><span className="text-blue-500 shrink-0">✦</span> Kamakoti Advaita Research Center: Research on Vedas, Vedangas and Upanishads with extensive library</li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="glass-card p-6 border-t-4 border-emerald-500">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-sm font-medium mb-4">
                <span className="text-xl">🛕</span>
                <span>Culture</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Preservation, protection and propagation of traditional best practices that perpetuate time-honored values</p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✦</span> Gosala: Breeding and rearing rare Indian cows</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✦</span> Yagasala: Training and performing various Homas and Yagas</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 shrink-0">✦</span> Pushpa Vatika: Nakshatra Vanam with plants for each of the 27 stars from Ashwini to Revathi</li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="glass-card p-6 border-t-4 border-amber-500">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-700 text-white text-sm font-medium mb-4">
                <span className="text-xl">🧘</span>
                <span>Wellness</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">A healthy body, mind and intellect ensure a good quality of life</p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✦</span> Hanuman Vyayamasala / Sports Complex: Yoga center and indoor sports center</li>
                <li className="flex items-start gap-2"><span className="text-amber-500 shrink-0">✦</span> Sri Jayendra Saraswathi Health Center: Out-patient services for local public and healthcare for SDSG</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Explore Our Campus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 sm:p-10 mb-10 sm:mb-14 text-center border-t-4 border-primary/50">
          <div className="text-4xl mb-4">🙏</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Appeal</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            <p>
              Needless to say, it becomes extremely important for individuals of the community to come together and join hands to build a strong and sustainable model of value-based systems of education, the sole intention being the welfare of our own upcoming generations.
            </p>
            <p>
              In fact, this should be looked up to as a platform of opportunities for individuals to contribute towards a bigger mission of <strong>Dharma Samrakshana</strong>.
            </p>
            <p className="text-lg font-medium text-primary">
              All devotees are requested to come forward and extend their support in any possible scale towards this noble cause.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap justify-center items-center gap-4 py-6 border-t border-gray-200 dark:border-white/10">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Sanatana Dharma Seva Gramam, Podili — Andhra Pradesh</p>
          <a href="https://maps.app.goo.gl/tJxDJYtwDYMbrGzv9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white text-sm transition-all">📍 View on Maps</a>
        </motion.div>
      </div>
      <AnimatePresence>{selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}</AnimatePresence>
    </div>
  );
};

export default HomeScreen;
