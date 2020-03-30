/* eslint-disable react/prop-types */
import '@codear/lilac/dist/lilac.css';
import * as Sentry from '@sentry/browser';
import R from 'ramda';
import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { Provider } from 'react-redux';
import withGA from 'next-ga';
import withRedux from 'next-redux-wrapper';
import { withExtraContext } from '../middlewares/with-extra-context';
import { SENTRY_DSN } from '../data/config';
import { configureStore, retrievePersistedState } from '../data/store';
import { ANALYTICS_ID } from '../data/constants';
import { AnalyticsContext } from '../utils/analytics';

Sentry.init({ dsn: SENTRY_DSN });

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

WebConfApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default R.compose(
  withExtraContext({ persistedState: retrievePersistedState }),
  withRedux(configureStore),
  withGA(ANALYTICS_ID, Router),
)(WebConfApp);
