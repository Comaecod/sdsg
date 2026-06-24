import {
  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
  signOut, sendPasswordResetEmail, confirmPasswordReset, verifyPasswordResetCode,
  updatePassword, reauthenticateWithCredential, EmailAuthProvider,
  createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged,
  sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const googleProvider = new GoogleAuthProvider();
const EMAIL_LINK_KEY = 'sdsg_email_for_link';

const getActionCodeSettings = () => ({
  url: `${window.location.origin}/login/email-link`,
  handleCodeInApp: true,
});

export const authService = {
  onAuthChanged: (callback) => onAuthStateChanged(auth, callback),

  signInWithEmail: async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  signInWithGoogle: async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  },

  signOut: async () => { await signOut(auth); },

  createUser: async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  },

  sendPasswordReset: async (email) => { await sendPasswordResetEmail(auth, email); },
  verifyResetCode: async (code) => verifyPasswordResetCode(auth, code),
  confirmPasswordReset: async (code, newPassword) => confirmPasswordReset(auth, code, newPassword),

  changePassword: async (currentPassword, newPassword) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  },

  updatePassword: async (newPassword) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    await updatePassword(user, newPassword);
  },

  sendEmailVerification: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    await sendEmailVerification(user);
  },

  getCurrentUser: () => auth.currentUser,

  getIdToken: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    return user.getIdToken();
  },

  sendSignInLink: async (email) => {
    await sendSignInLinkToEmail(auth, email, getActionCodeSettings());
    localStorage.setItem(EMAIL_LINK_KEY, email);
  },

  isSignInWithEmailLink: () => isSignInWithEmailLink(auth, window.location.href),

  signInWithEmailLink: async (providedEmail) => {
    const email = providedEmail || localStorage.getItem(EMAIL_LINK_KEY);
    if (!email) throw new Error('Email not found. Please start the sign-in process again.');
    const result = await signInWithEmailLink(auth, email, window.location.href);
    localStorage.removeItem(EMAIL_LINK_KEY);
    return result.user;
  },

  getStoredEmailForLink: () => localStorage.getItem(EMAIL_LINK_KEY),
  setStoredEmailForLink: (email) => localStorage.setItem(EMAIL_LINK_KEY, email),
  clearStoredEmailForLink: () => localStorage.removeItem(EMAIL_LINK_KEY),
};
