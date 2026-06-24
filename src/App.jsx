import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getPageViewCount } from './services/firebaseService';
import { LayoutProvider } from './context/LayoutContext';
import { AuthProvider } from './auth/contexts/AuthContext';
import { ProtectedRoute, GuestRoute } from './auth/components/ProtectedRoute';
import BetaBanner from './components/BetaBanner';
import MainLayout from './components/MainLayout';
import HomeScreen from './components/HomeScreen';

const PanchangamScreen = lazy(() => import('./components/PanchangamScreen'));
const AboutShankaracharya = lazy(() => import('./components/AboutShankaracharya'));
const GalleryScreen = lazy(() => import('./components/GalleryScreen'));
const ContactScreen = lazy(() => import('./components/ContactScreen'));
const FeedbackScreen = lazy(() => import('./components/FeedbackScreen'));
const FeedbackReportsScreen = lazy(() => import('./components/FeedbackReportsScreen'));
const GoshalaScreen = lazy(() => import('./components/GoshalaScreen'));
const PushkariniScreen = lazy(() => import('./components/PushkariniScreen'));
const BhavanScreen = lazy(() => import('./components/BhavanScreen'));
const SchoolRedirect = lazy(() => import('./components/SchoolRedirect'));
const VedaPatashalaHostel = lazy(() => import('./components/VedaPatashalaHostel'));
const GeneralHostel = lazy(() => import('./components/GeneralHostel'));

const LoginScreen = lazy(() => import('./auth/components/LoginScreen'));
const ForgotPassword = lazy(() => import('./auth/components/ForgotPassword'));
const ResetPassword = lazy(() => import('./auth/components/ResetPassword'));
const Unauthorized = lazy(() => import('./auth/components/Unauthorized'));
const ProfileScreen = lazy(() => import('./auth/components/ProfileScreen'));
const Dashboard = lazy(() => import('./auth/components/Dashboard'));
const EmailLinkCallback = lazy(() => import('./auth/components/EmailLinkCallback'));
const AdminUserManagement = lazy(() => import('./auth/components/admin/AdminUserManagement'));
const StudentManagement = lazy(() => import('./auth/components/admin/StudentManagement'));
const AuditLogViewer = lazy(() => import('./auth/components/admin/AuditLogViewer'));

const AdminImages = lazy(() => import('./components/admin/AdminImages'));
const UploadImage = lazy(() => import('./components/admin/UploadImage'));
const AdminPanel = lazy(() => import('./components/admin/AdminPanel'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const DashboardLayout = lazy(() => import('./components/admin/AdminLayout'));

const AuthFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const [pageViewCount, setPageViewCount] = useState(null);

  useEffect(() => {
    const initAnalytics = async () => {
      const count = await getPageViewCount();
      setPageViewCount(count);
    };
    initAnalytics();
  }, []);

  const withLayout = (Component) => (
    <LayoutProvider>
      <MainLayout pageViewCount={pageViewCount}>
        <Suspense fallback={<AuthFallback />}>
          <Component />
        </Suspense>
      </MainLayout>
    </LayoutProvider>
  );

  const withDashboardLayout = (Component) => (
    <Suspense fallback={<AuthFallback />}>
      <DashboardLayout>
        <Component />
      </DashboardLayout>
    </Suspense>
  );

  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <BetaBanner />
        <Routes>
          <Route path="/" element={withLayout(HomeScreen)} />
          <Route path="/goshala" element={withLayout(GoshalaScreen)} />
          <Route path="/pushkarini" element={withLayout(PushkariniScreen)} />
          <Route path="/bhavan" element={withLayout(BhavanScreen)} />
          <Route path="/school" element={withLayout(SchoolRedirect)} />
          <Route path="/hostel/veda-patashala" element={withLayout(VedaPatashalaHostel)} />
          <Route path="/hostel/general" element={withLayout(GeneralHostel)} />
          <Route path="/panchangam" element={withLayout(PanchangamScreen)} />
          <Route path="/about-shankaracharya" element={withLayout(AboutShankaracharya)} />
          <Route path="/gallery" element={withLayout(GalleryScreen)} />
          <Route path="/contact" element={withLayout(ContactScreen)} />
          <Route path="/feedback" element={withLayout(FeedbackScreen)} />

          <Route path="/login" element={
            <Suspense fallback={<AuthFallback />}>
              <GuestRoute><LoginScreen /></GuestRoute>
            </Suspense>
          } />
          <Route path="/forgot-password" element={
            <Suspense fallback={<AuthFallback />}>
              <GuestRoute><ForgotPassword /></GuestRoute>
            </Suspense>
          } />
          <Route path="/reset-password" element={
            <Suspense fallback={<AuthFallback />}>
              <GuestRoute><ResetPassword /></GuestRoute>
            </Suspense>
          } />
          <Route path="/unauthorized" element={
            <Suspense fallback={<AuthFallback />}>
              <Unauthorized />
            </Suspense>
          } />
          <Route path="/login/email-link" element={
            <Suspense fallback={<AuthFallback />}>
              <EmailLinkCallback />
            </Suspense>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <Suspense fallback={<AuthFallback />}>
                  <ProfileScreen />
                </Suspense>
              </div>
            </ProtectedRoute>
          } />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>{withDashboardLayout(AdminDashboard)}</ProtectedRoute>
          } />
          <Route path="/dashboard/admin" element={
            <ProtectedRoute>{withDashboardLayout(AdminPanel)}</ProtectedRoute>
          } />
          <Route path="/dashboard/users" element={
            <ProtectedRoute>{withDashboardLayout(AdminUserManagement)}</ProtectedRoute>
          } />
          <Route path="/dashboard/students" element={
            <ProtectedRoute>{withDashboardLayout(StudentManagement)}</ProtectedRoute>
          } />
          <Route path="/dashboard/audit" element={
            <ProtectedRoute>{withDashboardLayout(AuditLogViewer)}</ProtectedRoute>
          } />
          <Route path="/dashboard/feedback" element={
            <ProtectedRoute>{withDashboardLayout(FeedbackReportsScreen)}</ProtectedRoute>
          } />
          <Route path="/dashboard/images" element={
            <ProtectedRoute>{withDashboardLayout(AdminImages)}</ProtectedRoute>
          } />
          <Route path="/dashboard/images/upload" element={
            <ProtectedRoute>{withDashboardLayout(UploadImage)}</ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
