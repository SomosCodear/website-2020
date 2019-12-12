import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

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
`;

const HeaderContent = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(/images/header-lines-left.svg),
    url(/images/header-lines-right.svg);
  background-repeat: no-repeat;
  background-position: calc(50% - 475px) 192px, calc(50% + 475px) 192px;
`;

const HeaderIntro = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  font-size: 1.5rem;
  font-weight: 100;
  color: #FFF;

  img {
    display: inline-block;
    margin-right: 0.75rem;
  }
`;

const HeaderInfo = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
`;

const HeaderLocation = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;
  padding-left: 3rem;
  border-left: 1px solid ${transparentize(0.20, '#A70050')};

  img, span {
    display: block;
  }

  span {
    padding-bottom: 1rem;
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--color-secondary-light);
  }
`;

const HeaderTitle = styled.h1`
  margin: 4.5rem 0 0;
  font-size: 3.5rem;
  line-height: 4.625rem;
  color: var(--color-text);
  font-weight: 100;
  max-width: 48rem;
  text-align: center;
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
  }
`;

const Process = styled.div`
  margin: 6.25rem 0 5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProcessTitle = styled.h2`
  margin: 0 0 5rem 0;
  font-size: 4.5rem;
  font-weight: 100;
  color: var(--color-secondary);
  text-align: center;
`;

const ProcessList = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  list-style: none;
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
    margin-left: 3.5rem;
  }
`;

const InformationBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 75px 0 103px 0;
  background-color: var(--color-primary);

  ${({ alternativeBackground }) => alternativeBackground && css`
    background-color: var(--color-primary-light);
  `}
`;

const InformationBlockCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  max-width: 120rem;
`;

const InformationBlockTitleContainer = styled.div`
  border-right: 1px solid rgba(255, 255, 255, .5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  padding: 0 3.375rem;
`;

const InformationBlockTitle = styled.h2`
  width: 32.75rem;
  margin: 0;
  color: var(--color-text);
  font-size: 4.5rem;
  line-height: 6rem;
  font-weight: 100;
  text-align: right;
`;

const InformationBlockSubtitle = styled.h3`
  margin: 0;
  margin-top: 1rem;
  color: var(--color-text);
  font-size: 2.25rem;
  line-height: 3rem;
  text-align: right;
`;

const InformationBlockContent = styled.div`
  max-width: 48.75rem;
  padding: 0 38px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`;

const InformationBlockText = styled.p`
  font-family: Source Sans Pro;
  color: var(--color-text);
  font-size: 1.5rem;
  line-height: 2rem;
`;

const InformationBlockItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
`;

const InformationBlockItem = styled.li`
  display: flex;
  flex-direction: row;
  font-family: Source Sans Pro;

  & + & {
    margin-left: 2.5rem;
  }
`;

const InformationBlockItemText = styled.div`
  padding-left: 1.375rem;
  color: var(--color-text);

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
    margin-top: 0.5rem;
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.375rem;
  }
`;

const Requirements = styled.div`
  align-self: center;
  margin: 8rem 6rem;
  max-width: 94rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const RequirementsTitle = styled.h2`
  margin: 0;
  text-align: center;
  color: var(--color-primary);
  font-size: 4.5rem;
  font-weight: 100;
`;

const RequirementsSubtitle = styled.h2`
  font-family: Source Sans Pro;
  position: relative;
  margin: 6rem 0 0;
  padding-top: 6rem;
  text-align: center;
  color: var(--color-secondary);
  font-size: 4.5rem;
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
`;

const RequirementsItems = styled.ul`
  list-style: none;
  margin: 6rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 6rem;
  grid-row-gap: 3rem;
`;

const RequirementsItem = styled.li`
  font-family: Source Sans Pro;
  display: flex;
  flex-direction: row;
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
  margin-left: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  strong {
    color: var(--color-secondary);
    font-size: 2.25rem;

    ${({ alternative }) => alternative && css`
      color: var(--color-primary)};
    `}
  }

  p {
    margin: 0;
    color: var(--color-primary);
    font-size: 1.5rem;
    line-height: 2rem;
  }
`;

const CTABig = styled.span`
  font-size: 2.75rem;
`;

const Quotes = styled.ul`
  align-self: center;
  width: 100%;
  max-width: 90rem;
  margin: 0 6rem;
  padding: 0;
  list-style: none;
`;

const Quote = styled.li`
  position: relative;
  padding: 5.5rem 0;

  &:nth-child(even) {
    text-align: right;

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
  }
`;

const QuoteTitle = styled.h3`
  margin: 0;
  color: var(--color-secondary);
  font-size: 4.5rem;
  font-weight: 100;
`;

const QuoteDescription = styled.p`
  margin: 1.5rem 0 0;
  color: var(--color-primary);
  font-size: 3rem;

  a {
    color: var(--color-primary);
    font-weight: bold;
    text-decoration: none;
  }
`;

const Footer = styled.footer`
  padding: 4rem 6rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: url(/images/backgrounds/footer.png);
  background-repeat: no-repeat;
  background-size: cover;
`;

const FooterContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 120rem;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FooterSocialLinks = styled.div`
  width: 146px;
  position: absolute;
  left: 50%;
  margin-left: -73px;
`;

const FooterSocialLink = styled.a`
  display: inline-block;
  &:first-child {
    margin-right: 35px;
  }
`;

const FooterLogoContainer = styled.div`
`;

const FooterSocialSpacer = styled.div`
  width: 156px;
`;

const FooterInfo = styled.p`
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  font-size: 32px;
  color: #FFFFFF;
  img {
    margin-left: 10px;
  }
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
      <Header>
        <HeaderContent>
          <HeaderIntro>
            <img src="/images/logos/codear-small.svg" alt="Logo de CoDeAr" />
            te invita a sumarte a
          </HeaderIntro>
          <HeaderInfo>
            <img src="/images/logos/webconf-vertical.svg" alt="Logo de WebConf" />
            <HeaderLocation>
              <span>29 y 30 de Mayo de 2020</span>
              <img src="/images/logos/utn.svg" alt="Logo de la UTN" />
            </HeaderLocation>
          </HeaderInfo>
          <HeaderTitle>¡Abrimos nuestra convocatoria para disertantes!</HeaderTitle>
          <HeaderCTA>
            <lilac-button href="/form">
              Quiero participar
            </lilac-button>
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
        <InformationBlockCenter>
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
              usuario, pasando por todo lo relacionado a programación (HTML, CSS, JavaScript, etc.)
              y otros aspectos transversales que afectan a todas las otras áreas, como es el caso
              con accesibilidad y localización.
            </InformationBlockText>
          </InformationBlockContent>
        </InformationBlockCenter>
      </InformationBlock>
      <InformationBlock alternativeBackground>
        <InformationBlockCenter>
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
                  <strong>40min.</strong>
                  <span>Charla estándar</span>
                  <p>Permite un desarrollo extenso del contenido.</p>
                </InformationBlockItemText>
              </InformationBlockItem>
            </InformationBlockItems>
          </InformationBlockContent>
        </InformationBlockCenter>
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
        <RequirementsSubtitle>
          { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
          ¿Qué <strong>no</strong> queremos en una propuesta?
        </RequirementsSubtitle>
        <RequirementsItems short>
          <RequirementsItem key="no-advertising">
            <img src="/images/icons/icon-no-advertising.svg" alt="Icono de publicidad" aria-hidden="true" />
            <RequirementsItemText alternative>
              <strong>Publicidad</strong>
              <p>
                Existen otras alternativas para publicitar tu empresa y/o producto
                como por ejemplo, auspiciando el evento).
              </p>
            </RequirementsItemText>
          </RequirementsItem>
          <RequirementsItem key="language">
            <img src="/images/icons/icon-no-evangelization.svg" alt="Icono de evangelizacion" aria-hidden="true" />
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
        <InformationBlockCenter>
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
            <lilac-button href="/form">
              <CTABig>
                Quiero participar
              </CTABig>
            </lilac-button>
          </InformationBlockContent>
        </InformationBlockCenter>
      </InformationBlock>
      <Quotes>
        <Quote>
          <QuoteTitle>
            ¿Preguntas?
          </QuoteTitle>
          <QuoteDescription>
            { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
            Escribinos a <a href="mailto:contenido@webconf.tech">contenido@webconf.tech</a>
          </QuoteDescription>
        </Quote>
        <Quote>
          <QuoteTitle>
            ¿Te interesaría auspiciarnos?
          </QuoteTitle>
          <QuoteDescription>
            { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
            Escribinos a <a href="mailto:hola@codear.org">hola@codear.org</a>
          </QuoteDescription>
        </Quote>
      </Quotes>
      <Footer>
        <FooterContent>
          <FooterSocialLinks>
            <FooterSocialLink
              href="https://instagram.com/webconfcba"
              title="Link al Instagram de WebConf"
              target="_blank"
            >
              <img src="/images/icons/icon-instagram.svg" alt="Icono de Instagram" />
            </FooterSocialLink>
            <FooterSocialLink
              href="https://twitter.com/WebConfCBA"
              title="Link al Twitter de WebConf"
              target="_blank"
            >
              <img src="/images/icons/icon-twitter.svg" alt="Icono de Twitter" />
            </FooterSocialLink>
          </FooterSocialLinks>
          <FooterLogoContainer>
            <img src="/images/logos/webconf-horizontal.svg" alt="Logo de WebConf" />
          </FooterLogoContainer>
          <FooterSocialSpacer />
          <FooterInfo>
            un evento de
            <img src="/images/logos/codear-small.svg" alt="Logo de CoDeAr" />
          </FooterInfo>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default Home;
