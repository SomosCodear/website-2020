/* eslint-disable react/prop-types */
import '@codear/lilac/dist/lilac.css';
import R from 'ramda';
import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { Provider } from 'react-redux';
import withGA from 'next-ga';
import withRedux from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
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
      <PersistGate persistor={store.persistor}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </AnalyticsContext.Provider>
);

WebConfApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default R.compose(
  withRedux(configureStore),
  withGA(ANALYTICS_ID, Router),
)(WebConfApp);
