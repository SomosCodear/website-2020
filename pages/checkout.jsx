import React from 'react';
import styled from 'styled-components';
import { CheckoutLayout, CheckoutTitle } from '../layouts/checkout';
import { TextBox, ErrorNugget } from '../style/lilac/components';
import { LilacButton } from '../components/LilacButton';

const GoBackIconContainer = styled.span`
  display: block;
  min-width: 37px;
  img {
    transform: rotate(-90deg);
    margin-bottom: 3px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 332px;
  margin: 0 auto;
  > *:last-child {
    flex-grow: 1;
    margin-left: 2.4375rem;
  }
`;

const Checkout = () => (
  <CheckoutLayout>
    <CheckoutTitle
      title="Completá tus datos"
      description="Para generar tu pase, necesitaremos: nombre y apellido, DNI o pasaporte y dirección de correo electrónico."
    />
    <form>
      <TextBox
        id="checkout-fname"
        label="Nombre"
        value="Cosme"
      />
      <TextBox
        id="checkout-lname"
        label="Apellido"
        value="Fulanito"
      />
      <TextBox
        id="checkout-id"
        label="DNI o Pasaporte"
        value="12345678"
      />
      <TextBox
        id="checkout-email"
        label="E-mail"
        type="email"
        value="cosme@fulanito.com"
      />
      <ErrorNugget>
        Revisá estos datos.
      </ErrorNugget>
      <ButtonsContainer>
        <LilacButton color="primary-light" shadow>
          <GoBackIconContainer>
            <img src="/images/chevron-text.svg" alt="Botón de volver" />
          </GoBackIconContainer>
        </LilacButton>
        <LilacButton color="primary-light" shadow>
          CONTINUAR
        </LilacButton>
      </ButtonsContainer>
    </form>
  </CheckoutLayout>
);

export default Checkout;
