import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { transparentize } from 'polished';
import styled, { css } from 'styled-components';
import { META } from '../data/constants';
import { BREAKPOINTS } from '../style/constants';
import { useAnalytics } from '../utils/analytics';
import { LilacButton } from '../components/LilacButton';
import { WordCloud } from '../components/WordCloud';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.header`
  background-image: url(/images/backgrounds/header.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
`;

const AbsoluteWordCloud = styled(WordCloud)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
`;

const HeaderContent = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 100;
  background-image: url(/images/header-lines-left.svg),
    url(/images/header-lines-right.svg);
  background-repeat: no-repeat;
  background-position: calc(50% - 475px) 192px, calc(50% + 475px) 192px;

  @media (min-width: ${BREAKPOINTS.hd}) {
    padding: 5rem;
  }
`;

const HeaderIntro = styled.p`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  font-size: 1.5rem;
  font-weight: 100;
  color: #FFF;

  a {
    margin-right: 0.75rem;
  }

  img {
    display: block;
  }
`;

const HeaderInfo = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;

  @media (min-width: ${BREAKPOINTS.hd}) {
    flex-direction: row;
  }
`;

const HeaderLogo = styled.div`
  margin: 0 4rem;

  img {
    width: 100%;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 0;
  }
`;

const HeaderLocation = styled.p`
  margin: 2.5rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img, span {
    display: block;
  }

  span {
    padding-bottom: 1rem;
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--color-secondary-light);
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 0 0 0 3rem;
    padding-left: 3rem;
    border-left: 1px solid ${transparentize(0.20, '#A70050')};
  }
`;

const HeaderTitle = styled.h1`
  margin: 3.5rem 0 0;
  font-size: 2.25rem;
  color: var(--color-text);
  font-weight: 100;
  text-align: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 4.5rem 0 0;
    font-size: 3.5rem;
    line-height: 4.625rem;
    max-width: 48rem;
  }
`;

const HeaderCTA = styled.p`
  margin: 2rem 0 0;
  display: flex;
  flex-direction: column;

  a {
    display: inline-block;
  }

  img {
    display: block;
    margin-top: 2rem;
    height: 1.5rem;
  }
`;

const Process = styled.div`
  margin: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 6.25rem 0 5rem 0;
  }
`;

const ProcessTitle = styled.h2`
  margin: 0 0 5rem 0;
  font-size: 2.5rem;
  font-weight: 100;
  color: var(--color-secondary);
  text-align: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 4.5rem;
  }
`;

const ProcessList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: ${BREAKPOINTS.hd}) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const ProcessItem = styled.li`
  width: 20rem;
  text-align: center;
  font-family: Source Sans Pro;

  p {
    color: var(--color-primary);
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: bold;
  }

  & + & {
    margin-top: 3rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    & + & {
      margin-top: 0;
      margin-left: 3.5rem;
    }
  }
`;

const InformationBlock = styled.div`
  padding: 4.5rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-primary);

  ${({ alternativeBackground }) => alternativeBackground && css`
    background-color: var(--color-primary-light);
  `}

  @media (min-width: ${BREAKPOINTS.hd}) {
    padding: 75px 0 103px 0;
    flex-direction: row;
    justify-content: center;
  }
`;

const InformationBlockTitleContainer = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: flex;
    padding: 0 3.375rem;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    border-right: 1px solid rgba(255, 255, 255, .5);
  }
`;

const InformationBlockTitle = styled.h2`
  margin: 0;
  color: var(--color-text);
  font-size: 2.5rem;
  text-align: center;
  font-weight: 100;

  @media (min-width: ${BREAKPOINTS.hd}) {
    width: 32.75rem;
    font-size: 4.5rem;
    line-height: 6rem;
    text-align: right;
  }
`;

const InformationBlockSubtitle = styled.h3`
  font-family: Source Sans Pro;
  font-weight: 300;
  font-size: 1.5rem;
  color: var(--color-text);
  text-align: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 0;
    margin-top: 1rem;
    font-size: 2.25rem;
    text-align: right;
  }
`;

const InformationBlockContent = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    max-width: 48.75rem;
    padding: 0 38px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
  }
