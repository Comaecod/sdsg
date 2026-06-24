import { db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp, increment } from 'firebase/firestore';

const ANALYTICS_DOC = 'sdsgAnalytics';
const VISITOR_COUNT_FIELD = 'pageViews';

export const trackPageView = async () => {
  if (typeof window !== 'undefined' && window.sessionStorage?.getItem('sdsg_pageViewTracked')) {
    return;
  }
  
  try {
    const analyticsRef = doc(db, 'analytics', ANALYTICS_DOC);
    const snap = await getDoc(analyticsRef);
    
    if (snap.exists()) {
      await setDoc(analyticsRef, {
        [VISITOR_COUNT_FIELD]: increment(1),
        lastVisit: serverTimestamp()
      }, { merge: true });
    } else {
      await setDoc(analyticsRef, {
        [VISITOR_COUNT_FIELD]: 1,
        lastVisit: serverTimestamp()
      });
    }
    
    if (typeof window !== 'undefined') {
      window.sessionStorage?.setItem('sdsg_pageViewTracked', 'true');
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

export const getPageViewCount = async () => {
  try {
    const analyticsRef = doc(db, 'analytics', ANALYTICS_DOC);
    const snap = await getDoc(analyticsRef);
    
    if (snap.exists()) {
      return snap.data()[VISITOR_COUNT_FIELD] || 0;
    }
    return 0;
  } catch (error) {
    console.error('Error getting page view count:', error);
    return null;
  }
};
