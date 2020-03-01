import React from 'react';
import styled, { css } from 'styled-components';
import { CheckoutLayout, CheckoutTitle, CheckoutActions } from '../../layouts/checkout';
import { Product } from '../../components/Product';

const productsData = Array.from(new Array(5), (_, index) => {
  const i = index + 1;
  return {
    id: `prod${i}`,
    name: `Remera oficial WebConf 2020 (${i})`,
    image: '/images/shirt.png',
    price: i * 100,
    count: i,
  };
});

const ProductsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const ProductItem = styled.li`
  padding-bottom: 2.375rem;
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
      title="¿Querés algo más?"
    />
    <ProductsList>
      {productsData.map((prod) => (
        <ProductItem key={prod.id}>
          <Product
            name={prod.name}
            image={prod.image}
            price={prod.price}
            count={prod.count}
            onCountChange={() => {}}
          />
        </ProductItem>
      ))}
    </ProductsList>
    <DetailContainer>
      <DetailTitle>Resumen de cuenta</DetailTitle>
      <Disclaimer>Todos los precios son finales y en Pesos Argentinos.</Disclaimer>
      <DetailItems>
        <DetailItem>
          <DetailItemTitle>
            <DetailItemLabel>Pase de conferencia</DetailItemLabel>
            <DetailItemPrice bold>$ 1.200</DetailItemPrice>
          </DetailItemTitle>
          <DetailItemSubtitle>
            JOEL ALEJANDRO VILLARREAL BERTOLDI
          </DetailItemSubtitle>
          <DetailItems>
            <DetailSubItem>
              <DetailItemLabel>Full x1</DetailItemLabel>
              <DetailItemPrice>$ 1.200</DetailItemPrice>
            </DetailSubItem>
          </DetailItems>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>
            <DetailItemLabel>Extras</DetailItemLabel>
            <DetailItemPrice bold>$ 2.250</DetailItemPrice>
          </DetailItemTitle>
          <DetailItems>
            <DetailSubItem>
              <DetailItemLabel>Remera x2</DetailItemLabel>
              <DetailItemPrice>$ 1.400</DetailItemPrice>
            </DetailSubItem>
            <DetailSubItem>
              <DetailItemLabel>Taza x1</DetailItemLabel>
              <DetailItemPrice>$ 350</DetailItemPrice>
            </DetailSubItem>
            <DetailSubItem>
              <DetailItemLabel>Cuaderno x1</DetailItemLabel>
              <DetailItemPrice>$ 500</DetailItemPrice>
            </DetailSubItem>
          </DetailItems>
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
