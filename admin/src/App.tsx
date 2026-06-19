import { useEffect } from 'react';
import { useAdminAuth } from './hooks/useDataStore';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    document.title = isAuthenticated
      ? 'IVA Admin Dashboard'
      : 'IVA Admin Login';
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => { /* auth state re-renders dashboard */ }} />;
  }

  return <Dashboard />;
}