`;

const InformationBlockText = styled.p`
  font-family: Source Sans Pro;
  color: var(--color-text);
  font-size: 1.5rem;
  text-align: center;

  @media (min-width: ${BREAKPOINTS.hd}) {
    text-align: left;
  }
`;

const InformationBlockItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  @media (min-width: ${BREAKPOINTS.hd}) {
    flex-direction: row;
  }
`;

const InformationBlockItem = styled.li`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  font-family: Source Sans Pro;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 0;
    flex-direction: row;
    text-align: left;

    & + & {
      margin-left: 2.5rem;
    }
  }
`;

const InformationBlockItemText = styled.div`
  margin-top: 2rem;
  color: var(--color-text);
  text-align: center;
  max-width: 11.25rem;

  strong, span {
    display: block;
  }

  strong {
    font-size: 2.25rem;
    line-height: 2.25rem;
  }

  span {
    font-size: 1.5rem;
    opacity: .54;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 1.125rem;
    line-height: 1.375rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 0;
    margin-left: 1.375rem;
    text-align: left;
  }
`;

const Requirements = styled.div`
  margin: 4rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (min-width: ${BREAKPOINTS.hd}) {
    max-width: 94rem;
    margin: 8rem 6rem;
    align-self: center;
  }
`;

const RequirementsTitle = styled.h2`
  margin: 0;
  font-size: 2.5rem;
  text-align: center;
  color: var(--color-primary);
  font-weight: 100;

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 4.5rem;
  }
`;

const RequirementsSubtitle = styled.h2`
  margin: 4rem 0 0;
  padding-top: 4rem;
  position: relative;
  font-family: Source Sans Pro;
  font-size: 2.5rem;
  text-align: center;
  color: var(--color-secondary);
  font-weight: normal;

  &::before {
    content: '';
    position: absolute;
    width: 18.75rem;
    margin-left: -9.375rem;
    left: 50%;
    top: 0;
    height: 0.625rem;
    border-top: 1px solid var(--color-primary);
    opacity: .5;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 6rem 0 0;
    padding-top: 6rem;
    font-size: 4.5rem;
  }
`;

const RequirementsItems = styled.ul`
  margin: 3.5rem 0 0;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin: 6rem 0 0;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 6rem;
    grid-row-gap: 3rem;
  }
`;

const RequirementsItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Source Sans Pro;

  @media (min-width: ${BREAKPOINTS.hd}) {
    flex-direction: row;
  }
`;

const RequirementsItemIcon = styled.div`
  width: 10rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RequirementsItemText = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  strong {
    color: var(--color-secondary);
    font-size: 2.25rem;

    ${({ alternative }) => alternative && css`
      color: var(--color-primary)};
    `}
  }

  p {
    margin: 0.75rem 0 0;
    color: var(--color-primary);
    font-size: 1.5rem;
    line-height: 2rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-top: 0;
    margin-left: 4rem;
    text-align: left;
  }
`;

const RequirementsNote = styled.div`
  text-align: center;
  color: var(--color-gray);
  font-size: 2rem;
  margin-top: 6rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }

  a {
    text-decoration: none;
    font-weight: 700;
    color: var(--color-secondary);
  }

  a:hover {
    color: var(--color-accent);
  }
`;

const Quotes = styled.ul`
  margin: 4rem;
  padding: 0;
  list-style: none;

  @media (min-width: ${BREAKPOINTS.hd}) {
    align-self: center;
    width: 100%;
    max-width: 90rem;
    margin: 0 6rem;
  }
`;

const Quote = styled.li`
  text-align: center;

  &:nth-child(even) {
    margin-top: 2.5rem;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    position: relative;
    padding: 5.5rem 0;

    &:nth-child(even) {

      &::before {
        width: 18.75rem;
        height: 0.625rem;
        margin-top: 0;
        margin-left: -9.375rem;
        position: absolute;
        left: 50%;
        top: 0;
        content: '';
        border-top: 1px solid var(--color-primary);
        opacity: .5;
      }
    }
  }
