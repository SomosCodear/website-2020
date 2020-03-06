import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../style/constants';
import { META } from '../../data/constants';
import { useAnalytics } from '../../utils/analytics';

const Container = styled.main`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background-image: url(/images/backgrounds/header.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media (min-width: ${BREAKPOINTS.hd}) {
    height: 100%;
  }
`;

const ContainerLines = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    background-image: url(/images/header-lines-left.svg),
      url(/images/header-lines-right.svg);
    background-repeat: no-repeat;
    background-position: calc(50% - 475px) 192px, calc(50% + 475px) 192px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.25rem;
  width: 100%;
  min-width: 20.75rem;
  box-sizing: border-box;
  @media (min-width: ${BREAKPOINTS.hd}) {
    height: 100%;
    flex-direction: row;
    width: 100%;
    max-width: 105.625rem;
    padding: 4.375rem 5rem 1.875rem 5rem;
  }
`;

const Header = styled.header`
  width: 17rem;
  @media (min-width: ${BREAKPOINTS.hd}) {
    min-width: 19.5rem;
    padding-right: 8.625rem;
  }
`;

const HeaderLogo = styled.div`
  cursor: pointer;

  img {
    max-width: 100%;
  }
  @media (min-width: ${BREAKPOINTS.hd}) {
    img {
      width: 100%;
    }
  }
`;

const HeaderInfo = styled.div`
  margin-top: 1.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    display: block;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 2.5rem;
    align-self: stretch;
    margin-top: 0;
  }
`;

const HeaderDate = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-secondary-light);
  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 1.72rem;
    margin-top: 3.5625rem;
  }
`;

const HeaderCodear = styled.div`
  margin-top: 1.875rem;
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

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 3.5625rem;
  }
`;

const Logo = styled.img`
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'block')};
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'block')};
  }
`;

const Content = styled.div`
  width: 100%;
  @media (min-width: ${BREAKPOINTS.hd}) {
    height: 100%;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
  }
`;

export const CheckoutLayout = ({ children }) => {
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
      <ContainerLines>
        <Section>
          <Header>
            <Link href="/">
              <HeaderLogo>
                <Logo
                  hideOnMobile
                  src="/images/logos/webconf-vertical.svg"
                  alt="Logo de WebConf"
                />
                <Logo
                  hideOnDesktop
                  src="/images/logos/webconf-horizontal.svg"
                  alt="Logo de WebConf"
                />
              </HeaderLogo>
            </Link>
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
          <Content>
            {children}
          </Content>
        </Section>
      </ContainerLines>
    </Container>
  );
};

CheckoutLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
