import '@codear/lilac/dist/lilac.css';
import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';
import { ANALYTICS_ID } from '../data/constants';
import { AnalyticsContext } from '../utils/analytics';

// eslint-disable-next-line react/prop-types
const WebConfApp = ({ Component, pageProps, analytics }) => (
  <AnalyticsContext.Provider value={analytics}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </AnalyticsContext.Provider>
);

export default withGA(ANALYTICS_ID, Router)(WebConfApp);
