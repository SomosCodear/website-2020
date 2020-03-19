import * as Sentry from '@sentry/browser';

/**
 * Send an error event to Sentry.
 *
 * Server-side:
 * Next.js captures SSR errors and never passes them to the Sentry
 * middleware. It does, however, render the _error.js component, so
 * we can manually fire Sentry events here.
 *
 * Client-side:
 * Unhandled client exceptions will always bubble up to the _error.js
 * component, so we can manually fire events here.
 */
const notifySentry = (err, req, res) => {
  Sentry.configureScope((scope) => {
    if (!req) {
      scope.setTag('ssr', false);
    } else {
      scope.setTag('ssr', true);
      scope.setExtra('url', req.url);
      scope.setExtra('params', req.params);
      scope.setExtra('query', req.query);
      scope.setExtra('statusCode', res.statusCode);
      scope.setExtra('headers', req.headers);
    }
  });

  Sentry.captureException(err);
};

const Error = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    notifySentry(err);
  }

  return statusCode;
};

Error.getInitialProps = async ({
  req,
  res,
  err,
  asPath,
}) => {
  const errorInitialProps = await Error.getInitialProps({ res, err });

  // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true;

  if (res) {
    if (res.statusCode === 404) {
      return { statusCode: 404 };
    }

    if (err) {
      notifySentry(err, req, res);

      return errorInitialProps;
    }
  } else if (err) {
    notifySentry(err);

    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  notifySentry(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
  );

  return errorInitialProps;
};

export default Error;
