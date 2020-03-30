import * as R from 'ramda';

export const withExtraContext = (extraContextGenerators) => (App) => {
  const { getInitialProps: originalGetInitialProps } = App;

  // eslint-disable-next-line no-param-reassign
  App.getInitialProps = async (appContext) => {
    const extraContextValues = await Promise.all(R.compose(
      R.values,
      R.map((generator) => generator(appContext.ctx)),
    )(extraContextGenerators));
    const extraContext = R.zipObj(R.keys(extraContextGenerators), extraContextValues);

    const contextKeys = Object.keys(extraContext);

    for (let i = 0; i < contextKeys.length; i += 1) {
      const contextKey = contextKeys[i];

      // eslint-disable-next-line no-param-reassign
      appContext.ctx[contextKey] = extraContext[contextKey];
    }

    return originalGetInitialProps(appContext);
  };

  return App;
};
