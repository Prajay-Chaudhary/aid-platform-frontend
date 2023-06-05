import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const TokenChecker = () => {
  useEffect(() => {
    const token = window.sessionStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired, remove it from session storage
        window.sessionStorage.removeItem('jwtToken');
      }
    }
  }, []);

  return null; // Empty component, doesn't render anything
};

export default TokenChecker;
