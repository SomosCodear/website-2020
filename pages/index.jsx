import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const LandingSection = styled.section`
  height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
`;

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
    <Container>
      <LandingSection>
        Hello!
      </LandingSection>
    </Container>
  );
};

export default Home;
