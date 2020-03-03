import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { fetchItems } from '../../data/items/actions';
import { ITEM_TYPE_PASS } from '../../data/items/constants';
import { getItemsByType } from '../../data/items/selectors';
import { setOrderPassInfo } from '../../data/order/actions';
import { getPassHolder } from '../../data/order/selectors';
import { RadioGroup } from '../../components/RadioGroup';
import { ItemPrice } from '../../components/ItemPrice';
import {
  CheckoutLayout,
  CheckoutTitle,
  CheckoutActions,
  CheckoutAction,
} from '../../layouts/checkout';

const Disclaimer = styled.p`
  font-size: 0.875rem;
  color: var(--color-text);
  text-align: center;
`;

const Total = styled.div`
  text-align: center;
  margin: 1.9375rem 0 2.1875rem 0;
`;

const TotalLabel = styled.h2`
  font-size: 2.25rem;
  color: var(--color-gray-lighter);
  font-weight: lighter;
  margin: 0;
`;

const TotalPrice = styled.strong`
  font-size: 4.5rem;
  color: var(--color-text);
  display: block;
`;

const RadioButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

/**
 * This is necessary so the radio buttons will be aligned on the same Y no matter
 * the width of their labels.
 */
const RadioButtons = styled.div``;

const CheckoutSecondStep = () => {
  const items = useSelector((state) => getItemsByType(state, ITEM_TYPE_PASS));
  const { item } = useSelector((state) => getPassHolder(state, 0));
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = useCallback((values) => {
    dispatch(setOrderPassInfo(0, values));
    router.push('/checkout/addons');
  }, [dispatch, router]);

  return (
    <CheckoutLayout>
      <CheckoutTitle
        title="Elegí el tipo de pase"
        description="Un pase Full te dará acceso a toda la conferencia durante los dos días del evento, 29 y 30 de mayo."
      />
      {items.length > 0 ? (
        <Formik
          initialValues={{ item: item != null ? item : items[0].id }}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form>
              <RadioButtonsContainer>
                <RadioButtons>
                  <RadioGroup
                    name="item"
                    options={items.map(({ id, name }) => ({ label: name, value: id }))}
                  />
                </RadioButtons>
              </RadioButtonsContainer>
              <Total>
                <TotalLabel>Tu pase costará</TotalLabel>
                <TotalPrice>
                  <ItemPrice id={values.item} />
                </TotalPrice>
              </Total>
              <Disclaimer>
                Todos los precios son finales y en Pesos Argentinos.
              </Disclaimer>
              <CheckoutActions>
                <CheckoutAction backButton onClick={router.back} />
                <CheckoutAction type="submit" />
              </CheckoutActions>
            </Form>
          )}
        </Formik>
      ) : null}
    </CheckoutLayout>
  );
};

CheckoutSecondStep.getInitialProps = async ({ store, isServer }) => {
  const promise = store.dispatch(fetchItems());

  if (isServer) {
    await promise;
  }

  return {};
};

export default CheckoutSecondStep;
