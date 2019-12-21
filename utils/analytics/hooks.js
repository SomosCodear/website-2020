import { useMemo, useContext } from 'react';
import { initializeEvents } from './events';
import { AnalyticsContext } from './context';

export const useAnalytics = () => {
  const ga = useContext(AnalyticsContext);
  const analytics = useMemo(() => initializeEvents(ga), [ga]);

  return analytics;
};
