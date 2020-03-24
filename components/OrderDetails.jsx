import R from 'ramda';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { BREAKPOINTS, COLORS } from '../style/constants';
import { ItemPrice } from './ItemPrice';

const DetailContainer = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  color: var(--color-text);
  background-color: ${transparentize(0.5, COLORS.lilac.black)};

  @media (min-width: ${BREAKPOINTS.hd}) {
    min-width: 27rem;
    max-width: 27rem;
    border-radius: 0.625rem;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const DetailItem = styled.li`
  &:not(:first-child) {
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px solid var(--color-accent);
  }

  &:last-child {
    margin-bottom: 1rem;
  }
`;

const DetailItemTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 1.5rem;
  }
`;

const DetailItemLabel = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailItemPrice = styled.div`
  min-width: 3.85rem;
  margin-left: 1rem;
  flex-shrink: 0;
  ${({ bold }) => bold && css`font-weight: bold;`}
  ${({ big }) => big && css`font-size: 1.75rem;`}
  text-align: right;

  @media (min-width: ${BREAKPOINTS.hd}) {
    min-width: 4.85rem;
    ${({ big }) => big && css`font-size: 2rem;`}
  }
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
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.25rem;

  &:first-child {
    padding-top: 0.8rem;
  }

  &:last-child {
    padding-bottom: 0;
  }

  @media (min-width: ${BREAKPOINTS.hd}) {
    font-size: 1.5rem;
  }

`;

const Strut = styled.div`
  flex-grow: 1;
`;

const getItemPrice = (id, itemsById) => R.compose(
  parseInt,
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

export const OrderDetails = ({
  itemsById,
  passes,
  addons,
  passHolderNames,
  children,
}) => {
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
          <Strut />
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
  itemsById: PropTypes.objectOf(PropTypes.shape({
    price: PropTypes.string.isRequired,
  })).isRequired,
  passes: PropTypes.objectOf(PropTypes.number).isRequired,
  addons: PropTypes.objectOf(PropTypes.number).isRequired,
  passHolderNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node,
};

OrderDetails.defaultProps = {
  children: null,
};
