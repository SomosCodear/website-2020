import React from 'react';
import styled from 'styled-components';
import { CheckoutLayout, CheckoutTitle } from '../layouts/checkout';
import { RadioButton } from '../style/lilac/components';
import { LilacButton } from '../components/LilacButton';

const Disclaimer = styled.p`
  font-size: 0.875rem;
  color: var(--color-text);
  text-align: center;
`;

const Total = styled.div`
  text-align: center;
  margin: 3rem 0 2.1875rem 0;
`;
const TotalLabel = styled.h2`
  font-size: 2.25rem;
  color: var(--color-gray-lighter);
  font-weight: lighter;
  margin: 0;
`;
const TotalPrice = styled.strong`
  font-size: 4.5rem;
  color: var(--color-text);
  display: block;
`;

const CheckoutSecondStep = () => (
  <CheckoutLayout>
    <CheckoutTitle
      title="Elegí el tipo de pase"
      description="Un pase Full te dará acceso a toda la conferencia durante los dos días del evento, 29 y 30 de mayo."
    />
    <form>
      <RadioButton
        id="ticket-type"
        label="Full"
      />
      <RadioButton
        id="ticket-type"
        label="Simple (29/05)"
        checked
      />
      <RadioButton
        id="ticket-type"
        label="Simple (30/05)"
      />
    </form>
    <Total>
      <TotalLabel>Tu pase costará</TotalLabel>
      <TotalPrice>$ 1.200</TotalPrice>
    </Total>
    <Disclaimer>
      Todos los precios son finales y en Pesos Argentinos.
    </Disclaimer>
    <LilacButton color="primary-light" shadow>
      CONTINUAR
    </LilacButton>
  </CheckoutLayout>
);

export default CheckoutSecondStep;
