import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const [authStatus, setAuthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      // Check all possible user types
      const userTypes = [
        { key: 'bloodDonor', label: 'Blood Donor' },
        { key: 'organDonor', label: 'Organ Donor' },
        { key: 'patient', label: 'Patient/Family' },
        { key: 'user', label: 'General User' }
      ];

      for (const type of userTypes) {
        const token = localStorage.getItem(`${type.key}Token`);
        const user = localStorage.getItem(type.key);
        
        if (token && user) {
          setUserType(type);
          setAuthStatus('authenticated');
          setLoading(false);
          return;
        }
      }

      // No user found
      setAuthStatus('unauthenticated');
      setUserType(null);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  // If route requires authentication but user is not authenticated
  if (requireAuth && authStatus === 'unauthenticated') {
    return <Navigate to="/auth" />;
  }

  // If route is for specific user type but wrong user is logged in
  // (You can add this logic if needed for role-specific routes)

  return children;
};

export default ProtectedRoute;