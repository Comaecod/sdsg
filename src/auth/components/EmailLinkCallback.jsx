import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function EmailLinkCallback() {
  const { loginWithEmailLink } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    loginWithEmailLink().then(() => { setStatus('Signed in!'); setTimeout(() => navigate('/dashboard', { replace: true }), 1000); })
      .catch(err => setStatus(`Error: ${err.message}`));
  }, [loginWithEmailLink, navigate]);

  return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-500">{status}</p></div></div>;
}
