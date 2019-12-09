import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      /* eslint-disable global-require */
      require('@webcomponents/webcomponentsjs/webcomponents-bundle');
      require('@codear/lilac');
      /* eslint-enable global-require */
    }
  }, []);

  return (
    <div>
      Hello!
    </div>
  );
};

export default Home;
