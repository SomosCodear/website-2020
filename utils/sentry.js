import * as Sentry from '@sentry/browser';

export const reportException = async (e) => {
  if (e.response) {
    const body = await e.response.text();
    const { status } = e.response;

    Sentry.withScope((scope) => {
      scope.setExtra('status', status);
      scope.setExtra('body', body);

      Sentry.captureException(e);
    });
  } else {
    Sentry.captureException(e);
  }
};
