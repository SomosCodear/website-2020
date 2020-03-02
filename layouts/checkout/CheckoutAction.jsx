/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { LilacButton } from '../../components/LilacButton';

const GoBackIconContainer = styled.span.attrs(() => ({
  children: (<img src="/images/chevron-text.svg" alt="Botón de volver" />),
}))`
  display: block;
  min-width: 2.3125rem;
  img {
    transform: rotate(-90deg);
    margin-bottom: 0.1875rem;
  }
`;

export const CheckoutAction = styled(LilacButton).attrs(({
  backButton,
  shadow = true,
  color = 'primary-light',
  label = 'Continuar',
}) => ({
  color,
  shadow,
  children: backButton ? (
    <GoBackIconContainer />
  ) : label,
}))`
  text-transform: uppercase;
`;
