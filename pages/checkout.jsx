import React from 'react';
import CheckoutStep from './_checkoutStep';
import { CheckoutTitle } from '../components/CheckoutTitle';


const Checkout = () => (
  <CheckoutStep>
    <CheckoutTitle
      title="Completá tus datos"
      description="Para generar tu pase, necesitaremos: nombre y apellido, DNI o pasaporte y dirección de correo electrónico."
    />
  </CheckoutStep>
);

export default Checkout;
