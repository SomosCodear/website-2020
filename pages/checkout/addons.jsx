import R from 'ramda';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useRedirect } from '../../hooks/useRedirect';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import { ITEM_TYPE_ADDON } from '../../data/items/constants';
import { getItemsByType } from '../../data/items/selectors';
import { getAddons, isOrderProcessed } from '../../data/order/selectors';
import { setOrderAddonAmount } from '../../data/order/actions';
import {
  CheckoutLayout,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';
import { Product } from '../../components/Product';
import { OrderDetails } from '../../components/OrderDetails';

const ProductsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ProductItem = styled.li`
  padding-bottom: 2.375rem;
`;

const CheckoutThirdStep = () => {
  useRedirect(isOrderProcessed, '/checkout/confirmation');

  const router = useRouter();
  const dispatch = useDispatch();

  const addons = useSelector(getAddons);
  const items = useSelector((state) => getItemsByType(state, ITEM_TYPE_ADDON));

  const updateAmount = useCallback(
    R.curry((id, amount) => dispatch(setOrderAddonAmount(id, amount))),
    [dispatch],
  );

  return (
    <CheckoutLayout>
      <CheckoutTitle
        title="¿Querés algo más?"
      />
      <ProductsList>
        {items.map(({
          id,
          name,
          image,
          price,
        }) => (
          <ProductItem key={id}>
            <Product
              name={name}
              image={image}
              price={parseInt(price, 10)}
              count={R.compose(R.defaultTo(0), R.prop(id))(addons)}
              onCountChange={updateAmount(id)}
            />
          </ProductItem>
        ))}
      </ProductsList>
      <OrderDetails>
        <CheckoutActions>
          <CheckoutAction backButton onClick={router.back} />
          <CheckoutAction onClick={() => router.push('/checkout/invoice')} />
        </CheckoutActions>
      </OrderDetails>
    </CheckoutLayout>
  );
};

CheckoutThirdStep.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default CheckoutThirdStep;
