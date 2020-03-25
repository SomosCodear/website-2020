import R from 'ramda';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../style/constants';
import { conditionallyFetchItems } from '../../utils/dataFetching';
import { ITEM_TYPE_ADDON } from '../../data/items/constants';
import { getItemsByType } from '../../data/items/selectors';
import { getNewOrderAddons } from '../../data/order/selectors';
import { setOrderAddonAmount } from '../../data/order/actions';
import {
  CheckoutStep,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
  CheckoutOrderDetails,
} from '../../layouts/checkout';
import { Product } from '../../components/Product';

const ProductsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ProductItem = styled.li`
  padding-bottom: 2.375rem;
`;

const Wrapper = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
const Content = styled.div`
  @media (min-width: ${BREAKPOINTS.hd}) {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 1;

    > *:first-child {
      flex-grow: 1;
    }
  }
`;

const Addons = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const addons = useSelector(getNewOrderAddons);
  const items = useSelector((state) => getItemsByType(state, ITEM_TYPE_ADDON));

  const updateAmount = useCallback(
    R.curry((id, amount) => dispatch(setOrderAddonAmount(id, amount))),
    [dispatch],
  );

  return (
    <CheckoutStep>
      <Wrapper>
        <CheckoutTitle
          title="¿Querés algo más?"
        />
        <Content>
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
          <CheckoutOrderDetails>
            <CheckoutActions hideOnDesktop>
              <CheckoutAction onClick={() => router.push('/checkout/invoice')} />
              <CheckoutAction backButton onClick={router.back} />
            </CheckoutActions>
          </CheckoutOrderDetails>
        </Content>
        <CheckoutActions hideOnMobile>
          <CheckoutAction onClick={() => router.push('/checkout/invoice')} />
          <CheckoutAction backButton onClick={router.back} />
        </CheckoutActions>
      </Wrapper>
    </CheckoutStep>
  );
};

Addons.getInitialProps = async ({ store, isServer }) => {
  await conditionallyFetchItems(store, isServer);

  return {};
};

export default Addons;
