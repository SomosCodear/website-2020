const MERCADOPAGO_PAYMENT_URL = 'https://www.mercadopago.com/mla/checkout/start?pref_id=';

export const buildPaymentURL = (preferenceId) => `${MERCADOPAGO_PAYMENT_URL}${preferenceId}`;