`;

const QuoteTitle = styled.h3`
  margin: 0;
  color: var(--color-secondary);
  font-size: 2.5rem;
  font-weight: 100;

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 4.5rem;
  }
`;

const QuoteDescription = styled.p`
  margin: 1.5rem 0 0;
  color: var(--color-primary);
  font-size: 1.5rem;

  a {
    color: var(--color-primary);
    font-weight: bold;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 3rem;
  }
`;

const Footer = styled.footer`
  padding: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: url(/images/backgrounds/footer.png);
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: ${BREAKPOINTS.hd}) {
    padding: 4rem 6rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  grid-row-gap: 3rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    width: 100%;
    max-width: 120rem;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
  }
`;

const FooterSocialLinks = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    grid-column: 2;
  }
`;

const FooterSocialLink = styled.a`
  display: inline-block;
  &:first-child {
    margin-right: 35px;
  }
`;

const FooterLogoContainer = styled.div`
  img {
    width: 100%;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    grid-column: 1;
    grid-row: 1;
    justify-self: flex-start;
  }
`;

const FooterInfo = styled.p`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 100;
  white-space: nowrap;
  color: #FFFFFF;

  a {
    margin-left: 0.625rem;
  }

  img {
    display: block;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    justify-self: flex-end;
    font-size: 2rem;
  }
`;

