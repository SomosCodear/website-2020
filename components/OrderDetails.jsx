import R from 'ramda';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { BREAKPOINTS, COLORS } from '../style/constants';
import { getOrderPasses, getOrderPassHolderNames, getAddons } from '../data/order/selectors';
import { getItemsById } from '../data/items/selectors';
import { ItemPrice } from './ItemPrice';

const DetailContainer = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  background-color: ${transparentize(0.5, COLORS.lilac.black)};
  border-radius: 0.625rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    align-self: flex-start;
    min-width: 27rem;
    max-width: 27rem;
  }
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

const DetailItemLabel = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailItemPrice = styled.div`
  margin-left: 1rem;
  flex-shrink: 0;
  ${({ bold }) => bold && css`font-weight: bold;`}
  ${({ big }) => big && css`font-size: 2rem;`}
`;

const DetailItemSubtitle = styled.p`
  margin: 0;
  opacity: .5;
  font-size: 0.875rem;
  text-transform: uppercase;
`;

const DetailSubItem = styled.li`
  opacity: .5;
  margin-left: 1.9375rem;
  padding: 0.5rem 0;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  &:first-child {
    padding-top: 0.8rem;
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

const getItemPrice = (id, itemsById) => R.compose(
  R.defaultTo(0),
  R.prop('price'),
  R.prop(id),
)(itemsById);

const calculateTotal = (items, itemsById) => R.compose(
  R.sum,
  R.values,
  R.mapObjIndexed((amount, id) => getItemPrice(id, itemsById) * amount),
)(items);

const Items = ({ items, itemsById }) => R.compose(
  R.values,
  R.mapObjIndexed((amount, id) => (
    <DetailSubItem key={id}>
      <DetailItemLabel>
        {itemsById[id].name}
      </DetailItemLabel>
      <div>
        &nbsp;x
        {amount}
      </div>
      <DetailItemPrice>
        <ItemPrice id={id} amount={amount} />
      </DetailItemPrice>
    </DetailSubItem>
  )),
)(items);

export const OrderDetails = ({ children }) => {
  const passes = useSelector(getOrderPasses);
  const addons = useSelector(getAddons);
  const passHolderNames = useSelector(getOrderPassHolderNames);
  const itemsById = useSelector(getItemsById);

  const passesTotal = useMemo(() => calculateTotal(passes, itemsById), [passes, itemsById]);
  const addonsTotal = useMemo(() => calculateTotal(addons, itemsById), [addons, itemsById]);
  const total = useMemo(() => passesTotal + addonsTotal, [passesTotal, addonsTotal]);


  return (
    <DetailContainer>
      <DetailTitle>Resumen de cuenta</DetailTitle>
      <Disclaimer>Todos los precios son finales y en Pesos Argentinos.</Disclaimer>
      {!R.isEmpty(itemsById) ? (
        <DetailItems>
          <DetailItem>
            <DetailItemTitle>
              <DetailItemLabel>Pase de conferencia</DetailItemLabel>
              <DetailItemPrice bold>
                $&nbsp;
                {passesTotal}
              </DetailItemPrice>
            </DetailItemTitle>
            {passHolderNames.map((name) => (
              <DetailItemSubtitle key={name}>
                {name}
              </DetailItemSubtitle>
            ))}
            <DetailItems>
              <Items items={passes} itemsById={itemsById} />
            </DetailItems>
          </DetailItem>
          <DetailItem>
            <DetailItemTitle>
              <DetailItemLabel>Extras</DetailItemLabel>
              <DetailItemPrice bold>
                $&nbsp;
                {addonsTotal}
              </DetailItemPrice>
            </DetailItemTitle>
            <DetailItems>
              <Items items={addons} itemsById={itemsById} />
            </DetailItems>
          </DetailItem>
          <DetailItem>
            <DetailItemTitle>
              <DetailItemLabel>Total a pagar</DetailItemLabel>
              <DetailItemPrice big bold>
                $&nbsp;
                {total}
              </DetailItemPrice>
            </DetailItemTitle>
          </DetailItem>
        </DetailItems>
      ) : null}
      {children}
    </DetailContainer>
  );
};

OrderDetails.propTypes = {
  children: PropTypes.node,
};

OrderDetails.defaultProps = {
  children: null,
};
