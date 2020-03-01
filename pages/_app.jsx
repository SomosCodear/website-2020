/* eslint-disable react/prop-types */
import '@codear/lilac/dist/lilac.css';
import R from 'ramda';
import React from 'react';
import Router from 'next/router';
import { Provider } from 'react-redux';
import withGA from 'next-ga';
import withRedux from 'next-redux-wrapper';
import { configureStore } from '../data/store';
import { ANALYTICS_ID } from '../data/constants';
import { AnalyticsContext } from '../utils/analytics';

const WebConfApp = ({
  Component,
  pageProps,
  analytics,
  store,
}) => (
  <AnalyticsContext.Provider value={analytics}>
    <Provider store={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Provider>
  </AnalyticsContext.Provider>
);

export default R.compose(
  withRedux(configureStore),
  withGA(ANALYTICS_ID, Router),
)(WebConfApp);
