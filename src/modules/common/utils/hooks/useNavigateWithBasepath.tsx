import { useMfeBasepath } from '@softland/contexts';
import { NavigateOptions, To, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Custom hook that returns a navigate function with the base path automatically prefixed.
 */
export const useNavigateWithBasepath = (): ((to: To, options?: NavigateOptions) => void) => {
  const basePath = useMfeBasepath();
  const navigate = useNavigate();

  return useCallback(
    (to: To, options?: NavigateOptions): void => {
      const toPath = typeof to === 'string' ? to : to.pathname ?? '';
      if (!toPath?.startsWith('/')) {
        throw new Error('Path must start with a "/"');
      }

      const formattedPath = `${toPath}`;
      const fullPath: To =
        typeof to === 'string'
          ? `${basePath}${formattedPath}`
          : { ...to, pathname: `${basePath}${formattedPath}` };

      navigate(fullPath, options);
    },
    [basePath, navigate]
  );
};
