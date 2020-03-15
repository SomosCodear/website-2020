/* globals window */
import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => window.scrollTo({ x: 0, y: 0, behavior: 'auto' }));
};
