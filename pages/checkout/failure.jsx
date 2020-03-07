import React from 'react';
import { CheckoutLayout, CheckoutTitle } from '../../layouts/checkout';

const CheckoutFailure = () => (
  <CheckoutLayout>
    <CheckoutTitle
      title="Parece que hubo un problema para procesar tu pago"
      description="Si deseas reintentar el pago, preciona el siguiente botón"
    />
  </CheckoutLayout>
);

export default CheckoutFailure;
