import React from 'react';
import styled from 'styled-components';
import { CheckoutLayout, CheckoutTitle, CheckoutActions } from '../../layouts/checkout';
import { RadioButton } from '../../style/lilac/components';

const Disclaimer = styled.p`
  font-size: 0.875rem;
  color: var(--color-text);
  text-align: center;
`;

const Total = styled.div`
  text-align: center;
  margin: 1.9375rem 0 2.1875rem 0;
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

const RadioButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

/**
 * This is necessary so the radio buttons will be aligned on the same Y no matter
 * the width of their labels.
 */
const RadioButtons = styled.div``;

const CheckoutSecondStep = () => (
  <CheckoutLayout>
    <CheckoutTitle
      title="Elegí el tipo de pase"
      description="Un pase Full te dará acceso a toda la conferencia durante los dos días del evento, 29 y 30 de mayo."
    />
    <form>
      <RadioButtonsContainer>
        <RadioButtons>
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
        </RadioButtons>
      </RadioButtonsContainer>
    </form>
    <Total>
      <TotalLabel>Tu pase costará</TotalLabel>
      <TotalPrice>$ 1.200</TotalPrice>
    </Total>
    <Disclaimer>
      Todos los precios son finales y en Pesos Argentinos.
    </Disclaimer>
    <CheckoutActions
      onContinue={() => {}}
      onGoBack={() => {}}
    />
  </CheckoutLayout>
);

export default CheckoutSecondStep;
