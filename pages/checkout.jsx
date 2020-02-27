import React from 'react';
import { CheckoutLayout, CheckoutTitle } from '../layouts/checkout';
import { TextBox, ErrorNugget } from '../style/lilac/components';
import { LilacButton } from '../components/LilacButton';

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
      <LilacButton color="primary-light" shadow>
        CONTINUAR
      </LilacButton>
    </form>
  </CheckoutLayout>
);

export default Checkout;