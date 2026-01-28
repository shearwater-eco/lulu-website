import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Detects malformed URLs like "/https://example.com/auth" and redirects
 * to the correct internal path (e.g., "/auth").
 */
export function MalformedUrlGuard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    
    // Check for malformed paths that start with /http:// or /https://
    const malformedMatch = path.match(/^\/https?:\/\/[^/]+(.*)$/);
    
    if (malformedMatch) {
      // Extract the actual path from the malformed URL
      const correctPath = malformedMatch[1] || '/';
      console.warn(`Detected malformed URL: ${path}. Redirecting to: ${correctPath}`);
      navigate(correctPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}
