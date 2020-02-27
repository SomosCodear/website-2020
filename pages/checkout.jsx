import React from 'react';
import { CheckoutLayout, CheckoutTitle } from '../layouts/checkout';
import { TextBox } from '../style/lilac/components';

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
    </form>
  </CheckoutLayout>
);

export default Checkout;
