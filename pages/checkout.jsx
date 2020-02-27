import React from 'react';
import { CheckoutLayout, CheckoutTitle } from '../layouts/checkout';

const Checkout = () => (
  <CheckoutLayout>
    <CheckoutTitle
      title="Completá tus datos"
      description="Para generar tu pase, necesitaremos: nombre y apellido, DNI o pasaporte y dirección de correo electrónico."
    />
  </CheckoutLayout>
);

export default Checkout;