const Home = () => {
  const {
    trackClickedCoC,
    trackClickedCodear,
    trackClickedInstagram,
    trackClickedTwitter,
    trackClickedParticipateAboveTheFold,
    trackClickedParticipateBelowTheFold,
  } = useAnalytics();
  const [showWordCloud, setShowWordCloud] = useState(false);
  useEffect(() => setShowWordCloud(true), []);

  return (
    <Container>
      <Head>
        <title>
          Córdoba WebConf 2020
          | ¡Estamos buscando disertantes!
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
        {showWordCloud ? (
          <AbsoluteWordCloud />
        ) : null}
        <HeaderContent>
          <HeaderIntro>
            <a href="https://codear.org" title="CoDeAr">
              <img src="/images/logos/codear-small.svg" alt="Logo de CoDeAr" />
            </a>
            te invita a sumarte a
          </HeaderIntro>
          <HeaderInfo>
            <HeaderLogo>
              <img src="/images/logos/webconf-vertical.svg" alt="Logo de WebConf" />
            </HeaderLogo>
            <HeaderLocation>
              <span>29 y 30 de Mayo de 2020</span>
              <img src="/images/logos/utn.svg" alt="Logo de la UTN" />
            </HeaderLocation>
          </HeaderInfo>
          <HeaderTitle>¡Abrimos nuestra convocatoria para disertantes!</HeaderTitle>
          <HeaderCTA>
            <LilacButton href="/cfp" shadow onClick={trackClickedParticipateAboveTheFold}>
              Quiero participar
            </LilacButton>
            <img src="/images/chevron-down.svg" alt="" aria-hidden="true" />
          </HeaderCTA>
        </HeaderContent>
      </Header>
      <Process>
        <ProcessTitle>¿En qué consiste el proceso?</ProcessTitle>
        <ProcessList>
          <ProcessItem key="send">
            <img src="/images/icons/icon-send.svg" alt="Icono de enviar" aria-hidden="true" />
            <p>Enviá tu propuesta.</p>
          </ProcessItem>
          <ProcessItem key="evaluation">
            <img
              src="/images/icons/icon-questionnaire.svg"
              alt="Icono de evaluación"
              aria-hidden="true"
            />
            <p>
              Nuestro comité de revisión evalúa tu propuesta en base a una serie de lineamientos.
            </p>
          </ProcessItem>
          <ProcessItem key="chat">
            <img src="/images/icons/icon-chat.svg" alt="Icono de chat" aria-hidden="true" />
            <p>
              Mantenemos un diálogo fluido para detectar fortalezas y oportunidades de mejora en
              tu propuesta.
            </p>
          </ProcessItem>
          <ProcessItem key="results">
            <img src="/images/icons/icon-diploma.svg" alt="Icono de diploma" aria-hidden="true" />
            <p>Te informamos el resultado de tu propuesta.</p>
          </ProcessItem>
        </ProcessList>
      </Process>
      <InformationBlock>
        <InformationBlockTitleContainer>
          <InformationBlockTitle>
            ¿Qué temáticas podés proponer?
          </InformationBlockTitle>
        </InformationBlockTitleContainer>
        <InformationBlockContent>
          <InformationBlockText>
            Cualquier temática que toque de alguna forma al desarrollo de la Web es viable a ser
            parte de una edición de WebConf, desde el proceso de ideación de un producto
            orientado a la Web hasta su implementación desde la perspectiva de la experiencia de
            usuario, pasando por todo lo relacionado a programación y otros aspectos transversales
            que afectan a todas las otras áreas, como es el caso con accesibilidad y localización.
          </InformationBlockText>
        </InformationBlockContent>
      </InformationBlock>
      <InformationBlock alternativeBackground>
        <InformationBlockTitleContainer>
          <InformationBlockTitle>
            ¿Cuánto tiempo dura una charla?
          </InformationBlockTitle>
        </InformationBlockTitleContainer>
        <InformationBlockContent>
          <InformationBlockItems>
            <InformationBlockItem key="lightning">
              <img src="/images/icons/icon-lightning.svg" alt="Icono de relámpago" aria-hidden="true" />
              <InformationBlockItemText>
                <strong>10min.</strong>
                <span>Charla relámpago</span>
                <p>Ideal para presentar un único concepto.</p>
              </InformationBlockItemText>
            </InformationBlockItem>
            <InformationBlockItem key="standard">
              <img src="/images/icons/icon-time.svg" alt="Icono de reljo" aria-hidden="true" />
              <InformationBlockItemText>
                <strong>30min.</strong>
                <span>Charla estándar</span>
                <p>Permite un desarrollo extenso del contenido.</p>
              </InformationBlockItemText>
            </InformationBlockItem>
          </InformationBlockItems>
        </InformationBlockContent>
      </InformationBlock>
      <Requirements>
        <RequirementsTitle>
          ¿Qué buscamos en una propuesta?
        </RequirementsTitle>
        <RequirementsItems>
          <RequirementsItem key="concepts">
            <RequirementsItemIcon>
              <img src="/images/icons/icon-target.svg" alt="Icono de objetivo" aria-hidden="true" />
            </RequirementsItemIcon>
            <RequirementsItemText>
              <strong>Foco en conceptos</strong>
              <p>
                Queremos que vayas más allá de librerías o frameworks específicos,
                para que toda la audiencia pueda aprovechar el contenido.
              </p>
            </RequirementsItemText>
          </RequirementsItem>
          <RequirementsItem key="tech">
            <RequirementsItemIcon>
              <img src="/images/icons/icon-people.svg" alt="Icono de personas" aria-hidden="true" />
            </RequirementsItemIcon>
            <RequirementsItemText>
              <strong>Tecnología y personas</strong>
              <p>
                Nos interesa que indagues tanto en lo técnico como lo humano, como
                inclusión, diversidad, impacto social, entre otros.
              </p>
            </RequirementsItemText>
          </RequirementsItem>
          <RequirementsItem key="language">
            <RequirementsItemIcon>
              <img src="/images/icons/icon-spanish.svg" alt="Icono de eñe" aria-hidden="true" />
            </RequirementsItemIcon>
            <RequirementsItemText>
              <strong>Contenido en español</strong>
              <p>
                Preferimos que tu contenido esté presentado en español, para que sea
                accesible al público hispanohablante en general.
              </p>
            </RequirementsItemText>
          </RequirementsItem>
          <RequirementsItem key="people">
            <RequirementsItemIcon>
              <img src="/images/icons/icon-wave.svg" alt="Icono de saludo" aria-hidden="true" />
            </RequirementsItemIcon>
            <RequirementsItemText>
              <strong>Nuevas voces</strong>
              <p>
                Queremos dar espacios y apoyo a personas que no hayan tenido la
                experiencia de disertar en otros eventos, para que la comunidad crezca.
              </p>
            </RequirementsItemText>
          </RequirementsItem>
        </RequirementsItems>
        <RequirementsNote>
          Participar de WebConf 2020 implica la aceptación y cumplimiento de nuestro
          {' '}
          <a href="https://codear.org/coc" target="_blank" rel="noopener noreferrer" onClick={trackClickedCoC}>
            Código de Conducta
          </a>
          .
        </RequirementsNote>
        <RequirementsSubtitle>
          { /* eslint-disable-next-line react/jsx-one-expression-per-line */}
          ¿Qué <strong>no</strong> queremos en una propuesta?
        </RequirementsSubtitle>
        <RequirementsItems short>
          <RequirementsItem key="no-advertising">
            <RequirementsItemIcon>
              <img src="/images/icons/icon-no-advertising.svg" alt="Icono de publicidad" aria-hidden="true" />
            </RequirementsItemIcon>
            <RequirementsItemText alternative>
              <strong>Publicidad</strong>
              <p>
                Existen otras alternativas para publicitar tu empresa y/o producto
                como por ejemplo, auspiciando el evento.
              </p>
            </RequirementsItemText>
          </RequirementsItem>
          <RequirementsItem key="language">
            <RequirementsItemIcon>
              <img
                src="/images/icons/icon-no-evangelization.svg"
                alt="Icono de evangelizacion"
                aria-hidden="true"
              />
            </RequirementsItemIcon>
            <RequirementsItemText alternative>
              <strong>Evangelización</strong>
              <p>
                WebConf no es una plataforma para evangelización religiosa ni
                propaganda política.
              </p>
            </RequirementsItemText>
          </RequirementsItem>
        </RequirementsItems>
      </Requirements>
      <InformationBlock>
        <InformationBlockTitleContainer>
          <InformationBlockTitle>
            ¿Te animás?
          </InformationBlockTitle>
          <InformationBlockSubtitle>
            Tenés tiempo hasta
            <br />
            el 31 de Marzo de 2020.
          </InformationBlockSubtitle>
        </InformationBlockTitleContainer>
        <InformationBlockContent>
          <LilacButton href="/cfp" secondary shadow big onClick={trackClickedParticipateBelowTheFold}>
            Quiero participar
          </LilacButton>
        </InformationBlockContent>
      </InformationBlock>
      <Quotes>
        <Quote>
          <QuoteTitle>
            ¿Preguntas?
          </QuoteTitle>
          <QuoteDescription>
            { /* eslint-disable-next-line react/jsx-one-expression-per-line */}
            Escribinos a <a href="mailto:contenido@webconf.tech">contenido@webconf.tech</a>
          </QuoteDescription>
        </Quote>
        <Quote>
          <QuoteTitle>
            ¿Te interesaría auspiciarnos?
          </QuoteTitle>
          <QuoteDescription>
            { /* eslint-disable-next-line react/jsx-one-expression-per-line */}
            Informate con nuestro <a href="/sponsorships">Prospecto para Auspicios</a>
          </QuoteDescription>
        </Quote>
      </Quotes>
      <Footer>
        <FooterContent>
          <FooterSocialLinks>
            <FooterSocialLink
              href="https://www.instagram.com/WebConfAr/"
              title="Link al Instagram de WebConf"
              target="_blank"
              onClick={trackClickedInstagram}
            >
              <img src="/images/icons/icon-instagram.svg" alt="Icono de Instagram" />
            </FooterSocialLink>
            <FooterSocialLink
              href="https://twitter.com/WebConfAr"
              title="Link al Twitter de WebConf"
              target="_blank"
              onClick={trackClickedTwitter}
            >
              <img src="/images/icons/icon-twitter.svg" alt="Icono de Twitter" />
            </FooterSocialLink>
          </FooterSocialLinks>
          <FooterLogoContainer>
            <img src="/images/logos/webconf-horizontal.svg" alt="Logo de WebConf" />
          </FooterLogoContainer>
          <FooterInfo>
            un evento de
            <a href="https://codear.org" title="CoDeAr" onClick={trackClickedCodear}>
              <img src="/images/logos/codear-small.svg" alt="Logo de CoDeAr" />
            </a>
          </FooterInfo>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default Home;
