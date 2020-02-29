import React from 'react';
import styled from 'styled-components';
import { CheckoutLayout, CheckoutTitle, CheckoutActions } from '../layouts/checkout';
import { TextBox, ErrorNugget } from '../style/lilac/components';

const Form = styled.form`
  display: block;
  padding: 0 1.25rem;
`;

const Checkout = () => (
  <CheckoutLayout>
    <CheckoutTitle
      title="Completá tus datos"
      description="Para generar tu pase, necesitaremos: nombre y apellido, DNI o pasaporte y dirección de correo electrónico."
    />
    <Form>
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
      <CheckoutActions
        onContinue={() => {}}
        onGoBack={() => {}}
      />
    </Form>
  </CheckoutLayout>
);

export default Checkout;
