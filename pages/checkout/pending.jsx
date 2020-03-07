import React from 'react';
import { CheckoutLayout, CheckoutTitle } from '../../layouts/checkout';

const CheckoutPending = () => (
  <CheckoutLayout>
    <CheckoutTitle
      title="Tu pago está siendo procesado"
      description="En cuanto recibamos el pago, te enviaremos un mail de confirmación de tu orden y las entradas a la conferencia."
    />
  </CheckoutLayout>
);

export default CheckoutPending;
