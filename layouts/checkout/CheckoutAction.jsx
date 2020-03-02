/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { LilacButton } from '../../components/LilacButton';
import { BREAKPOINTS } from '../../style/constants';

const GoBackIconContainer = styled.span.attrs(() => ({
  children: (<img src="/images/chevron-text.svg" alt="Botón de volver" />),
}))`
  display: block;
  min-width: 2.3125rem;
  img {
    transform: rotate(-90deg);
    margin-bottom: 0.1875rem;
  }
  @media (min-width: ${BREAKPOINTS.hd}) {
    img {
      display: none;
    }
  }
`;

const GoBackLabelContainer = styled.span`
  display: none;
  @media (min-width: ${BREAKPOINTS.hd}) {
    display: inline;
  }
`;

export const CheckoutAction = styled(LilacButton).attrs(({
  backButton,
  backButtonLabel = 'Volver atrás',
  shadow = true,
  color = 'primary-light',
  label = 'Continuar',
}) => ({
  color,
  shadow,
  children: backButton ? (
    <>
      <GoBackIconContainer />
      <GoBackLabelContainer>{backButtonLabel}</GoBackLabelContainer>
    </>
  ) : label,
}))`
  text-transform: uppercase;
`;
