import React from 'react';
import styled, { css } from 'styled-components';
import { CheckoutLayout, CheckoutTitle, CheckoutActions } from '../layouts/checkout';
import { TextBox, ErrorNugget } from '../style/lilac/components';

const Form = styled.form`
  display: block;
  padding: 0 1.25rem;
`;
const DetailContainer = styled.div`
  color: var(--color-text);
  background: #00000080 0% 0%;
  padding: 0 2.125rem;
`;
const DetailTitle = styled.h2`
  font-size: 2rem;
  margin: 0;
  padding-top: 1.5rem;
  font-weight: lighter;
  opacity: .5;
`;
const Disclaimer = styled.p`
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
  opacity: .5;
`;
const DetailItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const DetailItem = styled.li`
  padding-bottom: 0.9375rem;
  margin-bottom: 0.9375rem;
  border-bottom: 1px solid var(--color-accent);
  &:last-child {
    border-bottom: 0;
  }
`;
const DetailItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
`;
const DetailItemLabel = styled.span`
  display: block;
`;
const DetailItemPrice = styled.span`
  display: block;
  ${({ bold }) => bold && css`font-weight: bold;`}
  ${({ big }) => big && css`font-size: 2rem;`}
`;
const DetailItemSubtitle = styled.p`
  opacity: .5;
  font-size: 0.875rem;
  margin: 0.25rem 0 0 0;
`;
const DetailSubItem = styled.li`
  opacity: .5;
  margin-left: 1.9375rem;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:first-child {
    padding-top: 0.8rem;
  }
  &:last-child {
    padding-bottom: 0;
  }
`;

const CheckoutSecondStep = () => (
  <CheckoutLayout>
    <CheckoutTitle
      title="¿A quién le emitimos la factura?"
      description="Los siguientes datos son necesarios para poder generar tu factura electrónica."
    />
    <Form>
      <TextBox
        id="checkout-id"
        label="Número de documento o CUIT"
        value="12345678"
      />
      <TextBox
        id="checkout-lname"
        label="Nombre o razón social"
        value="Cosme Fulanito"
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
    </Form>
    <DetailContainer>
      <DetailTitle>Resumen de cuenta</DetailTitle>
      <Disclaimer>Todos los precios son finales y en Pesos Argentinos.</Disclaimer>
      <DetailItems>
        <DetailItem>
          <DetailItemTitle>
            <DetailItemLabel>Pase de conferencia</DetailItemLabel>
            <DetailItemPrice bold>$ 1.200</DetailItemPrice>
          </DetailItemTitle>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>
            <DetailItemLabel>Extras</DetailItemLabel>
            <DetailItemPrice bold>$ 2.250</DetailItemPrice>
          </DetailItemTitle>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>
            <DetailItemLabel>Total a pagar</DetailItemLabel>
            <DetailItemPrice big bold>$ 3.450</DetailItemPrice>
          </DetailItemTitle>
        </DetailItem>
      </DetailItems>

      <CheckoutActions
        onContinue={() => {}}
        onGoBack={() => {}}
      />

    </DetailContainer>
  </CheckoutLayout>
);

export default CheckoutSecondStep;
