import React from 'react';
import Head from 'next/head';
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
  background-attachment: fixed;

  @media (min-width: ${BREAKPOINTS.hd}) {
    background-image: url(/images/backgrounds/home-background.jpg);
    background-position: left center;
    background-size: auto;
  }

  div + & {
    padding-top: 5rem;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;

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
  justify-content: center;

  a {
    margin-left: 0.625rem;
  }

  img {
    display: block;
  }
`;

const TimerSection = styled.section`
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

const Alert = styled.div`
  a {
    display: block;
    background-color: var(--color-accent);
    padding: 0.5rem;
    padding-left: 0;
    color: var(--color-text);
    text-align: center;
    width: 100%;
    text-decoration: none;
    font-size: 0.85rem;
    transition: background-color, color, 100ms linear;
  }

  a:hover {
    background-color: var(--color-text);
    color: var(--color-accent);
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    a {
      font-size: 3rem;
    }
  }
`;

const Letter = styled.article`
  background: rgba(0, 0, 0, 0.6);
  color: var(--color-text);
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.75rem;
  box-sizing: border-box;
  padding: 2rem;
  text-align: center;
  margin-top: 5rem;

  a, h1 {
    color: var(--color-accent);
  }

  h1 {
    margin-top: 5rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 1.5rem;
    line-height: 2.5rem;
    padding: 5rem 10rem;
  }
`;

const FooterSocialLinks = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    width: 50%;
    margin: 0 auto;
  }
`;

const FooterSocialLink = styled.a`
  padding: 1rem;

  img {
    width: 2rem;
    height: 2rem;
  }
`;

const Home = () => {
  const {
    trackClickedCodear,
  } = useAnalytics();

  return [
    <Container>
      <Head>
        <title>
          Córdoba WebConf 2021
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
      <TimerSection>
        <EventCountdown />
      </TimerSection>
      <Letter>
        <HeaderLogo>
          <img src="/images/logos/webconf-2021.svg" alt="Logo de WebConf" />
        </HeaderLogo>
        <HeaderCodear>
          un evento de
          <a href="https://codear.org" title="CoDeAr" onClick={trackClickedCodear}>
            <img src="/images/logos/codear-small.svg" alt="Logo de CoDeAr" />
          </a>
        </HeaderCodear>
        <h1>Sobre WebConf 2020</h1>
        <p>
          Conforme a la
          {' '}
          <a href="https://codear.org/comunicaciones" target="_blank">comunicación oficial</a>
          {' '}
          de la Comunidad
          de Desarrolladores de Argentina, lamentamos informar que la edición 2020 de WebConf
          {' '}
          <strong>no se llevará a cabo</strong>
          .
          Fue una decisión difícil de tomar, pero todas las personas que formamos el
          equipo de WebConf estamos de acuerdo en que es lo mejor que podemos hacer, dadas las circunstancias
          y la realidad que nos toca vivir.
        </p>
        <p>
          En los próximos días, nos comunicaremos con aquellas personas que dedicaron tiempo y
          esfuerzo a elaborar las postulaciones para nuestra conferencia, para conversar sobre nuevas oportunidades de presentación que estamos trabajando desde la Asociación. Queremos agradecer a esas personas que apostaron a presentar sus ideas en WebConf, por todo el trabajo y la paciencia que han dedicado durante estos meses a trabajar con nosotros, y queremos asegurarles que haremos nuestro mejor esfuerzo en hallar nuevas maneras de ayudarnos mutuamente a dar a conocer sus ideas.

        </p>
        <p>Decidimos no eliminar la cuenta regresiva, con la intención de dejar un mensaje: quizá haya que esperar un poco más, pero WebConf va a volver. Y cuando eso pase, será un evento aún más maravilloso de lo que habíamos planeado.</p>
        <p>Gracias a todas las personas que nos acompañan desde la edición de 2019 y a quienes conocimos este año.</p>
        <p>Todo pasa, y esto también pasará. ¡Hasta que nos reencontremos!</p>

        <h1>Mientras tanto...</h1>
        <p>Te invitamos a seguir el resto de las actividades de CoDeAr en nuestras redes.</p>
        <FooterSocialLinks>
          <FooterSocialLink
            href="https://fb.me/SomosCodear/"
            title="Seguinos en Facebook"
            target="_blank"
          >
            <img src="/images/icons/icon-facebook.svg" alt="Icono de Facebook" />
          </FooterSocialLink>
          <FooterSocialLink
            href="https://www.instagram.com/SomosCodear/"
            title="Seguinos en Instagram"
            target="_blank"
          >
            <img src="/images/icons/icon-instagram.svg" alt="Icono de Instagram" />
          </FooterSocialLink>
          <FooterSocialLink
            href="https://twitter.com/SomosCodear"
            title="Seguinos en Twitter"
            target="_blank"
          >
            <img src="/images/icons/icon-twitter.svg" alt="Icono de Twitter" />
          </FooterSocialLink>
          <FooterSocialLink
            href="https://linkedin.com/company/codear/"
            title="Seguinos en LinkedIn"
            target="_blank"
          >
            <img src="/images/icons/icon-linkedin.svg" alt="Icono de LinkedIn" />
          </FooterSocialLink>
        </FooterSocialLinks>
      </Letter>
    </Container>,
  ];
};

export default Home;
