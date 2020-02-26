import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { BREAKPOINTS, COLORS } from '../style/constants';
import { META } from '../data/constants';
import { useAnalytics } from '../utils/analytics';
import { LilacButton } from '../components/LilacButton';
import { EventCountdown } from '../components/EventCountdown';

const Container = styled.main`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(/images/backgrounds/header.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media (min-width: ${BREAKPOINTS.hd}) {
    background-image: url(/images/backgrounds/home-background.jpg);
    background-position: left center;
    background-size: auto;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    flex-direction: row;
  }
`;

const HeaderLogo = styled.div`
  padding: 0 1.25rem;

  img {
    width: 100%;
    max-height: 20rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    padding: 0 2rem;
  }
`;

const HeaderInfo = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    display: block;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    align-self: stretch;
    margin-top: 0;
    padding: 0 2rem 0 2rem;
    border-left: 1px solid ${transparentize(0.2, COLORS.lilac.text)};
  }
`;

const HeaderDate = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-secondary-light);
`;

const HeaderCodear = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.75rem;
  font-weight: 100;
  white-space: nowrap;
  color: var(--color-text);

  a {
    margin-left: 0.625rem;
  }

  img {
    display: block;
  }
`;

const TimerSection = styled.section`
  display: none;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 5rem;
    display: block;
    text-align: center;
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 1.2rem;
    color: var(--color-text);
    text-transform: uppercase;

    p {
      letter-spacing: 0;
    }
  }
`;

const ActionsSection = styled.section`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 4rem;
  flex-direction: row;
  }
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 1rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    & + & {
      margin-top: 0;
      margin-left: 2.75rem;
    }
  }
`;

const ActionText = styled.p`
  margin: 0;
  padding: 0 1.25rem;
`;

const ActionDate = styled.p`
  margin-top: 0.625rem;
  margin-bottom: 0;
  text-align: center;
  text-transform: uppercase;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
`;

const Home = () => {
  const {
    trackClickedCodear,
  } = useAnalytics();

  return (
    <Container>
      <Head>
        <title>
          Córdoba WebConf 2020
        </title>
        <meta name="description" content={META.description} />
        <meta property="og:title" content={META.ogTitle} />
        <meta property="og:site_name" content={META.ogSiteName} />
        <meta property="og:description" content={META.ogDescription} />
        <meta property="og:url" content={META.ogUrl} />
        <meta property="og:locale" content={META.ogLocale} />
        <meta property="og:image" content={META.ogImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={META.twitterTitle} />
        <meta name="twitter:description" content={META.twitterDescription} />
        <meta name="twitter:site" content={META.twitterSite} />
        <meta name="twitter:creator" content={META.twitterCreator} />
      </Head>
      <Header>
        <HeaderLogo>
          <img src="/images/logos/webconf-vertical.svg" alt="Logo de WebConf" />
        </HeaderLogo>
        <HeaderInfo>
          <HeaderDate>
            29 y 30 de Mayo de 2020
          </HeaderDate>
          <img src="/images/logos/utn.svg" alt="Logo de la UTN" />
          <HeaderCodear>
            un evento de
            <a href="https://codear.org" title="CoDeAr" onClick={trackClickedCodear}>
              <img src="/images/logos/codear-small.svg" alt="Logo de CoDeAr" />
            </a>
          </HeaderCodear>
        </HeaderInfo>
      </Header>
      <TimerSection>
        Falta cada vez menos
        <EventCountdown />
      </TimerSection>
      <ActionsSection>
        <Action>
          <Link href="/cfp">
            <LilacButton href="/cfp" color="primary-light" shadow>
              <ActionText>
                Proponé tu Charla
              </ActionText>
            </LilacButton>
          </Link>
          <ActionDate>
            Hasta el 31/03
          </ActionDate>
        </Action>
        <Action>
          <Link href="/checkout">
            <LilacButton href="/checkout" color="accent" shadow>
              <ActionText>
                Comprá tu Pase
              </ActionText>
            </LilacButton>
          </Link>
          <ActionDate>
            Hasta el 01/05
          </ActionDate>
        </Action>
        <Action>
          <LilacButton href="/sponsorships" color="primary-light" shadow>
            <ActionText>
              Auspiciá el Evento
            </ActionText>
          </LilacButton>
          <ActionDate>
            Hasta el 12/04
          </ActionDate>
        </Action>
      </ActionsSection>
    </Container>
  );
};

export default Home;
