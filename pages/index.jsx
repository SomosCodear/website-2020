import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const LandingSection = styled.section`
  height: 100vh;
  box-sizing: border-box;
`;

const Header = styled.header`
  background-image: url(/images/backgrounds/header.png);
  background-repeat: no-repeat;
  background-position: left center;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(/images/header-lines-left.svg), url(/images/header-lines-right.svg);
  background-repeat: no-repeat;
  background-position: left center, right center;
`;

const HeaderIntro = styled.p`
  margin: 0;
  padding: 94px 0 65px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  font-size: 24px;
  color: #FFF;
  img {
    display: inline-block;
    margin-right: 12px;
  }
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderLocation = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 58px;
  padding: 0 0 0 49px;
  border-left: 1px solid #A70050;
  img, span {
    display: block;
  }
  span {
    padding-bottom: 15px;
    font-size: 28px;
    font-weight: bold;
    color: #C05774;
  }
`;

const HeaderTitle = styled.h1`
  margin: 75px 0 30px 0;
  font-size: 56px;
  color: #FFFFFF;
  max-width: 770px;
  font-weight: normal;
  text-align: center;
`;

const HeaderCTA = styled.p`
  display: flex;
  flex-direction: column;
  a {
    display: inline-block;
  }
  img {
    display: block;
    margin: 34px 0 118px 0;
  }
`;

const Process = styled.div`
  padding: 100px 0 83px 0;
  max-width: 1230px;
`;
const ProcessTitle = styled.h2`
  margin: 0 0 80px 0;
  font-size: 72px;
  font-weight: 500;
  color: #A70050;
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
  padding: 0 28px;
  max-width: 320px;
  text-align: center;
  p {
    color: #272D5B;
    font-size: 24px;
    line-height: 31px;
  }
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }
`;
const InformationBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 75px 0 103px 0;
  background-color: #272D5B;
  ${({ alternativeBackground }) => alternativeBackground && css`
    background-color: #3C467E;
  `}
`;

const InformationBlockTitleContainer = styled.div`
  border-right: 1px solid rgba(255, 255, 255, .5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const InformationBlockTitle = styled.h2`
  margin: 0;
  padding: 0 54px;
  color: #FFFFFF;
  font-size: 72px;
  font-weight: normal;
`;
const InformationBlockSubtitle = styled.h3`
  margin: 0;
  padding-top: 14px;
  color: #FFFFFF;
  font-size: 36px;
  line-height: 48px;
`;
const InformationBlockContent = styled.div`
  padding: 0 38px;
  flex-grow: 1;
  box-sizing: border-box;
`;
const InformationBlockText = styled.p`
  color: #FFF;
  font-size: 24px;
  line-height: 36px;
  font-weight: normal;
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
`;
const InformationBlockItemText = styled.div`
  padding-left: 22px;
  color: #FFFFFF;
  strong, span {
    display: block;
  }
  strong {
    font-size: 36px;
  }
  span {
    font-size: 24px;
    opacity: .54;
  }
  p {
    margin: 0;
    font-size: 18px;
    line-height: 22px;
  }
`;

const Requirements = styled.div`
  padding-top: 38px;
`;
const RequirementsTitle = styled.h2`
  margin: 0;
  padding: 95px 0;
  text-align: center;
  font-size: #272D5B;
  font-size: 72px;
  font-weight: normal;
`;
const RequirementsSubtitle = styled.h2`
  position: relative;
  margin: 0;
  padding: 95px 0;
  text-align: center;
  font-size: #A70050;
  font-size: 72px;
  font-weight: normal;
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    margin-left: -150px;
    left: 50%;
    top: 0;
    height: 10px;
    border-top: 1px solid #272D5B;
    opacity: .5;
  }
`;
const RequirementsItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 450px;
  ${({ short }) => short && css`
    max-height: 300px;
  `}
`;
const RequirementsItem = styled.li`
  display: flex;
  flex-direction: row;
  max-width: 670px;
`;
const RequirementsItemText = styled.div`
  padding-left: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  strong {
    color: #A70050;
    font-size: 36px;
    ${({ alternative }) => alternative && css`
      color: #272D5B;
    `}
  }
  p {
    margin: 0;
    color: #272D5B;
    font-size: 24px;
    line-height: 31px;
  }
`;

const Quotes = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const Quote = styled.li`
  position: relative;
  padding: 90px 0;
  &:nth-child(even) {
    text-align: right;
    &::before {
      content: '';
      position: absolute;
      width: 300px;
      margin-left: -150px;
      left: 50%;
      top: 0;
      height: 10px;
      border-top: 1px solid #272D5B;
      opacity: .5;
    }
  }
`;
const QuoteTitle = styled.h3`
  margin: 0;
  color: #A70050;
  font-size: 72px;
`;
const QuoteDescription = styled.p`
  margin: 0;
  color: #272D5B;
  font-size: 48px;
  a {
    color: #272D5B;
    font-weight: bold;
    text-decoration: none;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-image: url(/images/backgrounds/footer.png);
  height: 306px;
`;
const FooterContent = styled.div`
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1920px;
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
      <LandingSection>
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
              <a href="/form">Quiero participar</a>
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
              usuario, pasando por todo lo relacionado a programación (HTML, CSS, JavaScript, etc.)
              y otros aspectos transversales que afectan a todas las otras áreas, como es el caso
              con accesibilidad y localización.
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
                  <strong>40min.</strong>
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
              <img src="/images/icons/icon-target.svg" alt="Icono de objetivo" aria-hidden="true" />
              <RequirementsItemText>
                <strong>Foco en conceptos</strong>
                <p>
                  Queremos que vayas más allá de librerías o frameworks específicos,
                  para que toda la audiencia pueda aprovechar el contenido.
                </p>
              </RequirementsItemText>
            </RequirementsItem>
            <RequirementsItem key="language">
              <img src="/images/icons/icon-spanish.svg" alt="Icono de eñe" aria-hidden="true" />
              <RequirementsItemText>
                <strong>Contenido en español</strong>
                <p>
                  Preferimos que tu contenido esté presentado en español, para que sea
                  accesible al público hispanohablante en general.
                </p>
              </RequirementsItemText>
            </RequirementsItem>
            <RequirementsItem key="tech">
              <img src="/images/icons/icon-people.svg" alt="Icono de personas" aria-hidden="true" />
              <RequirementsItemText>
                <strong>Tecnología y personas</strong>
                <p>
                  Nos interesa que indagues tanto en lo técnico como lo humano, como
                  inclusión, diversidad, impacto social, entre otros.
                </p>
              </RequirementsItemText>
            </RequirementsItem>
            <RequirementsItem key="people">
              <img src="/images/icons/icon-wave.svg" alt="Icono de saludo" aria-hidden="true" />
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
            <button type="button">
              Quiero participar
            </button>
          </InformationBlockContent>
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
      </LandingSection>
    </Container>
  );
};

export default Home;
