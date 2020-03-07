import React from 'react';
import { CheckoutLayout, CheckoutTitle } from '../../layouts/checkout';

const CheckoutSuccess = () => (
  <CheckoutLayout>
    <CheckoutTitle
      title="¡Tu pago fué procesado!"
      description="En la brevedad vas a estar recibiendo un mail de confirmación de tu orden y las entradas a la conferencia."
    />
  </CheckoutLayout>
);

export default CheckoutSuccess;
